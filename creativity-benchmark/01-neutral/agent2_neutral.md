# Website plan: “Laundry day, made easy”

## Core idea

Turn an ordinary chore into a small neighborhood reset: clean clothes, clear pricing, and no uncertainty.

The site’s main job is to answer four questions immediately:

1. Are you open?
2. Where are you?
3. What services and machines do you offer?
4. How much will it cost?

The central message will be: **“A cleaner, easier laundry day—right around the corner.”**

## Format

A fast, mobile-first, single-page website. Most visitors will arrive from Google Maps on their phones, so hours, directions, pricing, and contact actions must remain easy to reach.

A compact sticky mobile bar will provide:

- Get directions
- Call
- View hours

## Visual direction

Friendly neighborhood utility rather than a glossy corporate brand.

Color palette:

- Enamel Cream — `#F5F0E6`
- Detergent Blue — `#2678A5`
- Utility Navy — `#17324A`
- Signal Coral — `#E75A3C`
- Stainless Steel — `#B8C0C4`
- Clean White — `#FFFFFF`

The design will use bold, readable type, circular washer-inspired shapes, subtle tile patterns, candid local photography, and generous but practical spacing. No glass cards, purple gradients, stock-photo smiles, or oversized decorative headlines.

## Page journey

| Stage | Purpose | Visual treatment | Interaction |
|---|---|---|---|
| Welcome | Confirm the location, current hours, and main benefit | Exterior photo framed like a washer door | Circular opening reveal on arrival |
| Know before you go | Remove uncertainty | Clear price, machine, payment, and amenity facts | Simple status chips and expandable details |
| Choose your service | Explain self-service, wash-and-fold, and commercial options | Large service bands with real photography | Tap or hover reveals turnaround details |
| Your visit | Show how straightforward the process is | Wash, dry, fold sequence | Washer-window progress indicator follows the section |
| Find us | Convert interest into a visit | Neighborhood map and recognizable storefront photo | Directions, call, and copy-address actions |
| Final reassurance | Leave visitors with a human impression | Staff or owner photo and short promise | Direct call-to-action; no additional spectacle |

The protected reveal near the end will be the physical location itself: a recognizable storefront image paired with the map, parking instructions, and the clearest directions possible.

## Signature interaction

A restrained **washer-window progress indicator** will rotate gently as visitors move through the page. It will transition from water and bubbles to a clean folded-clothes icon near the final section.

This will be implemented as lightweight SVG/CSS motion, not heavy 3D. It will stop under reduced-motion preferences and become a static visual on lower-powered devices. The site will contain no automatic sound.

## Content structure

- Business name and short promise
- Live-looking “Open today” presentation based on published hours
- Address, phone number, and directions
- Self-service machine sizes and starting prices
- Wash-and-fold price and turnaround time
- Accepted payment methods
- Amenities: parking, seating, Wi-Fi, attendants, detergent, accessibility
- A three-step “wash, relax, collect” explanation
- Short owner or neighborhood story
- Selected customer testimonials
- Frequently asked questions
- Final directions and call actions

Important facts such as prices and hours will appear as text, not be buried inside images.

## Photography needed

A short original photo session will give the site credibility:

- Storefront in daylight
- Wide interior view
- Clean machines in use
- Folding area
- Largest-capacity machine
- Attendant or owner
- Parking and entrance
- One detail shot of baskets, tiles, or folded laundry

If original photography is unavailable at launch, the design should use strong typography and simple illustrated washer motifs until real photos are ready.

## Responsive behavior

Desktop will feel spacious and editorial. Mobile will prioritize utility:

- No hidden navigation for critical actions
- Tap targets at least 44 pixels tall
- Prices and hours visible without horizontal scrolling
- Map opened externally rather than embedded heavily
- Motion simplified
- Business phone and address selectable and copyable

## Trust, accessibility, and local discovery

The finished site should include:

- Strong color contrast and visible keyboard focus
- Semantic headings and descriptive image text
- Reduced-motion support
- Local business structured data
- Search metadata for “[neighborhood] laundromat”
- Consistent address, phone, and hours across the site
- Social-sharing image and favicon
- Fast-loading responsive images
- A prominent notice area for holiday hours or temporary closures

## Proposed build sequence

1. Confirm business facts, services, prices, and available photography.
2. Write the concise page copy and establish the content hierarchy.
3. Produce mobile and desktop wireframes.
4. Create the visual design and washer-window interaction prototype.
5. Build the responsive page.
6. Add local search metadata, accessibility behavior, and analytics if wanted.
7. Test on common phones, slow connections, keyboard navigation, and reduced motion.
8. Review every price, hour, phone number, and directions link before launch.

The result should feel memorable but never get between a customer and the practical information they came for.
