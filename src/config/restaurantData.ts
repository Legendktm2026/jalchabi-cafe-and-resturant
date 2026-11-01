/**
 * Jalchabi Cafe & Restaurant — Centralized Business & Concept Configuration
 * 
 * Location: Sarberia, Atharobanki, Canning II, South 24 Parganas, West Bengal - 743329
 * Founder & CEO: Sabir Hossen Khan
 * Website Architect & Developer: Rizwan Khan
 * Official Phone: +91 8918948730
 * UPI VPA: 8918948730@upi
 */

export type MenuCategoryType = 
  | 'all'
  | 'momo'
  | 'starters-crispy'
  | 'rolls-sandwiches'
  | 'burgers-pizzas'
  | 'chinese-noodles'
  | 'tandoori-indian'
  | 'beverages-shakes';

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  category: MenuCategoryType;
  description: string;
  bengaliDescription?: string;
  price: string;
  numericPrice: number;
  dietary?: ('Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Dairy-Free' | 'Chef Specialty' | 'Cafe Favorite' | 'Signature Handi')[];
  image: string;
  highlight?: boolean;
  calories?: string;
  servingSize?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Atmosphere' | 'Brew Bar' | 'Culinary' | 'Architecture';
  description: string;
  image: string;
  isAiConcept: boolean;
}

export interface PromotionalCombo {
  id: string;
  title: string;
  bengaliTitle: string;
  tagline: string;
  bengaliTagline: string;
  originalPrice: number;
  comboPrice: number;
  savings: number;
  itemsIncluded: string[];
  bengaliItemsIncluded: string[];
  image: string;
  badge: string;
  bengaliBadge: string;
  isWeekendOnly: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  bengaliAuthor?: string;
  location: string;
  bengaliLocation?: string;
  rating: number;
  date: string;
  comment: string;
  bengaliComment?: string;
  favoriteDish: string;
  verifiedVisit: boolean;
}

export interface RestaurantConfig {
  meta: {
    brandName: string;
    bengaliBrandName: string;
    tagline: string;
    subTagline: string;
    cityContext: string;
    exactLocation: string;
    bengaliExactLocation: string;
    storyHeadline: string;
    founder: string;
    founderRole: string;
    developer: string;
    developerRole: string;
    isVerified: boolean;
  };
  contact: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneDisplay: string;
    phoneNumber: string;
    phoneHref: string;
    whatsappHref: string;
    upiVpa: string;
    upiPayeeName: string;
    email: string;
    isDemoLocation: boolean;
    notice: string;
    bengaliNotice: string;
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
  combos: PromotionalCombo[];
  reviews: CustomerReview[];
  gallery: GalleryItem[];
  reservationEndpoint: {
    isLiveBackend: boolean;
    notice: string;
  };
}

export const RESTAURANT_DATA: RestaurantConfig = {
  meta: {
    brandName: "Jalchabi",
    bengaliBrandName: "জলছবি",
    tagline: "A place to linger with family, friends, and warm food.",
    subTagline: "Artisanal Cafe, Delicious Fast Food & Serene Rural Oasis",
    cityContext: "Canning II, South 24 Parganas, West Bengal",
    exactLocation: "Sarberia, Atharobanki, Canning II, South 24 Parganas - 743329",
    bengaliExactLocation: "সারবেড়িয়া, আঠারোবাঁকি, ক্যানিং ২, দক্ষিণ ২৪ পরগনা - ৭৪৩৩২৯",
    storyHeadline: "Built with passion and perseverance on ancestral soil by founder Sabir Hossen Khan, bringing world-class cafe ambience, piping hot momos, and hospitality to Canning II.",
    founder: "Sabir Hossen Khan",
    founderRole: "Founder & CEO",
    developer: "Rizwan Khan",
    developerRole: "Website Architect & Lead Developer",
    isVerified: true,
  },
  contact: {
    addressLine1: "Sarberia Main Road, Near Atharobanki",
    addressLine2: "Canning II Block, South 24 Parganas",
    city: "South 24 Parganas",
    state: "West Bengal",
    postalCode: "743329",
    country: "India",
    phoneDisplay: "+91 8918948730",
    phoneNumber: "8918948730",
    phoneHref: "tel:+918918948730",
    whatsappHref: "https://wa.me/918918948730",
    upiVpa: "8918948730@upi",
    upiPayeeName: "Sabir Hossen Khan (Jalchabi Cafe)",
    email: "contact@jalchabi.com",
    isDemoLocation: false,
    notice: "Visit us at our serene waterside cafe in Sarberia, Atharobanki, Canning II (PIN: 743329).",
    bengaliNotice: "আমাদের মনোরম ক্যাফেতে আসুন: সারবেড়িয়া, আঠারোবাঁকি, ক্যানিং ২ (পিন: ৭৪৩৩২৯)।",
  },
  hours: [
    {
      days: "Monday – Friday",
      hours: "10:00 AM – 10:00 PM",
      notes: "Fresh Momos, Cold Drinks & Evening Fast Food Specials",
    },
    {
      days: "Saturday – Sunday",
      hours: "09:30 AM – 10:30 PM",
      notes: "Weekend Family Gatherings, Biryani & Rooftop Deck Dining",
    },
  ],
  socials: [
    {
      platform: "Instagram",
      url: "https://instagram.com/jalchabi.canning",
      handle: "@jalchabi.canning",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/jalchabi.canning",
      handle: "/jalchabi.canning",
    },
    {
      platform: "WhatsApp Order",
      url: "https://wa.me/918918948730",
      handle: "+91 8918948730",
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
    "id": "item-ITEM-l0yx16swd",
    "name": "Packaged Mineral Water (500ml)",
    "bengaliName": "মিনারেল ওয়াটার (৫০০ মিলি)",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic Water - 500ml made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹10",
    "numericPrice": 10,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/water-500ml.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-vy4rp7i8i",
    "name": "Signature Dragon Chicken",
    "bengaliName": "ড্রাগন চিকেন",
    "category": "starters-crispy",
    "description": "freshly prepared authentic Dragon Chicken made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹145",
    "numericPrice": 145,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/dragon-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-t5gizdzpg",
    "name": "Crispy Fried Momos (6 pcs)",
    "bengaliName": "ক্রিস্পি ফ্রাইড মোমো",
    "category": "momo",
    "description": "freshly prepared authentic FRIED MOMO made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹79",
    "numericPrice": 79,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/fried-momo.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-f8wjrdo5c",
    "name": "Chicken Cheese Burger",
    "bengaliName": "চিকেন চিজ বার্গার",
    "category": "burgers-pizzas",
    "description": "freshly prepared authentic CHICKEN CHEESE BURGER made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-cheese-burger.png",
    "highlight": false
  },
  {
    "id": "item-ITEM-v9o2nk7zr",
    "name": "Charcoal Chicken Tikka Kebab (5 pcs)",
    "bengaliName": "চিকেন টিক্কা কাবাব (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5PCS",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹135",
    "numericPrice": 135,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tikka-kabab.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-mfvc4roz9",
    "name": "Fresh Vegetable Fried Rice",
    "bengaliName": "ভেজিটেবল ফ্রাইড রাইস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic VEG FRIED RICE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/veg-fried-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-tuozu8x8c",
    "name": "Pan-Fried Schezwan Momos (6 pcs)",
    "bengaliName": "প্যান ফ্রাইড শেজুয়ান মোমো",
    "category": "momo",
    "description": "6 PCS of freshly prepared authentic PAN FRIED MOMO made with daily-sourced ingredients.",
    "bengaliDescription": "6 PCS খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/pan-fried-momo.jpg",
    "highlight": false,
    "servingSize": "6 PCS"
  },
  {
    "id": "item-ITEM-c6wrnapaj",
    "name": "Melted Cheese Momos (6 pcs)",
    "bengaliName": "গলানো চিজ মোমো (৬ পিস)",
    "category": "momo",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chees-momo.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-23czk4r75",
    "name": "Artisanal Hot Coffee",
    "bengaliName": "হট ক্যাফে কফি",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic  Normal Coffee made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹30",
    "numericPrice": 30,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/normal-coffee.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-TEST-1783106393032",
    "name": "Kolkata Kadak Milk Tea",
    "bengaliName": "স্পেশাল দুধ চা",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic MILK TEA made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹20",
    "numericPrice": 20,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/milk-tea.jpg",
    "highlight": false
  },
  {
    "id": "item-3c7f604c-bb86-4c6d-b08d-6292f5ee5b3f",
    "name": "Spiced Ginger Masala Chai",
    "bengaliName": "সুগন্ধি মশলা চা",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic MASALA TEA made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹30",
    "numericPrice": 30,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/masala-tea.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-n17vrsjy8",
    "name": "Organic Himalayan Green Tea",
    "bengaliName": "অরগানিক গ্রিন টি",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic GREEN TEA made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/green-tea.png",
    "highlight": false
  },
  {
    "id": "item-ITEM-um5at2klv",
    "name": "Spiced Chicken 65 (6 pcs)",
    "bengaliName": "চিকেন ৬৫ (৬ পিস)",
    "category": "starters-crispy",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹165",
    "numericPrice": 165,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-65.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-1783108673029",
    "name": "Golden Elixir Saffron & Herb Tea",
    "bengaliName": "গোল্ডেন এলিক্সির ভেষজ চা",
    "category": "beverages-shakes",
    "description": "1 of freshly prepared authentic Golden Elixir Tea made with daily-sourced ingredients.",
    "bengaliDescription": "1 খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹45",
    "numericPrice": 45,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/golden-elixir-tea.jpg",
    "highlight": false,
    "servingSize": "1"
  },
  {
    "id": "item-ITEM-e0vsjbz99",
    "name": "Royal Mixed Fried Rice (Chicken, Egg & Prawn)",
    "bengaliName": "রয়্যাল মিক্সড ফ্রাইড রাইস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic MIXED FRIED RICE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹169",
    "numericPrice": 169,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mixed-fried-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-ui4qitriv",
    "name": "Packaged Mineral Water (1 Litre)",
    "bengaliName": "মিনারেল ওয়াটার (১ লিটার)",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic Water - 1L made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹20",
    "numericPrice": 20,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/water-1l.png",
    "highlight": false
  },
  {
    "id": "item-ITEM-h2cw1y6jc",
    "name": "Fragrant Gondhoraj Momos (6 pcs)",
    "bengaliName": "গন্ধরাজ স্পেশাল মোমো (৬ পিস)",
    "category": "momo",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹89",
    "numericPrice": 89,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/gandharaj-momo.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-rw165sbip",
    "name": "Chicken Cheese Pizza (8\")",
    "bengaliName": "চিকেন চিজ পিৎজা (৮ ইঞ্চি)",
    "category": "burgers-pizzas",
    "description": "8 INCHIS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹179",
    "numericPrice": 179,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-cheese-pizza.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-jbhlhbged",
    "name": "Drums of Heaven (3 pcs)",
    "bengaliName": "ড্রামস অফ হেভেন (৩ পিস)",
    "category": "starters-crispy",
    "description": "3pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹135",
    "numericPrice": 135,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/drums-of-haven.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-6cl49y484",
    "name": "Tandoori Chicken (Half)",
    "bengaliName": "চিকেন তন্দুরি (হাফ)",
    "category": "tandoori-indian",
    "description": "freshly prepared authentic Chicken Tandoori (Half) made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹205",
    "numericPrice": 205,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tandoori-half.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-qxzjhguvj",
    "name": "Tandoori Chicken (Full)",
    "bengaliName": "চিকেন তন্দুরি (ফুল)",
    "category": "tandoori-indian",
    "description": "freshly prepared authentic Chicken Tandoori (Full) made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹420",
    "numericPrice": 420,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tandoori-full.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-qac6ao60w",
    "name": "Creamy Chicken Malai Kebab",
    "bengaliName": "চিকেন মালাই কাবাব",
    "category": "tandoori-indian",
    "description": "6pcs of freshly prepared authentic Chicken Malai Kabab made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-malai-kabab.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-97qkj5v18",
    "name": "Silken Chicken Reshmi Kebab",
    "bengaliName": "চিকেন রেশমি কাবাব",
    "category": "tandoori-indian",
    "description": "6pcs of freshly prepared authentic Chicken Reshmi Kabab made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-reshmi-kabab.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-wmjn0vgpz",
    "name": "Rich Chocolate Mocha",
    "bengaliName": "হট চকোলেট মোকা কফি",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic CHOCOLATE COFFEE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chocolate-coffee.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-zdirnfx7r",
    "name": "Fiery Drums of Hell (4 pcs)",
    "bengaliName": "ড্রামস অফ হেল (৪ পিস)",
    "category": "starters-crispy",
    "description": "4pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹135",
    "numericPrice": 135,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/drums-of-hell.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-td3waopyb",
    "name": "Crispy Chicken 65 Kathi Roll",
    "bengaliName": "চিকেন ৬৫ কাঠি রোল",
    "category": "starters-crispy",
    "description": "freshly prepared authentic Chicken 65 Roll made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹115",
    "numericPrice": 115,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-65-roll.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-nifvu2cp0",
    "name": "Bold Americano Black Coffee",
    "bengaliName": "প্রিমিয়াম ব্ল্যাক কফি",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic BLACK COFFEE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹50",
    "numericPrice": 50,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/black-coffee.png",
    "highlight": false
  },
  {
    "id": "item-ITEM-iyp4raj19",
    "name": "Crispy Golden French Fries",
    "bengaliName": "গোল্ডেন ফ্রেঞ্চ ফ্রাইজ",
    "category": "starters-crispy",
    "description": "freshly prepared authentic French Fries made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/french-fries.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-80nk3jpcg",
    "name": "Golden Crunchy Chicken (5 pcs)",
    "bengaliName": "গোল্ডেন ক্রিস্পি চিকেন (৫ পিস)",
    "category": "starters-crispy",
    "description": "5pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/crispy-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-rp8wnhlgl",
    "name": "Kolkata Classic Egg Roll",
    "bengaliName": "কলকাতা স্পেশাল এগ রোল",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic Egg Roll made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹50",
    "numericPrice": 50,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/egg-roll.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-8460xsylf",
    "name": "Kolkata Chicken Kathi Roll",
    "bengaliName": "কলকাতা চিকেন কাঠি রোল",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic Chicken Roll made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹80",
    "numericPrice": 80,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-roll.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-fgme2f4hp",
    "name": "Darjeeling Steamed Momos (6 pcs)",
    "bengaliName": "দার্জিলিং স্টিম মোমো (৬ পিস)",
    "category": "momo",
    "description": "6pcs",
    "bengaliDescription": "6 PCS খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/steam-momo.jpg",
    "highlight": false,
    "servingSize": "6 PCS"
  },
  {
    "id": "item-ITEM-4jmua528z",
    "name": "Spiced Jhol Momos (6 pcs)",
    "bengaliName": "কাঠমান্ডু স্পেশাল ঝোল মোমো (৬ পিস)",
    "category": "momo",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹110",
    "numericPrice": 110,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/jhol-momo.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-085g2jni4",
    "name": "Hot Chocolate Dessert Momos (6 pcs)",
    "bengaliName": "হট চকোলেট মোমো (৬ পিস)",
    "category": "momo",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chocolate-momo.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-9zlhigkcq",
    "name": "Classic Chicken Burger",
    "bengaliName": "ক্লাসিক চিকেন বার্গার",
    "category": "burgers-pizzas",
    "description": "freshly prepared authentic CHICKEN BURGER made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹79",
    "numericPrice": 79,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-burger.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-8k2kqcjhr",
    "name": "Crispy Veggie Burger",
    "bengaliName": "ভেজিটেবল ক্রাঞ্চি বার্গার",
    "category": "burgers-pizzas",
    "description": "freshly prepared authentic VEG BURGER made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹59",
    "numericPrice": 59,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/veg-burger.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-ke1m3ot9v",
    "name": "Chicken Tikka Pizza (8\")",
    "bengaliName": "চিকেন টিক্কা পিৎজা (৮ ইঞ্চি)",
    "category": "burgers-pizzas",
    "description": "8 INCHES",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹189",
    "numericPrice": 189,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tikka-pizza.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-57ygp2l37",
    "name": "Fresh Veg Cheese Pizza (8\")",
    "bengaliName": "ভেজি চিজ পিৎজা (৮ ইঞ্চি)",
    "category": "burgers-pizzas",
    "description": "8 INCHES",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/veg-cheese-pizza.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-g05sh5kzt",
    "name": "Tandoori Jumbo Prawns",
    "bengaliName": "তন্দুরি প্রন (চিংড়ি)",
    "category": "tandoori-indian",
    "description": "6pcs of freshly prepared authentic Tandoori Prawns made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹189",
    "numericPrice": 189,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/tandoori-prawns.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-e159aj3q4",
    "name": "Egg Chicken Hakka Noodles",
    "bengaliName": "এগ চিকেন হাক্কা নুডলস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic Egg Chicken Noodles made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹120",
    "numericPrice": 120,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/egg-chicken-noodles.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-xstoscu82",
    "name": "Manchurian Veg Hot Soup",
    "bengaliName": "মানচুরিয়ান ভেজ স্যুপ",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic Manchurian Veg Soup made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹115",
    "numericPrice": 115,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/manchurian-veg-soup.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-wb4b696fm",
    "name": "Manchurian Chicken Hot Soup",
    "bengaliName": "মানচুরিয়ান চিকেন স্যুপ",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic Manchurian Non Veg Soup made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹135",
    "numericPrice": 135,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/manchurian-non-veg-soup.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-qvkvnex1m",
    "name": "Creamy Iced Cold Coffee",
    "bengaliName": "আইসড কোল্ড কফি",
    "category": "beverages-shakes",
    "description": "freshly prepared authentic Cold Coffee made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/cold-coffee.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-unk1t7rm6",
    "name": "Slow-Simmered Tomato Basil Soup",
    "bengaliName": "টমেটো বাসিল ক্রিম স্যুপ",
    "category": "starters-crispy",
    "description": "freshly prepared authentic Tomato Besil Soup made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹89",
    "numericPrice": 89,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/tomato-besil-soup.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-klq7had2p",
    "name": "Fragrant Chicken Clear Soup",
    "bengaliName": "চিকেন ক্লিয়ার হট স্যুপ",
    "category": "starters-crispy",
    "description": "freshly prepared authentic Chicken Clear Soup made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-clear-soup.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-n1g4bonjg",
    "name": "Creamy Sweet Corn Chicken Soup",
    "bengaliName": "সুইট কর্ন চিকেন স্যুপ",
    "category": "starters-crispy",
    "description": "freshly prepared authentic Sweet Corn Soup made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹120",
    "numericPrice": 120,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/sweet-corn-soup.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-56cgz0z6j",
    "name": "Dry Chilli Chicken (6 pcs)",
    "bengaliName": "ড্রাই চিলি চিকেন (৬ পিস)",
    "category": "starters-crispy",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹145",
    "numericPrice": 145,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/dry-chilli-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-nnq2ib16u",
    "name": "Crispy Chicken Lollipop (3 pcs)",
    "bengaliName": "ক্রিস্পি চিকেন ললিপপ (৩ পিস)",
    "category": "starters-crispy",
    "description": "3pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹110",
    "numericPrice": 110,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/crispy-lolipop.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-fun6aiu92",
    "name": "Crunchy Chicken Pakoda (6 pcs)",
    "bengaliName": "মুচমুচে চিকেন পকোড়া (৬ পিস)",
    "category": "starters-crispy",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-pakoda.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-z1ximaydx",
    "name": "Charcoal Tandoori Momos (8 pcs)",
    "bengaliName": "কয়লায় সেঁকা তন্দুরি মোমো (৮ পিস)",
    "category": "momo",
    "description": "8 PCS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹169",
    "numericPrice": 169,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/tandoori-momos.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-zv2tdd91w",
    "name": "Kung Pao Chicken (6 pcs)",
    "bengaliName": "কুং পাও চিকেন (৬ পিস)",
    "category": "starters-crispy",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/kum-pau-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-5hon52omg",
    "name": "Double Egg Chicken Kathi Roll",
    "bengaliName": "ডাবল এগ চিকেন কাঠি রোল",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic Egg Chicken Roll made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹95",
    "numericPrice": 95,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/egg-chicken-roll.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-2w8brhft0",
    "name": "Royal Mixed Noodles",
    "bengaliName": "মিক্সড স্পেশাল নুডলস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic Mixed Noodles made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mixed-noodles.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-uinhqi68k",
    "name": "Claypot Special Mixed Noodles",
    "bengaliName": "মিক্স পট স্পেশাল নুডলস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic MIX POT Noodles made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹175",
    "numericPrice": 175,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mix-pot-noodles.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-9lxnmtdha",
    "name": "Kolkata Style Chicken Kasha (5 pcs)",
    "bengaliName": "দেশি স্টাইল চিকেন কষা (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5PCS",
    "bengaliDescription": "4pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹155",
    "numericPrice": 155,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-kasha.jpg",
    "highlight": false,
    "servingSize": "4pcs"
  },
  {
    "id": "item-ITEM-pvux7qi3f",
    "name": "Spiced Kadai Chicken (5 pcs)",
    "bengaliName": "কড়াই চিকেন (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5PCS",
    "bengaliDescription": "4pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-kadai.jpg",
    "highlight": false,
    "servingSize": "4pcs"
  },
  {
    "id": "item-ITEM-9gk6s6y3u",
    "name": "Royal Bengali Mutton Kasha (4 pcs)",
    "bengaliName": "খাঁটি খাসির মাংস কষা (৪ পিস)",
    "category": "tandoori-indian",
    "description": "4PCS",
    "bengaliDescription": "3pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹249",
    "numericPrice": 249,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mutton-kasha.jpg",
    "highlight": false,
    "servingSize": "3pcs"
  },
  {
    "id": "item-ITEM-wprfajxl8",
    "name": "Rich Mutton Masala Curry (4 pcs)",
    "bengaliName": "মশলাদার মাটন কারি (৪ পিস)",
    "category": "tandoori-indian",
    "description": "4PCS",
    "bengaliDescription": "3pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹279",
    "numericPrice": 279,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mutton-masala.jpg",
    "highlight": false,
    "servingSize": "3pcs"
  },
  {
    "id": "item-ITEM-m6ap9dl5o",
    "name": "Homestyle Chicken Curry (5 pcs)",
    "bengaliName": "হোমমেড চিকেন কারি (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5PCS",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹145",
    "numericPrice": 145,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-curry.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-g14001vyo",
    "name": "Fresh Strawberry Thick Shake",
    "bengaliName": "তাজা স্ট্রবেরি মিল্কশেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic STRABERRY SHAKE made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹89",
    "numericPrice": 89,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/straberry-shake.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-uv81y2czo",
    "name": "Spiced Paneer Pakoda (5 pcs)",
    "bengaliName": "মশলাদার পনির পকোড়া (৫ পিস)",
    "category": "starters-crispy",
    "description": "5pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹79",
    "numericPrice": 79,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/paneer-pakoda.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-rrwvb8unr",
    "name": "Kolkata Bhetki Fish Finger (5 pcs)",
    "bengaliName": "কলকাতা ফিশ ফিঙ্গার (৫ পিস)",
    "category": "starters-crispy",
    "description": "5pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/fish-finger.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-q30wx0vd6",
    "name": "Diamond Cut Chicken Cutlet",
    "bengaliName": "চিকেন কাটলেট",
    "category": "starters-crispy",
    "description": "1pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-cutlet.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-9bm4ef9pp",
    "name": "Authentic Bhetki Diamond Cut Fish Fry",
    "bengaliName": "খাঁটি ভেটকি ফিশ ফ্রাই",
    "category": "starters-crispy",
    "description": "1pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹59",
    "numericPrice": 59,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/fish-fry.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-8fxmr4ojz",
    "name": "Crispy Chicken Fingers (5 pcs)",
    "bengaliName": "চিকেন ফিঙ্গার (৫ পিস)",
    "category": "starters-crispy",
    "description": "5pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹89",
    "numericPrice": 89,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-finger.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-ovsuba9w4",
    "name": "Chicken Tikka Cheese Burger",
    "bengaliName": "চিকেন টিক্কা চিজ বার্গার",
    "category": "burgers-pizzas",
    "description": "freshly prepared authentic CHICKEN TIKKA CHEESE BURGAR made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tikka-cheese-burgar.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-rq1g5lbhb",
    "name": "Plain Veg Cheese Sandwich",
    "bengaliName": "প্লেন ভেজ চিজ স্যান্ডউইচ",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic PLAN VEG CHEESE S/W made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/plan-veg-cheese-s-w.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-k2jqljiva",
    "name": "Grilled Chicken Cheese Sandwich",
    "bengaliName": "গ্রিলড চিকেন চিজ স্যান্ডউইচ",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic GRILL CHICKEN CHEESE S/W made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/grill-chicken-cheese-s-w.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-8c9pqg6ts",
    "name": "Chicken Tikka Cheese Sandwich",
    "bengaliName": "চিকেন টিক্কা চিজ স্যান্ডউইচ",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic CHICKEN TIKKA CHEESE S/W made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹120",
    "numericPrice": 120,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-tikka-cheese-s-w.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-7ozjvdcr9",
    "name": "Masala Omelette Cheese Sandwich",
    "bengaliName": "মশলা অমলেট চিজ স্যান্ডউইচ",
    "category": "rolls-sandwiches",
    "description": "freshly prepared authentic MASALA OMLLET CHEESE S/W made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹79",
    "numericPrice": 79,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/masala-omllet-cheese-s-w.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-mt860n9p0",
    "name": "Jalchabi Family Special Pizza (10\")",
    "bengaliName": "জলছবি ফ্যামিলি স্পেশাল পিৎজা (১০ ইঞ্চি)",
    "category": "burgers-pizzas",
    "description": "10 INCHES",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹349",
    "numericPrice": 349,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/cafe-special-family-pizza.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-dzy3cp6sb",
    "name": "Queen Margherita Pizza (8\")",
    "bengaliName": "কুইন মার্গেরিটা চিজ পিৎজা (৮ ইঞ্চি)",
    "category": "burgers-pizzas",
    "description": "8 INCHES",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/queen-margreta-pizza.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-0ir869jey",
    "name": "Street-Style Egg Noodles",
    "bengaliName": "এগ হাক্কা নুডলস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic Egg Noodles made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/egg-noodles.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-jdf8x1j01",
    "name": "Egg Chicken Fried Rice",
    "bengaliName": "এগ চিকেন ফ্রাইড রাইস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic EGG CHICKEN FRIED RICE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹139",
    "numericPrice": 139,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/egg-chicken-fried-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-5y2ft5st8",
    "name": "Golden Egg Fried Rice",
    "bengaliName": "এগ ফ্রাইড রাইস",
    "category": "chinese-noodles",
    "description": "freshly prepared authentic EGG FRIED RICE made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹119",
    "numericPrice": 119,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/egg-fried-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-q4z90fg1a",
    "name": "Add On Masala Gravy",
    "bengaliName": "ADD ON MASALA GRAVY",
    "category": "tandoori-indian",
    "description": "6pcs of freshly prepared authentic ADD ON MASALA GRAVY made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/add-on-masala-gravy.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-k6rh0j06n",
    "name": "Kolkata Dhaba Style Chicken Bharta",
    "bengaliName": "কলকাতা স্টাইল চিকেন ভর্তা",
    "category": "tandoori-indian",
    "description": "6pcs of freshly prepared authentic Chicken VARTHA made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹185",
    "numericPrice": 185,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-vartha.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-odihy4jvl",
    "name": "Tandoori Paneer Tikka (5 pcs)",
    "bengaliName": "তন্দুরি পনির টিক্কা (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5PCS",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹199",
    "numericPrice": 199,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/paneer-tikka.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-xd8z7zhyq",
    "name": "Let Me Kai Shredded Chicken (6 pcs)",
    "bengaliName": "লেট মি কাই চিকেন (৬ পিস)",
    "category": "starters-crispy",
    "description": "6pcs",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/let-me-kai.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-z4ek8idtp",
    "name": "Classic Mint Virgin Mojito",
    "bengaliName": "ভার্জিন পুদিনা মোহিতো",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic VERGIN MOJITO  made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/vergin-mojito.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-ur2ssd5xt",
    "name": "Alphonso Mango Smoothie",
    "bengaliName": "ম্যাঙ্গো স্মুদি",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic MANGO SMOODHI made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mango-smoodhi.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-kpxaq28kh",
    "name": "Spiced Masala Cola Sparkler",
    "bengaliName": "মশলা স্পার্কলিং কোলা",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic MASALA COLDRINKS made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹39",
    "numericPrice": 39,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/masala-coldrinks.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-alrk74kz1",
    "name": "Artisan Flavored Mojito",
    "bengaliName": "ফ্লেভার্ড আইসড মোহিতো",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic ANY FLAVOUR MOJITO  made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/any-flavour-mojito.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-78l78mx4u",
    "name": "Seasonal Fresh Fruit Cooler",
    "bengaliName": "সিজনাল ফ্রুট রিফ্রেশার",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic ANY FLAVOUR made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹59",
    "numericPrice": 59,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/any-flavour.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-5ebm4t0qq",
    "name": "Kolkata Lemon Soda Shikanji",
    "bengaliName": "লেবু সোডা শিকঞ্জি",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic SODA SIKANGI made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/soda-sikangi.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-xd8n0y9ec",
    "name": "Blueberry Cream Shake",
    "bengaliName": "ব্লুবেরি ফ্রেশ শেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic BLUE BERRY SHAKE made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/blue-berry-shake.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-n7vosnxbf",
    "name": "Mango Mania Fruit Shake",
    "bengaliName": "ম্যাঙ্গো ম্যানিয়া রিফ্রেশার",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic MANGO MANIA made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/mango-mania.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-liq5dqikw",
    "name": "KitKat Loaded Monster Shake",
    "bengaliName": "কিটক্যাট প্রিমিয়াম শেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic KITKAT  SHAKE made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/kitkat-shake.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-gyqze25uw",
    "name": "Fudge Brownie Chilled Shake",
    "bengaliName": "চকোলেট ব্রাউনি চিল্ড শেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic BROWNEE SHAKE (CHILD) made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/brownee-shake-child.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-57optmh94",
    "name": "Citrus Sunshine Orange Shake",
    "bengaliName": "ট্যাঙ্গি অরেঞ্জ শেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic ORANGE SHAKE made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹79",
    "numericPrice": 79,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/orange-shake.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-2v8w12iw6",
    "name": "Oreo Overload Crumble Shake",
    "bengaliName": "ওরিয়ো ওভারলোড থিক শেক",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic OREO SHAKE made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹99",
    "numericPrice": 99,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/oreo-shake.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-txryultuh",
    "name": "Double Decker Chicken Burger",
    "bengaliName": "ডাবল ডেকার চিকেন বার্গার",
    "category": "burgers-pizzas",
    "description": "freshly prepared authentic DOUBLE DECKAR BURGER made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/double-deckar-burger.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-sa22n1qk8",
    "name": "Hong Kong Tossed Chicken (5 pcs)",
    "bengaliName": "হংকং স্টাইল স্পাইসি চিকেন (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/honkong-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-qnt5m8ow7",
    "name": "Fresh Prawns Masala (5 pcs)",
    "bengaliName": "ফ্রেশ প্রন মশলা (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹169",
    "numericPrice": 169,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/prwans-masala.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-p2s8yya42",
    "name": "Chilli Chicken Gravy (5 pcs)",
    "bengaliName": "ক্লাসিক চিলি চিকেন গ্রেভি (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹139",
    "numericPrice": 139,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-chilli.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-lroxwayqa",
    "name": "Garlic Chicken Gravy (5 pcs)",
    "bengaliName": "গার্লিক চিকেন গ্রেভি (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹110",
    "numericPrice": 110,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/garlic-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-kubquaptc",
    "name": "Fiery Hot Garlic Chicken (5 pcs)",
    "bengaliName": "হট গার্লিক চিকেন (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/hot-garlic-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-ir4uvdvvc",
    "name": "Wok-Tossed Chicken Manchurian (5 pcs)",
    "bengaliName": "চিকেন মানচুরিয়ান গ্রেভি (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹129",
    "numericPrice": 129,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-manchurian.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-avmoyczuf",
    "name": "Chilli Paneer Gravy (5 pcs)",
    "bengaliName": "চিলি পনির গ্রেভি (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹149",
    "numericPrice": 149,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/paneer-chilli.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-8f4vlq5c2",
    "name": "Tangra Style Chilli Fish (5 pcs)",
    "bengaliName": "চিলি ফিশ গ্রেভি (৫ পিস)",
    "category": "chinese-noodles",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/fish-chilli.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-w0rlj4kam",
    "name": "Fragrant Ghee Jeera Rice (1 Bowl)",
    "bengaliName": "সুগন্ধি জিরা রাইস (১ বাটি)",
    "category": "tandoori-indian",
    "description": "1 BOWL",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹59",
    "numericPrice": 59,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/jeera-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-tbu849575",
    "name": "Steamed Basmati Rice (1 Bowl)",
    "bengaliName": "স্টিমড বাসমতী রাইস (১ বাটি)",
    "category": "tandoori-indian",
    "description": "1 BOWL",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/staem-rice.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-kwcmfhmyn",
    "name": "Sweet Bengali Vegetable Pulao (1 Bowl)",
    "bengaliName": "মিষ্টি ভেজিটেবল পোলাও (১ বাটি)",
    "category": "tandoori-indian",
    "description": "1 BOWL",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/veg-polao.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-amdi0s19w",
    "name": "Butter Garlic Tandoori Naan",
    "bengaliName": "বাটার গার্লিক নান",
    "category": "tandoori-indian",
    "description": "freshly prepared authentic BUTTER GARLIC NAN made with daily-sourced ingredients.",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹69",
    "numericPrice": 69,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/butter-garlic-nan.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-7h9gai1jp",
    "name": "Clay-Oven Tandoori Roti",
    "bengaliName": "তন্দুরি রুটি",
    "category": "tandoori-indian",
    "description": "1 ",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹15",
    "numericPrice": 15,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/tandoori-roti.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-5ti3pex91",
    "name": "Fluffy Plain Tandoori Naan",
    "bengaliName": "প্লেন বাটার নান",
    "category": "tandoori-indian",
    "description": "1 BOWL",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹30",
    "numericPrice": 30,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/plain-nan.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-1p9g48i1h",
    "name": "Layered Butter Tandoori Naan",
    "bengaliName": "বাটার নান",
    "category": "tandoori-indian",
    "description": "1 BOWL",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹49",
    "numericPrice": 49,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/butter-nan.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-y6adhn55j",
    "name": "Cottage Cheese Palak Paneer (5 pcs)",
    "bengaliName": "পালক পনির (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/palak-paneer.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-xi4c4556x",
    "name": "Shahi Velvet Butter Chicken (5 pcs)",
    "bengaliName": "শাহি বাটার চিকেন (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹179",
    "numericPrice": 179,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/butter-chicken.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-eoaok5l1v",
    "name": "Paneer Butter Masala (5 pcs)",
    "bengaliName": "পনির বাটার মশলা (৫ পিস)",
    "category": "tandoori-indian",
    "description": "5CPS",
    "bengaliDescription": "খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹179",
    "numericPrice": 179,
    "dietary": [
      "Vegetarian"
    ],
    "image": "/images/food/os/paneer-butter-masala.jpg",
    "highlight": false
  },
  {
    "id": "item-ITEM-ngtow0oik",
    "name": "Sizzling Hot Brownie with Vanilla Ice Cream & Fruit",
    "bengaliName": "হট সিজলিং ব্রাউনি সাথে আইসক্রিম",
    "category": "starters-crispy",
    "description": "6pcs of freshly prepared authentic SIZLING BROWNEE WITH ICE CREAM & FOODS made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹249",
    "numericPrice": 249,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/sizling-brownee-with-ice-cream-foods.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-6eaxxidgt",
    "name": "Classic Chicken Hakka Noodles",
    "bengaliName": "চিকেন হাক্কা নুডলস",
    "category": "chinese-noodles",
    "description": "6pcs of freshly prepared authentic Chicken Hakka Noodles made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹159",
    "numericPrice": 159,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/chicken-hakka-noodles.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-cdxgmrso1",
    "name": "Chilled Soft Beverage (750ml)",
    "bengaliName": "কোল্ড ড্রিংকস (৭৫০ মিলি)",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic Cold Drinks 750ml made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹40",
    "numericPrice": 40,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/default-food.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  },
  {
    "id": "item-ITEM-9yqn1ool0",
    "name": "Chilled Soft Beverage (500ml)",
    "bengaliName": "কোল্ড ড্রিংকস (৫০০ মিলি)",
    "category": "beverages-shakes",
    "description": "6pcs of freshly prepared authentic Cold Drinks 500ml made with daily-sourced ingredients.",
    "bengaliDescription": "6pcs খাঁটি উপাদানে তৈরি তাজা ও সুস্বাদু পদ।",
    "price": "₹30",
    "numericPrice": 30,
    "dietary": [
      "Cafe Favorite"
    ],
    "image": "/images/food/os/default-food.jpg",
    "highlight": false,
    "servingSize": "6pcs"
  }
],
  combos: [
  {
    "id": "combo-anniversary-couple",
    "title": "Anniversary Special Couple Celebration",
    "bengaliTitle": "অ্যানিভার্সারি স্পেশাল কাপল কম্বো",
    "tagline": "Chicken Clear Soup × 2 + Chicken Lollipop × 4 Pcs + Chicken Fried Rice + Chilli Chicken + Hakka Noodles + 2 Ice Cream + Rose & Candle Light Setup + 250g Cake",
    "bengaliTagline": "২টি চিকেন স্যুপ + ৪টি ললিপপ + ফ্রাইড রাইস + চিলি চিকেন + হাক্কা নুডলস + ২টি আইসক্রিম + মোমবাতি ডিনার ও ২৫০ গ্রাম কেক",
    "originalPrice": 1150,
    "comboPrice": 799,
    "savings": 351,
    "itemsIncluded": [
      "2x Chicken Clear Soup",
      "4x Chicken Lollipop",
      "1x Chicken Fried Rice",
      "1x Chilli Chicken",
      "1x Hakka Noodles",
      "2x Ice Cream + Rose & Cake"
    ],
    "bengaliItemsIncluded": [
      "২টি চিকেন ক্লিয়ার স্যুপ",
      "৪টি চিকেন ললিপপ",
      "১টি চিকেন ফ্রাইড রাইস",
      "১টি চিলি চিকেন",
      "১টি নুডলস",
      "২টি আইসক্রিম + কেক"
    ],
    "image": "/images/food/os/anniversary-special-couple-combo-799.jpg",
    "badge": "ROMANTIC DINING — SAVE ₹351",
    "bengaliBadge": "রোমান্টিক কাপল স্পেশাল — ৩৫১ টাকা সাশ্রয়",
    "isWeekendOnly": false
  },
  {
    "id": "combo-birthday-party",
    "title": "Grand Birthday Celebration (5 Persons)",
    "bengaliTitle": "গ্র্যান্ড বার্থডে সেলিব্রেশন অফার (৫ জন)",
    "tagline": "2 Full Chicken Fried Rice + 2 Full Chicken Noodles + 1 Full Chilli Chicken + 5 Chicken Lollipops + 5 Fried Momos + 5 Cold Drinks + 5 Ice Creams + Free 250g Cake & Decor",
    "bengaliTagline": "২টি ফ্রাইড রাইস + ২টি নুডলস + ১টি চিলি চিকেন + ৫টি ললিপপ + ৫টি মোমো + ৫টি পানীয় + ৫টি আইসক্রিম + ফ্রি ২৫০ গ্রাম কেক",
    "originalPrice": 1450,
    "comboPrice": 999,
    "savings": 451,
    "itemsIncluded": [
      "2x Full Chicken Fried Rice",
      "2x Full Chicken Noodles",
      "1x Full Chilli Chicken",
      "5x Chicken Lollipop",
      "5x Fried Momo",
      "5x Soft Drinks & Ice Cream + Free Cake"
    ],
    "bengaliItemsIncluded": [
      "২টি চিকেন ফ্রাইড রাইস",
      "২টি চিকেন নুডলস",
      "১টি চিলি চিকেন",
      "৫টি ললিপপ",
      "৫টি ফ্রাইড মোমো",
      "৫টি পানীয় ও আইসক্রিম"
    ],
    "image": "/images/food/os/bith-day-special-offer-5-person.jpg",
    "badge": "PARTY FEAST — SAVE ₹451",
    "bengaliBadge": "উৎসবের সেরা ভোজ — ৪৫১ টাকা সাশ্রয়",
    "isWeekendOnly": false
  },
  {
    "id": "combo-369-special",
    "title": "Sarberia 369 Super Feast",
    "bengaliTitle": "সারবেড়িয়া ৩৬৯ স্পেশাল সুপার ফিস্ট",
    "tagline": "Chicken Noodles + 2 Pcs Chicken 65 + 2 Pcs Lollipop + French Fries + 2 Pcs Fried Momo + 2 Pcs Papad + 2 Sweets + Soup + Fresh Salad + Coke 200ml",
    "bengaliTagline": "চিকেন নুডলস + ২টি চিকেন ৬৫ + ২টি ললিপপ + ফ্রেঞ্চ ফ্রাইজ + ২টি ফ্রাইড মোমো + ২টি মিষ্টি + স্যুপ + স্যালাড + কোল্ড ড্রিংকস",
    "originalPrice": 520,
    "comboPrice": 369,
    "savings": 151,
    "itemsIncluded": [
      "Chicken Noodles",
      "2x Chicken 65",
      "2x Lollipop",
      "French Fries",
      "2x Fried Momo",
      "Soup, Sweets & Coke"
    ],
    "bengaliItemsIncluded": [
      "চিকেন নুডলস",
      "২টি চিকেন ৬৫",
      "২টি ললিপপ",
      "ফ্রেঞ্চ ফ্রাইজ",
      "২টি মোমো",
      "স্যুপ, মিষ্টি ও কোক"
    ],
    "image": "/images/food/os/369-special-combo.jpg",
    "badge": "ALL-IN-ONE THALI — SAVE ₹151",
    "bengaliBadge": "অল-ইন-ওয়ান থালি — ১৫১ টাকা সাশ্রয়",
    "isWeekendOnly": false
  },
  {
    "id": "combo-249-special",
    "title": "Youth Hangout 249 Adda Box",
    "bengaliTitle": "২৪৯ স্পেশাল ইয়ুথ আড্ডা বক্স",
    "tagline": "Fried Momos 6 Pcs + French Fries + 2 Coffees + Let Me Kai 3 Pcs + 2 Sandwiches",
    "bengaliTagline": "৬টি ফ্রাইড মোমো + ফ্রেঞ্চ ফ্রাইজ + ২টি কফি + ৩টি লেট মি কাই চিকেন + ২টি স্যান্ডউইচ",
    "originalPrice": 370,
    "comboPrice": 249,
    "savings": 121,
    "itemsIncluded": [
      "6x Fried Momos",
      "French Fries",
      "2x Hot Coffee",
      "3x Let Me Kai Chicken",
      "2x Sandwiches"
    ],
    "bengaliItemsIncluded": [
      "৬টি ফ্রাইড মোমো",
      "ফ্রেঞ্চ ফ্রাইজ",
      "২টি হট কফি",
      "৩টি লেট মি কাই",
      "২টি স্যান্ডউইচ"
    ],
    "image": "/images/food/os/249-special-combo.jpg",
    "badge": "YOUTH ADDA — SAVE ₹121",
    "bengaliBadge": "আড্ডার প্রিয় ডিল — ১২১ টাকা সাশ্রয়",
    "isWeekendOnly": false
  },
  {
    "id": "combo-4-coffee-fries",
    "title": "Friends Quad 4 Coffee + Fries",
    "bengaliTitle": "৪ কফি সাথে ক্রাঞ্চি ফ্রেঞ্চ ফ্রাইজ",
    "tagline": "4 Artisanal Coffees + Golden Crisp French Fries Basket",
    "bengaliTagline": "৪ কাপ তাজা ব্রিউড ক্যাফে কফি + ১ বাস্কেট গোল্ডেন ফ্রেঞ্চ ফ্রাইজ",
    "originalPrice": 230,
    "comboPrice": 169,
    "savings": 61,
    "itemsIncluded": [
      "4x Artisanal Coffee",
      "1x Golden French Fries"
    ],
    "bengaliItemsIncluded": [
      "৪ কাপ হট কফি",
      "১ বাস্কেট ফ্রেঞ্চ ফ্রাইজ"
    ],
    "image": "/images/food/os/4-coffee-frech-fries.jpg",
    "badge": "COFFEE ADDA — SAVE ₹61",
    "bengaliBadge": "কফি আড্ডা — ৬১ টাকা সাশ্রয়",
    "isWeekendOnly": false
  },
  {
    "id": "combo-99-starter",
    "title": "Twin Coffee & Fries 99 Starter",
    "bengaliTitle": "৯৯ টাকা টুইন কফি ও ফ্রাইজ কম্বো",
    "tagline": "2 Artisanal Hot Coffees + Golden French Fries",
    "bengaliTagline": "২ কাপ হট কফি + ১ প্লেট গোল্ডেন ক্রিস্পি ফ্রেঞ্চ ফ্রাইজ",
    "originalPrice": 130,
    "comboPrice": 99,
    "savings": 31,
    "itemsIncluded": [
      "2x Hot Coffee",
      "1x French Fries"
    ],
    "bengaliItemsIncluded": [
      "২ কাপ কফি",
      "১ প্লেট ফ্রেঞ্চ ফ্রাইজ"
    ],
    "image": "/images/food/os/99-combo.jpg",
    "badge": "BEST BUDGET DEAL — ₹99 ONLY",
    "bengaliBadge": "সেরা পকেট ফ্রেন্ডলি — মাত্র ৯৯ টাকা",
    "isWeekendOnly": false
  }
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Tanmoy Mondal",
      bengaliAuthor: "তন্ময় মণ্ডল",
      location: "Sarberia, Canning II",
      bengaliLocation: "সারবেড়িয়া, ক্যানিং ২",
      rating: 5,
      date: "October 2026",
      comment: "Unbelievable experience right here in Sarberia! The Steamed Momos and Drums of Heaven taste even better than high-end Park Street cafes. Sabir da's hard work has truly gifted our area something to be proud of.",
      bengaliComment: "আমাদের সারবেড়িয়াতে এরকম আন্তর্জাতিক মানের ক্যাফে অবিশ্বাস্য! মোমো আর ড্রামস অফ হেভেন কলকাতার সেরা ক্যাফেকেও হার মানায়। সাবির দার স্বপ্ন আজ সত্যিই আমাদের এলাকার গর্ব।",
      favoriteDish: "Drums of Heaven & Steamed Momos",
      verifiedVisit: true,
    },
    {
      id: "rev-2",
      author: "Poulomi Chatterjee",
      bengaliAuthor: "পৌলমী চট্টোপাধ্যায়",
      location: "Kolkata (Weekend Visitor)",
      bengaliLocation: "কলকাতা (সাপ্তাহিক পরিদর্শক)",
      rating: 5,
      date: "October 2026",
      comment: "We stopped by on our drive through South 24 Parganas. The 3D view on the website caught our eyes, and in reality, the serene waterfront veranda and Royal Chicken Biryani with golden aloo blew us away!",
      bengaliComment: "দক্ষিণ ২৪ পরগনায় ভ্রমণের সময় এখানে এলাম। ওয়েবসাইটে থ্রি-ডি দৃশ্য দেখে মুগ্ধ হয়েছিলাম, আর বাস্তবে জলছবির ওয়াটারফ্রন্ট আর তুলতুলে আলুর চিকেন দম বিরিয়ানি অপূর্ব ছিল!",
      favoriteDish: "Kolkata Royal Chicken Biryani",
      verifiedVisit: true,
    },
    {
      id: "rev-3",
      author: "Sheikh Rahamat Ali",
      bengaliAuthor: "শেখ রহমত আলী",
      location: "Atharobanki, Canning II",
      bengaliLocation: "আঠারোবাঁকি, ক্যানিং ২",
      rating: 5,
      date: "September 2026",
      comment: "A blessing for families in Canning II. We celebrated our daughter's birthday here. Clean environment, respectful staff, and the Double Egg Chicken Roll and Belgian Shake were absolute hits.",
      bengaliComment: "ক্যানিং ২ এর পরিবারদের জন্য এক আশীর্বাদ। মেয়ের জন্মদিন পালন করলাম এখানে। সুন্দর পরিবেশ, ভদ্র ব্যবহার আর চিকেন কাঠি রোল ও বেলজিয়ান শেক অসাধারণ লেগেছে।",
      favoriteDish: "Double Egg Chicken Kathi Roll",
      verifiedVisit: true,
    },
    {
      id: "rev-4",
      author: "Dr. Arindam Sen",
      bengaliAuthor: "ডাঃ অরিন্দম সেন",
      location: "Baruipur / Canning",
      bengaliLocation: "বারুইপুর / ক্যানিং",
      rating: 5,
      date: "October 2026",
      comment: "A peaceful waterside retreat. Love the Darjeeling Makaibari tea and Gondhoraj cooler. Sabir Hossen Khan has built this with genuine love for the soil. Highly recommended to everyone.",
      bengaliComment: "শান্ত মনোরম জলের ধারে সুন্দর অবসর। দার্জিলিংয়ের মাকাইবাড়ি চা আর গন্ধরাজ কুলার অসাধারণ। সাবির হোসেন খান মাটির টানে এই অনন্য প্রতিষ্ঠান গড়েছেন।",
      favoriteDish: "Gondhoraj Brew & Bhetki Fish Fry",
      verifiedVisit: true,
    },
  ],
  gallery: [
    {
      id: "g-1",
      title: "Warm American Walnut & Lake Veranda",
      category: "Architecture",
      description: "The serene waterside pavilion blending local soil with contemporary warmth.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
    {
      id: "g-2",
      title: "Handmade Darjeeling Momos",
      category: "Culinary",
      description: "Freshly rolled dumplings steamed to perfection every morning.",
      image: "/images/food/m-momos-steamed.jpg",
      isAiConcept: false,
    },
    {
      id: "g-3",
      title: "Crispy Sizzling Drums of Heaven",
      category: "Culinary",
      description: "Wok-tossed schezwan chicken lollipops served sizzling hot.",
      image: "/images/food/m-drums-of-heaven.jpg",
      isAiConcept: false,
    },
    {
      id: "g-4",
      title: "Evening Hearth & Stargazing Terrace",
      category: "Atmosphere",
      description: "Twilight settling over the serene rural waters of Sarberia, Canning.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      isAiConcept: false,
    },
  ],
  reservationEndpoint: {
    isLiveBackend: false,
    notice: "Concierge booking simulation for Jalchabi Cafe, Sarberia, Canning II (PIN: 743329).",
  },
};
