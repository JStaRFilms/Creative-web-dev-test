# Master Creative & Technical Architecture Plan: *Spin & Loom*

**Project Name:** *Spin & Loom (Neighborhood Washhouse & Espresso Lab)*  
**Creative Direction:** Industrial Hydro-Centrifugal Precision meets Warm Neighborhood Sanctuary  
**Core Thesis:** Elevate an ordinary neighborhood chore into a sensory ritual of hydro-kinetic physics, tactile warmth, and live digital telemetry.

---

## 1. Creative Concept & Narrative Rail (Phase 0)

Rather than building a standard static business page (`Hero → Services → Pricing → Contact`), the experience is engineered as a **continuous scroll-driven cinematic journey ($0\% \to 100\%$ Virtual Playhead)** that demystifies the physics of textile renewal while providing utility for local patrons.

```
       BEFORE                     CHANGE                           AFTER
 Heavy, Stained,        Hydro-Kinetic Vortex,             Weightless, Pristine,
 Tangled Everyday ───►  Centrifugal Extraction &  ───►   Warm-Folded Textiles in
    Textiles             Artisan Steam Treatment          a Neighborhood Haven
```

### Core Tension & The Driving Question
- **Core Contradiction:** Heavy industrial machinery operating with surgical textile gentleness.
- **The Driving Question:** *"What happens when heavy fabric meets pure hydro-kinetic force?"*

### Material-Grounded Color Palette
- **Brushed Steel** (`#A3ABB2`): Cold-rolled stainless drum casing and tactile toggle dials.
- **Deep Cast Iron** (`#121316`): High-contrast architectural background base.
- **Chalk Suds** (`#F4F6F8`): Crisp typography and frothing aerated wash buffers.
- **Ozone Cyan** (`#38BDF8`): Cold-water oxygenation cycles and live sensor HUD readouts.
- **Amber Thermal** (`#E89B38`): High-heat tumbler warmth, brass accents, and fresh espresso crema.
- **Linen Bone** (`#E5DFD3`): Warm folded cotton textile resting tone.

---

## 2. 7-Shot Cinematic Storyboard

The normalized scroll progress ($p \in [0.0, 1.0]$) controls a single master timeline across 7 synchronized stages:

| Scroll Interval | Shot Role | Camera & Scene State | Kinetic Subject Action | Typography & HUD Track | Interactive Signature Trigger |
|---|---|---|---|---|---|
| **$0\% - 15\%$** | **Shot 1: The Inert Drum** | Frontal eye-level macro view at $Z = 3.5m$ | Polished 3D chrome drum in dark resting state with subtle ambient float | Split-mask reveal: *"WHAT HAPPENS WHEN HEAVY FABRIC MEETS PURE FORCE?"* | Canvas 2D lint/dust particle dispersion on mouse hover; mechanical acoustic tick |
| **$15\% - 30\%$** | **Shot 2: The Ingestion & Lock** | 3D dolly zoom into porthole glass with optical refraction ($IOR = 1.52$) | Heavy brass latch engages; water injection nozzles pressurize | Split-line stagger: *"01 / PRECISION INJECTION. 40°C ARTISAN OZONE INFUSION."* | Cursor velocity induces hydraulic fluid displacement waves in GLSL |
| **$30\% - 45\%$** | **Shot 3: The Centrifugal Crucible** | Dynamic $35^\circ$ oblique camera tilt with depth-of-field blur | Drum accelerates along axis-vector to simulated 1,400 RPM | Monumental telemetry readout: **1,400 RPM / 4.2 G-FORCE / 28 MIN** | Mouse drag scrubs angular velocity; acoustic turbine frequency sweep |
| **$45\% - 60\%$** | **Shot 4: Fiber Deconstruction** | Microscopic weave-level macro camera ($Z = 0.8m$) | Woven textile matrix deconstructs into floating micro-filaments | Technical caption: *"DEEP-CLEAN FIBER REALIGNMENT AT CELLULAR LEVEL"* | Hovering cursor acts as a magnetic force field pulling loose fibers |
| **$60\% - 75\%$** | **Shot 5: The Thermal Lift** | 3D camera sweeps around tumbler exit chamber | Warm air currents lift woven cotton into weightless suspended float | Warm amber palette shift; typography displays cycle presets (Silk, Denim, Heavy Duck) | Interactive fabric physics mesh ripples with cursor wind force |
| **$75\% - 85\%$** | **Shot 6: The Neighborhood Sanctuary** | 3-Card 3D spatial flip into architectural interior perspective | Pinned cards fan out: *Pour-Over Bar*, *Silent Work Pods*, *Drop-Off Fluff* | Split cards rotate $180^\circ$ displaying local roast profiles & drop-off tiers | Proximity card tilt with specular highlight tracking |
| **$85\% - 100\%$** | **Shot 7: Live Washhouse Telemetry (Climax)** | Camera docks onto interactive 2D/3D Hybrid Dashboard | 16-Bay Machine Grid docks with live operational timers & reserve triggers | Full HUD: *"READY FOR LOAD. 6 DRUMS AVAILABLE NOW."* + Booking action | One-click machine bay reservation with haptic sound response |

---

## 3. Technology Stack & Technical Pipeline

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SPIN & LOOM RENDER & INTERACTION ENGINE                         │
├────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│      INPUT CONTROLLERS     │    CENTRAL ORCHESTRATION    │       RENDER OUTPUTS        │
│  - Lenis Smooth Scroll     │  - Master RAF Ticker        │  - Three.js WebGL Drum      │
│  - Pointer & Velocity      │  - GSAP ScrollTrigger       │  - GLSL Fluid Vortex Shader │
│  - Web Audio Context       │  - Virtual Playhead [0, 1]  │  - Canvas 2D Fiber Physics  │
│  - Viewport Resize ($100svh$)│  - State Normalizers        │  - Dual-DOM Kinetic Split   │
└────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

### 1. Viewport & 3D Layer Stratification
- **Container Sizing:** `100svh` containers to prevent mobile address-bar resize jumps.
- **Layer Stacking Hierarchy:**
  - `z-index: 1`: Canvas 2D ambient background and fiber physics.
  - `z-index: 10`: Three.js WebGL viewport (industrial drum, glass refraction, bubbles).
  - `z-index: 20`: Kinetic typography and HUD telemetry layer.
  - `z-index: 100`: Navigation, machine availability badge, and acoustic toggles.
- **DPR Clamping:** Clamped strictly to `Math.min(window.devicePixelRatio || 1, 2.0)` to safeguard mobile GPU fill rate.
- **Color Pipeline:** `THREE.ACESFilmicToneMapping` with `THREE.SRGBColorSpace`.

### 2. Kinetic Typography & DOM Interaction Systems
- **Glyph Splitting:** Executed strictly inside `document.fonts.ready` using SplitText with `.line-mask` (`overflow: hidden`) and staggered character reveals (`translateY(120%)` $\to$ `0%`).
- **Dual-DOM Accessibility:** Intact `<h1 class="sr-only">` for screen readers and search crawlers; visual split spans tagged with `aria-hidden="true"`.
- **Live Counter Engine:** Mechanical odometer roll animations for RPM, water temperature, and cycle time remaining.

### 3. Synchronized Virtual Scroll Engine
- **Unified Clock:** Lenis smooth scrolling driven directly through `gsap.ticker` with `gsap.ticker.lagSmoothing(0)`.
- **Pin Buffer Zones:** Pinned scrollytelling sequences with an explicit 10% rest buffer ($p \in [0.90, 1.00]$) to ensure stable resting geometry before unpinning.

### 4. Canvas 2D Particle Fiber & Lint Dynamics
- **Pixel Buffer Extraction:** Typography and logo silhouettes rendered to an offscreen buffer and extracted via `ctx.getImageData()` using row-major 1D stride arithmetic:
  $$\text{Index}(x, y) = (y \times 4 \times W) + (x \times 4)$$
- **Particle Restitution:** 4,000+ anchored lint/fiber particles with Hooke's Law spring-back memory that scatter when the cursor enters their proximity radius and reconstitute on departure.
- **Constellation Optimization:** Upper-triangular indexing ($j = i + 1$) for proximity thread connections to operate at $O(N(N-1)/2)$.

### 5. WebGL 3D Mesh & Industrial Lighting Rig
- **Asset Pipeline:** DRACO-compressed GLTF model of an industrial high-spin front-loading washing drum auto-centered via `THREE.Box3`.
- **Gimbal-Free Rotation:** Drum spin driven along the normal axis vector using `rotateOnAxis(axis, deltaRadians)` rather than raw Euler accumulation.
- **Physical Materials:** PBR brushed steel drum casing, perforated interior basket, and a transparent dielectric door with glass transmission (`transmission: 0.95`, `ior: 1.52`).
- **Studio Lighting:** 3-point lighting rig (Warm Key Light, Cool Blue Fill, Sharp Rim) paired with studio HDR reflections.

### 6. Custom GLSL Shaders
- **Soap & Water Vortex:** 4-octave Fractional Brownian Motion (FBM) with divergence-free 2D Curl Noise evaluated directly on the GPU to generate organic foaming suds and water turbulence behind the porthole glass.
- **Fluid Mouse Velocity:** Pointer deltas passed as uniforms (`uMouse`, `uVelocity`, `uSpeed`) to produce real-time hydro-kinetic ripples and RGB chromatic aberration distortion on swift cursor gestures.

### 7. Interactive Neighborhood Utility Layer
- **Live Drum Availability HUD:** Real-time visual matrix showing all 16 washers and 12 dryers with live countdown timers and status indicators (*In Wash*, *Spinning*, *Available*).
- **Cycle Duration & Fabric Selector:** Interactive rotary dial enabling visitors to test wash formulas (e.g. *Cold Woolens*, *Heavy Denim*, *Vintage Cotton*) and calculate exact wash durations and detergent dosage.
- **Sanctuary Amenities Guide:** Interactive menu showcasing the in-house espresso bar, work table power stations, and eco-friendly detergent refills.
- **Acoustic Escapement:** Optional highpass-filtered synthesized mechanical audio ticks for dial rotations and low-frequency resonant drum hums.

---

## 4. Performance Budget & Graceful Degradation

1. **Frame Budget:** 16.6ms total per frame (JS $\le 4.0\text{ms}$, WebGL Draw Calls $\le 4.0\text{ms}$, GPU Render $\le 6.0\text{ms}$, Headroom $\ge 2.6\text{ms}$).
2. **Draw Call Ceiling:** $< 50$ draw calls on mobile, $< 100$ on desktop using instanced rendering for drum perforations and bubble fields.
3. **Zero-Allocation RAF Loop:** Scratch vectors (`THREE.Vector3`, `THREE.Matrix4`) pre-allocated outside the animation loop to eliminate garbage collection micro-stutters.
4. **Mobile Adaptations:**
   - Stride step increased from 4px to 8px (75% particle count reduction).
   - Real-time glass transmission simplified to physical standard opacity.
   - Pinned 3D sequences adapt via `gsap.matchMedia()` into clean vertical scroll stacks on smaller touch screens.
5. **Accessibility & Motion Preference:** Complete compliance with `prefers-reduced-motion: reduce`, substituting high-speed rotations with subtle fade reveals.
6. **Teardown Lifecycle:** Strict resource disposal (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`, `lenis.destroy()`) on unmount.
