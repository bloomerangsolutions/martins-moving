// Moving services. `real: true` = confirmed from the existing martinsmovers.com.
// `real: false` = proposed expansion pages (SEO parity with competitors) that need
// client confirmation that Martin's can actually fulfill the service before publishing.
//
// Pages with a `content` block render full copy now. The rest carry nav/meta data
// and are generated in the full pass once scope is confirmed.

export const services = [
  {
    slug: "residential-moving",
    label: "Residential Moving",
    real: true,
    title: "Residential Movers in Bradenton & Sarasota | Martin's Moving",
    metaDesc:
      "Local family movers for homes, condos, and apartments across Bradenton and Sarasota. Careful crews, flat honest quotes. Call (941) 809-5777 for a free estimate.",
    keyword: "residential movers Bradenton",
    summary:
      "Full-service home moves across Bradenton, Sarasota, and Manatee County, from studio apartments to multi-bedroom houses.",
    content: {
      intro: [
        "Moving a home is not just lifting boxes. It is your kids' beds, the dresser your grandmother left you, and the coffee maker you need working the first morning in the new place. Martin's Moving has handled home moves across Bradenton and Sarasota since 2002, and we treat every house like the people living in it will remember how we left it.",
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
  { slug: "commercial-moving", label: "Commercial / Office Moving", real: true, title: "Commercial & Office Movers | Bradenton & Sarasota | Martin's Moving", metaDesc: "Office and commercial moving in Bradenton and Sarasota with after-hours scheduling to keep your business running. Free quote: (941) 809-5777.", keyword: "commercial movers Sarasota", summary: "Office, retail, and commercial relocations scheduled around your hours to minimize downtime." },
  { slug: "local-moving", label: "Local Moving", real: true, title: "Local Movers in Bradenton & Sarasota, FL | Martin's Moving", metaDesc: "Local moving across Bradenton, Sarasota, and Manatee County. Same crew, honest flat quotes, careful handling. Call (941) 809-5777 for a free estimate.", keyword: "local movers Bradenton", summary: "Short-distance moves within the Bradenton and Sarasota region." },
  { slug: "interstate-movers", label: "Interstate Movers", real: true, title: "Interstate Movers from Florida | Martin's Moving", metaDesc: "Interstate moving out of Bradenton and Sarasota with one accountable crew and clear pricing. Licensed and insured. Free quote: (941) 809-5777.", keyword: "interstate movers Florida", summary: "State-to-state moves with transparent pricing and a single point of contact." },
  { slug: "professional-packing", label: "Professional Packing", real: true, title: "Professional Packing Services | Bradenton & Sarasota | Martin's Moving", metaDesc: "Professional packing for full homes or just the fragile items. Proper materials, careful crews. Bradenton and Sarasota. Call (941) 809-5777.", keyword: "packing services Sarasota", summary: "Full or partial packing with proper materials and labeled boxes." },
  { slug: "piano-movers", label: "Piano Movers", real: true, title: "Piano Movers in Bradenton & Sarasota, FL | Martin's Moving", metaDesc: "Specialty piano moving for uprights and grands across Bradenton and Sarasota. Trained crew, proper equipment. Free quote: (941) 809-5777.", keyword: "piano movers Bradenton", summary: "Specialty handling for upright and grand pianos." },
  { slug: "specialty-items", label: "Specialty & Difficult Items", real: true, title: "Specialty Item Movers | Safes, Antiques & More | Martin's Moving", metaDesc: "Specialty moving for safes, antiques, art, and oversized items in Bradenton and Sarasota. Trained crews and the right gear. Call (941) 809-5777.", keyword: "specialty movers Sarasota", summary: "Safes, antiques, art, and oversized or awkward items." },

  // Proposed expansion (need client confirmation Martin's can fulfill these):
  { slug: "apartment-movers", label: "Apartment Movers", real: false, keyword: "apartment movers Sarasota" },
  { slug: "appliance-movers", label: "Appliance Movers", real: false, keyword: "appliance movers Bradenton" },
  { slug: "boxes-supplies", label: "Boxes & Supplies", real: false, keyword: "moving boxes Sarasota" },
  { slug: "car-shipping", label: "Car Shipping Services", real: false, keyword: "car shipping Florida" },
  { slug: "climate-controlled-storage", label: "Climate Controlled Storage", real: false, keyword: "climate controlled storage Sarasota" },
  { slug: "cross-country-movers", label: "Cross Country Movers", real: false, keyword: "cross country movers Florida" },
  { slug: "dorm-room-movers", label: "Dorm Room Movers", real: false, keyword: "college movers Sarasota" },
  { slug: "emergency-movers", label: "Emergency Movers", real: false, keyword: "emergency movers Bradenton" },
  { slug: "full-service-movers", label: "Full Service Movers", real: false, keyword: "full service movers Sarasota" },
  { slug: "furniture-movers", label: "Furniture Movers", real: false, keyword: "furniture movers Bradenton" },
  { slug: "home-staging", label: "Home Staging", real: false, keyword: "home staging movers Sarasota" },
  { slug: "hot-tub-movers", label: "Hot Tub Movers", real: false, keyword: "hot tub movers Sarasota" },
  { slug: "international-moving", label: "International Moving", real: false, keyword: "international movers Florida" },
  { slug: "last-minute-movers", label: "Last Minute Movers", real: false, keyword: "last minute movers Bradenton" },
  { slug: "long-distance-movers", label: "Long Distance Moving", real: false, keyword: "long distance movers Florida" },
  { slug: "moving-and-storage", label: "Moving & Storage Solutions", real: false, keyword: "moving and storage Sarasota" },
  { slug: "packers-and-movers", label: "Movers & Packers", real: false, keyword: "packers and movers Bradenton" },
  { slug: "pool-table-movers", label: "Pool Table Movers", real: false, keyword: "pool table movers Sarasota" },
  { slug: "senior-relocation", label: "Senior Relocation", real: false, keyword: "senior moving Sarasota" },
  { slug: "small-moves", label: "Small Move Solutions", real: false, keyword: "small movers Bradenton" },
  { slug: "vip-movers", label: "VIP Movers", real: false, keyword: "vip movers Sarasota" },
  { slug: "warehouse-storage", label: "Warehouse Storage Solutions", real: false, keyword: "warehouse storage Bradenton" },
  { slug: "white-glove-movers", label: "White Glove Movers", real: false, keyword: "white glove movers Sarasota" },
];
