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
    subTagline: "Artisanal Specialty Coffee, Hearthside Baking & Contemporary Bistro Sanctuary",
    cityContext: "Kolkata, India",
    storyHeadline: "Inspired by the Bengali essence of 'Jalchobi' — liquid silhouettes and watercolor reflections mirrored on moving water.",
    isVerified: false,
  },
  contact: {
    addressLine1: "Flagship Sanctuary [Location Pending Announcement]",
    addressLine2: "Heritage Arts & Cultural Quarter",
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
      notes: "Morning Pour-Over Bar opens 8:00 AM; Hearth Kitchen closes 10:00 PM",
    },
    {
      days: "Friday",
      hours: "08:00 AM – 11:45 PM",
      notes: "Evening Acoustic Sessions & Late Hearth Dinner",
    },
    {
      days: "Saturday",
      hours: "08:30 AM – 11:45 PM",
      notes: "All-Day Weekend Brunch from 8:30 AM",
    },
    {
      days: "Sunday",
      hours: "08:30 AM – 10:00 PM",
      notes: "Twilight Tea Service & Sunday Hearth Roast",
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
      title: "Jalchobi Twilight Exterior Concept",
      category: "Architecture",
      description: "Cinematic facade featuring deep forest green trim, warm walnut accents, glowing brass signage, and wet stone reflections.",
      image: "/images/jalchobi-exterior-dusk.jpg",
      isAiConcept: true,
    },
    {
      id: "g-2",
      title: "The Artisanal Pour-Over & Brew Bar",
      category: "Brew Bar",
      description: "Precision extraction with goose-neck kettles and rotating single-origin harvests from Indian and international estates.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-3",
      title: "Morning Brioche & Tartines",
      category: "Culinary",
      description: "Freshly baked sourdough and organic brioche prepared every dawn in our hearth oven.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-4",
      title: "Warm Timber & Brass Sanctuary",
      category: "Atmosphere",
      description: "Natural walnut tables, amber ambient pendant lamps, and acoustic timber fins designed for quiet conversation.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-5",
      title: "Handcrafted Espresso Artistry",
      category: "Brew Bar",
      description: "Silky micro-foam poured on rich crema roasted to celebrate sweet natural sugars.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-6",
      title: "Botanical Corners & Quiet Seating",
      category: "Atmosphere",
      description: "Quiet alcoves nestled beside lush greenery and curated modern art pieces.",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
  ],
  reservationEndpoint: {
    isLiveBackend: false,
    notice: "Demonstration & Concierge Reservation System — Submissions simulate confirmed reservation requests with a generated reference code. No real booking will be processed.",
  },
};
