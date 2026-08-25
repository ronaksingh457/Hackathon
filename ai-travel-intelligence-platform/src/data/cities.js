// Centralized city dataset for the Local Intelligence platform.
// NOTE: Weather and local time are NEVER hard-coded here — they are fetched live
// from Open-Meteo and computed from IANA timezones at render time.

const px = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400`;

export const supportedCities = [
  { slug: "delhi", name: "Delhi", state: "Delhi", country: "India" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", country: "India" },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", country: "India" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", country: "India" },
  { slug: "goa", name: "Goa", state: "Goa", country: "India" },
  { slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh", country: "India" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", country: "India" },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", country: "India" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", country: "India" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", country: "India" },
];

export const featuredCities = ["jaipur", "delhi", "agra", "mumbai", "goa"];

export const cityTaglines = {
  jaipur: "Royal architecture, forts and culture.",
  delhi: "History, monuments and modern city life.",
  agra: "Taj Mahal, Mughal heritage and local culture.",
  mumbai: "Coastal city, entertainment and food.",
  goa: "Beaches, nightlife and Portuguese heritage.",
  varanasi: "Sacred ghats and timeless spirituality.",
  hyderabad: "Nizami charm, pearls and biryani.",
  bengaluru: "Gardens, tech hubs and pleasant weather.",
  kolkata: "Colonial grandeur and cultural soul.",
  chennai: "Temples, shores and classical heritage.",
};

export const cityHeroImages = {
  delhi: px(6472566),
  mumbai: px(6522114),
  agra: px(11948442),
  jaipur: px(19521546),
  goa: px(32262444),
  varanasi: px(38857186),
  hyderabad: px(38670572),
  bengaluru: px(13508081),
  kolkata: px(36206909),
  chennai: px(8572308),
};

export const cities = {
  agra: {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    image: cityHeroImages.agra,
    tagline: cityTaglines.agra,
    places: [
      {
        id: "agra-taj-mahal",
        name: "Taj Mahal",
        category: "Historic Monument",
        description: "The iconic ivory-white marble mausoleum, a UNESCO World Heritage Site and symbol of eternal love.",
        location: "Dharmapuri, Agra",
        rating: 4.9,
        image: px(17423832),
      },
      {
        id: "agra-fort",
        name: "Agra Fort",
        category: "Mughal Fort",
        description: "A massive red sandstone fort that once housed Mughal emperors, overlooking the Yamuna river.",
        location: "Rakabganj, Agra",
        rating: 4.6,
        image: px(37126722),
      },
      {
        id: "agra-mehtab-bagh",
        name: "Mehtab Bagh",
        category: "Garden",
        description: "A charbagh garden across the river offering a serene, uncrowded view of the Taj Mahal at sunset.",
        location: "Yamuna Riverfront, Agra",
        rating: 4.4,
        image: px(19149620),
      },
    ],
    hiddenGems: [
      {
        id: "agra-kinari-bazaar",
        name: "Kinari Bazaar",
        description: "A maze of narrow lanes packed with traditional jewellery, textiles and street food, rarely explored by tourists.",
        location: "Old Agra",
        tag: "Local Recommendation",
        image: px(36988744),
      },
      {
        id: "agra-sadar-bazaar",
        name: "Sadar Bazaar Market",
        description: "A relaxed evening market popular with locals for affordable leather goods and marble handicrafts.",
        location: "Sadar Bazaar, Agra",
        tag: "Local Contributor",
        image: px(33976900),
      },
    ],
    foods: [
      { id: "agra-f1", name: "Mughlai Thali", description: "A royal spread of rich Mughlai curries, naan and rice.", price: "₹350 – ₹500", location: "Sadar Bazaar", image: px(29148133), specialty: true },
      { id: "agra-f2", name: "Bedai & Jalebi", description: "Classic Agra breakfast — spicy stuffed puri with hot jalebi.", price: "₹60 – ₹100", location: "Deviram Sweets, Agra", image: px(17223838), specialty: true },
      { id: "agra-f3", name: "Agra Petha", description: "Translucent, syrup-soaked sweet made from ash gourd — Agra's signature sweet.", price: "₹150 – ₹300 / kg", location: "Panchhi Petha, MG Road", image: px(17223836), specialty: true },
    ],
    events: [
      { id: "agra-e1", title: "Taj Mahotsav Cultural Fair", date: "Feb 18–27", time: "10:00 AM – 9:00 PM", location: "Shilpgram, Agra", category: "Festival", timestamp: "Updated 2 hours ago", source: "State Tourism Board", demo: true },
      { id: "agra-e2", title: "Heavy Crowd Advisory — Taj East Gate", date: "Today", time: "4:00 PM – 7:00 PM", location: "Taj East Gate", category: "Crowd Update", timestamp: "Updated 18 minutes ago", source: "Community Report", demo: true },
      { id: "agra-e3", title: "Road Maintenance Near Fatehabad Road", date: "This Week", time: "11:00 PM – 5:00 AM", location: "Fatehabad Road", category: "Traffic Update", timestamp: "Updated 40 minutes ago", source: "Municipal Corporation", demo: true },
    ],
    localInsights: [
      { id: "agra-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Taj East Gate", text: "Heavy traffic reported due to tourist buses queueing.", timeAgo: "18 minutes ago", confirmations: 12, reliability: 82 },
      { id: "agra-li2", type: "Local Recommendation", icon: "Utensils", location: "Sadar Bazaar", text: "Affordable breakfast options are available before 10 AM before prices rise for tourists.", tagLabel: "Verified Local" },
      { id: "agra-li3", type: "Hidden Local Insight", icon: "Gem", location: "Local handicraft market", text: "Small handicraft market near Kinari Bazaar is often missed by tourists but has better marble prices.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Heavy traffic near Taj East Gate",
      crowd: "High crowd expected near major attractions (4 PM – 7 PM)",
      communityReport: "Minor overcharging reports near parking areas",
    },
    coordinatesFallback: { latitude: 27.1767, longitude: 78.0081, timezone: "Asia/Kolkata" },
  },

  jaipur: {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    image: cityHeroImages.jaipur,
    tagline: cityTaglines.jaipur,
    places: [
      { id: "jaipur-hawa-mahal", name: "Hawa Mahal", category: "Palace", description: "The 'Palace of Winds' with its honeycomb facade of 953 small windows.", location: "Badi Choupad, Jaipur", rating: 4.7, image: px(19149591) },
      { id: "jaipur-amber-fort", name: "Amber Fort", category: "Hilltop Fort", description: "A majestic fort of pale yellow and pink sandstone overlooking Maota Lake.", location: "Amer, Jaipur", rating: 4.8, image: px(19446861) },
      { id: "jaipur-city-palace", name: "City Palace", category: "Royal Palace", description: "A blend of Rajasthani and Mughal architecture, still home to the royal family.", location: "Walled City, Jaipur", rating: 4.6, image: px(6060939) },
    ],
    hiddenGems: [
      { id: "jaipur-hg1", name: "Amber Fort Backlanes", description: "Quiet stone lanes below the fort with local tea stalls and artisan workshops.", location: "Amer Village", tag: "Local Recommendation", image: px(32489424) },
      { id: "jaipur-hg2", name: "Panna Meena ka Kund", description: "A stunning symmetrical stepwell often overlooked next to Amer's crowds.", location: "Amer, Jaipur", tag: "Local Contributor", image: px(35359036) },
    ],
    foods: [
      { id: "jaipur-f1", name: "Dal Baati Churma", description: "Baked wheat rolls with lentil curry and sweet crumbled churma.", price: "₹200 – ₹350", location: "Chokhi Dhani style eateries", image: px(8818723), specialty: true },
      { id: "jaipur-f2", name: "Pyaaz Kachori", description: "Crispy onion-stuffed pastry, a Jaipur breakfast favourite.", price: "₹30 – ₹50", location: "Rawat Mishthan Bhandar", image: px(17223835), specialty: true },
      { id: "jaipur-f3", name: "Ghewar", description: "Disc-shaped, syrup-soaked sweet, especially popular during festivals.", price: "₹250 – ₹450 / kg", location: "Johri Bazaar", image: px(29548653), specialty: true },
    ],
    events: [
      { id: "jaipur-e1", title: "Jaipur Literature Festival", date: "Jan 23–27", time: "9:00 AM – 6:00 PM", location: "Diggi Palace", category: "Festival", timestamp: "Updated 3 hours ago", source: "Event Organizers", demo: true },
      { id: "jaipur-e2", title: "High Footfall — Hawa Mahal", date: "Today", time: "9:00 AM – 12:00 PM", location: "Hawa Mahal", category: "Crowd Update", timestamp: "Updated 25 minutes ago", source: "Community Report", demo: true },
      { id: "jaipur-e3", title: "Evening Light & Sound Show", date: "Daily", time: "7:30 PM", location: "Amber Fort", category: "Show", timestamp: "Updated 1 hour ago", source: "Tourism Department", demo: true },
    ],
    localInsights: [
      { id: "jaipur-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Amer Road", text: "Congestion building up near the fort parking due to tour buses.", timeAgo: "25 minutes ago", confirmations: 9, reliability: 76 },
      { id: "jaipur-li2", type: "Local Recommendation", icon: "Utensils", location: "Johri Bazaar", text: "Best lac bangles and jewellery prices are found early morning before tourist rush.", tagLabel: "Verified Local" },
      { id: "jaipur-li3", type: "Hidden Local Insight", icon: "Gem", location: "Panna Meena ka Kund", text: "A peaceful stepwell just minutes from Amber Fort — most tourists miss it entirely.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Congestion near Amer Fort parking area",
      crowd: "High visitor density expected at Hawa Mahal in the morning",
      communityReport: null,
    },
    coordinatesFallback: { latitude: 26.9124, longitude: 75.7873, timezone: "Asia/Kolkata" },
  },

  delhi: {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    country: "India",
    image: cityHeroImages.delhi,
    tagline: cityTaglines.delhi,
    places: [
      { id: "delhi-india-gate", name: "India Gate", category: "War Memorial", description: "A 42m high memorial arch honouring Indian soldiers, surrounded by expansive lawns.", location: "Rajpath, New Delhi", rating: 4.7, image: px(30032907) },
      { id: "delhi-red-fort", name: "Red Fort", category: "Mughal Fort", description: "A UNESCO listed red sandstone fort that was the seat of Mughal power for 200 years.", location: "Chandni Chowk, Delhi", rating: 4.6, image: px(16892484) },
      { id: "delhi-qutub-minar", name: "Qutub Minar", category: "Minaret", description: "The world's tallest brick minaret, surrounded by ancient ruins and inscriptions.", location: "Mehrauli, Delhi", rating: 4.6, image: px(16892575) },
    ],
    hiddenGems: [
      { id: "delhi-hg1", name: "Lodhi Garden Ruins", description: "15th-century tombs scattered across a quiet, tree-lined public garden.", location: "Lodhi Road", tag: "Local Recommendation", image: px(19927019) },
      { id: "delhi-hg2", name: "Majnu ka Tilla", description: "A Tibetan colony with quiet cafes, monasteries and prayer flags — a different side of Delhi.", location: "North Delhi", tag: "Local Contributor", image: px(37037823) },
    ],
    foods: [
      { id: "delhi-f1", name: "Butter Chicken & Naan", description: "Delhi's most iconic invention — creamy tomato-butter chicken curry.", price: "₹300 – ₹500", location: "Moti Mahal, Daryaganj", image: px(37420999), specialty: true },
      { id: "delhi-f2", name: "Golgappa (Pani Puri)", description: "Crisp hollow puris filled with spiced tangy water — Delhi street food royalty.", price: "₹40 – ₹80", location: "Chandni Chowk", image: px(12427783), specialty: true },
      { id: "delhi-f3", name: "Chole Bhature", description: "Fluffy fried bread served with spicy chickpea curry.", price: "₹80 – ₹150", location: "Sitaram Diwan Chand, Paharganj", image: px(8818657), specialty: true },
    ],
    events: [
      { id: "delhi-e1", title: "Delhi Winter Carnival", date: "Dec 15–31", time: "4:00 PM – 10:00 PM", location: "Connaught Place", category: "Festival", timestamp: "Updated 1 hour ago", source: "Municipal Corporation", demo: true },
      { id: "delhi-e2", title: "High Security Zone Notice", date: "Today", time: "All Day", location: "Near Rajpath", category: "Advisory", timestamp: "Updated 30 minutes ago", source: "Official Source", demo: true },
      { id: "delhi-e3", title: "Metro Maintenance — Yellow Line", date: "Tonight", time: "11:00 PM – 4:00 AM", location: "Yellow Line", category: "Traffic Update", timestamp: "Updated 50 minutes ago", source: "DMRC", demo: true },
    ],
    localInsights: [
      { id: "delhi-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Connaught Place", text: "Slow moving traffic reported due to ongoing metro works.", timeAgo: "22 minutes ago", confirmations: 15, reliability: 85 },
      { id: "delhi-li2", type: "Local Recommendation", icon: "Utensils", location: "Chandni Chowk", text: "Visit before 11 AM for fresh parathas without the afternoon crowd.", tagLabel: "Verified Local" },
      { id: "delhi-li3", type: "Hidden Local Insight", icon: "Gem", location: "Majnu ka Tilla", text: "A calm riverside colony with authentic Tibetan food, overlooked by most visitors.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Slow traffic near Connaught Place due to metro works",
      crowd: "Moderate crowd expected at India Gate during evening",
      communityReport: null,
    },
    coordinatesFallback: { latitude: 28.6139, longitude: 77.2090, timezone: "Asia/Kolkata" },
  },

  mumbai: {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    image: cityHeroImages.mumbai,
    tagline: cityTaglines.mumbai,
    places: [
      { id: "mumbai-gateway", name: "Gateway of India", category: "Monument", description: "An arch monument overlooking the Arabian Sea, built to commemorate King George V's visit.", location: "Colaba, Mumbai", rating: 4.6, image: px(21319632) },
      { id: "mumbai-marine-drive", name: "Marine Drive", category: "Promenade", description: "A sweeping 3.6km boulevard along the coast, famously lit up at night as the 'Queen's Necklace'.", location: "Marine Drive, Mumbai", rating: 4.7, image: px(14232429) },
      { id: "mumbai-sea-link", name: "Bandra-Worli Sea Link", category: "Landmark", description: "An iconic cable-stayed bridge connecting the western suburbs to the city.", location: "Bandra, Mumbai", rating: 4.5, image: px(13074008) },
    ],
    hiddenGems: [
      { id: "mumbai-hg1", name: "Sassoon Dock", description: "A working fishing dock offering an authentic, unfiltered glimpse of old Mumbai at dawn.", location: "Colaba", tag: "Local Recommendation", image: px(8034398) },
      { id: "mumbai-hg2", name: "Banganga Tank", description: "An ancient stepped water tank hidden amid the city, remarkably calm despite the surroundings.", location: "Malabar Hill", tag: "Local Contributor", image: px(34415609) },
    ],
    foods: [
      { id: "mumbai-f1", name: "Vada Pav & Manchurian Chaat", description: "Mumbai's favourite spicy potato fritter burger with a street-chaat twist.", price: "₹20 – ₹60", location: "Ashok Vada Pav, Dadar", image: px(28909537), specialty: true },
      { id: "mumbai-f2", name: "Bombay Pulao", description: "A quick, mildly spiced one-pot rice dish loaded with vegetables.", price: "₹120 – ₹200", location: "Local Udupi eateries", image: px(4439740), specialty: true },
      { id: "mumbai-f3", name: "Mumbai Chicken Biryani", description: "Fragrant layered biryani with a distinct coastal Mumbai spice blend.", price: "₹250 – ₹400", location: "Byculla / Bhendi Bazaar", image: px(28674660), specialty: true },
    ],
    events: [
      { id: "mumbai-e1", title: "Kala Ghoda Arts Festival", date: "Feb 1–9", time: "10:00 AM – 8:00 PM", location: "Kala Ghoda", category: "Festival", timestamp: "Updated 2 hours ago", source: "Event Organizers", demo: true },
      { id: "mumbai-e2", title: "Heavy Rain Advisory", date: "Today", time: "Evening", location: "Coastal Mumbai", category: "Weather Advisory", timestamp: "Updated 35 minutes ago", source: "IMD (Demo)", demo: true },
      { id: "mumbai-e3", title: "Local Train Delay — Western Line", date: "Today", time: "Ongoing", location: "Western Railway", category: "Traffic Update", timestamp: "Updated 12 minutes ago", source: "Community Report", demo: true },
    ],
    localInsights: [
      { id: "mumbai-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Western Express Highway", text: "Heavy congestion reported due to waterlogging near Andheri.", timeAgo: "14 minutes ago", confirmations: 20, reliability: 88 },
      { id: "mumbai-li2", type: "Local Recommendation", icon: "Utensils", location: "Dadar", text: "Best vada pav stalls are busiest 1–3 PM; visit earlier for fresher batches.", tagLabel: "Verified Local" },
      { id: "mumbai-li3", type: "Hidden Local Insight", icon: "Gem", location: "Banganga Tank", text: "A quiet heritage tank tucked away from Malabar Hill's busy streets.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Congestion on Western Express Highway near Andheri",
      crowd: "Moderate crowd at Gateway of India during evening",
      communityReport: "Local trains report minor delays on Western Line",
    },
    coordinatesFallback: { latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata" },
  },

  goa: {
    slug: "goa",
    name: "Goa",
    state: "Goa",
    country: "India",
    image: cityHeroImages.goa,
    tagline: cityTaglines.goa,
    places: [
      { id: "goa-baga", name: "Baga Beach", category: "Beach", description: "A lively beach known for water sports, beach shacks and nightlife.", location: "North Goa", rating: 4.5, image: px(32262431) },
      { id: "goa-fort-aguada", name: "Fort Aguada", category: "Portuguese Fort", description: "A 17th-century Portuguese fort with a lighthouse and sweeping sea views.", location: "Candolim, Goa", rating: 4.6, image: px(35401276) },
      { id: "goa-chapora-fort", name: "Chapora Fort", category: "Hilltop Fort", description: "A laterite hill fort famous for panoramic views of the coastline.", location: "Bardez, Goa", rating: 4.4, image: px(35213134) },
    ],
    hiddenGems: [
      { id: "goa-hg1", name: "Divar Island", description: "A tranquil island reachable only by ferry, with old churches and paddy fields.", location: "Divar Island", tag: "Local Recommendation", image: px(32262441) },
      { id: "goa-hg2", name: "Anjuna Flea Market Backstreets", description: "Quiet lanes beyond the main flea market with local craft stalls and cafes.", location: "Anjuna", tag: "Local Contributor", image: px(39080729) },
    ],
    foods: [
      { id: "goa-f1", name: "Goan Fish Curry Rice", description: "Tangy coconut-based fish curry, a Goan household staple.", price: "₹250 – ₹450", location: "Ritz Classic, Panjim", image: px(32825917), specialty: true },
      { id: "goa-f2", name: "Prawn Balchao Biryani", description: "Spicy, tangy Goan-Portuguese style prawn biryani.", price: "₹300 – ₹500", location: "Fisherman's Wharf", image: px(37883423), specialty: true },
      { id: "goa-f3", name: "Coconut Rice & Xacuti", description: "Aromatic coconut rice paired with roasted-spice Goan xacuti curry.", price: "₹220 – ₹380", location: "Local beach shacks", image: px(34159107), specialty: true },
    ],
    events: [
      { id: "goa-e1", title: "Sunburn Beachside Festival", date: "Dec 28–31", time: "4:00 PM – 11:00 PM", location: "Vagator Beach", category: "Festival", timestamp: "Updated 1 hour ago", source: "Event Organizers", demo: true },
      { id: "goa-e2", title: "Strong Undercurrent Warning", date: "Today", time: "All Day", location: "Baga & Calangute Beach", category: "Safety Advisory", timestamp: "Updated 20 minutes ago", source: "Coastal Lifeguard (Demo)", demo: true },
      { id: "goa-e3", title: "Night Market at Arpora", date: "Every Saturday", time: "6:00 PM – 1:00 AM", location: "Arpora", category: "Market", timestamp: "Updated 3 hours ago", source: "Community Report", demo: true },
    ],
    localInsights: [
      { id: "goa-li1", type: "Safety Alert", icon: "Waves", location: "Baga Beach", text: "Strong undercurrents reported near the northern stretch of the beach.", timeAgo: "20 minutes ago", confirmations: 18, reliability: 84 },
      { id: "goa-li2", type: "Local Recommendation", icon: "Utensils", location: "Panjim", text: "Local fish thalis are best value at family-run eateries away from the beach strip.", tagLabel: "Verified Local" },
      { id: "goa-li3", type: "Hidden Local Insight", icon: "Gem", location: "Divar Island", text: "Take the free ferry from Old Goa for a completely different, peaceful side of Goa.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: "Strong undercurrent warning near Baga Beach",
      traffic: null,
      crowd: "High crowd expected at Baga Beach during evening",
      communityReport: null,
    },
    coordinatesFallback: { latitude: 15.2993, longitude: 74.1240, timezone: "Asia/Kolkata" },
  },

  varanasi: {
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    image: cityHeroImages.varanasi,
    tagline: cityTaglines.varanasi,
    places: [
      { id: "varanasi-dashashwamedh", name: "Dashashwamedh Ghat", category: "Sacred Ghat", description: "The main ghat, famous for the mesmerising evening Ganga Aarti ceremony.", location: "Dashashwamedh Ghat", rating: 4.8, image: px(19272041) },
      { id: "varanasi-ganga-aarti", name: "Ganga Aarti", category: "Ritual", description: "A devotional fire ritual performed each evening with lamps, chants and music.", location: "Riverfront, Varanasi", rating: 4.9, image: px(20988783) },
      { id: "varanasi-sarnath", name: "Sarnath", category: "Buddhist Site", description: "The site where Buddha gave his first sermon, home to ancient stupas.", location: "Sarnath, Varanasi", rating: 4.6, image: px(19272052) },
    ],
    hiddenGems: [
      { id: "varanasi-hg1", name: "Assi Ghat at Sunrise", description: "A quieter ghat upstream, best experienced during the peaceful early morning hours.", location: "Assi Ghat", tag: "Local Recommendation", image: px(36429317) },
      { id: "varanasi-hg2", name: "Vishwanath Gali Lanes", description: "Narrow winding lanes filled with small shrines, sweet shops and silk weavers.", location: "Old City, Varanasi", tag: "Local Contributor", image: px(35160627) },
    ],
    foods: [
      { id: "varanasi-f1", name: "Banarasi Thali", description: "A wholesome traditional thali showcasing eastern UP flavours.", price: "₹150 – ₹300", location: "Kashi Chat Bhandar area", image: px(32083366), specialty: true },
      { id: "varanasi-f2", name: "Jalebi & Rabri", description: "Freshly fried jalebi served warm with thick sweetened rabri.", price: "₹60 – ₹120", location: "Blue Lassi Shop lane", image: px(5916371), specialty: true },
      { id: "varanasi-f3", name: "Malaiyo", description: "A seasonal winter dessert of saffron-flavoured milk foam.", price: "₹50 – ₹90", location: "Old City lanes", image: px(32443612), specialty: true },
    ],
    events: [
      { id: "varanasi-e1", title: "Dev Deepawali Celebrations", date: "Nov 15", time: "5:30 PM Onwards", location: "All Ghats", category: "Festival", timestamp: "Updated 4 hours ago", source: "State Tourism Board", demo: true },
      { id: "varanasi-e2", title: "High Crowd at Ganga Aarti", date: "Today", time: "6:00 PM – 7:30 PM", location: "Dashashwamedh Ghat", category: "Crowd Update", timestamp: "Updated 10 minutes ago", source: "Community Report", demo: true },
      { id: "varanasi-e3", title: "Boat Fare Regulation Notice", date: "This Week", time: "All Day", location: "Ghats", category: "Advisory", timestamp: "Updated 1 hour ago", source: "Local Authority", demo: true },
    ],
    localInsights: [
      { id: "varanasi-li1", type: "Crowd Alert", icon: "Users", location: "Dashashwamedh Ghat", text: "Very high crowd density expected for the evening aarti ceremony.", timeAgo: "10 minutes ago", confirmations: 22, reliability: 90 },
      { id: "varanasi-li2", type: "Local Recommendation", icon: "Utensils", location: "Old City", text: "Boat rides are cheaper if booked directly at Assi Ghat rather than through agents.", tagLabel: "Verified Local" },
      { id: "varanasi-li3", type: "Hidden Local Insight", icon: "Gem", location: "Vishwanath Gali", text: "Early morning walks reveal a calmer, more authentic side of the old city.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: null,
      crowd: "Very high crowd expected at Dashashwamedh Ghat during evening aarti",
      communityReport: "Some boat operators reported overcharging tourists",
    },
    coordinatesFallback: { latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata" },
  },

  hyderabad: {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    country: "India",
    image: cityHeroImages.hyderabad,
    tagline: cityTaglines.hyderabad,
    places: [
      { id: "hyd-charminar", name: "Charminar", category: "Monument", description: "A 16th-century mosque and monument with four grand arches, the symbol of Hyderabad.", location: "Old City, Hyderabad", rating: 4.7, image: px(36097666) },
      { id: "hyd-golconda", name: "Golconda Fort", category: "Fort", description: "A ruined fortress once famous for the diamonds traded within its walls.", location: "Golconda, Hyderabad", rating: 4.6, image: px(38670570) },
      { id: "hyd-qutb-shahi", name: "Qutb Shahi Tombs", category: "Heritage Site", description: "Elegant domed tombs of the Qutb Shahi dynasty set in landscaped gardens.", location: "Near Golconda Fort", rating: 4.5, image: px(29152599) },
    ],
    hiddenGems: [
      { id: "hyd-hg1", name: "Golconda Fort Ramparts Walk", description: "A quiet uphill walk along the fort walls with panoramic city views at dusk.", location: "Golconda", tag: "Local Recommendation", image: px(38670569) },
      { id: "hyd-hg2", name: "Paigah Tombs", description: "Intricately carved marble tombs, rarely visited despite stunning craftsmanship.", location: "Santosh Nagar", tag: "Local Contributor", image: px(29766164) },
    ],
    foods: [
      { id: "hyd-f1", name: "Hyderabadi Biryani", description: "Fragrant dum-cooked basmati rice layered with marinated meat and saffron.", price: "₹200 – ₹400", location: "Paradise, Secunderabad", image: px(34484975), specialty: true },
      { id: "hyd-f2", name: "Hyderabadi Chicken Biryani", description: "A slow-cooked dum biryani variant with a distinct spice blend.", price: "₹220 – ₹420", location: "Bawarchi, RTC X Roads", image: px(28674660), specialty: true },
      { id: "hyd-f3", name: "Double Ka Meetha", description: "A rich bread pudding dessert soaked in sweetened milk and garnished with nuts.", price: "₹80 – ₹150", location: "Old City sweet shops", image: px(36445237), specialty: true },
    ],
    events: [
      { id: "hyd-e1", title: "Deccan Food & Heritage Festival", date: "Jan 10–12", time: "5:00 PM – 10:00 PM", location: "Necklace Road", category: "Festival", timestamp: "Updated 2 hours ago", source: "Event Organizers", demo: true },
      { id: "hyd-e2", title: "Traffic Diversion Near Charminar", date: "Today", time: "Ongoing", location: "Old City", category: "Traffic Update", timestamp: "Updated 15 minutes ago", source: "Traffic Police (Demo)", demo: true },
      { id: "hyd-e3", title: "Golconda Sound & Light Show", date: "Daily", time: "7:00 PM", location: "Golconda Fort", category: "Show", timestamp: "Updated 1 hour ago", source: "Tourism Department", demo: true },
    ],
    localInsights: [
      { id: "hyd-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Charminar Old City", text: "Diversions in place due to ongoing market renovation work.", timeAgo: "15 minutes ago", confirmations: 11, reliability: 79 },
      { id: "hyd-li2", type: "Local Recommendation", icon: "Utensils", location: "Old City", text: "Biryani tastes best fresh from the dum around lunch hours (12–2 PM).", tagLabel: "Verified Local" },
      { id: "hyd-li3", type: "Hidden Local Insight", icon: "Gem", location: "Paigah Tombs", text: "Stunning marble lattice work with almost no visitors compared to Golconda.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Diversions near Charminar due to market renovation",
      crowd: "Moderate crowd expected at Golconda Fort in the evening",
      communityReport: null,
    },
    coordinatesFallback: { latitude: 17.3850, longitude: 78.4867, timezone: "Asia/Kolkata" },
  },

  bengaluru: {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    image: cityHeroImages.bengaluru,
    tagline: cityTaglines.bengaluru,
    places: [
      { id: "blr-palace", name: "Bangalore Palace", category: "Palace", description: "A Tudor-style palace with grand interiors inspired by England's Windsor Castle.", location: "Vasanth Nagar, Bengaluru", rating: 4.5, image: px(35832668) },
      { id: "blr-lalbagh", name: "Lalbagh Botanical Garden", category: "Garden", description: "A sprawling botanical garden with a glasshouse and rare plant species.", location: "Lalbagh, Bengaluru", rating: 4.6, image: px(37096709) },
      { id: "blr-cubbon-park", name: "Cubbon Park", category: "Urban Park", description: "A green landmark in the heart of the city, popular for morning walks.", location: "Cubbon Park, Bengaluru", rating: 4.5, image: px(38555844) },
    ],
    hiddenGems: [
      { id: "blr-hg1", name: "Pete Market Streets", description: "The old commercial heart of Bengaluru with flower, fabric and spice markets.", location: "KR Market area", tag: "Local Recommendation", image: px(15623165) },
      { id: "blr-hg2", name: "ISKCON Temple Courtyard", description: "A calm, contemplative space just outside the city's busy tech corridors.", location: "Rajajinagar", tag: "Local Contributor", image: px(1433350) },
    ],
    foods: [
      { id: "blr-f1", name: "Set Dosa", description: "Soft, spongy mini dosas served in a stack with chutney and sagu.", price: "₹60 – ₹120", location: "Vidyarthi Bhavan, Basavanagudi", image: px(20422138), specialty: true },
      { id: "blr-f2", name: "Rava Idli", description: "A Bengaluru original — semolina idlis seasoned with cumin and cashew.", price: "₹50 – ₹100", location: "MTR, Lalbagh Road", image: px(20422131), specialty: true },
      { id: "blr-f3", name: "Bisi Bele Bath", description: "A hearty, spiced rice-lentil dish with vegetables — Karnataka comfort food.", price: "₹80 – ₹150", location: "Local Udupi restaurants", image: px(20422129), specialty: true },
    ],
    events: [
      { id: "blr-e1", title: "Bengaluru Habba Cultural Festival", date: "Jan 5–15", time: "6:00 PM – 9:30 PM", location: "Various Venues", category: "Festival", timestamp: "Updated 3 hours ago", source: "Event Organizers", demo: true },
      { id: "blr-e2", title: "Waterlogging Alert — Outer Ring Road", date: "Today", time: "Evening", location: "Outer Ring Road", category: "Weather Advisory", timestamp: "Updated 20 minutes ago", source: "Community Report", demo: true },
      { id: "blr-e3", title: "Weekend Flea Market", date: "Every Sunday", time: "10:00 AM – 6:00 PM", location: "Jayanagar", category: "Market", timestamp: "Updated 2 hours ago", source: "Community Report", demo: true },
    ],
    localInsights: [
      { id: "blr-li1", type: "Traffic Alert", icon: "TrafficCone", location: "Outer Ring Road", text: "Slow traffic reported due to evening rain and waterlogging.", timeAgo: "20 minutes ago", confirmations: 14, reliability: 81 },
      { id: "blr-li2", type: "Local Recommendation", icon: "Utensils", location: "Basavanagudi", text: "Arrive before 9 AM at popular breakfast joints to avoid long queues.", tagLabel: "Verified Local" },
      { id: "blr-li3", type: "Hidden Local Insight", icon: "Gem", location: "KR Market", text: "The flower market at dawn is a sensory experience most tourists never see.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Slow traffic on Outer Ring Road due to rain",
      crowd: null,
      communityReport: "Localized waterlogging reported in low-lying areas",
    },
    coordinatesFallback: { latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  },

  kolkata: {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    country: "India",
    image: cityHeroImages.kolkata,
    tagline: cityTaglines.kolkata,
    places: [
      { id: "kol-victoria", name: "Victoria Memorial", category: "Monument", description: "A grand white marble memorial housing a museum of colonial-era artefacts.", location: "Maidan, Kolkata", rating: 4.7, image: px(35560520) },
      { id: "kol-howrah", name: "Howrah Bridge", category: "Landmark Bridge", description: "An iconic cantilever bridge over the Hooghly River, a symbol of the city.", location: "Hooghly River, Kolkata", rating: 4.6, image: px(29484335) },
      { id: "kol-princep", name: "Princep Ghat", category: "Riverfront", description: "A Palladian-style monument on the riverfront, popular for evening strolls.", location: "Strand Road, Kolkata", rating: 4.4, image: px(36569212) },
    ],
    hiddenGems: [
      { id: "kol-hg1", name: "Howrah Bridge at Sunrise", description: "Watching the bridge and river come alive at dawn, away from daytime crowds.", location: "Hooghly Riverfront", tag: "Local Recommendation", image: px(33612641) },
      { id: "kol-hg2", name: "College Street Book Market", description: "Asia's largest second-hand book market, tucked into narrow historic lanes.", location: "College Street", tag: "Local Contributor", image: px(33557931) },
    ],
    foods: [
      { id: "kol-f1", name: "Rosogolla & Bengali Sweets", description: "Spongy, syrup-soaked cheese balls — Kolkata's most famous sweet export.", price: "₹10 – ₹30 / piece", location: "K.C. Das, Esplanade", image: px(35469364), specialty: true },
      { id: "kol-f2", name: "Sandesh", description: "A delicate, lightly sweetened milk-based sweet in many festive shapes.", price: "₹150 – ₹300 / kg", location: "Bhim Chandra Nag", image: px(30251968), specialty: true },
      { id: "kol-f3", name: "Kolkata Kachori & Jalebi", description: "A beloved street breakfast combo enjoyed across the city's older neighbourhoods.", location: "Shyambazar", price: "₹40 – ₹80", image: px(29548653), specialty: true },
    ],
    events: [
      { id: "kol-e1", title: "Kolkata Book Fair", date: "Jan 28 – Feb 9", time: "12:00 PM – 8:30 PM", location: "Central Park, Salt Lake", category: "Festival", timestamp: "Updated 2 hours ago", source: "Event Organizers", demo: true },
      { id: "kol-e2", title: "Tram Route Diversion", date: "Today", time: "Ongoing", location: "BBD Bagh", category: "Traffic Update", timestamp: "Updated 25 minutes ago", source: "Transport Authority", demo: true },
      { id: "kol-e3", title: "Evening Boat Rides", date: "Daily", time: "5:00 PM – 8:00 PM", location: "Princep Ghat", category: "Activity", timestamp: "Updated 1 hour ago", source: "Community Report", demo: true },
    ],
    localInsights: [
      { id: "kol-li1", type: "Traffic Alert", icon: "TrafficCone", location: "BBD Bagh", text: "Tram diversions causing minor delays for road traffic nearby.", timeAgo: "25 minutes ago", confirmations: 10, reliability: 77 },
      { id: "kol-li2", type: "Local Recommendation", icon: "Utensils", location: "Shyambazar", text: "Best kachori-jalebi combo is served fresh only until mid-morning.", tagLabel: "Verified Local" },
      { id: "kol-li3", type: "Hidden Local Insight", icon: "Gem", location: "College Street", text: "Wander beyond the main stalls for rare, out-of-print book collections.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: null,
      traffic: "Minor delays near BBD Bagh due to tram diversion",
      crowd: null,
      communityReport: null,
    },
    coordinatesFallback: { latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  },

  chennai: {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    image: cityHeroImages.chennai,
    tagline: cityTaglines.chennai,
    places: [
      { id: "chn-kapaleeshwarar", name: "Kapaleeshwarar Temple", category: "Temple", description: "A vibrant Dravidian-style temple with an ornately sculpted gopuram.", location: "Mylapore, Chennai", rating: 4.7, image: px(6667281) },
      { id: "chn-marina", name: "Marina Beach", category: "Beach", description: "One of the world's longest urban beaches, popular for evening walks.", location: "Marina Beach, Chennai", rating: 4.5, image: px(38198571) },
      { id: "chn-mahabalipuram", name: "Mahabalipuram Shore Temple", category: "Heritage Site", description: "A UNESCO listed 8th-century granite temple facing the Bay of Bengal.", location: "Mahabalipuram", rating: 4.8, image: px(38412970) },
    ],
    hiddenGems: [
      { id: "chn-hg1", name: "Mylapore Temple Lanes", description: "Traditional Kanjeevaram silk shops and filter coffee stalls in quiet backstreets.", location: "Mylapore", tag: "Local Recommendation", image: px(6667280) },
      { id: "chn-hg2", name: "DakshinaChitra Heritage Village", description: "A living museum of South Indian architecture and crafts, often overlooked.", location: "East Coast Road", tag: "Local Contributor", image: px(34783859) },
    ],
    foods: [
      { id: "chn-f1", name: "Masala Dosa", description: "Crisp golden crepe filled with spiced potato filling, served with chutneys.", price: "₹60 – ₹120", location: "Murugan Idli Shop", image: px(20422133), specialty: true },
      { id: "chn-f2", name: "Idli Sambar", description: "Soft steamed rice cakes served with lentil sambar and coconut chutney.", price: "₹40 – ₹90", location: "Saravana Bhavan", image: px(20422126), specialty: true },
      { id: "chn-f3", name: "Filter Coffee & Idli", description: "Classic South Indian breakfast pairing of frothy filter coffee and idli.", price: "₹50 – ₹100", location: "Local Udupi eateries", image: px(20422128), specialty: true },
    ],
    events: [
      { id: "chn-e1", title: "Chennai Music Season", date: "Dec 1 – Jan 5", time: "5:00 PM – 9:00 PM", location: "Various Sabhas", category: "Festival", timestamp: "Updated 3 hours ago", source: "Event Organizers", demo: true },
      { id: "chn-e2", title: "High Tide Advisory", date: "Today", time: "Evening", location: "Marina Beach", category: "Safety Advisory", timestamp: "Updated 18 minutes ago", source: "Coastal Authority (Demo)", demo: true },
      { id: "chn-e3", title: "Road Closure — Temple Festival", date: "This Week", time: "6:00 AM – 10:00 PM", location: "Mylapore", category: "Traffic Update", timestamp: "Updated 40 minutes ago", source: "Traffic Police (Demo)", demo: true },
    ],
    localInsights: [
      { id: "chn-li1", type: "Safety Alert", icon: "Waves", location: "Marina Beach", text: "High tide conditions reported; swimming advised against this evening.", timeAgo: "18 minutes ago", confirmations: 16, reliability: 83 },
      { id: "chn-li2", type: "Local Recommendation", icon: "Utensils", location: "Mylapore", text: "Filter coffee is best enjoyed at small family-run shops rather than chains.", tagLabel: "Verified Local" },
      { id: "chn-li3", type: "Hidden Local Insight", icon: "Gem", location: "DakshinaChitra", text: "A quiet heritage village showcasing South Indian crafts, missed by most itineraries.", tagLabel: "Local Contributor" },
    ],
    demoSafety: {
      governmentAlert: null,
      verifiedIncident: "High tide advisory issued for Marina Beach",
      traffic: "Road closures near Mylapore due to temple festival",
      crowd: null,
      communityReport: null,
    },
    coordinatesFallback: { latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata" },
  },
};

export function getCityBySlug(slug) {
  return cities[slug] || null;
}
