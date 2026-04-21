import { CalendarDays, ChefHat, Clock3, Flame, Leaf, Sparkles, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DayName = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type MenuVariant = {
  id: string;
  name: string;
  items: string[];
  note: string;
  available?: boolean;
};

export type DayMenu = {
  day: DayName;
  title: string;
  description: string;
  variants: MenuVariant[];
};

export type PackageFeature = {
  icon: LucideIcon;
  label: string;
};

export type CateringPackage = {
  id: string;
  name: string;
  pricePerMeal: number;
  description: string;
  popular?: boolean;
  features: PackageFeature[];
  days: DayMenu[];
};

export const dayOrder: DayName[] = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const dayShortLabel: Record<DayName, string> = {
  Sat: "Sat",
  Sun: "Sun",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
};

export const bdt = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export const packages: CateringPackage[] = [
  {
    id: "corporate-lunch",
    name: "Corporate Lunch",
    pricePerMeal: 290,
    description: "Reliable daily office meals with familiar Bangladeshi comfort and clean presentation.",
    features: [
      { icon: ChefHat, label: "7-day menu" },
      { icon: CalendarDays, label: "Day-wise custom" },
      { icon: Leaf, label: "Balanced nutrition" },
    ],
    days: [
      {
        day: "Sat",
        title: "Saturday Kickoff",
        description: "A familiar opener for teams getting back into rhythm.",
        variants: [
          {
            id: "sat-fish",
            name: "Rui Fish Combo",
            note: "Best for teams who prefer classic lunch plates.",
            items: ["Plain Rice", "Rui Fish Curry", "Masoor Dal", "Aloo Bhorta"],
          },
          {
            id: "sat-chicken",
            name: "Chicken Bhuna Combo",
            note: "A richer option with balanced sides.",
            items: ["Polao", "Chicken Bhuna", "Moong Dal", "Cucumber Salad"],
          },
          {
            id: "sat-egg",
            name: "Egg Curry Combo",
            note: "Cost-friendly and office-friendly.",
            items: ["Steamed Rice", "Egg Curry", "Pumpkin Bhaji", "Tomato Chutney"],
          },
        ],
      },
      {
        day: "Sun",
        title: "Sunday Team Fuel",
        description: "Fast moving weekday service with quick quantity controls.",
        variants: [
          {
            id: "sun-fish",
            name: "Ilish Light Plate",
            note: "Premium fish-focused set.",
            items: ["Lemon Rice", "Ilish Bhapa", "Musur Dal", "Shutki Bhorta"],
          },
          {
            id: "sun-chicken",
            name: "Chicken Roast Plate",
            note: "Popular for leadership lunch meetings.",
            items: ["Saffron Polao", "Chicken Roast", "Vegetable Mix", "Raita"],
          },
          {
            id: "sun-veg",
            name: "Vegetable Harmony",
            note: "Vegetarian-friendly with local flavor.",
            items: ["Khichuri", "Mixed Vegetable Curry", "Begun Bhaja", "Dal"],
          },
        ],
      },
      {
        day: "Mon",
        title: "Monday Reset",
        description: "Keep Monday simple and highly predictable.",
        variants: [
          {
            id: "mon-fish",
            name: "Fish Office Classic",
            note: "Familiar and clean profile for weekly consistency.",
            items: ["White Rice", "Fish Curry", "Cholar Dal", "Seasonal Salad"],
          },
          {
            id: "mon-chicken",
            name: "Chicken Curry Bowl",
            note: "Balanced protein with mild spices.",
            items: ["Basmati Rice", "Chicken Curry", "Lau Bhaji", "Lebu"],
          },
          {
            id: "mon-egg",
            name: "Egg Masala Plate",
            note: "Quick service and broad team acceptance.",
            items: ["Rice", "Egg Masala", "Red Lentil Dal", "Achar"],
            available: false,
          },
        ],
      },
      {
        day: "Tue",
        title: "Tuesday Balance",
        description: "Choose from bold, light, or vegetarian rhythms.",
        variants: [
          {
            id: "tue-fish",
            name: "Pabda Special",
            note: "Chef-prepared traditional fish dish.",
            items: ["Rice", "Pabda Jhal", "Dal", "Potol Bhaji"],
          },
          {
            id: "tue-chicken",
            name: "Chicken Rezala",
            note: "Soft-spice premium option.",
            items: ["Naan", "Chicken Rezala", "Cucumber Salad", "Firni"],
          },
          {
            id: "tue-veg",
            name: "Veg Comfort",
            note: "Gentle and low-oil lunch option.",
            items: ["Khichuri", "Mixed Veg", "Masoor Dal", "Pepe Bhorta"],
          },
        ],
      },
      {
        day: "Wed",
        title: "Midweek Energy",
        description: "A little richer for busy project days.",
        variants: [
          {
            id: "wed-fish",
            name: "Fish Kalia Set",
            note: "Traditional curry profile with office-safe spice level.",
            items: ["Polao", "Fish Kalia", "Motor Dal", "Shosha Salad"],
          },
          {
            id: "wed-chicken",
            name: "Chicken Jhal Fry Set",
            note: "Popular for bigger team orders.",
            items: ["Jeera Rice", "Chicken Jhal Fry", "Vegetable Bhaji", "Achar"],
          },
          {
            id: "wed-egg",
            name: "Egg Bhuna Set",
            note: "Simple and cost-effective backup option.",
            items: ["Rice", "Egg Bhuna", "Masoor Dal", "Alu Bhorta"],
          },
        ],
      },
      {
        day: "Thu",
        title: "Thursday Comfort",
        description: "Familiar combinations before Friday events.",
        variants: [
          {
            id: "thu-fish",
            name: "Fish Curry Office",
            note: "Steady and widely accepted profile.",
            items: ["Rice", "Fish Curry", "Dal", "Begun Bhorta"],
          },
          {
            id: "thu-chicken",
            name: "Chicken Roast Comfort",
            note: "A soft premium touch.",
            items: ["Polao", "Chicken Roast", "Vegetable", "Borhani"],
          },
          {
            id: "thu-veg",
            name: "Shobji Delight",
            note: "Vegetarian-friendly classic.",
            items: ["Khichuri", "Labra", "Dal", "Tomato Salad"],
          },
        ],
      },
      {
        day: "Fri",
        title: "Friday Signature",
        description: "Close the week with celebration-friendly choices.",
        variants: [
          {
            id: "fri-fish",
            name: "Prawn Malai Special",
            note: "Premium seafood profile for key gatherings.",
            items: ["Saffron Rice", "Prawn Malai Curry", "Dal", "Dessert Cup"],
          },
          {
            id: "fri-chicken",
            name: "Chicken Korma Festive",
            note: "High-conversion event favorite.",
            items: ["Kacchi Polao", "Chicken Korma", "Salad", "Firni"],
          },
          {
            id: "fri-beef",
            name: "Beef Bhuna Classic",
            note: "Hearty option for larger groups.",
            items: ["Pulao", "Beef Bhuna", "Cholar Dal", "Borhani"],
          },
        ],
      },
    ],
  },
  {
    id: "executive",
    name: "Executive Plan",
    pricePerMeal: 430,
    description: "Premium meal variety designed for client meetings, HR events, and leadership floors.",
    popular: true,
    features: [
      { icon: Sparkles, label: "Most popular" },
      { icon: ChefHat, label: "Chef-curated menu" },
      { icon: BadgeCheck, label: "Priority prep" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Executive Menu`,
      description: "Premium day-wise choices with polished presentation.",
      variants: [
        {
          id: `${day.toLowerCase()}-signature-fish`,
          name: "Signature Fish Line",
          note: "Great for senior team lunches.",
          items: ["Lemon Rice", "Grilled Fish", "Dal", "Mixed Salad"],
        },
        {
          id: `${day.toLowerCase()}-signature-chicken`,
          name: "Signature Chicken Line",
          note: "Reliable crowd favorite for meetings.",
          items: ["Saffron Polao", "Chicken Roast", "Vegetable", "Raita"],
        },
        {
          id: `${day.toLowerCase()}-signature-egg`,
          name: "Executive Egg Line",
          note: "Affordable premium backup option.",
          items: ["Rice", "Egg Curry", "Dal", "Bhorta"],
        },
      ],
    })),
  },
  {
    id: "signature-catering",
    name: "Signature Catering",
    pricePerMeal: 690,
    description: "Event-grade plating and high-end local dishes for external guests and celebrations.",
    features: [
      { icon: Flame, label: "Event menu" },
      { icon: CalendarDays, label: "Dedicated setup" },
      { icon: BadgeCheck, label: "Presentation add-on" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Celebration Table`,
      description: "High-impact menu for premium occasions.",
      variants: [
        {
          id: `${day.toLowerCase()}-kacchi`,
          name: "Kacchi Premium",
          note: "Classic celebratory option with proven demand.",
          items: ["Kacchi Biryani", "Borhani", "Jali Kebab", "Firni"],
        },
        {
          id: `${day.toLowerCase()}-seafood`,
          name: "Seafood Premium",
          note: "Sophisticated plate for client hosting.",
          items: ["Butter Rice", "Prawn Malai", "Fresh Salad", "Dessert Cup"],
        },
        {
          id: `${day.toLowerCase()}-mixed-grill`,
          name: "Mixed Grill Premium",
          note: "Bold option for evening team events.",
          items: ["Garlic Naan", "Mixed Grill", "Mint Yogurt", "Lemon"],
        },
      ],
    })),
  },
  {
    id: "daily-smart",
    name: "Smart Daily Saver",
    pricePerMeal: 240,
    description: "Value-focused daily office meals with quick quantity control and easy repeats.",
    features: [
      { icon: Clock3, label: "Fast dispatch" },
      { icon: Leaf, label: "Healthy mix" },
      { icon: CalendarDays, label: "Repeat patterns" },
    ],
    days: dayOrder.map((day) => ({
      day,
      title: `${day} Smart Menu`,
      description: "Simple and affordable options for everyday teams.",
      variants: [
        {
          id: `${day.toLowerCase()}-smart-fish`,
          name: "Smart Fish Set",
          note: "Comfort and familiarity.",
          items: ["Rice", "Fish Curry", "Dal", "Bhorta"],
        },
        {
          id: `${day.toLowerCase()}-smart-chicken`,
          name: "Smart Chicken Set",
          note: "Reliable office favorite.",
          items: ["Rice", "Chicken Curry", "Vegetable", "Salad"],
        },
        {
          id: `${day.toLowerCase()}-smart-veg`,
          name: "Smart Veg Set",
          note: "Vegetarian-friendly day option.",
          items: ["Khichuri", "Mixed Veg", "Dal", "Achar"],
        },
      ],
    })),
  },
];
