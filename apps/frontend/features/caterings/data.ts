export type CateringListing = {
  /** Maps to the storefront route at /[tenant] */
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  /** Human readable location, e.g. "Gulshan, Dhaka" */
  location: string;
  /** Filter key for the location dropdown, e.g. "gulshan" */
  area: string;
  /** Lowest package price per meal, used for the price filter */
  startingPrice: number;
  /** Minimum number of meals required per order */
  minimumOrder: number;
  rating: number;
  /** Number of customer ratings, shown next to the rating */
  reviews: number;
  /** Short cuisine / specialty tags */
  cuisines: string[];
  popular?: boolean;
};

export type AreaOption = {
  value: string;
  label: string;
};

export const cateringAreas: AreaOption[] = [
  { value: "gulshan", label: "Gulshan" },
  { value: "banani", label: "Banani" },
  { value: "uttara", label: "Uttara" },
  { value: "dhanmondi", label: "Dhanmondi" },
  { value: "mirpur", label: "Mirpur" },
  { value: "bashundhara", label: "Bashundhara" },
];

export const cateringListings: CateringListing[] = [
  {
    slug: "uttara",
    name: "Uttara Catering",
    description: "Premium corporate meals — healthy, balanced, and always on time for your team.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60",
    location: "Uttara, Dhaka",
    area: "uttara",
    startingPrice: 120,
    minimumOrder: 10,
    rating: 4.8,
    reviews: 128,
    cuisines: ["Bengali", "Corporate"],
    popular: true,
  },
  {
    slug: "gulshan-kitchen",
    name: "Gulshan Kitchen",
    description: "Chef-crafted lunch boxes for offices and meetings across the diplomatic zone.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60",
    location: "Gulshan, Dhaka",
    area: "gulshan",
    startingPrice: 150,
    minimumOrder: 20,
    rating: 4.9,
    reviews: 214,
    cuisines: ["Continental", "Premium"],
    popular: true,
  },
  {
    slug: "banani-bites",
    name: "Banani Bites",
    description: "Fresh daily menus with quick delivery — ideal for small teams and startups.",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=60",
    location: "Banani, Dhaka",
    area: "banani",
    startingPrice: 130,
    minimumOrder: 5,
    rating: 4.6,
    reviews: 96,
    cuisines: ["Bengali", "Fast Casual"],
  },
  {
    slug: "dhanmondi-deli",
    name: "Dhanmondi Deli",
    description: "Balanced, home-style meals prepared with seasonal local ingredients.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
    location: "Dhanmondi, Dhaka",
    area: "dhanmondi",
    startingPrice: 110,
    minimumOrder: 10,
    rating: 4.5,
    reviews: 74,
    cuisines: ["Home Style", "Healthy"],
  },
  {
    slug: "mirpur-meals",
    name: "Mirpur Meals",
    description: "Affordable everyday office lunches without compromising on portion or taste.",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
    location: "Mirpur, Dhaka",
    area: "mirpur",
    startingPrice: 100,
    minimumOrder: 15,
    rating: 4.3,
    reviews: 152,
    cuisines: ["Bengali", "Budget"],
  },
  {
    slug: "bashundhara-feast",
    name: "Bashundhara Feast",
    description: "Generous platters and event catering for large corporate gatherings.",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60",
    location: "Bashundhara, Dhaka",
    area: "bashundhara",
    startingPrice: 160,
    minimumOrder: 30,
    rating: 4.7,
    reviews: 88,
    cuisines: ["Events", "Premium"],
  },
  {
    slug: "gulshan-greens",
    name: "Gulshan Greens",
    description: "Nutrition-first menus with vegetarian and protein-packed options every day.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60",
    location: "Gulshan, Dhaka",
    area: "gulshan",
    startingPrice: 140,
    minimumOrder: 8,
    rating: 4.6,
    reviews: 110,
    cuisines: ["Healthy", "Vegetarian"],
  },
  {
    slug: "banani-biryani",
    name: "Banani Biryani House",
    description: "Signature biryani and rich rice platters for celebrations and Friday specials.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
    location: "Banani, Dhaka",
    area: "banani",
    startingPrice: 180,
    minimumOrder: 20,
    rating: 4.8,
    reviews: 263,
    cuisines: ["Biryani", "Festive"],
  },
];
