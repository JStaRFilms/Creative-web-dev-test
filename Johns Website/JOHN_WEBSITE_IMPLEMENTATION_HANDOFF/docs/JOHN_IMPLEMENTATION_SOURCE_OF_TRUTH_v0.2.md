# JOHN — Implementation Source of Truth

**Status:** Locked v0.1  
**Purpose:** Primary implementation brief for the JOHN personal website.  
**Rule:** If code, motion, layout, or new ideas conflict with this document, this document wins unless John explicitly changes the decision.

---

# 1. Governing Concept

## JOHN IS AN INTERFACE

The website presents John as a calm editorial surface whose underlying creative modes are gradually revealed through the work he makes.

The visitor should not leave thinking:

> John does lots of unrelated things.

They should leave thinking:

> The medium changes. The mind behind it does not.

The site must feel like a **finished website that still carries visible evidence of how it was made**.

---

# 2. Core Visual Law

## PERFECT STRUCTURE / IMPERFECT SURFACE

The grid underneath is disciplined.

The surface may contain registration errors, ink variation, handwritten corrections, crop marks, proof stamps, construction lines, revision notes, taped artifacts, rough edges, and process evidence.

The rawness must never become random clutter.

---

# 3. Core Interaction Law

## DISTURB → REVEAL → RECONSTRUCT

1. The visible surface is disturbed.
2. A hidden layer, relationship, or operating mode is revealed.
3. The interface reconstructs into either its baseline state or the next narrative state.

This must remain recognizable across the site even when each project interprets it differently.

---

# 4. Hero Interaction — Locked Behaviour

## Scroll is the primary driver

Scroll controls the **global disturbance state** of JOHN.

## Pointer is secondary

The mouse adds a **small local disturbance** on top of the current scroll-defined state.

`FINAL DISTURBANCE = SCROLL BASELINE + LOCAL POINTER FIELD`

Approximate contribution:
- Scroll: 75–85%
- Pointer: 15–25%

When the pointer leaves an area, that area returns to the **current scroll baseline**, not to the pristine hero state.

---

# 5. Hero Scroll Timeline

The hero is expected to occupy roughly **150–180vh** of scroll distance while the visual composition remains pinned for much of the sequence.

## 0–20% — REST

JOHN is intact.

Visible:
- warm paper
- huge black serif JOHN
- faint proof-red registration outline
- paper grain
- crop marks
- handwritten annotations
- guide lines
- `CURRENT MODE / EVERYTHING`
- `SCROLL TO ENTER`
- navigation

Pointer response is extremely subtle.

## 20–55% — DISTURB

As scroll progresses:
- red construction/registration outline separates
- black ink begins dragging horizontally and vertically
- guide lines become slightly more visible
- letter fragments appear slightly misprinted
- duplicated impressions appear
- ink roughness increases
- the hidden operating-mode layer starts showing through JOHN

Hidden modes:
- BUILDER
- DIRECTOR
- ENGINEER
- DESIGNER
- MUSICIAN
- EXPERIMENTER
- TEACHER

### Pointer behaviour in this range

Pointer position and velocity create a local irregular disturbance field.

Slow movement:
- mild ink pull
- slight local registration offset

Fast movement:
- longer smear
- stronger local separation

The field should be slightly directional and irregular, **not a perfect circular lens**.

No RGB glitch. No particles. No TV static. No generic liquid effect.

It must feel like **printed material behaving incorrectly**.

## 55–70% — REVEAL

This is maximum expressive intensity.

JOHN remains recognizable but heavily compromised.

Modes become readable.

Possible metadata change:

`CURRENT MODE / EVERYTHING`

becomes:

`MODES DETECTED / 07`

## 70–85% — RECONSTRUCT

Forward scrolling now repairs the print.

Suggested return order:
1. main black letter structure
2. dragged ink retracts
3. hidden modes recede
4. proof-red registration realigns
5. tiny fragments settle last

No spring or bounce easing.

## 85–100% — REORGANIZE

JOHN does not simply return to the original hero.

The document progresses:
- JOHN moves/reduces
- some annotations fade or reposition
- a rule extends
- `SELECTED WORK` appears
- `01—05` resolves
- the project index enters

The calm Selected Work composition is the **reconstruction state of the disturbed hero**, not a separate design direction.

---

# 6. Pointer State

Suggested conceptual shape:

```ts
type HeroState = {
  progress: number
  disturbance: number
  reveal: number
  reconstruction: number
  pointerX: number
  pointerY: number
  pointerVelocityX: number
  pointerVelocityY: number
  pointerSpeed: number
  pointerInfluence: number
}
```

All participating systems should read from this shared state.

Avoid independent animation systems fighting over the same properties.

---

# 7. Rendering Responsibilities

## HTML / CSS
Use for semantic content, navigation, typography, layout, responsive composition, project copy, project indexes, proof metadata, most guide lines, and static structure.

JOHN must exist as real semantic text in the DOM.

## SVG
Use for crop marks, registration targets, arrows, circles, underlines, brackets, proof boxes, alignment marks, reusable handwritten marks, and technical diagrams where appropriate.

## GSAP + ScrollTrigger
Use for hero scroll progression, pinned sequences, project transitions, layout reorganization, timelines, and controlled state changes.

Native scrolling first.

## WebGL / Three.js
Use **only where continuous pixel-level distortion genuinely earns it**.

Primary expected use:
- JOHN ink / registration disturbance

Do not make the entire site a WebGL canvas.

---

# 8. Hero Rendering Layers

```text
HERO
│
├── Semantic DOM
│   ├── JOHN
│   ├── tagline
│   ├── navigation
│   └── system metadata
│
├── Static Proof Layer
│   ├── crop marks
│   ├── registration marks
│   ├── guide lines
│   ├── CMYK
│   └── handwritten notes
│
├── Clean Typography Layer
│
├── Hidden Mode Layer
│
└── Distortion Canvas
    ├── ink drag
    ├── registration separation
    ├── low-frequency displacement
    └── pointer-local deformation
```

The expressive layer must never own essential content.

---

# 9. Visual Direction

## Name
**Unfinished Document / Living Proof**

## Primary mood
- editorial
- tactile
- technical
- human
- precise underneath
- imperfect on the surface
- warm rather than futuristic
- premium rather than polished-to-death

The website should feel like:

**art publication × working proof × personal archive × creative operating system**

Avoid:
- generic AI startup visual language
- cyberpunk
- glowing orbs
- permanent dark theme
- glassmorphism
- SaaS card grids
- meaningless 3D objects
- random particle systems
- trendy gradient blobs

---

# 10. Palette — v1

```css
--paper: #F1EBDD;
--paper-light: #F6F2E8;
--ink: #171714;
--ink-secondary: #5E594F;
--guide: rgba(23, 23, 20, 0.12);
--proof-red: #D95B3F;
--proof-red-dark: #C94F36;
```

Color hierarchy:
- approximately 90% paper / ink / neutrals
- proof red used sparingly
- real project artifacts retain their authentic colors

---

# 11. Typography — v1

## Display / personality
**Instrument Serif**

Use for JOHN, MELO, TAKOMI, project names, large statements, and chapter transitions.

Fallback test candidate if required:
- Newsreader

## System / metadata
**IBM Plex Mono**

Use for project numbers, mode labels, proof stamps, statuses, revision metadata, timestamps, technical notes, and small navigation metadata.

## Utility / function
**Inter**

Use only where functional UI/body text needs neutrality and maximum readability.

Hierarchy:
- Instrument Serif = personality
- IBM Plex Mono = system
- Inter = function

---

# 12. Handwriting

Do **not** rely on a handwriting font across the site.

Create a small reusable SVG annotation library.

Target roughly:
- 6–8 arrows
- 3 circles
- 4 underlines
- 4 correction/scribble marks
- 2 checks
- 2 X marks
- 2 brackets

Total target:
**~20–25 reusable handwritten marks**

Recommended visible annotation density per desktop viewport:
**3–5 major handwritten annotations**

---

# 13. Texture Rules

Paper grain target visible intensity:
**2–5%**

Ink roughness normal:
**5–12%**

Registration offset idle:
**1–3px**

Do not permanently make the site look broken.

---

# 14. Global Visual Layers

Every major project section conceptually contains three layers.

## A. DOCUMENT
Belongs to JOHN:
- paper
- proof grid
- serif typography
- mono metadata
- crop marks
- proof-red marks
- revision system

## B. ARTIFACT
Belongs to the project:
- real Melo UI
- actual Takomi terminal
- real University Ad film
- real Observatory outputs
- real interactive CFOP cube

Do not recolor or redesign a project's authentic interface merely to force brand consistency.

## C. ANNOTATION
John interpreting the artifact:
- arrows
- underlines
- process notes
- questions
- diagrams
- corrections
- relationship indicators

Core rule:

> Portfolio layer annotates. Product layer remains authentic.

---

# 15. Proof / Revision Vocabulary

- Hero: `PROOF 01`
- Melo: `SYSTEM 01`
- University Ad: `CUT 02`
- Takomi: `BUILD 03`
- Model Observatory: `TEST 04`
- CFOP: `STEP 05`
- Lab: `UNFILED`
- About: `SUBJECT / JOHN`

Possible revision marks:
- `rev A`
- `rev B`
- `keep`
- `move ↑`
- `approved?`
- `final-ish`

Suggested balance:
- 70% serious annotation
- 30% personality

---

# 16. Selected Work

Selected Work should feel like the **contents page of the proof document**.

Projects:

```text
01    MELO
      BUILDER / SYSTEMS

02    THE ₦0 UNIVERSITY AD
      DIRECTOR / FILM

03    TAKOMI
      ENGINEER / AI

04    MODEL OBSERVATORY
      EXPERIMENTER

05    CFOP ROADMAP
      TEACHER / INTERACTION
```

Hover / focus / tap should cause small project artifacts to temporarily leak into the composition.

No card grid.

---

# 17. Project 01 — Melo / Builder Mode

Narrative:
**Complexity → organization**

Visual vocabulary:
- stronger grids
- alignment
- relationship diagrams
- real UI screenshots
- structural annotations
- system groupings
- process flows

Core statement:
**One school. Many surfaces. One system.**

Interaction interpretation:
Pointer disturbance temporarily breaks alignment. When released, elements reconstruct into their system.

Production uses real Melo artifacts.

---

# 18. Project 02 — University Ad / Director Mode

Narrative:
**Constraint → decision → result**

Visual vocabulary:
- 16:9 frames
- timecode
- contact sheets
- edit notes
- taped film stills
- sound waveforms
- grading notes
- raw/graded comparisons

Proof label:
`CUT 02`

Interaction interpretation:
Pointer behaves like a local scrub head.

Sound is opt-in only.

---

# 19. Project 03 — Takomi / Engineer Mode

Narrative:
**AI chaos → protocol**

Takomi's real interface identity remains intact.

Real terminal references show:
- near-black terminal background
- cyan primary system emphasis
- purple section/header emphasis
- green success states
- yellow warning/update states
- muted slate-blue secondary/context information
- cyan horizontal rules
- right-side Context rail
- Files Changed
- Tool Activity
- bottom runtime/status strip
- model/runtime information
- visible todo/task state
- chunky cyan/purple TAKOMI pixel/ASCII-style wordmark

Outside the real terminal:
- warm proof paper
- serif TAKOMI heading
- technical diagrams
- proof-red handwritten notes
- dependency annotations
- system relationships

Proof label:
`BUILD 03`

---

# 20. Project 04 — Model Observatory / Experimenter Mode

Narrative:
**Same problem → different interpretation**

Visual vocabulary:
- scientific catalogue
- large whitespace
- SOL / TERRA / LUNA
- experiment IDs
- controlled comparison grids
- output panes
- metadata
- restrained annotation

Interaction interpretation:
Pointer becomes a comparison lens.

Core question:
**BEST FOR WHAT?**

Proof label:
`TEST 04`

---

# 21. Project 05 — CFOP / Teacher Mode

Narrative:
**Information → muscle memory**

Visual vocabulary:
- extreme whitespace
- real interactive cube
- algorithm notation
- instructional arrows
- timing
- step numbers
- progression

Core notation:
`R U R' U'`

Proof label:
`STEP 05`

Core statement:
**Learning is complexity in the right order.**

---

# 22. The Lab

The Lab should feel like a working desk.

No equal cards.

Possible status vocabulary:
- SHIPPED
- TESTING
- ABANDONED
- USEFUL
- QUESTIONABLE
- WHY DID I BUILD THIS
- I FORGOT THIS EXISTED

Proof label:
`UNFILED`

---

# 23. About

About is a major visual decompression.

Remove roughly **70% of the technical decoration**.

Use:
- one strong real portrait
- paper
- minimal proof language
- a few small annotations

Proof label:
`SUBJECT / JOHN`

---

# 24. Contact

Primary statement:
**MAKE SOMETHING WITH ME.**

Primary action:
`EMAIL ME ↗`

Secondary:
- GitHub
- YouTube
- X
- LinkedIn

No complicated contact form unless later justified.

---

# 25. Final Loop

Possible metadata:

```text
SESSION COMPLETE

PROJECTS / 05
MODES / 07
STATUS / ACTIVE

CURRENT MODE / EVERYTHING
```

JOHN returns.

Final pointer disturbance may briefly reveal recognizable fragments from the site, then reconstruct.

---

# 26. Responsive Philosophy

Mobile is **not desktop squeezed smaller**.

Preserve:
- paper
- ink
- proof red
- JOHN identity
- mode reveal
- reconstruction
- project narrative order

Reduce decorative density by roughly:
**40–50%**

Possible mobile JOHN layout:

```text
JO
HN
```

---

# 27. Reduced Motion

Reduced-motion hero:
1. JOHN intact
2. proof-red layer offsets
3. modes reveal through clipping/fades
4. layers realign
5. Selected Work enters

No continuous shader deformation required.

---

# 28. Accessibility

Required:
- semantic headings
- real text remains in DOM
- keyboard access
- no essential hover-only interaction
- no information encoded only through color
- meaningful alt text
- decorative proof SVGs use `aria-hidden`
- sound opt-in
- reduced-motion equivalent
- readable contrast
- project content remains accessible without WebGL

---

# 29. Performance Rules

Hero enhanced rendering:
- run only while hero is active
- stop/pause when offscreen
- clamp DPR to max 2
- avoid per-frame allocations
- rebuild typography textures correctly on resize
- wait for `document.fonts.ready` before text measurement/rasterization
- lower shader quality for weaker devices
- prioritize smooth page scrolling over visual fidelity

---

# 30. Technology Stack — v1

```text
Next.js
TypeScript
custom CSS / CSS Modules
GSAP
ScrollTrigger
Three.js only for JOHN distortion where needed
SVG for proof graphics
```

Do not add by default:
- React Three Fiber
- Framer Motion
- Lenis
- shadcn everywhere
- generic component libraries
- full-page WebGL
- giant animation dependency stacks

---

# 31. Suggested Component Structure

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── proof/
│   ├── hero/
│   ├── work/
│   ├── projects/
│   ├── lab/
│   ├── about/
│   └── contact/
├── motion/
├── shaders/
├── data/
└── styles/
```

Keep architecture proportional to the project.

---

# 32. Build Milestones

## MILESTONE 01 — THE PROOF

Goal:

> Open localhost and it already feels like JOHN before anything moves.

Contains:
- global proof system
- paper
- typography
- nav
- static hero
- Selected Work
- Melo opening
- desktop composition
- basic mobile composition

No advanced animation.

## MILESTONE 02 — THE DISTURBANCE

Hero only:
1. pinned scroll timeline
2. registration separation
3. hidden mode reveal
4. directional ink drag
5. pointer local field
6. reconstruction
7. mobile equivalent
8. reduced motion
9. performance profiling

## MILESTONE 03 — THE MODES

Build:
- Melo
- Director
- Takomi
- Observatory
- CFOP
- transitions between them

## MILESTONE 04 — THE HUMAN

Build:
- Lab
- About
- timeline of obsessions
- Contact
- final JOHN loop

---

# 33. Build Order Rule

Never use animation to rescue weak static design.

Order:
1. semantic content
2. static visual composition
3. signature scroll progression
4. shader enhancement
5. pointer behaviour
6. project transitions
7. secondary motion
8. polish

If the static screenshot is not beautiful, stop and fix the design.

---

# 34. Deliberate Exclusions

Do not add simply because it seems impressive:
- AI orb
- particle backgrounds
- RGB glitch
- autoplay audio
- long loading intro
- excessive scroll hijacking
- terminal styling everywhere
- generic tech-stack section
- skills progress bars
- fake client metrics
- invented testimonials
- invented awards
- project-card grids
- meaningless 3D decoration
- constant cursor gimmicks
- animation on every annotation

---

# 35. Factual Integrity

Separate:
- verified / supplied facts
- design assumptions
- unknowns

Never invent claims because the composition feels empty.

Production must use real project screenshots and real project evidence wherever possible.

---

# 36. Success Criteria

## Ten-second test

A visitor should quickly understand that John makes work across software, film, AI, design, and related creative disciplines.

Work, About, and Contact must remain reachable without completing expressive sequences.

## Recall test

Ideal takeaway:

> John's portfolio behaves like an interface for the different ways his brain works.

Failure:

> Cool glitch website.

The concept must be remembered before the technology.

---

# 37. Current Locked Status

- Governing concept: **LOCKED**
- Visual direction: **LOCKED**
- Hero narrative: **LOCKED**
- Hero scroll/pointer relationship: **LOCKED**
- Signature interaction: **LOCKED**
- Selected Work structure: **LOCKED**
- Melo visual language: **PROVEN**
- Director visual language: **PROVEN**
- Takomi visual language: **PROVEN**
- Typography v1: **LOCKED FOR IMPLEMENTATION TEST**
- Palette v1: **LOCKED FOR IMPLEMENTATION TEST**
- Stack v1: **LOCKED**
- Full implementation: **NOT STARTED**

---

# 38. Immediate Next Action

Create **Milestone 01 — THE PROOF**.

Do not begin with the shader.

The first implementation should be a static, high-fidelity foundation containing:

1. Hero
2. Selected Work
3. Melo opening
4. global paper/proof system
5. responsive base composition

Only when screenshots of this static milestone already match the desired identity should Milestone 02 begin.


---

# 39. Completeness Addendum — Canonical Copy

The following copy is part of the current creative direction. Minor wording may be revised later, but coding agents should not invent replacement marketing copy without approval.

## Hero / Arrival

Top identity:
`JOHN OLULEKE-OKE / 2026`

Navigation:
`WORK   LAB   ABOUT   CONTACT`

Primary:
`JOHN`

Supporting:
**I make things across software, film, AI, design and sound.**

Metadata:
`CURRENT MODE / EVERYTHING`

Prompt:
`SCROLL TO ENTER ↓`

## Identity Reveal

Primary:
**SAME PERSON.  
DIFFERENT MODES.**

Supporting:
**The medium changes depending on the problem.  
The way I think usually doesn't.**

Mode system:
- BUILDER
- DIRECTOR
- ENGINEER
- DESIGNER
- MUSICIAN
- EXPERIMENTER
- TEACHER

Canonical current mode count:
`MODES DETECTED / 07`

## Selected Work

Primary:
**FIVE THINGS  
THAT EXPLAIN ME  
BETTER THAN A BIO.**

## Melo

Opening direction:
**A school operating system built around the people actually using it.**

Primary:
**ONE SCHOOL.  
MANY SURFACES.  
ONE SYSTEM.**

Curriculum Intelligence moment:
**AI CAN PROPOSE.  
PEOPLE APPROVE.**

Closing:
**BUILDING IS  
MOSTLY ORGANIZING  
COMPLEXITY.**

## University Ad

Constraint beat:
**GOOD.  
NOW MAKE THE FILM.**

Sound beat:
**YOU CAN FEEL  
A SOUND  
BEFORE YOU NOTICE IT.**

Closing:
**CONSTRAINTS DON'T  
REMOVE OPTIONS.  
THEY CHANGE THEM.**

## Takomi

Primary:
**AI SHOULDN'T FEEL  
LIKE A CHAT WINDOW.**

Then:
**IT SHOULD FEEL  
LIKE A TEAM.**

Closing:
**GOOD SYSTEMS  
MAKE COMPLEXITY  
FEEL BORING.**

## Model Observatory

Question:
**WHICH MODEL  
IS BEST?**

Transformation:
**BEST  
FOR WHAT?**

Closing direction:
**TO UNDERSTAND  
A TOOL,  
GIVE IT  
THE SAME PROBLEM.**

## CFOP

Opening:
**SUB-20.**

Supporting:
**A six-week path from beginner solving to speedcubing.**

Closing:
**LEARNING IS  
JUST COMPLEXITY  
IN THE RIGHT ORDER.**

## The Lab

Primary:
**EVERYTHING DOESN'T  
NEED TO BECOME  
A COMPANY.**

Closing:
**CURIOSITY  
HAS TERRIBLE  
SCOPE CONTROL.**

## About

Primary direction:
**I like making things I don't fully know how to make yet.**

Supporting direction:
**My work moves between software, film, AI, design and music. Usually the interesting part is figuring out where those things can overlap.**

Anti-bio statements:
- I studied computer science.
- I learned filmmaking by making films.
- I started building software because I kept wanting tools that didn't exist.
- Most experiments begin with: “wait… can I do this?”

## Timeline

Primary:
**HOW DID  
THIS HAPPEN?**

Metadata:
`SELECTED OBSESSIONS / NOT A RÉSUMÉ`

Ending:
**STILL  
FIGURING IT OUT.**

Final open node:
`NEXT / ?`

## Contact

Primary:
**MAKE  
SOMETHING  
WITH ME.**

Supporting:
**A film.  
A product.  
An experiment.  
Something we haven't named yet.**

Primary action:
`EMAIL ME ↗`

## Final Loop

Metadata:
```text
SESSION COMPLETE

PROJECTS / 05
MODES / 07
STATUS / ACTIVE

CURRENT MODE / EVERYTHING
```

Closing:
`JOHN`

Supporting:
**Same person.  
Different modes.**

---

# 40. Canonical Full-Page Scene Order

The homepage order is locked as:

```text
00  ARRIVAL
01  IDENTITY DISRUPTION
02  SELECTED WORK
03  MELO / BUILDER
04  ₦0 UNIVERSITY AD / DIRECTOR
05  TAKOMI / ENGINEER
06  MODEL OBSERVATORY / EXPERIMENTER
07  CFOP ROADMAP / TEACHER
08  THE LAB
09  ABOUT JOHN
10  TIMELINE OF OBSESSIONS
11  CONTACT
12  LOOP
```

Emotional rhythm:

```text
QUIET
↓
STRANGE
↓
CLEAR
↓
STRUCTURED
↓
CINEMATIC
↓
TECHNICAL
↓
CURIOUS
↓
PLAYFUL
↓
MESSY
↓
HUMAN
↓
QUIET
```

The two quiet bookends are intentional.

---

# 41. Locked Transition Choreography

Transitions should grow out of the outgoing section rather than behave like unrelated scene cuts.

## Hero → Selected Work

Disturbed JOHN reconstructs.

It does **not** return to the original hero composition.

Instead:
- JOHN reduces/repositions
- proof layers settle
- a horizontal rule extends
- `SELECTED WORK` appears
- `01—05` resolves

## Selected Work → Melo

The typographic contents page becomes more rigid.

- non-active projects lose weight
- Melo remains emphasized
- guide lines become stronger
- margins/grid tighten
- the document organizes itself into Builder Mode

## Melo → University Ad

Melo ends at maximum order.

Then:
- one horizontal line refuses to stay aligned
- additional grid lines loosen
- the grid's rectangular structure becomes a 16:9 frame
- interface screenshots begin reading like frames/contact sheets
- timecode appears: `00:00:00:00`
- `PROJECT 02 / DIRECTOR`

## University Ad → Takomi

The film timecode remains after the final frame.

Its syntax mutates:

```text
00:01:18:04
→
01 / 18 / 04
→
01.18.04
→
> 01_18_04
```

A cursor appears:

`_`

Then:
`> initialize next mode`

The film frame becomes system space.

## Takomi → Model Observatory

Takomi's ordered system resolves down to simple identity/state.

The system splits into:
- SOL
- TERRA
- LUNA

Technical density retreats.
Whitespace expands.
The engineering document becomes an exhibition/catalogue.

## Model Observatory → CFOP

Three comparison frames reduce toward square geometry.

- three squares become six
- six become nine
- geometry resembles one cube face
- perspective shifts
- the flat grid becomes a 3D cube

Then:
`PROJECT 05 / 05`

## CFOP → Lab

The solved cube unfolds.

Its faces flatten into a loose field of rectangles/squares.

Those shapes become artifact tiles.

Strict alignment disappears.

Metadata:
`SELECTED WORK / COMPLETE`
`UNCLASSIFIED MATERIAL DETECTED`

Then:
`THE LAB`

## Lab → About

Artifacts disappear one by one.

One photograph remains.

Its metadata changes:

`ARTIFACT`
→
`SUBJECT`
→
`JOHN`

The photograph grows into the About composition.

## Contact → Loop

Contact clears.

A rule returns.

System metadata resolves:

`SESSION COMPLETE`

Then:
`CURRENT MODE / EVERYTHING`

JOHN returns, now carrying context earned from the full site.

---

# 42. Grid and Composition Rules

## Desktop Base Grid

Initial target:

- 12 columns
- outer margin: ~3–4vw
- gutter: ~20–28px
- baseline spacing unit: 8px

These are implementation starting values, not sacred numbers. Tune visually while preserving the underlying discipline.

Core rule:

> You may break alignment only when the visitor can perceive what alignment was broken.

Random positioning is not “raw.”

## Giant Type

JOHN should behave as architecture, not merely a heading.

Initial target:
~24–32vw display scale, font-dependent.

Clipping near viewport boundaries is allowed when intentional.

## Whitespace

Do not fill empty corners merely because proof marks are available.

Whitespace is part of the system.

---

# 43. Three Levels of Imperfection

## Level 1 — Permanent

Always present, restrained:
- paper grain
- subtle ink texture
- crop marks
- faint guides
- tiny proof metadata
- mild registration offset

## Level 2 — Responsive

Interaction-driven:
- ink dragging
- registration separation
- duplicate impressions
- local pointer disturbance
- hidden mode reveal
- temporarily stronger guides

## Level 3 — Narrative

Project-specific:
- Melo: system/alignment annotations
- Director: edit/timecode/grade/sound notes
- Takomi: protocol/dependency/context notes
- Observatory: comparison/specimen marks
- CFOP: instructional notation/timing marks

Do not use project-specific marks randomly outside their semantic role.

---

# 44. Image and Artifact Treatment

Project media should feel like **evidence placed on the document**.

Rules:

- avoid SaaS-style rounded cards
- default to square/rectangular edges
- allow crop lines, labels, reference numbers
- allow overlapping type when deliberate
- allow artifacts to run off-grid
- use annotations to point to real details
- raw/final comparisons are encouraged where meaningful
- authentic project UI keeps its own colors
- project screenshots are not recolored to match proof red

The document frames the artifact.
It does not repaint the artifact.

---

# 45. Selected Work Artifact-Leak Behaviour

The Selected Work list is typographic, not card-based.

Hover/focus/tap may temporarily leak a small project artifact into the composition:

- Melo → interface fragment
- University Ad → film frame/contact-sheet fragment
- Takomi → real terminal fragment
- Model Observatory → three-output comparison fragment
- CFOP → cube notation / small cube state

The leak should feel like evidence escaping the index.

It should not become a giant preview carousel.

---

# 46. Melo — Additional Locked Narrative Detail

Initial problem-space labels may appear scattered:

- TEACHER
- ADMIN
- PARENT
- STUDENT
- BILLING
- CURRICULUM
- PUBLIC SITE
- AI

Scroll organizes them into relationships.

Curriculum Intelligence visual flow:

```text
SOURCE DOCUMENT
↓
PROPOSED CURRICULUM UNIT
↓
EVIDENCE
↓
ADMIN REVIEW
↓
APPROVED TOPIC
```

AI is shown as one layer in a larger deterministic product, not as the authority over school data.

---

# 47. Director — Additional Locked Interaction Detail

The section may visually abstract an editing timeline using tracks such as:

- PICTURE
- SOUND
- VFX
- GRADE

Possible evidence pairs:

- RAW → GRADED
- SHOT → STABILIZED
- SILENT → SOUND DESIGN
- NORMAL → CRASH ZOOM

Pointer interaction behaves like a local scrub head.

Sound:
- OFF by default
- opt-in only
- the site must remain fully understandable without sound

The final film moment should deliberately remove most interface decoration and allow the work to play cleanly.

---

# 48. Takomi — Authentic Interface Rule

The real Takomi terminal screenshots supplied during design are the **visual source of truth for the artifact**.

Important characteristics to preserve:

- near-black terminal background
- cyan dominant system rules
- purple headers/section emphasis
- green successful/completed states
- yellow warnings/update states
- muted slate/blue secondary information
- dense mono typography
- strong horizontal cyan rules
- right-side Context rail
- Files Changed
- Tool Activity
- runtime/status information at bottom
- visible task/todo states
- large cyan/purple TAKOMI pixel/ASCII-style wordmark

Do not replace this with a fake generic shell.

The portfolio proof-red annotation layer may sit **outside/over the frame** to explain real UI details.

---

# 49. Observatory — Additional Locked Interaction Detail

Initial composition should feel gallery-like and spacious.

Primary names:
- SOL
- TERRA
- LUNA

The visitor compares one shared experiment across the models.

Possible secondary views:
- VIEW OUTPUT
- VIEW CONVERSATION
- VIEW METADATA

Possible metadata:
- MODEL
- TOOLS
- TOKENS
- COST
- TIME

The portfolio must not fabricate or imply precision where real source data is unavailable.

---

# 50. CFOP — Additional Locked Interaction Detail

Primary object:
a real interactive cube where feasible.

Learning sequence may use:

```text
CROSS
↓
F2L
↓
2-LOOK OLL
↓
2-LOOK PLL
↓
SUB-20
```

Notation interaction:
`R U R' U'`

Dragging/scrubbing notation should update cube state.

Going backward should reverse moves.

Timer beat:
`20.00`
→
`19.87`

The section should be playful through interaction, not through decorative noise.

---

# 51. Asset Inventory Before Final Production

## Hero

Need:
- paper texture
- ink texture
- reusable handwritten SVG library
- optional tape/paper scraps
- final selected font files loaded through normal web/font package routes, never exposed as downloadable assets

## John

Need:
- final portrait
- confirmed public display name
- confirmed public email
- confirmed social links
- confirmed availability wording if any

## Melo

Priority:
- admin dashboard
- teacher interface
- score entry
- report card
- billing/invoice
- parent/student portal
- public school site
- Curriculum Intelligence flow
- supporting architecture/process artifact if available

## University Ad

Priority:
- final film
- 5–10 strong frames
- raw vs graded comparison
- editing timeline screenshot
- sound-design evidence/waveform if useful
- BTS material if available
- planning/process material if available

## Takomi

Priority:
- clean real terminal start screen
- active session screenshot
- Context rail
- Files Changed
- Tool Activity
- todo/task state
- TAKOMI wordmark
- workflow/orchestration diagram if available

## Model Observatory

Priority:
- one excellent shared experiment across Sol/Terra/Luna
- three output captures
- real metadata
- real conversation example
- one “killer comparison” is enough for homepage

## CFOP

Priority:
- real interactive cube implementation/data
- roadmap stages
- algorithm notation
- timer
- relevant algorithm-vault material if needed

## Lab

Curate approximately:
**10–20 items**

Do not dump every repository.

---

# 52. Performance Targets — Initial

These are targets, not guarantees.

Desktop enhanced experience:
- aim for ~60 FPS during active hero interaction

Mobile enhanced experience:
- aim for stable ~45–60 FPS where enhanced motion remains enabled

If needed, reduce:
- render resolution
- DPR
- shader sample count
- noise complexity
- pointer effect complexity

Scrolling and content usability always outrank shader fidelity.

---

# 53. Provisional Shader Design Notes

These are implementation hypotheses, **not locked technology contracts**.

Likely useful inputs:

```text
uProgress
uPointer
uPointerVelocity
uPointerStrength
uResolution
uTime
uInkTexture
uDistortionMap
```

Potential derived controls:
- registration amount
- reveal amount
- reconstruction amount

Prefer deriving multiple visual states from one master hero progress value rather than building many independent animation systems.

Likely visual components:

1. registration separation
2. directional drag
3. restrained low-frequency displacement

Three subtle effects are preferred over one exaggerated shader.

Pointer influence should be hard-capped so pointer interaction can never fully obliterate JOHN.

---

# 54. Resize and Font Handling

Before text measurement/rasterization:
- wait for `document.fonts.ready`

On resize:
1. pause enhanced rendering
2. re-measure JOHN
3. rebuild typography texture if required
4. update canvas/backing resolution
5. update pointer coordinate mapping
6. restore current hero progress
7. resume

Do not stretch a stale typography texture across a changed layout.

---

# 55. Visual Reference Pack

These files are **art-direction references**, not production UI/assets.

Preferred raw-proof hero reference:
- `/mnt/data/typographic_design_proof_john.png`

Three-state hero / disturbance / Selected Work reference:
- `/mnt/data/a_high_resolution_mockup_of_a_website_design_conce.png`

Melo propagation mockup:
- `/mnt/data/a_detailed_screenshot_style_design_mockup_webpag.png`

Director propagation mockup:
- `/mnt/data/a_high_resolution_website_design_mockup_ui_conce.png`

Takomi propagation mockup:
- `/mnt/data/a_high_detail_mockup_design_board_of_a_product_p.png`

Real Takomi terminal references:
- `/mnt/data/f3a09099-1a23-412a-afc0-5b068f9963e9.png`
- `/mnt/data/ffc98c27-affd-4e5c-b6b1-417543b2a3b3.png`
- `/mnt/data/0e755b70-643d-4ec1-86c0-436ac9aaa89b.png`

Important:
- generated mockups may contain invented interface details or copy
- treat them as composition/style references only
- production uses real project screenshots and verified facts

---

# 56. Completeness Rule for Coding Agents

Before implementing any section, the agent must classify each visible detail as one of:

1. **Document** — part of JOHN's global proof system
2. **Artifact** — authentic project material
3. **Annotation** — John's interpretation/process layer
4. **Unknown** — requires real content or confirmation

If a detail cannot be classified, do not invent it merely to fill the composition.

---

# 57. Final Scope Reminder

The current source of truth is intentionally comprehensive enough to start implementation.

It does **not** mean every sentence is immutable copy or every shader variable must survive production.

Locked:
- concept
- design laws
- interaction laws
- section order
- project roles
- major transitions
- authenticity rules
- static-before-motion build philosophy

Tune during implementation:
- exact font sizing
- exact spacing
- exact shader parameters
- exact scroll distances
- final wording polish
- responsive micro-layouts
- performance quality tiers

Any change that alters the governing concept or signature interaction requires explicit design review rather than silent implementation drift.
