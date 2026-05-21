// Areas served. URL pattern: /areas-served/<slug>. All within Martin's service region
// (Bradenton, Sarasota, Manatee County and nearby). Each carries full local content.

const TITLE = (name) => `${name} Movers | Martin's Moving`;

export const areas = [
  {
    slug: "sarasota", name: "Sarasota", county: "Sarasota County", keyword: "movers in Sarasota FL",
    title: TITLE("Sarasota"),
    metaDesc: "Trusted Sarasota movers for homes, condos, and offices. Family owned since 2004, licensed and insured. Free flat quote: call (941) 809-5777.",
    neighborhoods: ["Downtown Sarasota", "Gulf Gate", "Southside Village", "Arlington Park", "Laurel Park"],
    content: {
      intro: [
        "Sarasota moves come with their own quirks. Downtown high-rises with one service elevator and a tight reservation window. Older bungalows in Laurel Park with narrow doorways. Gulf-front condos with strict HOA move-in rules. We have moved across all of it since 2004, so we plan for the building, not just the boxes.",
        "Whether you are moving into a condo off Main Street or a house in Arlington Park, you get the same Martin's crew start to finish and a written quote that holds on moving day.",
      ],
      localTitle: "Sarasota neighborhoods we move",
      faqs: [
        { q: "Do you handle condo elevator reservations and HOA paperwork?", a: "We work around your building's move-in window and protect elevators and common areas. You handle the reservation with the HOA; we handle showing up on time and moving clean." },
        { q: "How far in advance should I book a Sarasota move?", a: "In season, winter through spring, two to three weeks is safe. Off season, a week is usually fine. Call (941) 809-5777 to check your date." },
      ],
    },
  },
  {
    slug: "bradenton", name: "Bradenton", county: "Manatee County", keyword: "movers in Bradenton FL",
    title: TITLE("Bradenton"),
    metaDesc: "Bradenton's local movers since 2004. Homes, condos, and offices handled by careful, insured crews. Free quote: (941) 809-5777.",
    neighborhoods: ["Downtown Bradenton", "Village of the Arts", "West Bradenton", "Riverwalk", "Bayshore Gardens"],
    content: {
      intro: [
        "Bradenton is home base. We know the older neighborhoods west toward the Gulf, the bungalows around the Village of the Arts, the riverfront condos along the Manatee, and the newer subdivisions filling in east of town. That local knowledge shows up as a smoother move day.",
        "From a first apartment near downtown to a family home in West Bradenton, you get the same crew, the same protection, and a flat quote that does not move on you.",
      ],
      localTitle: "Bradenton areas we move",
      faqs: [
        { q: "Are you actually based in the Bradenton area?", a: "Yes. Martin's Moving has served Bradenton and Manatee County since 2004. This is our backyard, not a far-off dispatch." },
        { q: "Do you move both homes and offices in Bradenton?", a: "Yes, residential and commercial both. Call (941) 809-5777 with your move and we will size the crew." },
      ],
    },
  },
  {
    slug: "lakewood-ranch", name: "Lakewood Ranch", county: "Manatee County", keyword: "movers Lakewood Ranch",
    title: TITLE("Lakewood Ranch"),
    metaDesc: "Lakewood Ranch movers who know the villages, gates, and HOA rules. New homes and resales handled with care. Free quote: (941) 809-5777.",
    content: {
      intro: [
        "Lakewood Ranch is a maze of villages, gates, and HOAs spread across Manatee and Sarasota counties, with a steady stream of new-construction move-ins. Knowing which gate to use and how each community runs its move-in process keeps the day from stalling at the entrance.",
        "We move families into the new builds and resales across the Ranch, work within the community rules, and protect the finishes in homes that are often brand new.",
      ],
      localNote: "Lakewood Ranch spans dozens of villages from Greenbrook to Waterside. Tell us your village and gate at the estimate and we plan access ahead of time.",
      faqs: [
        { q: "Do you know the Lakewood Ranch community access rules?", a: "Yes. We move here regularly and plan gate access and any move-in registration ahead of your date." },
        { q: "Can you protect a brand-new home during move-in?", a: "Yes. Floor and doorway protection at both ends is standard, which matters most in a new build." },
      ],
    },
  },
  {
    slug: "bee-ridge", name: "Bee Ridge", county: "Sarasota County", keyword: "movers Bee Ridge",
    title: TITLE("Bee Ridge"),
    metaDesc: "Bee Ridge movers for the established neighborhoods off Bee Ridge Road in Sarasota. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Bee Ridge is classic Sarasota suburbia: established single-family neighborhoods along the Bee Ridge Road corridor, mature trees, and driveways that range from easy to tight. It is a straightforward area to move, which we like.",
        "We handle homes throughout Bee Ridge with the same careful crews and honest flat quotes we bring to every Sarasota move.",
      ],
      localNote: "Bee Ridge runs from Tamiami Trail east toward I-75, a mix of older ranch homes and updated family houses.",
      faqs: [
        { q: "Do you move single-family homes in Bee Ridge?", a: "Yes, that is most of what is here. We size the crew to the home and quote it flat." },
        { q: "How is pricing handled?", a: "A written estimate up front after a walkthrough or video, so you know the price before we lift anything." },
      ],
    },
  },
  {
    slug: "englewood", name: "Englewood", county: "Sarasota County", keyword: "movers Englewood FL",
    title: TITLE("Englewood"),
    metaDesc: "Englewood movers for beach-town homes, condos, and manufactured-home communities near the Gulf. Careful, insured crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Englewood sits at the southern edge of the area near the Gulf, a relaxed beach town that draws retirees and seasonal residents. The mix here runs from older beach cottages to manufactured-home communities to Gulf-access condos, each with its own moving wrinkle.",
        "We make the longer run south worth it with the same flat quote and careful handling, whether you are settling in for the season or moving for good.",
      ],
      localNote: "Englewood spans the Sarasota and Charlotte county line, with manufactured-home parks and beach-area condos that often have their own access rules.",
      faqs: [
        { q: "Do you serve Englewood even though it is south of Sarasota?", a: "Yes, Englewood is within our service area. Call (941) 809-5777 with your addresses to confirm." },
        { q: "Do you move in manufactured-home communities?", a: "Yes. Tell us the community and any access rules at the estimate so we plan ahead." },
      ],
    },
  },
  {
    slug: "osprey", name: "Osprey", county: "Sarasota County", keyword: "movers Osprey FL",
    title: TITLE("Osprey"),
    metaDesc: "Osprey movers for bayfront homes and communities between Sarasota and Venice. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Osprey is the quieter stretch between Sarasota and Venice, with bayfront estates near Casey Key, established communities, and the green space around Oscar Scherer State Park. Some moves here mean long private drives and waterfront access to plan around.",
        "We handle the full range, from a family home off the Trail to a bay-side property, with crews that plan the path before they lift.",
      ],
      localNote: "Osprey runs along the Trail between Sarasota and Nokomis, with bayfront properties near Casey Key that can need extra access planning.",
      faqs: [
        { q: "Can you handle a waterfront or long-driveway property?", a: "Yes. Tell us about the driveway, gate, or dock access at the estimate so we bring the right crew." },
        { q: "Do you move between Osprey and other towns?", a: "Yes, local moves throughout the area and long-distance moves out of it." },
      ],
    },
  },
  {
    slug: "siesta-key", name: "Siesta Key", county: "Sarasota County", keyword: "movers Siesta Key",
    title: TITLE("Siesta Key"),
    metaDesc: "Siesta Key movers who know the bridges, narrow roads, and condo rules of the island. Careful island moves. Call (941) 809-5777.",
    content: {
      intro: [
        "Siesta Key is one of the trickiest places in the area to move, and it is all about access. The bridges, the narrow island roads, the seasonal traffic, and the condo buildings with tight elevators and strict move-in windows all have to be planned, not improvised.",
        "We move the island regularly, from beach condos near the Village to homes on the canals, and we plan the route and timing so the day does not get stuck in island traffic.",
      ],
      localNote: "Siesta Key access runs over the Stickney Point and Siesta Drive bridges. Condo move-in windows and narrow streets make timing the move important.",
      faqs: [
        { q: "Is it harder to move on Siesta Key?", a: "It takes more planning because of the bridges, narrow roads, and condo rules, but we do it often. We schedule around traffic and your building's window." },
        { q: "Do you handle beach condo move-in rules?", a: "Yes. Reserve your elevator window with the building and we plan the move around it." },
      ],
    },
  },
  {
    slug: "longboat-key", name: "Longboat Key", county: "Manatee County", keyword: "movers Longboat Key",
    title: TITLE("Longboat Key"),
    metaDesc: "Longboat Key movers for gated Gulf-front condos and estates. We handle island access and HOA rules. Discreet, careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Longboat Key is a long, narrow barrier island of gated Gulf-front condos and estates, strung along Gulf of Mexico Drive across the Manatee and Sarasota line. Moves here mean island access, gate check-ins, and HOA move-in rules, often for high-value homes.",
        "We bring careful, discreet crews and plan the access ahead so a Longboat move is smooth from the gate to the last piece of furniture.",
      ],
      localNote: "Longboat Key is reached via St Armands or the north bridge from Bradenton Beach. Most communities are gated with their own move-in procedures.",
      faqs: [
        { q: "Do you handle gated communities and HOA move-in rules?", a: "Yes. We plan gate access and any registration ahead of your date and protect the common areas." },
        { q: "Do you handle high-value and luxury homes?", a: "Yes. Ask about our white glove and VIP service for extra-care moves." },
      ],
    },
  },
  {
    slug: "parrish", name: "Parrish", county: "Manatee County", keyword: "movers Parrish FL",
    title: TITLE("Parrish"),
    metaDesc: "Parrish movers for the fast-growing master-planned communities of north Manatee County. New-build move-ins handled with care. Call (941) 809-5777.",
    content: {
      intro: [
        "Parrish has gone from rural Manatee County to one of the fastest-growing corners of the region, with master-planned communities like North River Ranch filling in former farmland. That means a lot of new-construction move-ins and HOAs that are still finding their footing.",
        "We move families into the new builds across Parrish, protect the fresh finishes, and work within whatever the community requires.",
      ],
      localNote: "Parrish sits north of the Manatee River off US 301 and Fort Hamer Road, with new communities going up quickly.",
      faqs: [
        { q: "Do you move into new-construction homes in Parrish?", a: "Yes, regularly. We protect floors and doorways in new builds and plan community access ahead." },
        { q: "Is Parrish within your service area?", a: "Yes, Parrish is in our Manatee County service area. Call (941) 809-5777 to confirm your move." },
      ],
    },
  },
  {
    slug: "venice", name: "Venice", county: "Sarasota County", keyword: "movers Venice FL",
    title: TITLE("Venice"),
    metaDesc: "Venice movers for island homes, condos, and 55-plus communities on the Gulf coast. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Venice has a character of its own: the historic island downtown, the Gulf beaches and the jetty, and a large share of retirees and seasonal residents in condos and 55-plus communities. Moves here often mean downsizing, seasonal timing, and community move-in rules.",
        "We handle Venice moves with the patience that retiree and downsizing moves deserve, plus the same flat quote and careful handling as any job.",
      ],
      localNote: "Venice includes the island downtown, mainland subdivisions, and many 55-plus and manufactured-home communities with their own rules.",
      faqs: [
        { q: "Do you help with downsizing and senior moves in Venice?", a: "Yes, often. We work at a patient pace; see our senior relocation service and guide." },
        { q: "Do you move in 55-plus communities?", a: "Yes. Tell us the community and any move-in window at the estimate." },
      ],
    },
  },
  {
    slug: "fruitville", name: "Fruitville", county: "Sarasota County", keyword: "movers Fruitville",
    title: TITLE("Fruitville"),
    metaDesc: "Fruitville movers for homes along the Fruitville Road corridor in Sarasota. Careful, insured crews and honest quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Fruitville runs along its namesake road east from downtown Sarasota toward I-75, a practical mix of established homes, newer subdivisions, and the commercial corridor in between. It is central and easy to reach, which keeps moves efficient.",
        "We move homes throughout Fruitville with the same flat quotes and careful crews we bring across Sarasota County.",
      ],
      localNote: "Fruitville stretches from near downtown out to the I-75 interchange, a convenient central location for moves in either direction.",
      faqs: [
        { q: "Do you serve the Fruitville area?", a: "Yes, it is central Sarasota and easy for us to reach. Call (941) 809-5777 with your move." },
        { q: "Can you do same-county and out-of-state moves from here?", a: "Yes, both local moves and interstate moves out of the area." },
      ],
    },
  },
  {
    slug: "sarasota-springs", name: "Sarasota Springs", county: "Sarasota County", keyword: "movers Sarasota Springs",
    title: TITLE("Sarasota Springs"),
    metaDesc: "Sarasota Springs movers for the established residential neighborhoods east of the Trail. Flat quotes, careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Sarasota Springs is a settled residential community east of the Trail, full of single-family homes on comfortable lots. It is the kind of established neighborhood where moves are straightforward and the main job is doing it carefully.",
        "We handle homes throughout Sarasota Springs with crews that wrap, protect, and place everything the way you want it.",
      ],
      localNote: "Sarasota Springs is an established residential area in central Sarasota County, mostly single-family homes.",
      faqs: [
        { q: "Do you cover Sarasota Springs?", a: "Yes, it is within our core Sarasota service area." },
        { q: "How do you price a move here?", a: "A flat written estimate after a walkthrough or video, with no surprise fees." },
      ],
    },
  },
  {
    slug: "gulf-gate-estates", name: "Gulf Gate Estates", county: "Sarasota County", keyword: "movers Gulf Gate",
    title: TITLE("Gulf Gate Estates"),
    metaDesc: "Gulf Gate Estates movers for the established neighborhoods near the Gulf Gate shops and Siesta Key. Careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Gulf Gate Estates is a popular established neighborhood near the Gulf Gate shopping and dining district and a short hop from Siesta Key. The homes here are mostly mid-century ranch houses on tidy lots, easy to move and quick to reach.",
        "We move Gulf Gate homes with the same care and flat pricing as the rest of Sarasota, and we know the area well from years of working it.",
      ],
      localNote: "Gulf Gate Estates sits just inland of Siesta Key near the Gulf Gate Village shops, mostly single-story ranch homes.",
      faqs: [
        { q: "Are you familiar with Gulf Gate?", a: "Yes, we move here often and know the neighborhood and its proximity to Siesta Key." },
        { q: "Do you also move to Siesta Key from here?", a: "Yes, short island moves are common; we plan the bridge and timing." },
      ],
    },
  },
  {
    slug: "palmer-ranch", name: "Palmer Ranch", county: "Sarasota County", keyword: "movers Palmer Ranch",
    title: TITLE("Palmer Ranch"),
    metaDesc: "Palmer Ranch movers for the gated villages and golf communities of south Sarasota. We know the gates and HOA rules. Call (941) 809-5777.",
    content: {
      intro: [
        "Palmer Ranch is a large master-planned area of south Sarasota, full of gated villages, golf communities, and 55-plus neighborhoods. Like any planned community, the move starts at the gate and runs by the HOA's rules.",
        "We move throughout Palmer Ranch, plan the gate access and any move-in window ahead, and protect the homes and common areas.",
      ],
      localNote: "Palmer Ranch spans many gated villages and golf communities off Honore and McIntosh in south Sarasota.",
      faqs: [
        { q: "Do you handle gated villages in Palmer Ranch?", a: "Yes. We arrange gate access and any registration ahead of your date." },
        { q: "Do you move in 55-plus communities here?", a: "Yes, regularly, working within each community's rules." },
      ],
    },
  },
  {
    slug: "university-park", name: "University Park", county: "Manatee County", keyword: "movers University Park",
    title: TITLE("University Park"),
    metaDesc: "University Park movers for the gated golf community near University Parkway and UTC. Careful, discreet crews. Call (941) 809-5777.",
    content: {
      intro: [
        "University Park is an established gated golf community near University Parkway and the UTC shopping district, straddling the Manatee and Sarasota line. Moves here mean gate check-ins and care for well-kept homes on manicured lots.",
        "We plan the gate access ahead, protect the property, and move you in cleanly, the same as we do across the area's gated communities.",
      ],
      localNote: "University Park sits off University Parkway near UTC, a gated golf community with its own access procedures.",
      faqs: [
        { q: "Do you know the University Park gate procedures?", a: "Yes. We arrange access ahead of your move so there is no delay at the gate." },
        { q: "Is University Park in your service area?", a: "Yes, near the Manatee and Sarasota line. Call (941) 809-5777 to confirm." },
      ],
    },
  },
  {
    slug: "mallory-park", name: "Mallory Park", county: "Manatee County", keyword: "movers Mallory Park",
    title: TITLE("Mallory Park"),
    metaDesc: "Mallory Park movers for the Lakewood Ranch village. New-build move-ins and resales handled with care. Call (941) 809-5777.",
    content: {
      intro: [
        "Mallory Park is one of the newer villages within Lakewood Ranch, full of recent construction and families settling into a planned community with its own amenities and rules. New homes mean fresh finishes worth protecting.",
        "We move into Mallory Park regularly as part of our Lakewood Ranch work, plan the community access, and keep new floors and walls clean.",
      ],
      localNote: "Mallory Park is a Lakewood Ranch village near Lakewood Ranch Boulevard, mostly newer homes.",
      faqs: [
        { q: "Do you move into Mallory Park and Lakewood Ranch?", a: "Yes, regularly. We plan community access and protect new-build finishes." },
        { q: "Can you protect a brand-new home?", a: "Yes, floor and doorway protection is standard at both ends." },
      ],
    },
  },
  {
    slug: "lido-key", name: "Lido Key", county: "Sarasota County", keyword: "movers Lido Key",
    title: TITLE("Lido Key"),
    metaDesc: "Lido Key movers for beachfront condos near St Armands and Lido Beach. We plan island access and elevator windows. Call (941) 809-5777.",
    content: {
      intro: [
        "Lido Key is the barrier island just past St Armands Circle, home to beachfront condos and homes a short walk from Lido Beach. Island access runs through St Armands, and the condo buildings come with elevators and move-in windows to plan around.",
        "We move Lido Key condos and homes with the route and timing planned ahead, so the island traffic and the building rules do not slow the day.",
      ],
      localNote: "Lido Key is reached through St Armands Circle. Beachfront condos here have elevator and move-in scheduling to coordinate.",
      faqs: [
        { q: "Can you move into a Lido Key beachfront condo?", a: "Yes. Reserve your elevator window with the building and we plan the move around it." },
        { q: "Is island access a problem?", a: "It takes planning through St Armands, but we move the keys often and schedule around traffic." },
      ],
    },
  },
  {
    slug: "myakka", name: "Myakka", county: "Sarasota County", keyword: "movers Myakka City",
    title: TITLE("Myakka"),
    metaDesc: "Myakka City movers for rural east-county ranches and acreage with long drives. We bring the right crew and plan the access. Call (941) 809-5777.",
    content: {
      intro: [
        "Myakka, out in the rural east of the county, is ranch land and acreage: large lots, long private drives, and properties where the nearest neighbor is a field away. Moves here are less about traffic and more about distance and access on the property itself.",
        "We plan for the long drives and any equipment a rural property needs, and we make the run out east worth it with the same flat quote.",
      ],
      localNote: "Myakka City is rural east Sarasota County near Myakka River State Park, with large lots and long driveways.",
      faqs: [
        { q: "Do you serve rural Myakka properties?", a: "Yes. Tell us about the driveway length and access at the estimate so we plan the right approach." },
        { q: "Is there an extra charge for the distance?", a: "We account for it in the written estimate up front, with no surprises." },
      ],
    },
  },
  {
    slug: "north-sarasota", name: "North Sarasota", county: "Sarasota County", keyword: "movers North Sarasota",
    title: TITLE("North Sarasota"),
    metaDesc: "North Sarasota movers for the neighborhoods north of downtown toward the airport and University Parkway. Careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "North Sarasota covers the neighborhoods running north of downtown toward the airport and University Parkway, a practical mix of established homes and easy access to both Sarasota and the UTC corridor. It is central and quick for us to reach.",
        "We move homes throughout North Sarasota with the same careful crews and flat pricing as the rest of the city.",
      ],
      localNote: "North Sarasota runs from north of downtown toward the airport and the University Parkway corridor.",
      faqs: [
        { q: "Do you cover North Sarasota?", a: "Yes, it is central and easy for us to reach. Call (941) 809-5777 with your move." },
        { q: "Local or long-distance from here?", a: "Both. We handle moves within the area and interstate moves out of it." },
      ],
    },
  },
  {
    slug: "south-sarasota", name: "South Sarasota", county: "Sarasota County", keyword: "movers South Sarasota",
    title: TITLE("South Sarasota"),
    metaDesc: "South Sarasota movers for the neighborhoods toward Osprey and the south Trail. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "South Sarasota runs from the city down toward Osprey along the south Trail, with established neighborhoods, condos, and easy reach to Siesta Key. It is a comfortable part of the county to move and one we know well.",
        "We handle South Sarasota moves with the same flat quotes and careful handling we bring everywhere, whether you are staying local or heading out of state.",
      ],
      localNote: "South Sarasota stretches along the Trail toward Osprey, with neighborhoods close to Siesta Key access.",
      faqs: [
        { q: "Do you serve South Sarasota?", a: "Yes, it is within our core service area." },
        { q: "Can you move to the keys from here?", a: "Yes, Siesta Key access is close; we plan the bridge and timing." },
      ],
    },
  },
  {
    slug: "nokomis", name: "Nokomis", county: "Sarasota County", keyword: "movers Nokomis FL",
    title: TITLE("Nokomis"),
    metaDesc: "Nokomis movers for homes and beach-area communities between Osprey and Venice. Careful, insured crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Nokomis sits between Osprey and Venice near Nokomis Beach, a growing pocket of the south county with new communities going in alongside older neighborhoods. It draws families and seasonal residents, with beach access nearby.",
        "We move Nokomis homes and condos with the same flat quotes and careful crews as the rest of the area, and we know the south-county roads well.",
      ],
      localNote: "Nokomis is near Nokomis Beach and Laurel, between Osprey and Venice, with both new and established communities.",
      faqs: [
        { q: "Is Nokomis in your service area?", a: "Yes, it is part of our south Sarasota County coverage." },
        { q: "Do you move into newer Nokomis communities?", a: "Yes, including new builds; we protect fresh finishes and plan community access." },
      ],
    },
  },
  {
    slug: "rosemary-district", name: "Rosemary District", county: "Sarasota County", keyword: "movers Rosemary District",
    title: TITLE("Rosemary District"),
    metaDesc: "Rosemary District movers for downtown Sarasota's arts district condos and mid-rises. We plan elevators and loading zones. Call (941) 809-5777.",
    content: {
      intro: [
        "The Rosemary District is downtown Sarasota's revitalized arts neighborhood, full of newer mid-rise condos and lofts just north of Main Street. Urban moves here are all about the building: the elevator, the loading zone, and the move-in window.",
        "We move the Rosemary District often and plan the access and timing ahead so an urban move does not get stuck waiting on an elevator or a parking spot.",
      ],
      localNote: "The Rosemary District is a walkable downtown Sarasota neighborhood of newer condos and mid-rises just north of Main Street.",
      faqs: [
        { q: "Do you handle downtown condo and loft moves?", a: "Yes. Reserve your elevator and loading window with the building and we plan around it." },
        { q: "Is parking a truck downtown a problem?", a: "It takes planning. We arrange the loading zone and timing ahead of the move." },
      ],
    },
  },
  {
    slug: "st-armands", name: "St. Armands", county: "Sarasota County", keyword: "movers St Armands",
    title: TITLE("St. Armands"),
    metaDesc: "St. Armands movers for the Circle's residential keys and upscale homes. Discreet, careful island moves. Call (941) 809-5777.",
    content: {
      intro: [
        "St. Armands is the upscale island anchored by the shops and restaurants of St. Armands Circle, with residential keys radiating off it toward Lido and the Gulf. Moves here mean island access, often gated or waterfront homes, and a premium on doing it cleanly and discreetly.",
        "We bring careful, discreet crews to St. Armands, plan the island access, and protect high-value homes the way they deserve.",
      ],
      localNote: "St. Armands Key sits between downtown Sarasota and Lido Key, centered on St. Armands Circle with residential streets around it.",
      faqs: [
        { q: "Do you handle high-value homes on St. Armands?", a: "Yes. Ask about our white glove and VIP service for extra-care moves." },
        { q: "How do you handle island access?", a: "We plan the route over the bridges and schedule around traffic and any building rules." },
      ],
    },
  },
  {
    slug: "port-charlotte", name: "Port Charlotte", county: "Charlotte County", keyword: "movers Port Charlotte",
    title: TITLE("Port Charlotte"),
    metaDesc: "Port Charlotte movers for canal-front homes and retirement communities south of the area. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Port Charlotte, just south of the area in Charlotte County, is a large residential community known for its canals, waterfront homes, and strong retiree population. It is a longer run for us, but a common one, especially for moves between here and the Sarasota area.",
        "We make the trip south worth it with a flat quote and the same careful handling, whether you are moving in, out, or within Port Charlotte.",
      ],
      localNote: "Port Charlotte is a canal-laced community in Charlotte County, south of Venice and Englewood.",
      faqs: [
        { q: "Do you serve Port Charlotte even though it is in Charlotte County?", a: "Yes, it is within our extended service area. Call (941) 809-5777 to confirm your move." },
        { q: "Can you move between Port Charlotte and Sarasota?", a: "Yes, that route is common for us, in both directions." },
      ],
    },
  },
  {
    slug: "vamo", name: "Vamo", county: "Sarasota County", keyword: "movers Vamo FL",
    title: "Vamo Movers | Sarasota County FL | Martin's Moving",
    metaDesc: "Vamo movers for the quiet bayside community in south Sarasota near Little Sarasota Bay. Careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Vamo is a small, quiet community in south Sarasota along Little Sarasota Bay, tucked between the Trail and the water near Osprey. It is an easy area to move, with a mix of older homes and bayside properties.",
        "We handle Vamo moves with the same flat quotes and careful crews as the rest of south Sarasota County.",
      ],
      localNote: "Vamo sits along Little Sarasota Bay in south Sarasota County, near Osprey and the south Trail.",
      faqs: [
        { q: "Do you cover the Vamo area?", a: "Yes, it is part of our south Sarasota County coverage." },
        { q: "Can you handle a bayside property?", a: "Yes. Tell us about any access or driveway considerations at the estimate." },
      ],
    },
  },
  {
    slug: "panther-ridge", name: "Panther Ridge", county: "Manatee County", keyword: "movers Panther Ridge",
    title: TITLE("Panther Ridge"),
    metaDesc: "Panther Ridge movers for east Manatee acreage and equestrian properties with long drives. We plan the access. Call (941) 809-5777.",
    content: {
      intro: [
        "Panther Ridge is east Manatee County acreage country: large lots, equestrian properties, and long private driveways well away from the highway. Moves here are about distance and on-property access more than city traffic.",
        "We plan for the long drives and the space these properties have, and we bring the same flat quote and careful crews out east.",
      ],
      localNote: "Panther Ridge is an acreage and equestrian community in east Manatee County, with large lots and long driveways.",
      faqs: [
        { q: "Do you serve rural east Manatee like Panther Ridge?", a: "Yes. Tell us about the driveway and any gate at the estimate so we plan access." },
        { q: "Is there a surcharge for the distance?", a: "We account for it in the written estimate up front." },
      ],
    },
  },
  {
    slug: "mill-creek", name: "Mill Creek", county: "Manatee County", keyword: "movers Mill Creek",
    title: TITLE("Mill Creek"),
    metaDesc: "Mill Creek movers for the larger-lot homes of east Manatee near Lakewood Ranch. Careful crews, flat quotes. Call (941) 809-5777.",
    content: {
      intro: [
        "Mill Creek is an established east Manatee community of larger-lot single-family homes near Lakewood Ranch, popular with families who want space without going fully rural. The lots are generous and the moves are usually straightforward.",
        "We move Mill Creek homes with the same careful crews and flat pricing we bring across Manatee County.",
      ],
      localNote: "Mill Creek sits in east Manatee County near Lakewood Ranch, with larger single-family lots.",
      faqs: [
        { q: "Do you cover Mill Creek?", a: "Yes, it is within our Manatee County service area, near Lakewood Ranch." },
        { q: "How is a move here priced?", a: "A flat written estimate after a walkthrough or video." },
      ],
    },
  },
  {
    slug: "bird-key", name: "Bird Key", county: "Sarasota County", keyword: "movers Bird Key",
    title: TITLE("Bird Key"),
    metaDesc: "Bird Key movers for the exclusive waterfront island between downtown Sarasota and St Armands. Discreet, careful crews. Call (941) 809-5777.",
    content: {
      intro: [
        "Bird Key is the exclusive waterfront island between downtown Sarasota and St. Armands, a single gated neighborhood of high-value homes on the bay. Moves here are about discretion, careful handling, and respecting the home and the island.",
        "We bring careful, discreet crews to Bird Key, plan the access, and treat high-value homes with the extra care they call for.",
      ],
      localNote: "Bird Key is a gated waterfront community on the bay between downtown Sarasota and St. Armands.",
      faqs: [
        { q: "Do you handle high-value waterfront homes on Bird Key?", a: "Yes. Ask about our white glove and VIP service for extra-care moves." },
        { q: "Will the crew be discreet and careful?", a: "Yes, that is the standard for our work on the keys and in luxury homes." },
      ],
    },
  },
  {
    slug: "esplanade", name: "Esplanade", county: "Manatee County", keyword: "movers Esplanade",
    title: TITLE("Esplanade"),
    metaDesc: "Esplanade movers for the resort-style golf and 55-plus communities of the area. We know the gates and rules. Call (941) 809-5777.",
    content: {
      intro: [
        "Esplanade communities are resort-style, amenity-rich neighborhoods built around golf and active-adult living, gated and run by an HOA with clear move-in procedures. Many residents are downsizing or relocating from out of state.",
        "We move into the Esplanade communities regularly, plan the gate access and move-in window ahead, and handle downsizing moves with patience.",
      ],
      localNote: "Esplanade refers to the resort-style gated golf and 55-plus communities in the area, with amenity centers and HOA move-in rules.",
      faqs: [
        { q: "Do you know the Esplanade community rules?", a: "Yes. We arrange gate access and any move-in registration ahead of your date." },
        { q: "Do you help with out-of-state moves into Esplanade?", a: "Yes, interstate moves into the community are common; one contact handles the whole haul." },
      ],
    },
  },
  {
    slug: "palmetto", name: "Palmetto", county: "Manatee County", keyword: "movers Palmetto FL",
    title: TITLE("Palmetto"),
    metaDesc: "Palmetto movers for the riverfront town north of the Manatee River. Older homes and new communities handled with care. Call (941) 809-5777.",
    content: {
      intro: [
        "Palmetto sits just north of Bradenton across the Manatee River, a working riverfront town with older established homes near the water and newer communities filling in around it. It is close to home base and easy for us to serve.",
        "We move Palmetto homes and businesses with the same flat quotes and careful crews we bring across Manatee County.",
      ],
      localNote: "Palmetto is north of the Manatee River from Bradenton, with riverfront older homes and growing communities.",
      faqs: [
        { q: "Do you serve Palmetto?", a: "Yes, it is just across the river from Bradenton, well within our service area." },
        { q: "Do you move both homes and businesses here?", a: "Yes, residential and commercial both. Call (941) 809-5777 with your move." },
      ],
    },
  },
];
