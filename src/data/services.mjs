// Moving services. real:true = confirmed from the existing martinsmovers.com.
// real:false = expansion pages (standard full-service mover offerings). Each carries
// a full content block. The proposed ones keep a confirm-before-publish flag in the template.

export const services = [
  {
    slug: "residential-moving", label: "Residential Moving", real: true,
    title: "Residential Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Local family movers for homes, condos, and apartments across Bradenton and Sarasota. Careful crews, flat honest quotes. Call (941) 809-5777 for a free estimate.",
    keyword: "residential movers Bradenton",
    summary: "Full-service home moves across Bradenton, Sarasota, and Manatee County, from studio apartments to multi-bedroom houses.",
    content: {
      intro: [
        "Moving a home is not just lifting boxes. It is your kids' beds, the dresser your grandmother left you, and the coffee maker you need working the first morning in the new place. Martin's Moving has handled home moves across Bradenton and Sarasota since 2004, and we treat every house like the people living in it will remember how we left it.",
        "We move studios, condos, single-family homes, and everything in between. You get the same crew from the truck to the last box, a clear walkthrough before we start, and a quote that does not change on moving day unless you add to the job.",
      ],
      bulletsTitle: "What a residential move with us includes",
      bullets: [
        "A pre-move walkthrough so the quote matches the actual job, not a guess over the phone.",
        "Furniture wrapped in moving blankets and shrink wrap before it leaves the room.",
        "Disassembly and reassembly of beds, table legs, and standard furniture.",
        "Floor and doorway protection in both homes so nothing gets scuffed on the way out or in.",
        "Licensed, insured crews who show up in marked trucks, not day labor in a rental van.",
      ],
      processTitle: "How the move works",
      process: [
        { step: "Free estimate", text: "We walk the home or review a video, then send a written quote with no hidden surcharges." },
        { step: "Schedule", text: "Pick your date. We confirm crew size and truck so the day is not rushed." },
        { step: "Moving day", text: "We wrap, load, transport, and place everything where you want it in the new home." },
        { step: "Walkthrough", text: "We do a final check with you before the truck leaves. Nothing left behind, nothing damaged." },
      ],
      faqs: [
        { q: "Do you charge by the hour or a flat rate?", a: "For local moves we give you a written estimate up front. You will know the price before we lift anything, and it does not change unless you add items or stops on the day." },
        { q: "Do you move on weekends?", a: "Yes. Weekends book fast in season, so call (941) 809-5777 early to lock your date." },
        { q: "Will you disassemble and reassemble my furniture?", a: "Standard furniture like beds, tables, and dressers, yes, that is part of the job. Specialty items such as pianos or pool tables are handled by our specialty crew." },
      ],
    },
  },
  {
    slug: "commercial-moving", label: "Commercial / Office Moving", real: true,
    title: "Commercial & Office Movers | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Office and commercial moving in Bradenton and Sarasota with after-hours scheduling to keep your business running. Free quote: (941) 809-5777.",
    keyword: "commercial movers Sarasota",
    summary: "Office, retail, and commercial relocations scheduled around your hours to minimize downtime.",
    content: {
      intro: [
        "Every hour your office is down costs money, so a commercial move is really a downtime project with furniture attached. We plan around your business hours, label to a floor plan, and get your team working in the new space without losing a day.",
        "From a single suite to a full floor of workstations, we handle the furniture, the careful items, and the heavy lifting, and we coordinate timing with your IT team so the network is ready when people walk in.",
      ],
      bulletsTitle: "What a commercial move includes",
      bullets: [
        "After-hours and weekend scheduling so the team logs off in the old space and on in the new one.",
        "Labeling tied to your floor plan so every desk and box lands in the right spot.",
        "Careful handling of monitors, equipment, and shared assets.",
        "Furniture breakdown and reassembly for workstations and conference rooms.",
      ],
      processTitle: "How an office move works",
      process: [
        { step: "Walkthrough", text: "We tour both spaces, review the floor plan, and size the crew and truck." },
        { step: "Plan the cutover", text: "We schedule around your downtime window and coordinate with your IT provider." },
        { step: "Move", text: "We pack, move, and place furniture and equipment to the floor plan." },
        { step: "Day-one check", text: "A short walkthrough the morning after catches anything that needs adjusting." },
      ],
      faqs: [
        { q: "Can you move us after hours or over a weekend?", a: "Yes, that is how most of our office moves run, specifically to avoid downtime. Tell us your cutover window." },
        { q: "Do you handle IT and server equipment?", a: "We move and protect the hardware and coordinate timing with your IT team, who we recommend handle the actual server disconnect and reconnect." },
        { q: "How far ahead should we book?", a: "Three to six weeks for a small office, longer for larger spaces, so the floor plan and IT cutover line up." },
      ],
    },
  },
  {
    slug: "local-moving", label: "Local Moving", real: true,
    title: "Local Movers in Bradenton & Sarasota, FL | Martin's Moving",
    metaDesc: "Local moving across Bradenton, Sarasota, and Manatee County. Same crew, honest flat quotes, careful handling. Call (941) 809-5777 for a free estimate.",
    keyword: "local movers Bradenton",
    summary: "Short-distance moves within the Bradenton, Sarasota, and Manatee County region.",
    content: {
      intro: [
        "A local move should be the easy kind, and it is when the crew knows the area. We have run these streets since 2004, so we know the condo towers with one service elevator, the gated communities with check-in rules, and the neighborhoods where parking a truck takes a plan.",
        "You get a written flat quote for the job, the same crew start to finish, and careful handling whether you are going three blocks or across the county.",
      ],
      bulletsTitle: "What a local move includes",
      bullets: [
        "A flat written quote based on a real walkthrough, not a phone guess.",
        "Local knowledge of buildings, gates, and parking across both counties.",
        "Furniture wrapped and protected before it leaves the room.",
        "Floor and doorway protection at both ends.",
      ],
      processTitle: "How a local move works",
      process: [
        { step: "Estimate", text: "We walk the home or review a video and send a flat written quote." },
        { step: "Schedule", text: "Pick your date and we confirm crew and truck size." },
        { step: "Move day", text: "We wrap, load, drive, and place everything in the new home." },
        { step: "Walkthrough", text: "A final check together before we leave." },
      ],
      faqs: [
        { q: "What counts as a local move?", a: "Generally a move within the Bradenton, Sarasota, and Manatee County region. Call (941) 809-5777 with your two addresses and we will confirm." },
        { q: "How is a local move priced?", a: "We give you a written estimate up front so you know the price before we start." },
        { q: "Do you protect floors and doorways?", a: "Yes, at both homes, so nothing gets scuffed on the way out or in." },
      ],
    },
  },
  {
    slug: "interstate-movers", label: "Interstate Movers", real: true,
    title: "Interstate Movers from Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Interstate moving out of Bradenton and Sarasota with one accountable crew and clear pricing. Licensed and insured. Free quote: (941) 809-5777.",
    keyword: "interstate movers Florida",
    summary: "State-to-state moves with transparent pricing and a single point of contact.",
    content: {
      intro: [
        "Crossing state lines changes the rules: pricing is based on weight and distance, the paperwork is federally regulated, and your belongings travel for several days. We make that process clear from the first estimate so there are no surprises on delivery day.",
        "You get one accountable point of contact, a written estimate built from a real inventory, and careful packing for the long haul out of Florida.",
      ],
      bulletsTitle: "What an interstate move includes",
      bullets: [
        "A written estimate based on a real inventory, not a vague guess on weight.",
        "Clear paperwork: inventory and bill of lading, with your rights explained.",
        "Packing built for a multi-day haul, not just a quick local trip.",
        "A single point of contact from booking through delivery.",
      ],
      faqs: [
        { q: "How is an interstate move priced?", a: "Mainly by the weight of your shipment and the distance, plus services like packing or stairs. A real inventory keeps the estimate accurate." },
        { q: "How far ahead should I book?", a: "Several weeks is ideal, more in summer and around month-end when interstate trucks fill up." },
        { q: "When will my things arrive?", a: "Long-distance deliveries arrive within a date range rather than the same day. Keep essentials with you. Read our long distance moving guide for the full picture." },
      ],
    },
  },
  {
    slug: "professional-packing", label: "Professional Packing", real: true,
    title: "Professional Packing Services | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Professional packing for full homes or just the fragile items. Proper materials, careful crews. Bradenton and Sarasota. Call (941) 809-5777.",
    keyword: "packing services Sarasota",
    summary: "Full or partial packing with proper materials, labeled boxes, and careful handling of fragiles.",
    content: {
      intro: [
        "Packing is where most moving damage is decided. The right box for the weight, fragile items wrapped one at a time, and a label on every box: do that and unpacking is calm instead of a glass-cleanup project. We pack to that standard every time.",
        "Have us pack the whole house, or just the kitchen and the breakables while you handle the rest. Either way you get proper materials and a crew that has packed thousands of homes.",
      ],
      bulletsTitle: "What packing service includes",
      bullets: [
        "Proper boxes and materials sized to the contents, small for heavy, large for light.",
        "Fragile items wrapped individually and packed with padding.",
        "Electronics handled with cabling photographed and cords labeled.",
        "Every box labeled by room and contents for a fast unload.",
      ],
      faqs: [
        { q: "Can you pack just the fragile items?", a: "Yes. Partial packing is common: you handle the easy rooms, we handle the kitchen, glassware, and breakables." },
        { q: "Do you bring the boxes and materials?", a: "Yes, we bring everything needed and recommend quantities based on your home size." },
        { q: "Should I pack myself to save money?", a: "Packing yourself saves money if you start early. For fragile kitchens and busy households, professional packing is worth it. See our how-to-pack guide." },
      ],
    },
  },
  {
    slug: "piano-movers", label: "Piano Movers", real: true,
    title: "Piano Movers in Bradenton & Sarasota, FL | Martin's Moving",
    metaDesc: "Specialty piano moving for uprights and grands across Bradenton and Sarasota. Trained crew, proper equipment. Free quote: (941) 809-5777.",
    keyword: "piano movers Bradenton",
    summary: "Specialty handling for upright and grand pianos with trained crews and the right equipment.",
    content: {
      intro: [
        "A piano is heavy, awkward, and worth far more than its weight, both in money and in memory. It needs trained hands and the right equipment, not four people and good intentions. Our specialty crew moves uprights and grands the way they should be moved.",
        "We protect the instrument, the floors, and the doorways, and we plan the path before we lift anything. Customers regularly tell us the piano move is the part of the day they worried about and the part that went easiest.",
      ],
      bulletsTitle: "What piano moving includes",
      bullets: [
        "Trained crew using piano boards, straps, and padding, not improvised methods.",
        "A planned route through doorways, stairs, and tight turns before lifting.",
        "Full padding and protection of the instrument and your floors.",
        "Careful handling for both upright and grand pianos.",
      ],
      faqs: [
        { q: "Can you move a grand piano?", a: "Yes, both grands and uprights. Grands are partially disassembled and crated or boarded as needed for safe transport." },
        { q: "Do you move pianos up or down stairs?", a: "Yes, with the right crew size and equipment. Tell us the stairs and turns at the estimate so we plan correctly." },
        { q: "Will my piano need tuning afterward?", a: "Any move can affect tuning. We move it safely; we recommend a tuner reset it after it settles in the new home." },
      ],
    },
  },
  {
    slug: "specialty-items", label: "Specialty & Difficult Items", real: true,
    title: "Specialty Item Movers | Safes, Antiques & Art | Martin's Moving",
    metaDesc: "Specialty moving for safes, antiques, art, and oversized items in Bradenton and Sarasota. Trained crews and the right gear. Call (941) 809-5777.",
    keyword: "specialty movers Sarasota",
    summary: "Safes, antiques, art, and oversized or awkward items handled with the right crew and equipment.",
    content: {
      intro: [
        "Some items are not hard because they are heavy, they are hard because they are irreplaceable, oddly shaped, or both. Gun safes, marble tops, large artwork, and antique furniture all need a plan and the right gear rather than brute force.",
        "We build a custom handling plan for these pieces: how it gets wrapped, how it gets out the door, and how it rides in the truck. That is the difference between a smooth move and an expensive mistake.",
      ],
      bulletsTitle: "Specialty items we handle",
      bullets: [
        "Safes and heavy single items moved with the right equipment.",
        "Antiques and heirlooms wrapped and crated as the piece requires.",
        "Artwork and mirrors protected in proper containers.",
        "Oversized or awkward items with a planned route and lift.",
      ],
      faqs: [
        { q: "Can you move a gun safe?", a: "Yes. Tell us the weight and the path at the estimate so we bring the right crew and equipment." },
        { q: "How do you protect antiques and art?", a: "Each piece gets wrapping and, when needed, a custom crate, with a planned route out of the home." },
        { q: "Is specialty moving priced differently?", a: "It can be, because it takes more time, crew, and equipment. We quote it clearly up front." },
      ],
    },
  },

  // ---- Expansion services (standard full-service offerings) ----
  {
    slug: "apartment-movers", label: "Apartment Movers", real: false,
    title: "Apartment Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Apartment and condo movers who know the elevators, stairs, and parking. Fast, careful, flat-quoted. Bradenton and Sarasota. Call (941) 809-5777.",
    keyword: "apartment movers Sarasota",
    summary: "Apartment and condo moves that account for elevators, stairs, and tight parking.",
    content: {
      intro: [
        "Apartment moves live and die on logistics: the elevator window, the stairwell, the loading zone that fits one truck for twenty minutes. We plan those details before the day so your move is not held up by the building.",
        "Studio or three-bedroom, ground floor or fourth floor walk-up, you get a crew that has done it many times and a quote that does not balloon because of the stairs.",
      ],
      bulletsTitle: "What an apartment move includes",
      bullets: [
        "A plan for the elevator reservation, stairs, and loading zone before move day.",
        "Furniture wrapped and protected for tight hallways and corners.",
        "Care for shared spaces so you keep your deposit and your neighbors happy.",
        "A flat written quote that accounts for the building, not a surprise stair fee.",
      ],
      faqs: [
        { q: "Do you charge extra for stairs?", a: "We account for stairs in the written estimate up front, so there is no surprise fee on the day." },
        { q: "Can you work within my building's elevator window?", a: "Yes. Reserve the elevator for your date and we build the schedule around it." },
        { q: "Do you move small one-bedroom apartments?", a: "Yes, from studios up. For very small loads ask about our small move solutions." },
      ],
    },
  },
  {
    slug: "appliance-movers", label: "Appliance Movers", real: false,
    title: "Appliance Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Move refrigerators, washers, dryers, and large appliances safely. Proper equipment and careful crews in Bradenton and Sarasota. Call (941) 809-5777.",
    keyword: "appliance movers Bradenton",
    summary: "Safe moving of refrigerators, washers, dryers, and other large appliances.",
    content: {
      intro: [
        "Large appliances are heavy, expensive, and easy to dent a doorway or a floor with if you rush them. Refrigerators, washers, dryers, and ranges need dollies, straps, and a planned path, which is exactly how we move them.",
        "We handle the lift and the transport. We recommend a licensed plumber or electrician for any gas, water, or hardwired disconnect and reconnect for safety.",
      ],
      bulletsTitle: "What appliance moving includes",
      bullets: [
        "Appliance dollies and straps for safe lifting and stair work.",
        "Padding and protection for the appliance and your floors and doorways.",
        "A planned route so nothing gets wedged or scraped.",
        "Coordination with your move so appliances arrive ready to place.",
      ],
      faqs: [
        { q: "Do you disconnect the water and gas lines?", a: "For safety we move and place the appliance and recommend a licensed plumber or electrician handle gas, water, and hardwired connections." },
        { q: "Can you move a refrigerator up stairs?", a: "Yes, with the right crew and equipment. Tell us about stairs at the estimate." },
        { q: "Should the fridge be empty and defrosted?", a: "Yes. Empty it and defrost a couple days ahead so it travels clean and dry." },
      ],
    },
  },
  {
    slug: "boxes-supplies", label: "Boxes & Supplies", real: false,
    title: "Moving Boxes & Packing Supplies | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Moving boxes, tape, and packing supplies sized to your home. We recommend quantities so you do not run short. Bradenton and Sarasota. Call (941) 809-5777.",
    keyword: "moving boxes Sarasota",
    summary: "Boxes, tape, paper, and specialty containers sized to your home so you never run short.",
    content: {
      intro: [
        "Running out of boxes at 9pm the night before a move is a rite of passage nobody enjoys. Tell us your home size and we will recommend the right mix of boxes and materials so you pack once and pack right.",
        "We carry the boxes that matter: small for heavy items, large for light, and specialty containers for dishes, wardrobes, and TVs.",
      ],
      bulletsTitle: "Supplies we provide",
      bullets: [
        "Small, medium, and large boxes sized to the contents.",
        "Specialty dish-pack, wardrobe, and TV boxes.",
        "Tape, packing paper, bubble protection, and markers.",
        "Quantity recommendations based on your home size.",
      ],
      faqs: [
        { q: "How many boxes will I need?", a: "It depends on home size and how much you own. Tell us the bedroom count and we will give you a starting estimate so you do not run short." },
        { q: "Do you deliver supplies?", a: "Ask when you book. We can bring materials with the crew or as part of a packing service." },
        { q: "What boxes do dishes go in?", a: "Dish-pack boxes with dividers, with each piece wrapped. See our how-to-pack guide for the method." },
      ],
    },
  },
  {
    slug: "car-shipping", label: "Car Shipping Services", real: false,
    title: "Car Shipping & Vehicle Transport from Florida | Martin's Moving",
    metaDesc: "Coordinate vehicle transport with your long-distance move out of Bradenton or Sarasota. One point of contact for the whole relocation. Call (941) 809-5777.",
    keyword: "car shipping Florida",
    summary: "Vehicle transport coordinated alongside your long-distance or interstate move.",
    content: {
      intro: [
        "When you are moving across the country, driving two cars and a moving truck rarely makes sense. Coordinating vehicle transport with your household move keeps the whole relocation under one plan and one point of contact.",
        "We help you line up the vehicle move alongside the household goods so the timing works on both ends.",
      ],
      bulletsTitle: "What vehicle transport coordination covers",
      bullets: [
        "Timing the vehicle move with your household goods so nothing is stranded.",
        "One point of contact for the full relocation, not three separate vendors.",
        "Guidance on open vs enclosed transport for your vehicle.",
        "Preparation tips so the car is ready for the carrier.",
      ],
      faqs: [
        { q: "Do you transport the car yourself?", a: "Vehicle transport is coordinated through specialized auto carriers. We help line it up with your move so the timing works." },
        { q: "How early should I arrange car shipping?", a: "Book it alongside your long-distance move, a few weeks out, so pickup and delivery windows match your plan." },
        { q: "Open or enclosed transport?", a: "Open is standard and cheaper; enclosed protects high-value or classic vehicles. We will help you choose." },
      ],
    },
  },
  {
    slug: "climate-controlled-storage", label: "Climate Controlled Storage", real: false,
    title: "Climate Controlled Storage for Movers | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Short or long-term climate controlled storage between moves in the Bradenton and Sarasota area. Protect furniture from Florida heat and humidity. Call (941) 809-5777.",
    keyword: "climate controlled storage Sarasota",
    summary: "Short and long-term climate controlled storage for the gap between moves.",
    content: {
      intro: [
        "Florida heat and humidity are hard on furniture, wood, and electronics, which is why storage between moves should be climate controlled, not a hot metal box. When your move-out and move-in dates do not line up, your things wait in the right conditions.",
        "Whether it is two weeks between closings or a few months while a new home is ready, we help bridge the gap so you are not forced into a bad date.",
      ],
      bulletsTitle: "What storage between moves covers",
      bullets: [
        "Climate controlled conditions that protect against heat and humidity.",
        "Short-term and longer-term options for the gap between homes.",
        "Careful loading and inventory so your things come out the way they went in.",
        "Coordination with both legs of your move.",
      ],
      faqs: [
        { q: "Why does climate control matter in Florida?", a: "Heat and humidity warp wood, damage electronics, and encourage mold. Climate control keeps furniture in the condition it went in." },
        { q: "Can you store for just a couple weeks?", a: "Yes, short-term storage for closing gaps is common, as well as longer-term holds." },
        { q: "Do you move things in and out of storage?", a: "Yes, we handle both legs so you are not double-handling your belongings." },
      ],
    },
  },
  {
    slug: "cross-country-movers", label: "Cross Country Movers", real: false,
    title: "Cross Country Movers from Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Cross-country moving from the Bradenton and Sarasota area with clear weight-based pricing and one accountable crew. Licensed and insured. Call (941) 809-5777.",
    keyword: "cross country movers Florida",
    summary: "Coast-to-coast moves out of Florida with transparent pricing and a single point of contact.",
    content: {
      intro: [
        "A cross-country move is the long version of an interstate move, and the same rules apply: pricing is based on weight and distance, and your belongings travel for days. The further you go, the more planning and accurate estimating matter.",
        "We build the estimate from a real inventory, pack for the distance, and keep one point of contact accountable from your Florida door to the new one.",
      ],
      bulletsTitle: "What a cross-country move includes",
      bullets: [
        "A written estimate built from a real inventory, not a phone guess.",
        "Packing designed for a multi-day, long-distance haul.",
        "Clear paperwork and your rights explained up front.",
        "One accountable contact from pickup to delivery.",
      ],
      faqs: [
        { q: "How is a cross-country move priced?", a: "By weight and distance, plus services like packing. An accurate inventory keeps the price honest." },
        { q: "How long does delivery take coast to coast?", a: "It arrives within a date range that depends on distance and routing. We give you a realistic window." },
        { q: "What should I keep with me?", a: "Documents, medications, valuables, and a first-week kit travel with you, not on the truck." },
      ],
    },
  },
  {
    slug: "dorm-room-movers", label: "Dorm Room Movers", real: false,
    title: "College & Dorm Movers in Sarasota & Bradenton | Martin's Moving",
    metaDesc: "Move-in and move-out help for college students in the Sarasota and Bradenton area. Fast, careful, and easy on a student budget. Call (941) 809-5777.",
    keyword: "college movers Sarasota",
    summary: "Move-in and move-out help for college students, sized for small loads and tight schedules.",
    content: {
      intro: [
        "College moves are small but stressful: a tight move-in window, stairs, no elevator, and a parent trying to fit a semester into a sedan. We make the day quick so you can get back to the parts of college that matter.",
        "Whether it is move-in week, end-of-semester move-out, or a jump to a first apartment, we size the crew to the load so you are not overpaying for a small job.",
      ],
      bulletsTitle: "What a student move includes",
      bullets: [
        "Right-sized crews for small dorm and apartment loads.",
        "Stair and tight-hallway handling without a surprise fee.",
        "Quick scheduling around move-in and move-out windows.",
        "Careful handling of electronics, mini-fridges, and furniture.",
      ],
      faqs: [
        { q: "Do you handle small dorm loads?", a: "Yes. We size the crew to the job so a small move stays affordable." },
        { q: "Can you store things over the summer?", a: "Ask about storage between semesters; we can bridge the gap so you do not haul everything home." },
        { q: "How fast can you schedule during move-in week?", a: "Move-in weeks book up fast, so call (941) 809-5777 early to lock your window." },
      ],
    },
  },
  {
    slug: "emergency-movers", label: "Emergency Movers", real: false,
    title: "Emergency & Same-Day Movers | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Need to move fast? Emergency and same-day moving help in Bradenton and Sarasota when life will not wait. Call (941) 809-5777 and we will see what we can do.",
    keyword: "emergency movers Bradenton",
    summary: "Fast-response and same-day moving help when a move cannot wait.",
    content: {
      intro: [
        "Sometimes a move cannot wait for a tidy two-week plan: a lease falls through, a closing moves up, a family situation changes overnight. When the clock is the problem, call us and we will tell you honestly what we can do and how fast.",
        "We keep some flexibility in the schedule for exactly these situations, and we offer 24/7 emergency service for the moves that genuinely cannot wait.",
      ],
      bulletsTitle: "What emergency moving covers",
      bullets: [
        "Fast-response scheduling when a move cannot wait.",
        "24/7 emergency availability for true emergencies.",
        "The same careful crews and protection as a planned move.",
        "An honest answer up front about what is possible on your timeline.",
      ],
      faqs: [
        { q: "Can you really move me same day?", a: "Sometimes, depending on the schedule and the size of the move. Call (941) 809-5777 and we will tell you straight what is possible." },
        { q: "Is an emergency move more expensive?", a: "Short-notice moves can cost more because of scheduling, but we quote it clearly before you commit." },
        { q: "Do you answer after hours?", a: "Yes, we offer 24/7 emergency service for moves that cannot wait." },
      ],
    },
  },
  {
    slug: "full-service-movers", label: "Full Service Movers", real: false,
    title: "Full Service Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Hands-off full service moving in Bradenton and Sarasota: we pack, move, unpack, and place. You point, we handle the rest. Call (941) 809-5777.",
    keyword: "full service movers Sarasota",
    summary: "The hands-off option: we pack, move, unpack, and place so you barely lift a box.",
    content: {
      intro: [
        "Full service is for the move you do not want to think about. We pack every room, move it, and set it up in the new home, down to placing the furniture and unpacking the boxes. You point, we handle the rest.",
        "It is the right choice when time is short, the household is busy, or the move is simply more than one family wants to take on alone.",
      ],
      bulletsTitle: "What full service includes",
      bullets: [
        "Complete packing of every room with proper materials.",
        "Loading, transport, and placement in the new home.",
        "Furniture disassembly and reassembly.",
        "Unpacking and debris removal so you start settled, not buried in boxes.",
      ],
      faqs: [
        { q: "Do you really do everything?", a: "Yes, from the first box to placing furniture and unpacking, as much or as little as you want." },
        { q: "Can I do some of it myself?", a: "Absolutely. Many people choose partial service: we pack the kitchen and fragiles, you do the rest." },
        { q: "Is full service worth the cost?", a: "For busy households and tight timelines, the time and stress it saves usually is. We quote it clearly so you can decide." },
      ],
    },
  },
  {
    slug: "furniture-movers", label: "Furniture Movers", real: false,
    title: "Furniture Movers & Delivery | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Move heavy or single furniture pieces, or rearrange a room, in Bradenton and Sarasota. Careful crews, fair pricing. Call (941) 809-5777.",
    keyword: "furniture movers Bradenton",
    summary: "Single-piece furniture moves, deliveries, and in-home rearranging.",
    content: {
      intro: [
        "Not every job is a whole house. Sometimes it is one heavy sofa up a flight of stairs, a furniture delivery that needs two strong careful people, or rearranging a room without scratching the floors. We do those too.",
        "Same care, same protection, sized to a small job so you are not paying for a full move you do not need.",
      ],
      bulletsTitle: "What furniture moving covers",
      bullets: [
        "Single-piece and few-item moves between or within homes.",
        "Furniture delivery and placement.",
        "In-home rearranging for heavy pieces.",
        "Floor and doorway protection so nothing gets scratched.",
      ],
      faqs: [
        { q: "Will you move just one item?", a: "Yes. Tell us the piece, the path, and any stairs and we will quote the small job fairly." },
        { q: "Can you help rearrange a room?", a: "Yes, we move heavy pieces within a home so you do not strain your back or your floors." },
        { q: "Do you pick up furniture I bought?", a: "We can handle delivery and placement; tell us the pickup details when you book." },
      ],
    },
  },
  {
    slug: "home-staging", label: "Home Staging", real: false,
    title: "Home Staging Moving Support | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Moving support for home staging: bring furniture in, move it out, and store it between showings. Bradenton and Sarasota. Call (941) 809-5777.",
    keyword: "home staging movers Sarasota",
    summary: "Moving and storage support for staging a home to sell.",
    content: {
      intro: [
        "Staging sells homes, but it only works if the furniture gets in and out on the right schedule and the homeowner's own things have somewhere to go. We are the moving muscle behind the stagers and agents who make listings shine.",
        "Bring staging pieces in, move the owner's furniture to storage, and reverse it when the home sells, all on the timeline the sale demands.",
      ],
      bulletsTitle: "How we support staging",
      bullets: [
        "Move staging furniture in and out on the showing schedule.",
        "Move the owner's belongings to storage during the listing.",
        "Careful handling of both staging pieces and personal items.",
        "Coordination with agents and stagers on timing.",
      ],
      faqs: [
        { q: "Do you work with stagers and agents?", a: "Yes, we are the moving and storage support behind staging projects across the area." },
        { q: "Can you store the owner's furniture during the listing?", a: "Yes, including climate controlled storage so nothing is damaged while the home shows." },
        { q: "How fast can you reset after a sale?", a: "Tell us the closing timeline and we schedule the move-out and the owner's move-in around it." },
      ],
    },
  },
  {
    slug: "hot-tub-movers", label: "Hot Tub Movers", real: false,
    title: "Hot Tub & Spa Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Move a hot tub or spa safely with the right crew and equipment in Bradenton and Sarasota. We plan the path and the lift. Call (941) 809-5777.",
    keyword: "hot tub movers Sarasota",
    summary: "Specialty moving for hot tubs and spas with the right crew and equipment.",
    content: {
      intro: [
        "A hot tub is heavy, bulky, and unforgiving of a bad lift. Moving one safely takes a real crew, the right equipment, and a planned route through gates, yards, and tight side passages. It is a specialty job, and we treat it like one.",
        "We handle the lift and the transport. We recommend a licensed technician for the electrical and water disconnect and reconnect.",
      ],
      bulletsTitle: "What hot tub moving includes",
      bullets: [
        "A planned route through gates, yards, and tight spaces.",
        "The right crew size and equipment for a heavy, awkward lift.",
        "Protection for the spa shell and your property.",
        "Coordination with your timeline on both ends.",
      ],
      faqs: [
        { q: "Do you disconnect the hot tub?", a: "We move and transport it and recommend a licensed technician handle the electrical and plumbing disconnect and reconnect." },
        { q: "Can you get it through a narrow gate?", a: "Often yes, with a planned route. Send measurements at the estimate so we bring the right crew and gear." },
        { q: "Should the tub be drained first?", a: "Yes, fully drained before move day so it travels safely." },
      ],
    },
  },
  {
    slug: "international-moving", label: "International Moving", real: false,
    title: "International Moving Support from Florida | Martin's Moving",
    metaDesc: "Preparing for an overseas move from Bradenton or Sarasota? We pack for international transit and help you plan the freight and customs steps. Call (941) 809-5777.",
    keyword: "international movers Florida",
    summary: "Packing and preparation support for overseas moves, coordinated with a freight forwarder.",
    content: {
      intro: [
        "An overseas move adds ocean or air freight, customs, and timelines measured in months. We focus on what we do best, packing and preparing your shipment to survive international transit, and help you coordinate with a forwarder for the freight and customs side.",
        "Getting the packing right matters even more internationally, because your belongings change hands more times and travel much further.",
      ],
      bulletsTitle: "How we support an overseas move",
      bullets: [
        "Packing built to survive international transit and multiple handoffs.",
        "A detailed inventory for your forwarder and customs paperwork.",
        "Guidance on what typically cannot ship across borders.",
        "Coordination with the freight forwarder handling the overseas leg.",
      ],
      faqs: [
        { q: "Do you handle the overseas freight and customs?", a: "Those are handled through a specialized forwarder. We prepare and pack the shipment correctly and help you coordinate. See our international moving guide." },
        { q: "How early should I plan?", a: "A few months out. Container booking, documentation, and customs all take time." },
        { q: "What should never ship internationally?", a: "Documents, medications, jewelry, and irreplaceable items travel with you, and many plants and foods are restricted." },
      ],
    },
  },
  {
    slug: "last-minute-movers", label: "Last Minute Movers", real: false,
    title: "Last Minute Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Short notice move in Bradenton or Sarasota? We keep schedule flexibility for last-minute jobs. Call (941) 809-5777 and we will see what we can do.",
    keyword: "last minute movers Bradenton",
    summary: "Short-notice moving when plans change and you cannot wait two weeks.",
    content: {
      intro: [
        "Plans fall apart. A closing moves, a lease ends sooner than expected, the other mover cancels. When you need to move on short notice, the question is simply what is possible, and we will give you a straight answer.",
        "We keep some flexibility for last-minute jobs and do them with the same care as any planned move, no cut corners just because the clock is tight.",
      ],
      bulletsTitle: "What last-minute moving covers",
      bullets: [
        "Short-notice scheduling when plans change suddenly.",
        "The same crews, protection, and care as a planned move.",
        "An honest answer about what is possible on your timeline.",
        "Help triaging what to move first when time is short.",
      ],
      faqs: [
        { q: "How little notice can you handle?", a: "It depends on the schedule and the move size. Call (941) 809-5777 and we will tell you what is possible." },
        { q: "Will quality suffer on a rush move?", a: "No. We do not cut corners on protection or care just because the timeline is tight." },
        { q: "Does last minute cost more?", a: "It can, due to scheduling. We quote it clearly before you commit." },
      ],
    },
  },
  {
    slug: "long-distance-movers", label: "Long Distance Moving", real: false,
    title: "Long Distance Movers from Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Long distance moving out of Bradenton and Sarasota with weight-based pricing and one accountable crew. Licensed and insured. Call (941) 809-5777.",
    keyword: "long distance movers Florida",
    summary: "Long-haul moves out of Florida with transparent pricing and a single point of contact.",
    content: {
      intro: [
        "Long distance means weight-based pricing, federal paperwork, and a delivery window instead of a same-day finish. We make all of that clear up front so the estimate and the delivery date hold.",
        "You get an inventory-based quote, packing built for the haul, and one person accountable from your door in Florida to the new one.",
      ],
      bulletsTitle: "What a long distance move includes",
      bullets: [
        "An inventory-based written estimate, not a phone guess.",
        "Packing designed for a multi-day haul.",
        "Clear paperwork with your rights explained.",
        "A single accountable point of contact.",
      ],
      faqs: [
        { q: "How is long distance priced?", a: "By weight and distance, plus services. A real inventory keeps the estimate accurate. Read our long distance moving guide." },
        { q: "When will my things arrive?", a: "Within a date range rather than the same day. We give you a realistic window." },
        { q: "How early should I book?", a: "Several weeks out, more in summer and at month-end." },
      ],
    },
  },
  {
    slug: "moving-and-storage", label: "Moving & Storage Solutions", real: false,
    title: "Moving & Storage Solutions | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Combine moving and climate controlled storage when your dates do not line up. Bradenton and Sarasota. One crew for both legs. Call (941) 809-5777.",
    keyword: "moving and storage Sarasota",
    summary: "Moving plus storage in one plan for when your move-out and move-in dates do not match.",
    content: {
      intro: [
        "When the calendar will not cooperate and your move-out beats your move-in, you need somewhere for your things to wait, in the right conditions, with someone you trust to handle both legs. That is moving and storage as one plan.",
        "We move you out, hold your belongings in climate controlled storage, and move you into the new place when it is ready, without you double-handling a thing.",
      ],
      bulletsTitle: "What moving and storage covers",
      bullets: [
        "One plan and one crew for both legs of the move.",
        "Climate controlled storage that protects against Florida heat.",
        "Short-term gap storage or longer holds.",
        "A clean inventory so everything comes out as it went in.",
      ],
      faqs: [
        { q: "Can you store my things between closings?", a: "Yes, that is one of the most common reasons people use this. Short-term and longer-term both work." },
        { q: "Is the storage climate controlled?", a: "Yes, which matters in Florida for wood, electronics, and upholstery." },
        { q: "Do I move things twice?", a: "No double-handling on your end. We handle the move out, the storage, and the move in." },
      ],
    },
  },
  {
    slug: "packers-and-movers", label: "Movers & Packers", real: false,
    title: "Movers & Packers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "One team to pack and move your home in Bradenton and Sarasota. Proper materials, careful crews, honest quotes. Call (941) 809-5777.",
    keyword: "packers and movers Bradenton",
    summary: "One team that both packs and moves, so the same crew is accountable end to end.",
    content: {
      intro: [
        "Hiring one company to pack and another to move means two schedules, two invoices, and finger-pointing if something breaks. One team that both packs and moves keeps it simple and keeps accountability in one place.",
        "We pack your home to the standard that prevents damage, then move it with the same care, start to finish.",
      ],
      bulletsTitle: "What packing and moving together includes",
      bullets: [
        "One accountable team for both the packing and the move.",
        "Proper materials and fragile handling.",
        "Boxes labeled by room for a fast unload.",
        "A written quote covering the whole job.",
      ],
      faqs: [
        { q: "Why use one team for both?", a: "One schedule, one invoice, and one company accountable if anything goes wrong. It is simpler and safer." },
        { q: "Can you pack only part of the home?", a: "Yes. Partial packing is common; we handle the fragiles, you handle the easy rooms." },
        { q: "Do you bring the materials?", a: "Yes, and we recommend quantities so nothing runs short." },
      ],
    },
  },
  {
    slug: "pool-table-movers", label: "Pool Table Movers", real: false,
    title: "Pool Table Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Specialty pool table moving in Bradenton and Sarasota: proper breakdown, transport, and setup. Trained crew. Call (941) 809-5777 for a quote.",
    keyword: "pool table movers Sarasota",
    summary: "Specialty pool table moving with proper disassembly, transport, and reassembly.",
    content: {
      intro: [
        "A slate pool table is not furniture you can tip on its side and carry out. It comes apart in a specific order, the slate is heavy and brittle, and reassembly has to be level or the table plays wrong. This is a specialty job done by people who have done it before.",
        "We break it down, protect the slate and rails, transport it carefully, and set it back up properly in the new room.",
      ],
      bulletsTitle: "What pool table moving includes",
      bullets: [
        "Proper disassembly of slate, rails, and frame in the right order.",
        "Careful protection of the heavy, brittle slate.",
        "Transport that keeps components secure.",
        "Reassembly in the new room.",
      ],
      faqs: [
        { q: "Do you re-level and re-felt the table?", a: "We reassemble it properly. For a fresh felt or a precision tournament level, we can coordinate a billiards specialist." },
        { q: "Can a pool table really not be moved in one piece?", a: "A slate table must be disassembled. Moving it whole risks cracking the slate and damaging the frame." },
        { q: "How much does it cost?", a: "It is a specialty job priced by the table and the path. We quote it clearly up front." },
      ],
    },
  },
  {
    slug: "senior-relocation", label: "Senior Relocation", real: false,
    title: "Senior Relocation Movers in Sarasota & Bradenton | Martin's Moving",
    metaDesc: "Patient, respectful senior moving and downsizing help in the Sarasota and Bradenton area. We work at your pace. Call (941) 809-5777.",
    keyword: "senior moving Sarasota",
    summary: "Patient, respectful moving and downsizing help for seniors and their families.",
    content: {
      intro: [
        "Moving an older parent is as much emotional as logistical. It deserves patience, a slower pace, and respect for a home full of decades of memories. We have helped many Sarasota-area families through it, and we never rush the person at the center of it.",
        "We handle the heavy lifting and the logistics so the family can focus on the decisions that matter, and we move into communities and assisted living regularly.",
      ],
      bulletsTitle: "How we help with senior moves",
      bullets: [
        "A patient pace set by the family, not the clock.",
        "Help fitting the right furniture into a smaller space.",
        "Moves into 55-plus communities and assisted living, with their rules handled.",
        "Care for sentimental and fragile items.",
      ],
      faqs: [
        { q: "Can you help with downsizing decisions?", a: "We can guide the sorting and point you to donation and estate resources. See our senior relocation guide for a full plan." },
        { q: "Do you move into assisted living?", a: "Yes, regularly, working around the community's move-in window and elevator rules." },
        { q: "Will you work at our pace?", a: "Yes. We let the family and the person being moved set the speed." },
      ],
    },
  },
  {
    slug: "small-moves", label: "Small Move Solutions", real: false,
    title: "Small Movers & Small Move Solutions | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Got a small move? A few rooms, one item, or a studio in Bradenton or Sarasota. Right-sized crews, fair pricing. Call (941) 809-5777.",
    keyword: "small movers Bradenton",
    summary: "Right-sized moving for studios, single items, and few-room jobs.",
    content: {
      intro: [
        "Not every move fills a tractor-trailer. A studio, a single room, a few large pieces: these still deserve a careful crew, just not a full-size one. We size the job to what you actually have so a small move stays affordable.",
        "You get the same protection and the same flat written quote, scaled to a small load.",
      ],
      bulletsTitle: "What a small move includes",
      bullets: [
        "A crew and truck sized to a small load so you are not overpaying.",
        "The same wrapping and protection as a full move.",
        "A flat written quote for the small job.",
        "Quick scheduling for studios and single-room moves.",
      ],
      faqs: [
        { q: "Is there a minimum size?", a: "Call (941) 809-5777 with what you have and we will tell you the smallest sensible option." },
        { q: "Will a small move still be careful?", a: "Yes. Small does not mean rushed; your things get the same protection." },
        { q: "Can you move a single large item?", a: "Yes, see our furniture movers service for single-piece jobs." },
      ],
    },
  },
  {
    slug: "vip-movers", label: "VIP Movers", real: false,
    title: "VIP & Luxury Movers in Sarasota & Bradenton | Martin's Moving",
    metaDesc: "Discreet, white-glove VIP moving for luxury homes in Sarasota and Bradenton. Careful crews, high-value handling. Call (941) 809-5777.",
    keyword: "vip movers Sarasota",
    summary: "Discreet, white-glove moving for luxury homes and high-value belongings.",
    content: {
      intro: [
        "A luxury move is judged on discretion and care: high-value furnishings, art, and a household that expects everything handled quietly and perfectly. Sarasota's waterfront and gated communities are full of homes that need exactly that.",
        "Our VIP service brings white-glove handling, careful protection of high-value pieces, and a crew that respects your home and your privacy.",
      ],
      bulletsTitle: "What VIP service includes",
      bullets: [
        "Discreet, professional crews who respect your home and privacy.",
        "White-glove handling and placement of high-value furnishings.",
        "Extra protection and careful crating for art and antiques.",
        "Coordination with designers, agents, or estate managers as needed.",
      ],
      faqs: [
        { q: "How is VIP service different?", a: "More crew time, more protection, and a focus on discretion and high-value handling. See also our white glove movers service." },
        { q: "Do you handle fine art and antiques?", a: "Yes, with proper wrapping and crating. See our specialty items service." },
        { q: "Is it more expensive?", a: "It reflects the extra care and time. We quote it clearly up front." },
      ],
    },
  },
  {
    slug: "warehouse-storage", label: "Warehouse Storage Solutions", real: false,
    title: "Warehouse & Commercial Storage | Bradenton & Sarasota | Martin's Moving",
    metaDesc: "Warehouse storage for business inventory, equipment, and overflow in the Bradenton and Sarasota area. Flexible terms. Call (941) 809-5777.",
    keyword: "warehouse storage Bradenton",
    summary: "Warehouse and commercial storage for business inventory, equipment, and overflow.",
    content: {
      intro: [
        "Businesses need storage for the same reasons families do: a move between spaces, seasonal overflow, or equipment that does not fit the current footprint. Warehouse storage gives you room without a long-term lease on space you do not need yet.",
        "We help businesses move inventory and equipment into storage and back out when you need it, on flexible terms.",
      ],
      bulletsTitle: "What warehouse storage covers",
      bullets: [
        "Storage for inventory, equipment, and office overflow.",
        "Flexible short and longer-term terms for businesses.",
        "Careful handling in and out so equipment is protected.",
        "Coordination with your office move or expansion.",
      ],
      faqs: [
        { q: "Can you store business inventory and equipment?", a: "Yes, for the gap during a move or for ongoing overflow, on flexible terms." },
        { q: "Do you move it in and out?", a: "Yes, we handle both legs so your team does not have to." },
        { q: "Is it climate controlled?", a: "Ask about climate controlled options for sensitive equipment and materials." },
      ],
    },
  },
  {
    slug: "white-glove-movers", label: "White Glove Movers", real: false,
    title: "White Glove Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc: "White-glove moving in Bradenton and Sarasota: extra care, full setup, and placement down to the detail. Call (941) 809-5777 for a quote.",
    keyword: "white glove movers Sarasota",
    summary: "The highest-care moving option, with full setup and placement down to the detail.",
    content: {
      intro: [
        "White glove is the highest-care version of a move: nothing rushed, everything protected, and the new home set up down to the placement of the furniture and the unpacking of the boxes. It is for people who want the move handled completely and handled perfectly.",
        "Think of it as full service with an extra layer of care for high-value pieces and a finished result you can live in the moment we leave.",
      ],
      bulletsTitle: "What white glove includes",
      bullets: [
        "Extra protection and careful handling for every piece.",
        "Full packing, move, unpacking, and placement.",
        "Furniture set up and positioned to your direction.",
        "Debris and box removal so you start settled.",
      ],
      faqs: [
        { q: "How is white glove different from full service?", a: "More care, more time, and a finished setup. It overlaps with our VIP service for luxury homes." },
        { q: "Do you unpack and set everything up?", a: "Yes, down to placing furniture and removing the empty boxes." },
        { q: "Is it worth it?", a: "For high-value homes and people short on time, the finished result usually is. We quote it clearly." },
      ],
    },
  },
];
