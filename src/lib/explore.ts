/**
 * "Explore" flavours: the cards on the home page and the themed detail page
 * each one opens (/explore/[slug]). Every flavour carries its own colour theme.
 */

export type ExplorePattern = "diamond" | "dots" | "zigzag" | "waves" | "stripes";

export type ExploreTheme = {
  deep: string;
  main: string;
  light: string;
  soft: string;
  onMain: string;
};

export type Explore = {
  slug: string;
  name: string;
  note: string;
  img: string;
  accent: string;
  pattern: ExplorePattern;
  theme: ExploreTheme;
  kind: string;
  story: string;
  intensity: number;
  intensityLabel: string;
  meta: { label: string; value: string }[];
  notes: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  categories: string[];
  gallery: string[];
};

export const EXPLORE: Explore[] = [
  {
    slug: "rices-biryani",
    name: "Rices & Biryani",
    note: "Staple",
    img: "",
    accent: "#c4782b",
    pattern: "waves",
    theme: {
      deep: "#3a1c08",
      main: "#c4782b",
      light: "#f0c27a",
      soft: "#f8efe2",
      onMain: "#ffffff",
    },
    kind: "Bagara, pulao, and dum biryani",
    story:
      "From tempered bagara and muddapappu avakaya to layered chicken and prawns biryani — rice is the centre of every table here.",
    intensity: 7,
    intensityLabel: "Aromatic",
    meta: [
      { label: "Serves", value: "1–2" },
      { label: "Prep", value: "20–40 min" },
      { label: "Pairs with", value: "Raita & fry" },
    ],
    notes: [
      { title: "Ghee temper", text: "Whole spices bloomed in ghee for bagara." },
      { title: "Dum seal", text: "Biryani sealed slow so steam does the work." },
      { title: "Pickle punch", text: "Avakaya heat against soft muddapappu." },
      { title: "Grain", text: "Basmati kept long, separate, fragrant." },
    ],
    steps: [
      { title: "Soak", text: "Rice washed and rested before the pot." },
      { title: "Temper", text: "Spices, onion and ghee set the base." },
      { title: "Layer", text: "Meat or veg stacked with rice for dum." },
      { title: "Rest", text: "Opened at the table, steam still rising." },
    ],
    categories: ["Rices"],
    gallery: [],
  },
  {
    slug: "frys",
    name: "Andhra Frys",
    note: "Crisp",
    img: "",
    accent: "#b53a1a",
    pattern: "stripes",
    theme: {
      deep: "#3f1208",
      main: "#b53a1a",
      light: "#ff8a5b",
      soft: "#fbeae4",
      onMain: "#ffffff",
    },
    kind: "Egg, chicken, boti, fish, prawns",
    story:
      "Dry, peppery, and built for rice — our frys carry the heat of Andhra without drowning in gravy.",
    intensity: 9,
    intensityLabel: "Fiery",
    meta: [
      { label: "Serves", value: "1–2" },
      { label: "Prep", value: "15–25 min" },
      { label: "Pairs with", value: "Bagara rice" },
    ],
    notes: [
      { title: "Marinade", text: "Chili, ginger-garlic, and spice dust." },
      { title: "High heat", text: "Seared until the edges crackle." },
      { title: "Dry finish", text: "No watery gravy — just spice cling." },
      { title: "Share plate", text: "Meant for the middle of the table." },
    ],
    steps: [
      { title: "Marinate", text: "Pieces rest in spice until ready." },
      { title: "Fry", text: "Hot oil or tawa until crisp." },
      { title: "Toss", text: "Finished with curry leaf and chili." },
      { title: "Serve", text: "Straight to the thali or as a side." },
    ],
    categories: ["Frys", "Starters"],
    gallery: [],
  },
  {
    slug: "pulusu",
    name: "Pulusu & Curries",
    note: "Tangy",
    img: "",
    accent: "#8b3a1a",
    pattern: "diamond",
    theme: {
      deep: "#2c1208",
      main: "#8b3a1a",
      light: "#e8a06a",
      soft: "#f6ebe3",
      onMain: "#ffffff",
    },
    kind: "Chepala pulusu, chicken curry, paneer",
    story:
      "Tamarind-forward pulusu and slow gravies — the other half of our name, poured over white rice or bagara.",
    intensity: 8,
    intensityLabel: "Tangy heat",
    meta: [
      { label: "Serves", value: "1–2" },
      { label: "Prep", value: "25–40 min" },
      { label: "Pairs with", value: "White rice" },
    ],
    notes: [
      { title: "Tamarind", text: "Sour backbone of chepala pulusu." },
      { title: "Slow simmer", text: "Gravy thickens without rushing." },
      { title: "Fish & prawns", text: "Coastal plates beside land curries." },
      { title: "Veg pots", text: "Dal, sambar, kaju mushroom, paneer." },
    ],
    steps: [
      { title: "Base", text: "Onion, chili, and spice paste." },
      { title: "Sour", text: "Tamarind or tomato for body." },
      { title: "Simmer", text: "Protein cooks through the gravy." },
      { title: "Rest", text: "Flavours settle before service." },
    ],
    categories: ["Curries & Pulusu", "Veg Curries"],
    gallery: [],
  },
  {
    slug: "thalis",
    name: "Thalis",
    note: "Full plate",
    img: "",
    accent: "#a05a20",
    pattern: "dots",
    theme: {
      deep: "#3a220c",
      main: "#a05a20",
      light: "#e8c07a",
      soft: "#f7f0e4",
      onMain: "#ffffff",
    },
    kind: "Veg, chicken, fish, and mix",
    story:
      "Composed plates — rice, fry, curry, and curd in one sitting. From a light veg thali to the full mix.",
    intensity: 6,
    intensityLabel: "Complete",
    meta: [
      { label: "Serves", value: "1" },
      { label: "Prep", value: "20 min" },
      { label: "Pairs with", value: "Pulka" },
    ],
    notes: [
      { title: "Balance", text: "Fry heat against cool curd." },
      { title: "Rice first", text: "Bagara or white as the base." },
      { title: "Mix thali", text: "Chicken, fish, boti, and liver together." },
      { title: "Veg path", text: "Dal, sambar, pachadi, papad." },
    ],
    steps: [
      { title: "Plate", text: "Rice set in the centre." },
      { title: "Sides", text: "Fry and curry portions arranged." },
      { title: "Cool", text: "Curd and pickle to finish." },
      { title: "Serve", text: "One tray, one full meal." },
    ],
    categories: ["Thalis", "Breads"],
    gallery: [],
  },
  {
    slug: "starters",
    name: "Starters",
    note: "Openers",
    img: "",
    accent: "#c45a1a",
    pattern: "zigzag",
    theme: {
      deep: "#3a1608",
      main: "#c45a1a",
      light: "#ffb078",
      soft: "#fbeee4",
      onMain: "#ffffff",
    },
    kind: "65, chilli, wings, prawns loose",
    story:
      "Indo-Chinese and Andhra openers — chilli paneer to prawns loose — before the rice and pulusu land.",
    intensity: 8,
    intensityLabel: "Bold",
    meta: [
      { label: "Serves", value: "2" },
      { label: "Prep", value: "15–20 min" },
      { label: "Pairs with", value: "Soft drinks" },
    ],
    notes: [
      { title: "Crisp coat", text: "Batter that stays crunchy." },
      { title: "Chili toss", text: "Onion, capsicum, sauce cling." },
      { title: "65 classic", text: "Red, hot, and familiar." },
      { title: "Share", text: "Built for the first round." },
    ],
    steps: [
      { title: "Coat", text: "Pieces dusted and rested." },
      { title: "Fry", text: "Hot oil until golden." },
      { title: "Toss", text: "Sauce and aromatics in the wok." },
      { title: "Plate", text: "Served with onion and lemon." },
    ],
    categories: ["Starters"],
    gallery: [],
  },
  {
    slug: "shakes-juices",
    name: "Shakes & Juices",
    note: "Cool",
    img: "",
    accent: "#2a7a5a",
    pattern: "waves",
    theme: {
      deep: "#0e2a20",
      main: "#2a7a5a",
      light: "#7ed4b0",
      soft: "#e8f5ef",
      onMain: "#ffffff",
    },
    kind: "Three juices, six shakes",
    story:
      "Mango, mosambi, and watermelon juices beside chocolate, Oreo, badam and more — coolers for the spice.",
    intensity: 3,
    intensityLabel: "Refreshing",
    meta: [
      { label: "Serves", value: "1" },
      { label: "Prep", value: "5 min" },
      { label: "Pairs with", value: "Any thali" },
    ],
    notes: [
      { title: "Fresh press", text: "Juices made to order." },
      { title: "Thick shake", text: "Ice cream blended dense." },
      { title: "Badam", text: "Almond richness without heavy spice." },
      { title: "Soft drinks", text: "Thums Up, Red Bull, Diet Coke on the side." },
    ],
    steps: [
      { title: "Pick", text: "Choose juice or shake." },
      { title: "Blend", text: "Fruit or ice cream into the jar." },
      { title: "Chill", text: "Served cold, ready for the heat." },
      { title: "Sip", text: "Between bites of fry and pulusu." },
    ],
    categories: ["Juices", "Shakes", "Soft Drinks", "Desserts"],
    gallery: [],
  },
];

const CATEGORY_FLAVOUR: Record<string, string> = {
  Rices: "rices-biryani",
  "Veg Curries": "pulusu",
  Frys: "frys",
  "Curries & Pulusu": "pulusu",
  Starters: "starters",
  Thalis: "thalis",
  Breads: "thalis",
  Juices: "shakes-juices",
  Shakes: "shakes-juices",
  "Soft Drinks": "shakes-juices",
  Desserts: "shakes-juices",
};

export function getExplore(slug: string) {
  return EXPLORE.find((e) => e.slug === slug);
}

export function exploreSlugs() {
  return EXPLORE.map((e) => e.slug);
}

const SPICE_THEME: ExploreTheme = {
  deep: "#4a1408",
  main: "#cf4a1c",
  light: "#ff9a6b",
  soft: "#fbebe4",
  onMain: "#ffffff",
};

export function themeForCategory(category: string): {
  flavour?: Explore;
  theme: ExploreTheme;
  pattern: ExplorePattern;
} {
  const slug = CATEGORY_FLAVOUR[category];
  const flavour = slug ? getExplore(slug) : undefined;
  if (flavour) return { flavour, theme: flavour.theme, pattern: flavour.pattern };
  return { theme: SPICE_THEME, pattern: "diamond" };
}
