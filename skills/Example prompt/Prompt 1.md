Oh, you want to **stress-test the AI**. 😂

Then don't ask it to make “a cool portfolio.” That's too easy.

Give it something that forces it to solve **art direction + interaction design + WebGL + shaders + 3D + motion + sound + performance + responsive behavior** all at once.

Here's the challenge I'd give it:

# THE CREATIVE DEVELOPER GAUNTLET

Build an award-level, experimental digital experience for a fictional creative-technology studio called **VOID/FORM**.

The website should feel less like a conventional website and more like an interactive digital art installation.

The objective is to create something that could plausibly compete for an Awwwards / FWA-style recognition.

---

## CORE CREATIVE DIRECTION

The entire website exists around one concept:

**“Everything is temporary.”**

Nothing on the site should feel completely static.

Typography should breathe.

Images should distort.

Objects should react.

The cursor should have physical presence.

Scroll should feel like navigating through a world rather than moving down a document.

The experience should progressively transition from an apparently minimal interface into an increasingly complex digital environment.

Do NOT make it look like a generic “futuristic AI website.”

Avoid:

- purple AI gradients
- glassmorphism
- glowing neon cards
- excessive rounded rectangles
- generic particle backgrounds
- stock imagery
- generic SaaS layouts
- meaningless 3D objects
- excessive UI chrome

The design should feel editorial, cinematic, experimental, intelligent and slightly strange.

---

# 1. LOADING EXPERIENCE

Create an opening sequence before the website becomes interactive.

The screen begins almost completely empty.

A small piece of typography appears:

**VOID/FORM**

The letters should subtly move independently.

A numerical progress indicator appears:

**00 — 100**

But instead of a conventional progress bar, the numbers should respond to actual loading/initialization progress.

During loading:

- tiny particles appear;
- typography subtly distorts;
- the cursor leaves a faint trail;
- fragments of the site's imagery briefly flash;
- the background slowly changes.

When initialization completes, the interface should transition into the homepage rather than simply disappearing.

The transition should feel intentional and cinematic.

---

# 2. CUSTOM CURSOR

Create a custom cursor system.

The cursor should not simply be a replacement circle.

It should have states.

Default:

A small minimal cursor.

Hovering interactive elements:

The cursor expands and displays contextual text such as:

**OPEN**

**VIEW**

**DRAG**

**ENTER**

When moving quickly:

The cursor should stretch according to velocity.

When moving slowly:

It should become more compact.

When interacting with certain objects:

It should distort or attract nearby typography.

The cursor should feel like an object with mass.

---

# 3. HERO

The hero should initially appear extremely minimal.

Large typography:

**WE BUILD THINGS  
THAT SHOULDN'T  
EXIST YET.**

The typography should occupy most of the viewport.

The letters should subtly respond to the cursor.

Moving the cursor across the text should create a localized distortion field.

Characters near the cursor should:

- move;
- stretch;
- rotate slightly;
- distort;
- separate from neighbouring characters.

When the cursor leaves the text, everything should smoothly reconstruct.

Do NOT simply use CSS transforms on the entire heading.

The effect should feel granular.

---

# 4. PARTICLE TYPOGRAPHY

At some point during the hero interaction, the typography should be capable of transforming into particles.

The text should effectively become:

**letters → points → particles → letters**

The particle system should preserve the original shape of the typography.

When the cursor approaches:

The affected particles should be pushed away.

When the cursor leaves:

The particles should return to their original positions.

The restoration should have spring-like behaviour rather than snapping back.

Use GPU acceleration where appropriate.

---

# 5. SCROLL TRANSFORMATION

As the user begins scrolling, the website should stop behaving like a conventional page.

The hero typography should gradually:

- scale;
- move;
- distort;
- rotate;
- fragment.

At the same time, the camera/environment should begin moving.

Scrolling should control the progression of the experience.

The user should feel like they are travelling through the website.

Use smooth scrolling.

Animation progress should be tied to scroll position.

Avoid triggering isolated animations every time the user crosses arbitrary scroll thresholds.

The experience should feel continuous.

---

# 6. THE VOID

After the hero, transition into a section called:

**THE VOID**

The screen should become almost entirely black.

A small 3D object should appear in the center.

At first it looks like a simple geometric object.

As the user moves their cursor around it, the object reveals itself to be considerably more complex.

The object should:

- rotate subtly;
- respond to cursor position;
- react to scroll;
- distort under interaction;
- cast subtle lighting.

The lighting should respond to interaction rather than looking like a static Three.js demo.

---

# 7. IMAGE DISTORTION

Introduce a full-screen visual sequence.

A large photographic image appears.

When the cursor moves over the image, the image should distort around the cursor.

The distortion should feel fluid and organic.

The cursor should act as a localized force.

The distortion should decay smoothly after the cursor moves away.

At high cursor velocity, distortion should become stronger.

At low velocity, it should become subtle.

Use shader-based distortion rather than simply applying a CSS transform to the image.

---

# 8. PROJECTS

Create a project archive.

Do NOT use a conventional card grid.

Projects should exist as enormous editorial compositions.

Example projects:

**01 / AFTERIMAGE**

**02 / SOFT MACHINE**

**03 / ZERO GRAVITY**

**04 / DIGITAL SKIN**

**05 / UNFINISHED**

Each project should have:

- title;
- year;
- discipline;
- short description;
- visual;
- interactive state.

Hovering a project should completely transform its presentation.

For example:

The typography may stretch across the viewport.

The image may expand.

The cursor may change.

The background may change.

The project preview may become a full-screen experience.

---

# 9. PROJECT TRANSITION

Clicking a project should NOT immediately navigate to a new page.

Instead:

The selected project should expand from its current position.

The rest of the website should collapse or disappear.

The project should become full-screen.

The transition should preserve spatial continuity.

It should feel as if the user has entered the object they clicked.

Provide a clear mechanism to return.

---

# 10. ABOUT SECTION

The about section should contain very little conventional UI.

Large statement:

**WE ARE INTERESTED  
IN THE SPACE BETWEEN  
DESIGN AND TECHNOLOGY.**

As the user scrolls:

Individual words should move at different rates.

Some words should remain fixed.

Some should drift.

Some should distort.

The resulting composition should feel like an editorial poster coming alive.

---

# 11. INTERACTIVE MANIFESTO

Create a manifesto consisting of short statements.

For example:

**MAKE IT STRANGE.**

**MAKE IT USEFUL.**

**MAKE IT MOVE.**

**MAKE IT MATTER.**

Each statement should have a unique interaction.

One could dissolve into particles.

One could stretch.

One could invert the page.

One could respond to cursor velocity.

One could trigger a brief environmental transition.

Do not repeat the same animation for every statement.

---

# 12. SOUND

Add optional sound design.

Sound should be OFF by default.

Provide a minimal sound toggle.

When enabled:

- cursor interactions can produce subtle sounds;
- transitions can have low-volume impacts;
- particle interactions can produce texture;
- project transitions can have distinct sonic signatures.

Do not use annoying UI clicks everywhere.

Sound should feel like part of the environment.

---

# 13. FINAL SECTION

Eventually the website should become extremely quiet again.

Everything disappears.

Only:

**LET'S MAKE SOMETHING.**

appears.

Hovering the sentence should cause the letters to slowly separate.

Then:

**HELLO@VOIDFORM.STUDIO**

appears.

The cursor should become:

**SEND**

Clicking it should open the contact mechanism.

---

# 14. RESPONSIVE EXPERIENCE

Do NOT simply shrink the desktop version.

Mobile must be treated as its own composition.

On mobile:

- cursor interactions become touch interactions;
- hover effects become touch/press states;
- heavy WebGL effects should be reduced when necessary;
- typography should remain dramatic;
- scrolling should remain the primary interaction;
- layout should be intentionally redesigned.

The experience should remain visually impressive on mobile.

---

# 15. PERFORMANCE

This is critical.

The website must not sacrifice usability simply to demonstrate technical effects.

Implement:

- lazy loading;
- asset optimization;
- responsive rendering;
- device capability detection;
- reduced-quality effects on weaker hardware;
- efficient animation loops;
- cleanup of WebGL resources;
- reasonable GPU usage;
- reduced-motion support.

If a visual effect is too expensive to run continuously, find a smarter approach.

Pre-baked assets are acceptable.

Hybrid real-time/pre-rendered techniques are encouraged.

---

# 16. ACCESSIBILITY

Despite the experimental visual design:

- semantic HTML must be used;
- keyboard navigation must work;
- interactive elements must remain accessible;
- focus states must exist;
- reduced-motion preferences must be respected;
- important information must not exist only inside WebGL;
- the website must remain usable without a mouse.

Accessibility should not be an afterthought.

---

# 17. TECHNOLOGY

Use whatever technologies are genuinely appropriate.

Preferred stack:

- Next.js
- React
- TypeScript
- GSAP
- ScrollTrigger
- Lenis
- Three.js
- WebGL
- GLSL
- React Three Fiber where appropriate
- Rive where appropriate
- Canvas where appropriate

Do not add libraries simply because they are available.

If a custom shader is the correct solution, write one.

If CSS is sufficient, use CSS.

If Canvas is more appropriate than Three.js, use Canvas.

The architecture should be deliberate.

---

# 18. TECHNICAL INTERACTION MODEL

The experience should follow the principle:

**USER INPUT → STATE → VISUAL COMPUTATION → RENDERED EXPERIENCE**

For cursor interactions:

**cursor position + velocity  
→ interaction force  
→ DOM / particle / shader state  
→ visual output**

For scrolling:

**scroll input  
→ smooth scrolling  
→ normalized progress  
→ animation timeline  
→ camera / DOM / shader state  
→ visual output**

Avoid creating dozens of unrelated animation systems.

Prefer a small number of coordinated systems.

---

# 19. VISUAL LANGUAGE

The visual identity should be:

- monochromatic or extremely restrained;
- typography-led;
- cinematic;
- editorial;
- experimental;
- spacious;
- tactile;
- slightly unsettling;
- highly intentional.

Use contrast and scale rather than decorative UI.

The site should look expensive because of its art direction, not because it contains expensive-looking effects.

---

# 20. THE MOST IMPORTANT REQUIREMENT

The result must NOT feel like:

“AI generated a website with cool animations.”

It should feel like:

**a real creative technology studio designed an interactive digital experience.**

Every interaction needs a reason to exist.

Every animation should reinforce the concept.

Every transition should feel connected to the previous state.

Do not use generic animation presets repeatedly.

Do not make every section look like a different website.

The entire experience should feel like one coherent system.

---

# SUCCESS CRITERIA

The finished website succeeds if:

1. The first 10 seconds create curiosity.
2. The cursor feels physically present.
3. Typography behaves like an interactive material.
4. At least one major interaction uses a genuine particle or shader system.
5. Scroll feels continuous rather than like a series of triggered animations.
6. The 3D environment feels integrated with the website rather than pasted onto it.
7. Project navigation feels spatial and cinematic.
8. The site has a recognizable visual identity.
9. Mobile is intentionally designed.
10. Performance remains reasonable.
11. Accessibility remains functional.
12. The entire website feels like one experience rather than a collection of effects.

The final result should make a technically experienced developer look at the source and think:

**“Okay… whoever built this actually knows what they're doing.”**

### And here's the evil part. 😈

Don't give the AI the technology list **first**.

Give it the creative brief and tell it:

> **“Choose the technologies and architecture yourself. Explain your technical decisions after building it.”**

That tests whether the AI can actually **architect creative technology**, rather than blindly reaching for Three.js because you told it to.

And if you really want to make this a proper benchmark, give it **three rounds**:

**Round 1:** Build the experience.

**Round 2:** Tell it to audit its own work for generic AI-web-design patterns, performance problems, accessibility issues, and weak interactions.

**Round 3:** Tell it:

> **“Now make this 3× more ambitious without adding visual clutter.”**

That third prompt is where I'd expect the AI to either **cook unbelievably hard or completely shit the bed.** 😂