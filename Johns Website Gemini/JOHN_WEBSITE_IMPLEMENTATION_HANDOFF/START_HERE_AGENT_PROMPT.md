# START HERE — Coding Agent Prompt

You are implementing my personal portfolio website, **JOHN**.

Do not redesign it from scratch and do not reinterpret the art direction.

## Before writing code

1. Inspect the existing repository and understand its current structure.
2. Read `docs/JOHN_IMPLEMENTATION_SOURCE_OF_TRUTH_v0.2.md` completely.
3. Inspect every image under `references/`.
4. Read `README.md` for reference priority and authenticity rules.
5. Treat the Source of Truth as authoritative whenever your default instincts conflict with it.

The governing concept is:

> **JOHN IS AN INTERFACE**

The visual direction is:

> **Unfinished Document / Living Proof**

The core visual law is:

> **PERFECT STRUCTURE / IMPERFECT SURFACE**

The core interaction law is:

> **DISTURB → REVEAL → RECONSTRUCT**

## Your task right now

Implement **MILESTONE 01 — THE PROOF** only.

The goal is:

> Open localhost and it already feels unmistakably like JOHN before anything moves.

Build the static high-fidelity foundation for:

1. Hero / Arrival
2. Selected Work
3. Opening of Melo / Builder Mode
4. Global paper/proof visual system
5. Desktop composition
6. Basic responsive/mobile composition

## Do NOT implement yet

Do not implement:
- the WebGL/Three.js JOHN distortion shader
- pointer ink deformation
- elaborate GSAP scroll choreography
- project-to-project transitions
- the full Director/Takomi/Observatory/CFOP sections
- smooth-scroll libraries
- autoplay sound
- decorative particles
- generic SaaS card layouts
- a component library merely for convenience

Milestone 01 should be primarily semantic HTML, TypeScript/React, CSS, and reusable SVG proof primitives.

## Stack

If the repo is already initialized, preserve the existing sensible stack and structure.

If this is a fresh project, use the Source of Truth default:

- Next.js
- TypeScript
- custom CSS / CSS Modules
- semantic HTML
- SVG proof graphics

GSAP and Three.js belong to later milestones; do not make Milestone 01 depend on them.

Typography direction:
- Instrument Serif — display/personality
- IBM Plex Mono — system/metadata
- Inter — utility/body

Use normal web/package font loading. Do not bake the headline into an image.

Palette v1:

```css
--paper: #F1EBDD;
--paper-light: #F6F2E8;
--ink: #171714;
--ink-secondary: #5E594F;
--guide: rgba(23, 23, 20, 0.12);
--proof-red: #D95B3F;
--proof-red-dark: #C94F36;
```

## Non-negotiable visual rules

- JOHN is real semantic text.
- Warm paper, not a dark homepage.
- The grid underneath must be disciplined.
- Imperfection sits on top of structure.
- Use proof/red registration language sparingly.
- Use crop marks, guides, technical labels, revision marks, and handwritten SVG annotations with restraint.
- Avoid rounded SaaS cards.
- Avoid glassmorphism.
- Avoid trendy gradient blobs.
- Avoid generic AI visuals.
- Avoid a terminal aesthetic outside the authentic Takomi artifact.
- Whitespace is intentional; do not fill every corner.
- Project artifacts keep their authentic visual identity.
- The portfolio layer annotates the artifact rather than repainting it.

## Reference use

`references/01_HERO_CANONICAL_RAW_PROOF.png` is the primary visual target for Milestone 01.

Use `references/02_HERO_SCROLL_STATES.png` to understand what the hero must later be capable of becoming, but **do not implement the disturbance yet**.

Use `references/03_MELO_BUILDER_PROPAGATION.png` to compose the Melo opening.

The generated references can contain invented microcopy or fake UI. Do not reproduce those as factual content.

Search the actual repo for real Melo screenshots/assets. If they are unavailable, create clearly neutral artifact placeholders that can later be replaced; do not fabricate fake production UI.

## Architecture expectations

Build reusable primitives for the proof system rather than hardcoding a poster:

Examples:
- `CropMark`
- `RegistrationMark`
- `GuideLine`
- `RevisionStamp`
- `SystemLabel`
- `Annotation`
- `HandArrow`
- `PaperNote`
- `ArtifactFrame`

Keep the architecture proportional. Do not turn a personal portfolio into an enterprise framework.

## Responsive requirement

Mobile is not desktop squeezed smaller.

Preserve the concept while reducing decorative density by roughly 40–50%.

The hero may use a deliberate `JO / HN` composition on narrow screens if that produces the strongest result.

No essential information may rely on hover.

## Accessibility

- semantic headings
- real text in DOM
- keyboard-accessible navigation
- decorative SVGs `aria-hidden`
- sufficient contrast
- no information encoded only by color
- static content remains usable without future WebGL

## Definition of done for Milestone 01

Before calling it complete:

1. Run the project and verify it renders without errors.
2. Verify desktop and mobile layouts.
3. Verify semantic navigation and headings.
4. Take screenshots of:
   - desktop Hero
   - desktop Selected Work
   - desktop Melo opening
   - mobile Hero
5. Compare those screenshots against the reference pack.
6. Fix obvious visual drift before stopping.
7. Report:
   - what you implemented
   - files/components created
   - any real assets still missing
   - any deviations from the Source of Truth and why

Most important:

> **Do not use animation to rescue weak static design.**

If the static screenshot does not already feel premium, raw, editorial, tactile, and unmistakably like the canonical hero reference, keep refining the static composition.

Do not begin Milestone 02 until Milestone 01 has been reviewed and approved.
