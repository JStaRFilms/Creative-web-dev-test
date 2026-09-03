# Website plan: “The Neighborhood Wash Cycle”

## Creative direction

Turn an ordinary chore into a small cinematic neighborhood ritual.

The site begins inside the circular window of a washing machine. As the visitor scrolls, one continuous “wash cycle” transforms a bundle of laundry from chaos into clean, folded calm. Business information appears naturally throughout the journey, while hours, directions, and calling remain immediately accessible.

Core transformation:

> A pile you have to deal with → a wash cycle handled for you → time returned to your day.

Driving question:

> What could you do with the time laundry usually takes?

The final reveal is not another visual effect. It is the laundromat itself: bright, friendly, nearby, and ready to help.

## Visual identity

The art direction should feel tactile, cheerful, and slightly nostalgic—not futuristic or corporate.

Palette:

- Porcelain White — `#F2F0E9`
- Enamel Blue — `#164B6B`
- Signal Red — `#E34832`
- Soap Yellow — `#F2C84B`
- Stainless Steel — `#AEB7B9`
- Midnight Window — `#172126`

Typography:

- A warm, characterful display face for large statements
- A highly legible grotesk sans-serif for practical information
- Condensed numerals for hours, prices, and machine specifications

Imagery should feature the real storefront, machines, staff, and neighborhood. Avoid generic stock photos of perfectly folded white towels.

## Signature interaction

The entire page is organized around one interactive washing-machine drum.

Inside it, fabric forms, water, reflections, and soap particles respond subtly to scrolling and pointer movement. The drum changes state across the story:

1. Still
2. Filling
3. Agitating
4. Spinning
5. Clearing
6. Opening

On touch devices, dragging the drum produces a small, damped rotation. On desktop, pointer movement bends reflections and nudges nearby soap particles. The interaction remains decorative and never blocks navigation.

Sound is optional and off by default: a soft machine click, water movement, and a final completion chime.

## Experience storyboard

| Scroll | Story beat | Camera and subject | Typography | Interaction |
|---|---|---|---|---|
| 0–12% | The pile | Close view of a dormant washer surrounded by loose fabric | “Laundry takes more than quarters. It takes time.” | Pointer gently disturbs fabric edges |
| 12–26% | The question | Camera moves through the washer door as water begins to rise | “What would you rather be doing?” | Waterline follows scroll velocity |
| 26–42% | The wash | Fabrics orbit in a controlled, satisfying cycle | Service options appear one at a time: self-service, wash-and-fold, large loads | Drag or pointer motion influences the drum |
| 42–56% | The neighborhood | The circular drum becomes a window onto illustrated neighborhood moments | Short statements about convenience, care, and community | Small moments orbit the drum like passing storefronts |
| 56–70% | The practical answer | Machine internals separate into clear information layers | Hours, address, payment methods, accessibility, and machine sizes | Information locks into place with mechanical clicks |
| 70–86% | Time returned | The spin accelerates, water clears, and the visual world becomes brighter | “One less chore. More of your day.” | Scroll velocity drives spin, within a safe maximum |
| 86–100% | The reveal | The washer door opens onto the real laundromat storefront | “Your neighborhood laundry room.” | Final completion chime if sound was enabled |

A short resting interval follows the final animation so visitors can comfortably act without the page immediately moving on.

## Practical interface

A persistent utility strip should keep the essential actions visible throughout:

- Open/closed status
- Today’s hours
- Get directions
- Call
- “Plan my visit”

The final section contains the complete practical information:

- Weekly opening hours
- Address and embedded map
- Parking or transit guidance
- Accepted payments
- Machine capacities
- Self-service and wash-and-fold details
- Last-wash time
- Accessibility information
- Frequently asked questions
- Phone number and social links

If the laundromat has a supported machine-management system, live machine availability can be added later. It should not be simulated or promised without a real data source.

## Mobile approach

Mobile should feel intentionally composed rather than like a compressed desktop version:

- The utility actions become a thumb-friendly bottom bar.
- The cinematic sequence becomes shorter and less heavily pinned.
- The drum remains interactive, but particle count and visual effects are reduced.
- Business information enters the normal vertical flow sooner.
- Directions, hours, and calling are reachable without completing the story.

Visitors using reduced-motion settings receive a still-image sequence with simple fades and no smooth-scroll override.

## Technical plan

Recommended foundation:

- Next.js and TypeScript for structure, metadata, and local search visibility
- Semantic HTML for all business information
- GSAP ScrollTrigger for the master wash-cycle timeline
- Lenis only on capable desktop devices, synchronized to the animation ticker
- One WebGL or high-performance Canvas scene for the drum
- DOM typography and controls above the visual layer
- Static fallbacks for low-power devices and WebGL failure

Performance constraints:

- Device pixel ratio capped at `2`
- Target 60 FPS
- No frame-loop allocations
- Fewer than 50 WebGL draw calls on mobile and 100 on desktop
- Adaptive particle density
- No mandatory audio or autoplay video
- Complete cleanup of animation, canvas, and event resources
- The useful business content remains available if JavaScript fails

## Accessibility and local discovery

The experience must preserve:

- Intact screen-reader headings beneath animated typography
- Keyboard-visible navigation and controls
- Strong color contrast
- Large touch targets
- Descriptive image alternatives
- A pause or reduced-motion path
- Local business structured data
- Accurate title, description, address, opening hours, and contact metadata
- Fast-loading text content for search engines and map referrals

## Content required before launch

The build can begin with placeholders, but publication requires verified:

- Business name and logo
- Address and map location
- Phone number
- Opening and last-wash hours
- Services and prices
- Payment methods
- Machine types and capacities
- Parking and accessibility details
- Real storefront/interior photography
- Any claim such as “family-owned,” “24 hours,” or “eco-friendly”

## Delivery sequence

1. Confirm factual business content and conversion priorities.
2. Produce the visual moodboard, drum behavior study, and mobile wireframe.
3. Build the semantic, fully usable business-information page.
4. Add the master cinematic timeline and washer interaction.
5. Integrate real photography and final copy.
6. Test responsive behavior, keyboard access, reduced motion, WebGL fallback, search metadata, and performance.
7. Conduct an in-store usability check: can a first-time visitor find hours, directions, pricing, and payment information within seconds?

No website files or dependencies were created; this is the review plan only.
