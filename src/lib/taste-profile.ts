/**
 * Delta-style taste profile for flavour pages.
 * Five hoverable keys + a top metric; circles grow on scroll into view.
 */

export type TasteKey = {
  name: string;
  text: string;
  /** shown as n/15 under the description */
  score: number;
};

export type TasteProfile = {
  metricLabel: string;
  metricValue: string;
  /** which key is selected before the first hover */
  defaultIndex: number;
  keys: TasteKey[];
};

export const TASTE_BY_SLUG: Record<string, TasteProfile> = {
  "rices-biryani": {
    metricLabel: "Aroma",
    metricValue: "High",
    defaultIndex: 1,
    keys: [
      {
        name: "Spice",
        text: "Whole-spice warmth without drowning the grain.",
        score: 10,
      },
      {
        name: "Fragrance",
        text: "Ghee, dum steam, and long basmati on the first inhale.",
        score: 13,
      },
      {
        name: "Body",
        text: "How filling the plate feels after a few spoons.",
        score: 11,
      },
      {
        name: "Heat",
        text: "Chili lift — stronger on biryani, gentler on bagara.",
        score: 8,
      },
      {
        name: "Comfort",
        text: "The home-style finish of muddapappu and curd rice.",
        score: 12,
      },
    ],
  },
  frys: {
    metricLabel: "Crisp",
    metricValue: "9/10",
    defaultIndex: 0,
    keys: [
      {
        name: "Crunch",
        text: "Edges that stay dry and crackle with every bite.",
        score: 13,
      },
      {
        name: "Heat",
        text: "Pepper and chili that cling to the meat.",
        score: 12,
      },
      {
        name: "Smoke",
        text: "Tawa char on chicken, boti, and liver.",
        score: 10,
      },
      {
        name: "Salt",
        text: "Seasoning that makes rice disappear faster.",
        score: 11,
      },
      {
        name: "Share",
        text: "Built for the middle of the table, not a solo bowl.",
        score: 9,
      },
    ],
  },
  pulusu: {
    metricLabel: "Tang",
    metricValue: "Tamarind",
    defaultIndex: 2,
    keys: [
      {
        name: "Sour",
        text: "Tamarind backbone in chepala pulusu.",
        score: 13,
      },
      {
        name: "Depth",
        text: "Slow-simmered gravy that coats the rice.",
        score: 12,
      },
      {
        name: "Heat",
        text: "Chili warmth that builds, not blinds.",
        score: 11,
      },
      {
        name: "Richness",
        text: "Oil and spice body on chicken and prawns curry.",
        score: 10,
      },
      {
        name: "Balance",
        text: "Sour, salt, and heat in one spoon.",
        score: 12,
      },
    ],
  },
  thalis: {
    metricLabel: "Plate",
    metricValue: "Full",
    defaultIndex: 0,
    keys: [
      {
        name: "Variety",
        text: "Fry, curry, rice, and curd in one sitting.",
        score: 14,
      },
      {
        name: "Balance",
        text: "Heat cooled by curd and soft breads.",
        score: 12,
      },
      {
        name: "Value",
        text: "A complete meal without ordering five sides.",
        score: 13,
      },
      {
        name: "Heat",
        text: "Mix thali brings the fullest spice range.",
        score: 10,
      },
      {
        name: "Pace",
        text: "Eat slow — the plate is meant to last.",
        score: 9,
      },
    ],
  },
  starters: {
    metricLabel: "Kick",
    metricValue: "High",
    defaultIndex: 1,
    keys: [
      {
        name: "Crisp",
        text: "Batter and wok toss that stay crunchy.",
        score: 12,
      },
      {
        name: "Chili",
        text: "Indo-Chinese heat on paneer and chicken.",
        score: 13,
      },
      {
        name: "Share",
        text: "Openers sized for two before the thali.",
        score: 11,
      },
      {
        name: "Sauce",
        text: "Clingy glaze without turning soggy.",
        score: 10,
      },
      {
        name: "Salt",
        text: "Snackable between sips of Thums Up.",
        score: 11,
      },
    ],
  },
  "shakes-juices": {
    metricLabel: "Chill",
    metricValue: "Cold",
    defaultIndex: 3,
    keys: [
      {
        name: "Sweet",
        text: "Mango, chocolate, Oreo — dessert in a glass.",
        score: 12,
      },
      {
        name: "Fresh",
        text: "Mosambi and watermelon pressed to order.",
        score: 13,
      },
      {
        name: "Thickness",
        text: "Shakes dense enough to drink slow.",
        score: 11,
      },
      {
        name: "Cool",
        text: "The reset after fry and pulusu heat.",
        score: 14,
      },
      {
        name: "Finish",
        text: "Brownie or Bharath Hand Over to close.",
        score: 10,
      },
    ],
  },
};

export function getTasteProfile(slug: string): TasteProfile | undefined {
  return TASTE_BY_SLUG[slug];
}
