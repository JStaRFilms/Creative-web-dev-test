# Neighborhood Laundromat Website Plan

## 1. Request contract

**Deliverable:** A creative and functional plan for review. This document stops at experience architecture; it does not prescribe code, dependencies, or implementation scaffolding.

**Primary visitor job:** Decide quickly whether this laundromat fits the visit, then get there prepared.

**Secondary visitor jobs:**

- Confirm hours, address, directions, and contact details.
- Understand available services, machine sizes, pricing, payment methods, and accessibility.
- Know what to bring and what to expect on arrival.
- Find answers to practical questions without calling.

The expressive concept must never delay those tasks. Hours, directions, and contact stay visible within the first screen and remain easy to reach throughout the site.

## 2. Reference manifest and receipt

### Reference manifest

| Capability | Governing reference |
|---|---|
| Sparse-brief concept development and experience architecture | `.agents/skills/creative-web-development/references/creative-direction.md` |
| Concept selection and final-plan stress testing | `.agents/skills/creative-web-development/references/concept-evaluation.md` |

No technical reference is in scope because the requested deliverable stops before technology selection.

### Reference receipt

- `creative-direction.md` — Ambiguity permits creative decisions, but not invented business claims. Operational facts remain visible as unknowns until the owner confirms them.
- `concept-evaluation.md` — The selected direction must pass the ten-second utility test and retain equivalent meaning for touch, keyboard, and reduced-motion visitors.

## 3. Truth ledger

### Known

- The business is a small neighborhood laundromat.
- The owner wants a website plan before any build begins.

### Provisional planning assumptions

- Most visitors will arrive on a phone, often while planning an immediate trip.
- The business serves nearby residents more often than destination shoppers.
- Practical certainty matters more than a long brand story.
- A compact site will serve the business better than a large collection of thin pages.

These assumptions guide the plan but should be checked with the owner before design begins.

### Unknown and required before design production

- Business name, logo, brand history, and preferred tone.
- Address, map pin, phone number, hours, holiday-hours policy, and contact preference.
- Services actually offered: self-service, wash-and-fold, pickup or delivery, commercial laundry, or others.
- Machine types, capacities, approximate cycle times, and whether availability data exists.
- Prices, fees, accepted payment methods, and whether prices change by machine or service.
- Parking, transit, entrances, seating, Wi-Fi, restrooms, vending, detergent sales, and accessibility details.
- Last-wash or last-load policy, attendant hours, house rules, and lost-property policy.
- Real photographs, customer permissions, reviews, and any neighborhood partnerships.
- Languages needed by the local community.

No unknown should appear as a claim, icon, testimonial, price, or feature until confirmed.

## 4. Domain findings

### Functional truth

Laundry is a visible state change: arrive with an unsorted burden, move through a sequence, leave with clean and ordered belongings. The useful website equivalent is not spectacle; it is turning uncertainty into a prepared visit.

### Visitor reality

People are usually carrying practical questions: Is it open? How much will this load cost? Can this comforter fit? How do I pay? Is there somewhere to wait? The interface should answer in that order of urgency.

### Human ritual

A laundromat visit is repetitive domestic work, but it can also be a small reset in the week. The tone should respect the chore without pretending it is a luxury experience.

### Material behavior

Useful subject-specific cues include sorting, measured loads, repeated cycles, enamel machine surfaces, perforated drums, paper service tags, folding, and the transition from rumpled to ordered.

### Cultural tension

Laundromat sites often look either neglected or artificially glossy. This one should feel cared for, straightforward, and local: polished enough to build trust, ordinary enough to feel honest.

### Native language

Use plain terms such as load, washer size, dry time, last wash, wash-and-fold, detergent, payment, and directions. Avoid lifestyle copy that makes visitors decode basic information.

### Quarantined first association

The obvious answer is a blue-and-white page covered in bubbles, spinning circles, and stock photos of smiling people holding towels. Those cues may signal the category, but they are not a concept. The final direction excludes bubbles, decorative spinning, and generic laundry stock imagery.

## 5. Concept candidates

### A. The Cycle Board — system-led utility

The site organizes every visit around the real sequence: prepare, wash, dry, fold, go. Information appears along a clear cycle path, with a load guide as the signature interaction. It is highly legible and specific to laundry, but the cycle metaphor risks becoming too literal.

### B. A Predictable Errand — ritual-led hybrid

The site turns a bag of laundry into a calm, predictable neighborhood errand. Its signature interaction is a compact visit planner that starts with what the visitor is bringing and reveals only confirmed information relevant to that visit. Practical details become the creative experience rather than sitting beneath it.

### C. The Neighborhood Fold — place-led editorial

The site behaves like a well-kept local noticeboard whose information folds into a neat, editorial grid. Real neighborhood photography and concise owner-written notes create warmth. This feels local, but the governing device could transfer too easily to a café, barber, or repair shop.

### D. From Rumpled to Ready — material-led transformation

The composition begins visually compressed and becomes orderly as visitors move through the page. The transformation is memorable and rooted in laundry, but it gives animation too much responsibility for a site whose main purpose is fast utility.

## 6. Selection record

**Selected:** B. A Predictable Errand

It best joins the emotional truth of the chore with the visitor's practical needs. The interaction is not decoration: planning a load is how the visitor resolves uncertainty. The concept also works in a fully static form, so accessibility and low-capability experiences remain complete.

All four candidates pass the factual-integrity and basic-utility gates. The selected direction also passes concept-before-technology and has credible touch, keyboard, and reduced-motion expressions.

| Dimension | A | B | C | D |
|---|---:|---:|---:|---:|
| Domain truth | 4 | 5 | 3 | 4 |
| Originality | 3 | 4 | 4 | 4 |
| Ownability | 4 | 5 | 3 | 4 |
| Coherence | 4 | 5 | 4 | 4 |
| Interaction necessity | 4 | 5 | 3 | 2 |
| Visitor intelligence | 5 | 5 | 4 | 3 |
| Art-direction specificity | 3 | 5 | 4 | 4 |
| Restraint | 4 | 5 | 4 | 3 |
| Feasible ambition | 5 | 5 | 5 | 3 |
| Recall | 3 | 4 | 4 | 4 |
| **Total** | **39** | **48** | **38** | **35** |

The two scores of 5 that matter most are supported by observable decisions: domain truth comes from converting a real load into a prepared visit, and visitor intelligence comes from making the expressive center directly answer practical questions. The strongest rejected option is The Cycle Board; it lost because its circular sequence is recognizable but more expected and less human.

**Primary creative risk:** A visit planner can feel like an unnecessary form if the business has too little verified machine, service, and pricing data.

**Risk reducer:** Collect the real operational details first. If the data is thin, retain the concept but express it as a concise “Before you visit” guide rather than an interactive planner.

## 7. Concept contract

### Governing concept

**The website turns a bag of laundry into a calm, predictable neighborhood errand.**

### Experience promise

Within moments, a visitor should understand whether the laundromat suits the load, what the visit requires, and how to get there. The site should feel calm, capable, and neighborly—not precious, comic, or corporate.

### Structure

Use a utility-first hybrid: immediate visit information surrounds one expressive planning moment. The homepage should answer most needs without forcing navigation; separate detail pages exist only when confirmed service information genuinely needs them.

### Composition

- Start compactly, with hours, open/closed wording only if it can be accurate, address, directions, and contact in the first screen.
- Use a sturdy grid that begins slightly dense around the incoming load and opens into cleaner spacing as the visitor reaches the plan and directions.
- Favor full-width bands, rules, labels, and aligned data over a stack of floating cards.
- Keep important numbers visually prominent and paired with plain-language labels.

### Typography

- Use a friendly, durable grotesque sans serif for primary reading and navigation.
- Use a restrained condensed companion for utility labels such as HOURS, LOAD SIZE, and PAYMENT.
- Give prices, times, and machine capacities tabular numerals so comparisons scan cleanly.
- Avoid novelty “retro laundromat” lettering except, if authentic, in the real logo or photographed signage.

### Material and color

- Base the palette on warm off-white, deep navy-black, and one signal orange drawn from service tags and control markings.
- Use pale enamel gray and muted stainless tones as supporting surfaces.
- Treat the accent as functional: current selection, directions, important timing, and primary actions only.
- Final hues should be adjusted to the actual storefront and machines once photography exists.

### Imagery

- Commission a short, honest photo set of the real exterior, entrance, machine rows, machine-size labels, folding surfaces, payment station, seating, and staff if permission is granted.
- Show navigation-relevant context: what the storefront looks like from the street and how the entrance works.
- Prefer close material details only after practical images are covered.
- Do not use generic stock families, impossible spotless interiors, fabricated customers, or unverified neighborhood scenes.

### Motion law

**Everything moves from carried uncertainty to settled order.** Transitions may align, unfold, or settle into place, but never spin merely because washing machines do. Movement should be brief and finish decisively.

### Signature interaction: Plan this load

The visitor chooses a plain-language load description, such as an everyday basket or bulky bedding, from options verified against the business's real machines and services. The result groups confirmed guidance in one place: suitable machine or service, price or price range, expected visit timing, payment method, and what to bring.

This is guidance, not a booking promise or live availability claim. If accurate inputs are unavailable, replace the interaction with the static “Before you visit” version described above.

### Sound

No sound. A laundromat already has a strong physical soundscape, and the website gains no utility or meaning from reproducing it.

### Responsive expression

- On phones, hours, directions, and calling remain ahead of the planner.
- The planner becomes a short vertical sequence with large choices and no precision gestures.
- Tables convert to clearly labeled rows without hiding comparisons behind horizontal scrolling.
- Photography prioritizes storefront recognition and entrance context over decorative crops.

### Accessibility expression

- The entire experience follows a logical heading and reading order before any visual enhancement.
- Every planner choice is reachable and operable by keyboard, touch, and assistive technology.
- Results are announced clearly and remain visible without timed disappearance.
- Reduced-motion mode uses immediate state changes and simple emphasis; the “uncertainty to order” idea survives through composition and language.
- Color never carries status alone. Directions, hours, service details, and pricing use visible text.
- Language versions, if required, receive equal navigation status rather than machine-translated overlays.

### Deliberate restraint

Exclude decorative bubbles, rotating drums, custom cursors, autoplay video, ambient audio, scroll-jacking, 3D machines, fake live counters, and excessive testimonials. The planner is the single signature interaction; everything else should support reading, trust, or arrival.

## 8. Experience architecture

### Persistent utility

The header carries the business name, Hours, Services, Plan a Load, Visit, and a prominent Directions action. On small screens, Directions and Call may sit in a compact bottom utility bar, but only if both actions are confirmed and the bar does not obscure content.

### Homepage sequence

1. **Visit essentials** — Business name, precise value statement based on confirmed services, today's hours or standard hours, address, Directions, and Call.
2. **Plan this load** — The signature planner or its static fallback. This is the expressive center of the page.
3. **Services and machines** — Only verified offerings, capacities, prices, turnaround language, and payment methods. Make comparison easy.
4. **What the visit is like** — Real photographs with concrete captions covering entrance, payment, seating, supplies, accessibility, and house rules.
5. **Before you visit** — Last-wash policy, what to bring, detergent availability, busy-time guidance if the owner can support it, and concise FAQs.
6. **Find the laundromat** — Street-context photograph, address, landmark or parking instructions if verified, map link, transit details, and contact.
7. **Local close** — A short, owner-approved statement about the business and neighborhood; no invented history or generic community claims.

### Optional supporting pages

- **Service detail:** Add only for a confirmed service such as wash-and-fold when its process, pricing, timing, and policies need room.
- **Accessibility and visit details:** Add if the homepage cannot hold precise entrance, machine, assistance, and facility information clearly.
- **Privacy:** Required if the eventual site collects messages, analytics, bookings, or any personal data.

Avoid empty About, Gallery, Blog, and separate FAQ pages unless real content justifies them.

### Key states to design

- Standard visit information with no live-status dependency.
- Open, closing soon, closed, and holiday-hours presentation only if the underlying schedule can be maintained accurately.
- Planner start, selection, result, edit, unavailable-data fallback, and invalid or incomplete data.
- Missing photograph or temporarily unavailable service without breaking the core visit information.
- Long translated labels, large text, narrow phone, keyboard focus, reduced motion, and slow-image-loading conditions.

## 9. Content and asset checklist before visual design

1. Conduct a 30-minute owner interview using the unknowns in the truth ledger.
2. Verify all operational information against the current in-store signs and owner records.
3. Build a small machine-and-service matrix for load type, capacity, price, timing, payment, and restrictions.
4. Photograph the real arrival path and practical interior details before decorative imagery.
5. Ask several real customers what they check before visiting and which terms they naturally use for load sizes.
6. Confirm who will maintain hours, holiday exceptions, prices, and temporary service changes.
7. Decide whether the planner has enough accurate data to earn interaction; otherwise use the static fallback.

## 10. Review criteria before approving a build

- A first-time mobile visitor can find hours, address, directions, and contact within ten seconds.
- Replacing “laundromat” with an unrelated business breaks the concept, planner, material language, and content structure.
- Removing the planner loses useful visit understanding, not merely animation.
- Every visible claim traces to owner-confirmed information or is clearly labeled as provisional working copy.
- The static, keyboard, touch, reduced-motion, and slow-connection versions preserve the same primary tasks and calm tone.
- The page remains memorable as “the laundromat that makes the whole errand feel figured out,” not as “the site with spinning effects.”

