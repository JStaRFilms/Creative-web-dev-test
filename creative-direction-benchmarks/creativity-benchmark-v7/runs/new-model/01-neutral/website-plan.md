# Neighborhood Laundromat Website Plan

## Request Contract

**Deliverable:** A creative and practical website plan for review. This stops at experience architecture; it does not prescribe a framework, dependencies, integrations, or a build sequence.

**Known:** The business is a small neighborhood laundromat.

**Provisional creative assumption:** The strongest role for the website is to remove uncertainty before a local customer leaves home. This shapes the concept, but does not assume any particular service, amenity, or operating model.

**Unknown and required before customer-facing copy is written:** business name, address, phone/contact method, opening hours, holiday hours, self-service or attendant model, services offered, machine sizes and quantities, prices, payment methods, typical cycle times, accessibility details, parking/transit information, detergent or vending availability, policies, accepted items, photography, and whether any machine-status or live-data source exists.

The visitor's primary jobs are to determine whether the laundromat fits their needs, know when and how to visit, understand what to bring, and get directions or make contact. Confirmed hours, location, contact, payment, services, and accessibility information must remain quicker to reach than any expressive interaction.

## Reference Manifest and Receipt

| Capability | Governing reference | Applied constraint |
|---|---|---|
| Sparse-brief concept generation and experience architecture | `.agents/skills/creative-web-development/references/creative-direction.md` | Ambiguity permits creative decisions, not invented business claims; all operational details below remain confirmation fields. |
| Candidate selection and plan audit | `.agents/skills/creative-web-development/references/concept-evaluation.md` | The chosen interaction must improve visitor readiness and pass the ten-second utility test, not merely decorate a laundry metaphor. |

## Domain Foundation

- **Functional truth:** Laundry turns a mixed, soiled load into clean, dry, sorted items through a repetitive cycle.
- **Visitor reality:** A person often arrives carrying physical weight and several practical uncertainties: Is it open? Will my load fit? How do I pay? How long might it take? What should I bring?
- **Human ritual:** Laundry is ordinary maintenance that restores readiness for the coming days. The emotional reward is less about washing than having one recurring obligation resolved.
- **Material behavior:** Sorting, tumbling, folding, stacking, care labels, perforated tickets, woven fibers, enamel surfaces, and repeating circular motion belong naturally to this setting.
- **Cultural tension:** Laundromats are essential neighborhood infrastructure, yet their websites often make a simple errand feel uncertain or impersonal.
- **Native language:** load, cycle, wash, dry, fold, care, delicate, heavy, ready.

The obvious direction—an oversized spinning washer in a bright blue, bubbly page—is quarantined. It is literal, easy to imitate, and makes the machine more important than the visitor's errand.

## Directions Considered

### 1. One Less Thing — selected

The website is a calm pre-visit checklist that turns scattered questions into a clear state of readiness. It draws on the weekly reset ritual and the act of sorting, not on spectacle. A visitor can immediately access essential facts or gather the confirmed answers relevant to their trip into a compact “visit strip.” The structure is a utility-led hybrid: direct business information surrounds one expressive preparation interaction.

### 2. The Shared Folding Table

The page acts like a neighborhood folding table: broad, horizontal fields bring local notices, practical information, and human photography together. This place-led editorial direction could feel warm and communal, but it depends heavily on authentic photography and real neighborhood material. Without those assets it risks manufacturing community character or becoming a generic local-business collage.

### 3. The Cycle

The experience follows a repeating rhythm—arrive, wash, wait, dry, leave—using circular progression and measured pacing. It has strong material coherence, but it over-centers process and could slow people who only want hours or directions. It also risks returning to the category's first association: an animated washer dial.

### 4. Care Instructions for the Week

The visual language of garment care labels becomes a concise editorial guide to preparing, washing, waiting, and leaving ready. It is distinctive and subject-specific, but care-label symbolism can be cryptic and may suggest advice or policies the business has not actually supplied.

## Selection Record

All four directions pass factual-integrity and concept-before-technology gates in principle. “One Less Thing” most clearly passes the utility floor and accessible-equivalent gate because its expressive act is itself a shortcut to practical information.

| Dimension | One Less Thing | Shared Folding Table | The Cycle | Care Instructions |
|---|---:|---:|---:|---:|
| Domain truth | 5 | 4 | 4 | 4 |
| Originality | 4 | 3 | 2 | 4 |
| Ownability | 4 | 3 | 3 | 4 |
| Coherence | 5 | 4 | 4 | 4 |
| Interaction necessity | 5 | 3 | 2 | 3 |
| Visitor intelligence | 5 | 4 | 3 | 3 |
| Art-direction specificity | 4 | 4 | 3 | 4 |
| Restraint | 5 | 4 | 3 | 4 |
| Feasible ambition | 4 | 3 | 4 | 4 |
| Recall | 4 | 3 | 3 | 4 |
| **Total** | **45** | **35** | **31** | **38** |

The 5s come from observable decisions: the selected concept reframes laundry as relief from recurring mental and physical load; one sorting action creates a useful visit summary; key facts are accessible outside that action; and the plan deliberately concentrates on a single behavioral device. “Care Instructions” is the strongest rejected alternative, but its visual system communicates less readily without explanation.

**Primary creative risk:** A checklist can feel clinical or resemble a generic productivity product. Authentic, close observational photography and tactile laundry-specific details must provide warmth and place. The risk should be tested with a simple visual prototype once real brand and location assets are available.

## Selected Concept Contract

### Governing concept

**One Less Thing: the site sorts every confirmed detail a neighbor needs and lets the errand settle into a clear, ready state.**

### Experience promise

Within seconds, a visitor should understand what this laundromat offers once the business details are confirmed, find the information needed to leave home confidently, and feel that the errand is manageable rather than burdensome.

### Structure and persistent utility

Use a utility-led hybrid rather than a conventional promotional homepage. A compact persistent utility rail keeps **Hours**, **Directions**, and **Contact** visible; every value is a content requirement until supplied and confirmed.

The expressive core is followed by a plain, scan-friendly information field. No essential answer is locked inside the signature interaction.

### Content sequence

1. **Immediate orientation:** Confirmed business name and neighborhood/location, a short plain-language statement based only on confirmed services, and direct access to Hours, Directions, and Contact.
2. **Pocket Check:** A visitor chooses the questions relevant to this trip—such as Hours, Payment, Load Fit, Services, Accessibility, and Getting There. These are labels for required content, not claims that any particular option exists.
3. **Visit strip:** Confirmed answers collect into one compact on-screen summary. Unknown items never appear as invented values; they remain absent or clearly marked for content completion during planning.
4. **Full practical details:** The same information appears in ordinary headings and text for fast scanning, search access, and visitors who skip the interaction.
5. **What to expect:** A short factual walkthrough can be added only after the actual customer journey and policies are confirmed.
6. **Final utility:** Repeated directions and contact action, plus confirmed holiday-hours or last-load guidance only if the business supplies it.

### Composition

The page begins slightly “unsorted”: a controlled field of narrow labels and broader information bands, aligned around a strong left edge. As a visitor makes choices, relevant bands gather into a neat vertical stack. The layout alternates between dense practical labels and generous breathing room, echoing the rhythm of sorting and folding without depicting a literal machine.

Persistent utility remains visually separate from the expressive field, like a dependable label stitched to the edge of the page. Important facts use full words and conventional headings rather than icons alone.

### Typography

Use a highly legible, friendly workhorse typeface for all practical information, paired with a compact label-like face for categories and status words. Hierarchy comes from weight, width, and alignment—not giant display text. Numerals for confirmed times, prices, and machine capacities should be especially clear once those facts exist.

The verbal tone is neighborly, composed, and direct. Avoid cleanliness superlatives, lifestyle promises, jokey laundry puns, and unsupported claims such as “fastest,” “best,” or “always available.”

### Material and color

Build the visual world from warm off-white textile, dark ink, faded care-label blue, and one high-visibility utility color selected after seeing the real storefront and brand. Thin stitched rules, perforation rhythms, and soft woven texture can appear sparingly. The palette should feel cared-for and familiar, not sterile, aquatic, or tech-forward.

### Imagery

Commission or capture real photographs of hands sorting and folding, the actual storefront approach, the real interior at human height, machine openings and controls where useful, and small signs of the neighborhood. Faces require consent. Images should retain natural wear and available light instead of presenting an implausibly pristine space.

If authentic photography is unavailable, favor typographic and material composition. Do not substitute generic stock families, fake staff portraits, or images of machines and amenities not present at the business.

### Motion law

**Everything moves from loose to aligned, then becomes still.** Labels may begin slightly offset, travel along short direct paths, and settle once into their assigned place. Nothing loops simply to keep the page lively. The feeling is completion, not agitation.

### Signature interaction: Pocket Check

**Trigger:** The visitor taps or focuses one or more practical questions before a visit.

**Behavior:** Each selection draws the corresponding confirmed answer from the surrounding information field into a concise visit strip. Removing a selection returns that item to its original position. A clear reset returns the page to its starting state.

**Meaning:** The visitor performs the same essential act as doing laundry—sorting a mixed set into what matters now—and leaves with fewer unresolved questions. Removing the interaction would weaken both the concept and the quick-preparation value.

**Recovery and equivalent access:** The source facts remain visible as regular page content. Keyboard users move through the questions in reading order and receive an explicit selected state. Touch targets are generous. With reduced motion, answers change position instantly with a subtle state change; the “loose to aligned” idea survives through layout rather than animation.

### Responsive expression

On small screens, the persistent utility becomes a compact top bar and the Pocket Check becomes a single-column list. The visit strip stays close to the selected question instead of requiring travel to another region of the screen. Photography crops around hands, objects, and real spatial cues rather than shrinking wide scenes. The mobile version preserves sorting and settling; it does not become a stripped-down unrelated page.

### Sound

Omit sound. A laundromat already has a strong implied soundscape, but playback would add friction and no practical meaning to this visit-planning experience.

### Deliberate restraint

Do not use a rotating washer hero, bubble effects, endless tumbling loops, custom cursor, cinematic scroll sequence, fabricated live machine availability, promotional counters, testimonials, neighborhood claims, or booking controls unless later evidence and requirements justify them. Keep ordinary navigation and the full practical details intentionally simple.

## Content and Asset Checklist

Before visual design or copy can be finalized, obtain and confirm:

- The exact business name, logo/wordmark if one exists, address, phone, and preferred contact action.
- Regular and holiday hours, including any last-load policy.
- The actual service model and complete service list.
- Current prices, payment methods, machine capacities/counts, and timing guidance the owner is willing to publish.
- Accessibility, parking, transit, seating, restroom, Wi-Fi, vending, detergent, and attendant details—each included only if confirmed.
- Real customer-journey steps and policies.
- Storefront, interior, equipment, staff, and neighborhood photography with usage permission.
- Whether information changes often and who is responsible for keeping it accurate.

## Constraint Audit

- **Reference compliance:** Pass. The plan uses sparse-brief divergence, selects comparatively, records a real weakness, preserves utility, and carries the receipt constraints into the architecture.
- **Factual integrity:** Pass. No business name, service, amenity, price, schedule, policy, integration, or live capability is presented as real; operational items are marked as unknown requirements at each relevant use.
- **Boundary compliance:** Pass. The plan stops at experiential architecture. Technology choice, implementation architecture, data sources, performance targets, and build phases remain unresolved pending approval to proceed.
- **Stress tests:** Pass. The concept depends on laundry-specific sorting and weekly-reset behavior; the signature interaction changes visitor preparedness; primary facts remain reachable within ten seconds; the direction avoids the washer/bubbles first association and inherited creative-web spectacle.
