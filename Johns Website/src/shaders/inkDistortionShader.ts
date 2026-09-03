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

// Smooth harmonic mechanical plate distortion (press pressure / roller elasticity)
vec2 getPlateDisplacement(vec2 uv, float strength) {
  if (strength <= 0.001) return vec2(0.0);
  
  float t = u_time * 0.15;
  float wave1 = sin(uv.y * 4.2 + t) * 0.65 + cos(uv.x * 3.1 - t * 0.8) * 0.35;
  float wave2 = sin((uv.x * 2.0 + uv.y * 3.5) + t * 0.5) * 0.5 + cos(uv.y * 8.0 - t) * 0.15;
  
  return vec2(wave1 * 0.026, wave2 * 0.013) * strength;
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
  float ptrRadius = 0.36;
  float ptrAngle = atan(ptrDelta.y, ptrDelta.x);
  float ptrIrregularity = 1.0 + 0.22 * sin(ptrAngle * 3.0 + u_time * 0.5);
  float ptrInfluence = smoothstep(ptrRadius * ptrIrregularity, 0.0, ptrDist) * u_pointerActive;
  
  // Pointer directional ink pull
  vec2 ptrVelocityDrag = -u_velocity * ptrInfluence * (0.015 + u_speed * 0.045);
  
  // 2. Low-Frequency Plate Warp
  float effectiveDisturbance = clamp(u_disturbance + ptrInfluence * 0.28, 0.0, 1.0);
  vec2 plateWarp = getPlateDisplacement(v_uv, effectiveDisturbance);
  vec2 baseUV = v_uv + plateWarp + ptrVelocityDrag;
  
  // 3. Directional Ink Drag along Print/Roller Axis
  float angleRad = u_dragAngle * 3.14159265359 / 180.0;
  vec2 dragDir = vec2(cos(angleRad), sin(angleRad));
  vec2 perpDir = vec2(-dragDir.y, dragDir.x);
  
  float dragLength = (u_drag * effectiveDisturbance * 0.055) + (ptrInfluence * (0.012 + u_speed * 0.048));
  
  // Micro-striations along the physical squeegee/roller path (only when dragging/disturbed)
  float striationActivity = clamp((u_drag * 0.7 + 0.3) * effectiveDisturbance + ptrInfluence * u_speed, 0.0, 1.0);
  float rawStriation = sin(dot(v_uv * vec2(u_aspect, 1.0), perpDir) * 320.0) * 0.16 + 0.84;
  float striation = mix(1.0, rawStriation, striationActivity);
  
  float accumulatedInk = 0.0;
  float totalWeight = 0.0;
  const int SAMPLES = 14;
  
  for (int i = 0; i < SAMPLES; i++) {
    float frac = float(i) / float(SAMPLES - 1);
    float weight = exp(-frac * 2.8);
    vec2 sampleUV = baseUV - dragDir * (frac * dragLength);
    sampleUV = clamp(sampleUV, 0.0, 1.0);
    
    float sampleDensity = texture(u_tex, sampleUV).r;
    accumulatedInk += sampleDensity * weight;
    totalWeight += weight;
  }
  
  float draggedInkDensity = (accumulatedInk / totalWeight) * striation;
  
  // 4. Paper Grain & Surface Roughness
  float grainCoord = v_uv.x * 260.0 * u_aspect + sin(v_uv.y * 60.0) * 2.5;
  float paperTooth = sin(grainCoord) * 0.5 + 0.5;
  float fiberModulation = mix(1.0, 0.82 + 0.18 * paperTooth, u_roughness * effectiveDisturbance);
  
  // Edge ink starvation on dragged tails
  float inkStarvation = mix(1.0, smoothstep(0.04, 0.50, draggedInkDensity), u_roughness * effectiveDisturbance * 0.6);
  float finalPrimaryInk = clamp(draggedInkDensity * fiberModulation * inkStarvation, 0.0, 1.0);
  
  // 5. Proof-Red Plate Registration Separation
  float regSep = u_registration * effectiveDisturbance + ptrInfluence * (0.25 + u_speed * 0.35);
  vec2 redOffsetVector = dragDir * (0.024 * regSep) + vec2(0.005, -0.002) * regSep + (u_velocity * ptrInfluence * 0.02);
  
  vec2 redUV = clamp(v_uv + plateWarp * 1.35 + redOffsetVector, 0.0, 1.0);
  float proofRedSample = texture(u_tex, redUV).g;
  float finalProofRed = clamp(proofRedSample * (0.65 + 0.35 * effectiveDisturbance), 0.0, 1.0);
  
  // 6. Duplicate Ghost Impression (Mechanical plate bounce / double strike)
  vec2 ghostOffset = -dragDir * (0.008 * effectiveDisturbance) + vec2(-0.004, 0.002) * effectiveDisturbance;
  vec2 ghostUV = clamp(baseUV + ghostOffset, 0.0, 1.0);
  float ghostInkSample = texture(u_tex, ghostUV).r;
  float ghostDensity = ghostInkSample * (0.16 * effectiveDisturbance + 0.22 * ptrInfluence);
  
  // 7. Hidden Mode Reveal Layer
  float revealStrength = clamp(u_reveal + ptrInfluence * 0.45, 0.0, 1.0);
  vec2 modeUV = clamp(v_uv + plateWarp * 0.35, 0.0, 1.0);
  float modeSample = texture(u_tex, modeUV).b;
  float finalModeReveal = clamp(modeSample * revealStrength * 1.4, 0.0, 1.0);
  
  // 8. Layer Composition
  vec4 result = (u_renderMode == 1) ? colorPaper : vec4(0.0);
  
  // Underlying revealed modes
  if (finalModeReveal > 0.002) {
    vec4 modeColor = vec4(colorModeText.rgb, finalModeReveal);
    result = mix(result, modeColor, modeColor.a);
  }
  
  // Proof-red registration outline
  if (finalProofRed > 0.002) {
    vec4 redColor = vec4(colorProofRed.rgb, finalProofRed * 0.85);
    result = mix(result, redColor, redColor.a);
  }
  
  // Secondary ghost impression
  if (ghostDensity > 0.002) {
    vec4 ghostColor = vec4(colorInk.rgb, ghostDensity);
    result = mix(result, ghostColor, ghostColor.a);
  }
  
  // Primary black ink
  if (finalPrimaryInk > 0.002) {
    vec4 inkColor = vec4(colorInk.rgb, finalPrimaryInk);
    result = mix(result, inkColor, inkColor.a);
  }
  
  fragColor = result;
}
`;
