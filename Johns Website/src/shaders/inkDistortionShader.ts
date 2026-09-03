export const INK_VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = (a_position + vec2(1.0, 1.0)) * 0.5;
  v_uv.y = 1.0 - v_uv.y; // Match 2D canvas top-down coordinate system
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const INK_FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_tex;
uniform vec2 u_resolution;
uniform float u_aspect;
uniform float u_time;

// Control Uniforms
uniform float u_disturbance;
uniform float u_registration;
uniform float u_drag;
uniform float u_dragAngle;
uniform float u_roughness;
uniform float u_reveal;

// Pointer Uniforms
uniform vec2 u_pointer;
uniform vec2 u_velocity;
uniform float u_speed;
uniform float u_pointerActive;

// Render Mode (0 = transparent overlay for DOM, 1 = opaque proof paper)
uniform int u_renderMode;

// Non-periodic hash and noise helpers (avoids trigonometric precision artifacts)
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// 1D smooth value noise along perpendicular squeegee axis
float noise1D(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash11(i), hash11(i + 1.0), u);
}

// 2D smooth value noise for organic mechanical tooth and fiber
float noise2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Smooth low-frequency plate tension displacement (no liquid warping)
vec2 getPlateDisplacement(vec2 uv, float strength) {
  if (strength <= 0.001) return vec2(0.0);
  
  float t = u_time * 0.12;
  float wave1 = sin(uv.y * 3.8 + t) * 0.6 + cos(uv.x * 2.6 - t * 0.7) * 0.4;
  float wave2 = sin((uv.x * 1.8 + uv.y * 2.8) + t * 0.4) * 0.5;
  
  return vec2(wave1 * 0.016, wave2 * 0.008) * strength;
}

void main() {
  // Authentic Proof Palette
  vec4 colorPaper = vec4(0.9451, 0.9216, 0.8667, 1.0);     // #F1EBDD
  vec4 colorInk = vec4(0.0902, 0.0902, 0.0784, 1.0);       // #171714
  vec4 colorProofRed = vec4(0.8510, 0.3569, 0.2471, 1.0);  // #D95B3F
  vec4 colorModeText = vec4(0.7882, 0.3098, 0.2118, 1.0);  // #C94F36
  
  // 1. Local Pointer Disturbance Field
  vec2 ptrDelta = (v_uv - u_pointer) * vec2(u_aspect, 1.0);
  float ptrDist = length(ptrDelta);
  float ptrRadius = 0.35;
  float ptrAngle = atan(ptrDelta.y, ptrDelta.x);
  float ptrIrregularity = 1.0 + 0.18 * sin(ptrAngle * 3.0 + u_time * 0.4);
  float ptrInfluence = smoothstep(ptrRadius * ptrIrregularity, 0.0, ptrDist) * u_pointerActive;
  
  // Pointer directional ink pull
  vec2 ptrVelocityDrag = -u_velocity * ptrInfluence * (0.012 + u_speed * 0.038);
  
  // Effective Disturbance
  float effectiveDisturbance = clamp(u_disturbance + ptrInfluence * 0.25, 0.0, 1.0);
  
  // 2. Low-Frequency Mechanical Plate Warp
  vec2 plateWarp = getPlateDisplacement(v_uv, effectiveDisturbance);
  vec2 baseUV = clamp(v_uv + plateWarp + ptrVelocityDrag, 0.0, 1.0);
  
  // 3. Directional Axis Setup
  float angleRad = u_dragAngle * 3.14159265359 / 180.0;
  vec2 dragDir = vec2(cos(angleRad), sin(angleRad));
  vec2 perpDir = vec2(-dragDir.y, dragDir.x);
  
  // Coordinate along perpendicular axis for roller non-uniformity
  float perpCoord = dot(v_uv * vec2(u_aspect, 1.0), perpDir);
  
  // Multi-scale roller noise (breaks periodic banding completely)
  float rollerNoiseCoarse = noise1D(perpCoord * 32.0);
  float rollerNoiseMed = noise1D(perpCoord * 85.0 + 1.7);
  float rollerNoiseFine = noise1D(perpCoord * 190.0 + 3.4);
  float localRollerVariation = rollerNoiseCoarse * 0.5 + rollerNoiseMed * 0.35 + rollerNoiseFine * 0.15;
  
  // 4. Primary Black Impression Core & Edge-Biased Roughness
  float rawCoreSample = texture(u_tex, baseUV).r;
  
  // Detect glyph contour boundary (peaks at ~0.5, 0 deep inside or far outside)
  float edgeProximity = smoothstep(0.04, 0.32, rawCoreSample) * smoothstep(0.96, 0.68, rawCoreSample);
  
  // Edge-biased paper tooth & fiber erosion
  float edgeFiberNoise = noise2D(v_uv * vec2(u_aspect * 160.0, 160.0));
  float boundaryErosion = (edgeFiberNoise - 0.45) * u_roughness * effectiveDisturbance * 0.48;
  
  // Dark pooling / ink squeeze at contour (physical ink squashed to the edges of the plate)
  float inkPooling = edgeProximity * 0.12 * u_roughness;
  
  // Preserved Core: Inside remains solid opaque black (~70% intact mass), only edges erode
  float intactCore = clamp(rawCoreSample - edgeProximity * boundaryErosion + inkPooling, 0.0, 1.0);
  
  // Small localized mechanical voids (rough paper tooth pulling away tiny patches under high disturbance)
  float voidNoise = noise2D(v_uv * vec2(u_aspect * 28.0, 28.0));
  float voidThreshold = 1.0 - 0.22 * effectiveDisturbance;
  float microVoid = smoothstep(voidThreshold, voidThreshold + 0.08, voidNoise) * u_roughness * 0.45;
  intactCore = clamp(intactCore - microVoid * rawCoreSample, 0.0, 1.0);
  
  // 5. Directional but Locally Inconsistent Drag (Pulled-away material ~20%)
  // Drag length varies across stems and serifs based on local roller variation
  float localDragFactor = mix(0.35, 1.25, localRollerVariation);
  float maxDragDist = (u_drag * effectiveDisturbance * 0.062 * localDragFactor) + (ptrInfluence * (0.01 + u_speed * 0.042));
  
  float trailAccum = 0.0;
  float trailWeight = 0.0;
  const int SAMPLES = 12;
  
  // Sample along drag vector with non-periodic jitter to eliminate step lines
  for (int i = 1; i <= SAMPLES; i++) {
    float frac = float(i) / float(SAMPLES);
    float jitter = (hash11(float(i) * 23.7 + perpCoord * 43.0) - 0.5) * 0.07;
    float t = clamp(frac + jitter, 0.0, 1.0);
    
    // Natural exponential decay of dragged ink
    float w = exp(-t * 3.2);
    vec2 sampleUV = clamp(baseUV - dragDir * (t * maxDragDist), 0.0, 1.0);
    float s = texture(u_tex, sampleUV).r;
    
    // Fine natural micro-fiber variation in dragged trail
    float fiberGrain = mix(0.72, 1.0, noise1D(dot(sampleUV * vec2(u_aspect, 1.0), perpDir) * 140.0));
    trailAccum += s * w * fiberGrain;
    trailWeight += w;
  }
  
  float trailDensity = (trailAccum / max(0.001, trailWeight));
  // Smeared material pulled off glyphs onto paper (subordinate to core)
  float draggedMaterial = trailDensity * (0.32 + 0.42 * effectiveDisturbance);
  
  // Final Primary Ink: Core remains prominent, trails extend outward
  float finalPrimaryInk = max(intactCore, draggedMaterial);
  
  // 6. Mechanically Imperfect Proof-Red Registration Layer
  // Spatial variation across platen width: skew angle and tension drift
  float regStrength = u_registration * effectiveDisturbance + ptrInfluence * (0.22 + u_speed * 0.32);
  
  vec2 centeredUV = v_uv - vec2(0.5);
  // Differential plate skew across width & height
  float plateSkew = (centeredUV.x * 0.45 - centeredUV.y * 0.25) * 0.012 * regStrength;
  vec2 rotOffset = vec2(-centeredUV.y, centeredUV.x) * plateSkew;
  
  // Platen tension accumulation across print direction
  float tensionDrift = (v_uv.x * 0.6 + 0.4) * regStrength;
  vec2 redOffsetVector = dragDir * (0.003 + 0.022 * tensionDrift) + 
                         vec2(0.005 * (1.0 - v_uv.y * 0.4), -0.003 * v_uv.x) * regStrength + 
                         rotOffset + (u_velocity * ptrInfluence * 0.018);
  
  vec2 redUV = clamp(v_uv + plateWarp * 1.28 + redOffsetVector, 0.0, 1.0);
  float proofRedSample = texture(u_tex, redUV).g;
  
  // Proof-red outline also exhibits subtle mechanical ink transfer variation
  float redTransferNoise = mix(0.82, 1.0, noise1D(perpCoord * 70.0));
  float finalProofRed = clamp(proofRedSample * (0.65 + 0.35 * effectiveDisturbance) * redTransferNoise, 0.0, 1.0);
  
  // 7. Duplicate Ghost Impression (Mechanical plate bounce / double strike)
  vec2 ghostOffset = -dragDir * (0.007 * effectiveDisturbance) + vec2(-0.003, 0.0015) * effectiveDisturbance;
  vec2 ghostUV = clamp(baseUV + ghostOffset, 0.0, 1.0);
  float ghostInkSample = texture(u_tex, ghostUV).r;
  float ghostDensity = ghostInkSample * (0.14 * effectiveDisturbance + 0.20 * ptrInfluence);
  
  // 8. Distributed Under-Print Mode Reveal
  // Under-print text is exposed where primary ink is displaced, thinned, or in mechanical gaps
  float rawReveal = u_reveal * (0.4 + 0.6 * effectiveDisturbance) + ptrInfluence * 0.35;
  vec2 modeUV = clamp(v_uv + plateWarp * 0.25, 0.0, 1.0);
  float modeSample = texture(u_tex, modeUV).b;
  
  // Reveal appears through gaps (~10% exposure) and trailing smear voids
  float voidExposure = clamp(1.0 - finalPrimaryInk * 0.88, 0.0, 1.0);
  float finalModeReveal = clamp(modeSample * rawReveal * (0.55 + 0.45 * voidExposure) * 1.5, 0.0, 1.0);
  
  // 9. Layer Composition
  vec4 result = (u_renderMode == 1) ? colorPaper : vec4(0.0);
  
  // A. Under-print revealed modes
  if (finalModeReveal > 0.002) {
    vec4 modeColor = vec4(colorModeText.rgb, finalModeReveal);
    result = mix(result, modeColor, modeColor.a);
  }
  
  // B. Mechanically imperfect proof-red registration outline
  if (finalProofRed > 0.002) {
    vec4 redColor = vec4(colorProofRed.rgb, finalProofRed * 0.88);
    result = mix(result, redColor, redColor.a);
  }
  
  // C. Duplicate ghost strike
  if (ghostDensity > 0.002) {
    vec4 ghostColor = vec4(colorInk.rgb, ghostDensity);
    result = mix(result, ghostColor, ghostColor.a);
  }
  
  // D. Primary black impression (solid core + pulled material)
  if (finalPrimaryInk > 0.002) {
    vec4 inkColor = vec4(colorInk.rgb, finalPrimaryInk);
    result = mix(result, inkColor, inkColor.a);
  }
  
  fragColor = result;
}
`;
