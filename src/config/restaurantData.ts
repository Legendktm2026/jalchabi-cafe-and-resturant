/**
 * Jalchobi Cafe & Restaurant — Centralized Business & Concept Configuration
 * 
 * Location & Context: Kolkata, India.
 * Note on Data Authenticity & Verification:
 * As this is a conceptual 3D hospitality preview, physical street addresses,
 * telephone lines, exact coordinates, and business registration IDs are pending
 * official opening announcement in Kolkata and are designated with editable
 * placeholders (isVerified: false). All menu offerings and prices are sample data.
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'specialty' | 'brunch' | 'mains' | 'dessert';
  description: string;
  price: string;
  dietary?: ('Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Dairy-Free' | 'Chef Specialty')[];
  image: string;
  highlight?: boolean;
  calories?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Atmosphere' | 'Brew Bar' | 'Culinary' | 'Architecture';
  description: string;
  image: string;
  isAiConcept: boolean;
}

export interface RestaurantConfig {
  meta: {
    brandName: string;
    tagline: string;
    subTagline: string;
    cityContext: string;
    storyHeadline: string;
    isVerified: boolean;
  };
  contact: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    isDemoLocation: boolean;
    notice: string;
  };
  hours: {
    days: string;
    hours: string;
    notes?: string;
  }[];
  socials: {
    platform: string;
    url: string;
    handle: string;
  }[];
  features: {
    wifi: boolean;
    curbsidePickup: boolean;
    terraceDining: boolean;
    privateEvents: boolean;
    wheelchairAccessible: boolean;
  };
  menu: MenuItem[];
  gallery: GalleryItem[];
  reservationEndpoint: {
    isLiveBackend: boolean;
    notice: string;
  };
}

export const RESTAURANT_DATA: RestaurantConfig = {
  meta: {
    brandName: "Jalchobi",
    tagline: "A place to linger.",
    subTagline: "Artisanal Specialty Coffee, Hearthside Bistro & Lakeside Sanctuary",
    cityContext: "Kolkata, India",
    storyHeadline: "Inspired by the Bengali soul of 'Jalchobi' (জলছবি — water reflection) — a serene lakeside sanctuary featuring a tranquil central lake flanked by 4+4 waterside edge tables, a left-wing heritage restaurant with an exclusive SE room, a clean lawn meadow with 5 private dining tents, and an open-air rooftop terrace under Kolkata's twilight sky.",
    isVerified: false,
  },
  contact: {
    addressLine1: "Flagship Lakeside Sanctuary [Location Pending Announcement]",
    addressLine2: "Waterfront & Cultural Heritage Quarter",
    city: "Kolkata",
    country: "India",
    phoneDisplay: "+91 (033) 2400-XXXX (Configurable)",
    phoneHref: "tel:+913324000000",
    email: "concierge@jalchobi-kolkata.example.com",
    isDemoLocation: true,
    notice: "Physical address and operating contacts are currently in private preview prior to the official launch in Kolkata.",
  },
  hours: [
    {
      days: "Monday – Thursday",
      hours: "08:00 AM – 10:30 PM",
      notes: "Morning Lakeside Brews from 8:00 AM; Hearth Kitchen closes 10:00 PM",
    },
    {
      days: "Friday",
      hours: "08:00 AM – 11:45 PM",
      notes: "Rooftop Stargazing & Lawn Tent Acoustic Sessions",
    },
    {
      days: "Saturday",
      hours: "08:30 AM – 11:45 PM",
      notes: "All-Day Waterside Brunch & Twilight Lawn Gatherings",
    },
    {
      days: "Sunday",
      hours: "08:30 AM – 10:00 PM",
      notes: "Sunset Lakeside Tea Service & Sunday Hearth Roast",
    },
  ],
  socials: [
    {
      platform: "Instagram",
      url: "https://instagram.com/jalchobi.kolkata",
      handle: "@jalchobi.kolkata",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/jalchobi.kolkata",
      handle: "/jalchobi.kolkata",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/jalchobikolkata",
      handle: "@jalchobikolkata",
    },
  ],
  features: {
    wifi: true,
    curbsidePickup: true,
    terraceDining: true,
    privateEvents: true,
    wheelchairAccessible: true,
  },
  menu: [
    {
      id: "m-1",
      name: "Single Origin Araku Valley Pour-Over",
      category: "coffee",
      description: "Jasmine blossom aroma, candied citrus, and wild honey finish brewed via Kalita Wave ceramic dripper.",
      price: "₹340",
      dietary: ["Vegan", "Gluten-Free", "Chef Specialty"],
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: "m-2",
      name: "Velvet Amber Cortado",
      category: "coffee",
      description: "Double ristretto over equal silky micro-textured oat or whole milk, finished with organic maple mist.",
      price: "₹260",
      dietary: ["Vegetarian"],
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-3",
      name: "Saffron & Green Cardamom Cold Foam Latte",
      category: "specialty",
      description: "24-hour slow-dripped cold brew infused with Kashmiri saffron threads and airy cardamom sweet cream.",
      price: "₹380",
      dietary: ["Vegetarian", "Chef Specialty"],
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: "m-4",
      name: "Darjeeling First Flush Cascara Fizz",
      category: "specialty",
      description: "Sun-dried coffee cherry infusion with sparkling botanical tonic, charred rosemary sprig, and kaffir lime.",
      price: "₹310",
      dietary: ["Vegan", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-5",
      name: "Wild Forest Mushroom & Truffle Brioche Tartine",
      category: "brunch",
      description: "Sautéed chanterelles, soft thyme butter, whipped goat curd, runny soft-poached pasture egg on artisanal sourdough.",
      price: "₹560",
      dietary: ["Vegetarian", "Chef Specialty"],
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: "m-6",
      name: "Crushed Avocado & Pistachio Dukkah Tart",
      category: "brunch",
      description: "Rich avocado mash, roasted Egyptian pistachio crumble, pickled shallots, Persian feta on house multigrain sourdough.",
      price: "₹490",
      dietary: ["Vegetarian"],
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-7",
      name: "Wood-Fired Pan-Seared Bhetki & Watercress",
      category: "mains",
      description: "Crispy skin Bengal Bhetki over saffron pearl couscous, charred tenderstem greens, and lemon-caper emulsion.",
      price: "₹890",
      dietary: ["Gluten-Free", "Chef Specialty"],
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: "m-8",
      name: "Smoked Aubergine & Walnut Risotto",
      category: "mains",
      description: "Acquerello aged carnaroli rice, charcoal-roasted aubergine puree, toasted walnuts, aged Parmigiano crisp.",
      price: "₹680",
      dietary: ["Vegetarian", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m-9",
      name: "72% Single Origin Chocolate & Cardamom Torte",
      category: "dessert",
      description: "Single-origin dark chocolate ganache, candied orange peel, cardamom fleur de sel cream, hazelnut praline.",
      price: "₹420",
      dietary: ["Vegetarian", "Gluten-Free", "Chef Specialty"],
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: "m-10",
      name: "Pistachio & Orange Blossom Mille-Feuille",
      category: "dessert",
      description: "Caramelized puff pastry leaves, bronte pistachio diplomat cream, crushed raspberries, delicate gold dust.",
      price: "₹450",
      dietary: ["Vegetarian"],
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    },
  ],
  gallery: [
    {
      id: "g-1",
      title: "Jalchobi Twilight Lakeside Facade",
      category: "Architecture",
      description: "Cinematic dusk facade facing the tranquil lake, featuring deep forest green trim, warm walnut accents, glowing brass signage, and ripples on water.",
      image: "/images/jalchobi-exterior-dusk.jpg",
      isAiConcept: true,
    },
    {
      id: "g-2",
      title: "The 4+4 Lakeside Edge Promenade",
      category: "Atmosphere",
      description: "Intimate 4+4 waterside tables set on both sides of the calm lake, capturing twilight reflections, evening breeze, and lantern glow.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-3",
      title: "Clean Lawn Ground & 5 Dining Tents",
      category: "Atmosphere",
      description: "Pristine open manicured lawn featuring five beautiful dining tents/cabanas curated for family celebrations, private groups, and couples.",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-4",
      title: "Left Wing: Heritage Restaurant & SE Room",
      category: "Architecture",
      description: "Warm hearthside dining pavilion adjoining the exclusive Special Enclosed (SE Room) salon for intimate private banquets and conferences.",
      image: "/images/jalchobi-interior-concept.jpg",
      isAiConcept: true,
    },
    {
      id: "g-5",
      title: "Open-Air Rooftop Stargazing Deck",
      category: "Atmosphere",
      description: "Elevated rooftop lounge overlooking the small lake, illuminated meadow tents, and the Kolkata evening skyline.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-6",
      title: "The Artisanal Pour-Over & Brew Bar",
      category: "Brew Bar",
      description: "Precision extraction with goose-neck kettles and rotating single-origin harvests from Indian and international estates.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
  ],
  reservationEndpoint: {
    isLiveBackend: false,
    notice: "Demonstration & Concierge Reservation System — Submissions simulate confirmed reservation requests with a generated reference code. No real booking will be processed.",
  },
};
