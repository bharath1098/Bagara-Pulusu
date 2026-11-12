/** Named color palettes for the public site theme selector. */

export type ColorThemeId =
  | "chulha"
  | "tamarind"
  | "curry-leaf"
  | "turmeric"
  | "midnight"
  | "clay";

export type ColorThemeVars = {
  forest950: string;
  forest900: string;
  forest800: string;
  forest700: string;
  sage500: string;
  sage300: string;
  sage100: string;
  cream50: string;
  cream100: string;
  cream200: string;
  gold500: string;
  gold300: string;
  rose500: string;
  blossom: string;
  blossomSoft: string;
  wood: string;
  ink: string;
  inkSoft: string;
  line: string;
  surface: string;
  onDark: string;
  sky500: string;
  sky600: string;
  sky700: string;
  heroFrom: string;
  heroTo: string;
};

export type ColorTheme = {
  id: ColorThemeId;
  label: string;
  note: string;
  /** Light-mode preview: accent · paper · ink */
  swatches: [string, string, string];
  /** Dark-mode preview: accent · deep surface · soft text */
  darkSwatches: [string, string, string];
  light: ColorThemeVars;
  dark: ColorThemeVars;
};

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "chulha",
    label: "Chulha",
    note: "Chili & parchment",
    swatches: ["#b53a1a", "#f3ebe0", "#1c1009"],
    darkSwatches: ["#e07a4a", "#1a0f0c", "#f0dcc8"],
    light: {
      forest950: "#1c1009",
      forest900: "#2b170c",
      forest800: "#3f2112",
      forest700: "#5a3218",
      sage500: "#9a4f1c",
      sage300: "#d4a06a",
      sage100: "#f0e4d4",
      cream50: "#faf6f0",
      cream100: "#f3ebe0",
      cream200: "#e5d5c0",
      gold500: "#b53a1a",
      gold300: "#d4623a",
      rose500: "#c45a3a",
      blossom: "#b53a1a",
      blossomSoft: "#f0b8a8",
      wood: "#6b3a1e",
      ink: "#1c1009",
      inkSoft: "#5c4030",
      line: "rgba(28, 16, 9, 0.12)",
      surface: "#fffcf7",
      onDark: "#f3ebe0",
      sky500: "#b53a1a",
      sky600: "#9a2f14",
      sky700: "#7a2410",
      heroFrom: "#efe4d4",
      heroTo: "#e8d7c0",
    },
    dark: {
      forest950: "#0e0907",
      forest900: "#16100d",
      forest800: "#241814",
      forest700: "#e07a4a",
      sage500: "#e8a06a",
      sage300: "#f0c49a",
      sage100: "#3a241c",
      cream50: "#2a1a14",
      cream100: "#1a0f0c",
      cream200: "#3a241c",
      gold500: "#e07a4a",
      gold300: "#f0a070",
      rose500: "#e8886a",
      blossom: "#e07a4a",
      blossomSoft: "#f5c4b0",
      wood: "#c47850",
      ink: "#f5ebe0",
      inkSoft: "#d4b8a0",
      line: "rgba(240, 180, 140, 0.14)",
      surface: "#1f1410",
      onDark: "#f5ebe0",
      sky500: "#e07a4a",
      sky600: "#f09060",
      sky700: "#f5c4b0",
      heroFrom: "#241814",
      heroTo: "#0e0907",
    },
  },
  {
    id: "tamarind",
    label: "Tamarind",
    note: "Sour brown heat",
    swatches: ["#8b3a1a", "#f6ebe3", "#2c1208"],
    darkSwatches: ["#d4925a", "#140e0b", "#edd8c4"],
    light: {
      forest950: "#2c1208",
      forest900: "#3a160c",
      forest800: "#4a1c10",
      forest700: "#6b2a14",
      sage500: "#a05a20",
      sage300: "#e8a06a",
      sage100: "#f6ebe3",
      cream50: "#fbf6f1",
      cream100: "#f6ebe3",
      cream200: "#e8d0c0",
      gold500: "#8b3a1a",
      gold300: "#c4782b",
      rose500: "#a04528",
      blossom: "#8b3a1a",
      blossomSoft: "#e8b8a0",
      wood: "#5c3218",
      ink: "#2c1208",
      inkSoft: "#6b4030",
      line: "rgba(44, 18, 8, 0.12)",
      surface: "#fffaf6",
      onDark: "#f6ebe3",
      sky500: "#8b3a1a",
      sky600: "#6f2e14",
      sky700: "#54220e",
      heroFrom: "#f0ddd0",
      heroTo: "#e4c8b4",
    },
    dark: {
      forest950: "#0c0908",
      forest900: "#140e0b",
      forest800: "#221812",
      forest700: "#d4925a",
      sage500: "#d4a070",
      sage300: "#e8c090",
      sage100: "#352418",
      cream50: "#261a12",
      cream100: "#140e0b",
      cream200: "#352418",
      gold500: "#c4782b",
      gold300: "#e0a05a",
      rose500: "#c46848",
      blossom: "#d4925a",
      blossomSoft: "#ecc4a0",
      wood: "#b88860",
      ink: "#f2e6da",
      inkSoft: "#cbb09a",
      line: "rgba(212, 160, 100, 0.14)",
      surface: "#1a120e",
      onDark: "#f2e6da",
      sky500: "#d4925a",
      sky600: "#e0a870",
      sky700: "#ecc4a0",
      heroFrom: "#221812",
      heroTo: "#0c0908",
    },
  },
  {
    id: "curry-leaf",
    label: "Curry Leaf",
    note: "Green & warm cream",
    swatches: ["#556b2f", "#f3f0e6", "#142418"],
    darkSwatches: ["#6f8f3e", "#0b0d0b", "#e8ebe2"],
    light: {
      forest950: "#142418",
      forest900: "#1c3222",
      forest800: "#274530",
      forest700: "#3a5f42",
      sage500: "#4a7a3a",
      sage300: "#9cbc7a",
      sage100: "#e8efdf",
      cream50: "#f7f5ec",
      cream100: "#f3f0e6",
      cream200: "#ddd6c4",
      gold500: "#556b2f",
      gold300: "#6f8f3e",
      rose500: "#b53a1a",
      blossom: "#556b2f",
      blossomSoft: "#c5d4a8",
      wood: "#4a5c30",
      ink: "#142418",
      inkSoft: "#3d5244",
      line: "rgba(20, 36, 24, 0.12)",
      surface: "#fcfbf6",
      onDark: "#f3f0e6",
      sky500: "#556b2f",
      sky600: "#445526",
      sky700: "#33401c",
      heroFrom: "#e8efe0",
      heroTo: "#d8e2cc",
    },
    dark: {
      forest950: "#070807",
      forest900: "#0b0d0b",
      forest800: "#141814",
      forest700: "#8fb05a",
      sage500: "#8fb05a",
      sage300: "#b4c888",
      sage100: "#1c2418",
      cream50: "#161a14",
      cream100: "#0b0d0b",
      cream200: "#1c2418",
      gold500: "#6f8f3e",
      gold300: "#8fb05a",
      rose500: "#e07a5a",
      blossom: "#6f8f3e",
      blossomSoft: "#c5d4a8",
      wood: "#8aa06a",
      ink: "#eef1e8",
      inkSoft: "#a8b49a",
      line: "rgba(143, 176, 90, 0.16)",
      surface: "#111411",
      onDark: "#eef1e8",
      sky500: "#6f8f3e",
      sky600: "#8fb05a",
      sky700: "#c5d4a8",
      heroFrom: "#141814",
      heroTo: "#070807",
    },
  },
  {
    id: "turmeric",
    label: "Turmeric",
    note: "Gold spice glow",
    swatches: ["#c4782b", "#f8f1e2", "#1a1208"],
    darkSwatches: ["#e8b45a", "#12100a", "#f3e8d0"],
    light: {
      forest950: "#1a1208",
      forest900: "#2a1c0c",
      forest800: "#3d2a12",
      forest700: "#5c3e18",
      sage500: "#a05a20",
      sage300: "#e8c07a",
      sage100: "#f7f0e4",
      cream50: "#fbf6ec",
      cream100: "#f8f1e2",
      cream200: "#e8d7b8",
      gold500: "#c4782b",
      gold300: "#e8a84a",
      rose500: "#b53a1a",
      blossom: "#c4782b",
      blossomSoft: "#f0d4a0",
      wood: "#6b4a1e",
      ink: "#1a1208",
      inkSoft: "#5c4830",
      line: "rgba(26, 18, 8, 0.12)",
      surface: "#fffcf5",
      onDark: "#f8f1e2",
      sky500: "#c4782b",
      sky600: "#a05a20",
      sky700: "#7a4014",
      heroFrom: "#f3e6c8",
      heroTo: "#e8d4a8",
    },
    dark: {
      forest950: "#0a0906",
      forest900: "#12100a",
      forest800: "#1e1a10",
      forest700: "#e8b45a",
      sage500: "#d4a860",
      sage300: "#f0d090",
      sage100: "#322818",
      cream50: "#221c12",
      cream100: "#12100a",
      cream200: "#322818",
      gold500: "#d4983a",
      gold300: "#ecc070",
      rose500: "#e07850",
      blossom: "#e0a848",
      blossomSoft: "#f5dca8",
      wood: "#c4a060",
      ink: "#f6edd8",
      inkSoft: "#d0bc94",
      line: "rgba(232, 180, 90, 0.14)",
      surface: "#18140c",
      onDark: "#f6edd8",
      sky500: "#e0a848",
      sky600: "#ecc070",
      sky700: "#f5dca8",
      heroFrom: "#1e1a10",
      heroTo: "#0a0906",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    note: "Dark ember kitchen",
    swatches: ["#e07a4a", "#2a1a14", "#f3ebe0"],
    darkSwatches: ["#f09060", "#0a0808", "#f0e4d8"],
    light: {
      forest950: "#1a100c",
      forest900: "#2a1a14",
      forest800: "#3a241c",
      forest700: "#5a3830",
      sage500: "#c47850",
      sage300: "#e8a07a",
      sage100: "#f0e4dc",
      cream50: "#faf4f0",
      cream100: "#f3ebe0",
      cream200: "#e0d0c4",
      gold500: "#d4623a",
      gold300: "#e07a4a",
      rose500: "#c45a3a",
      blossom: "#d4623a",
      blossomSoft: "#f0b8a8",
      wood: "#6b3a1e",
      ink: "#1a100c",
      inkSoft: "#5c4038",
      line: "rgba(26, 16, 12, 0.12)",
      surface: "#fffaf7",
      onDark: "#f3ebe0",
      sky500: "#d4623a",
      sky600: "#b54828",
      sky700: "#8a341c",
      heroFrom: "#efe4dc",
      heroTo: "#e4d0c4",
    },
    dark: {
      forest950: "#060505",
      forest900: "#0a0808",
      forest800: "#161210",
      forest700: "#f09060",
      sage500: "#e8a070",
      sage300: "#f0c090",
      sage100: "#2a201c",
      cream50: "#1c1614",
      cream100: "#0a0808",
      cream200: "#2a201c",
      gold500: "#e07a4a",
      gold300: "#f0a070",
      rose500: "#e87858",
      blossom: "#e07a4a",
      blossomSoft: "#f5c4b0",
      wood: "#c48860",
      ink: "#f0e4d8",
      inkSoft: "#c8b0a0",
      line: "rgba(240, 144, 96, 0.14)",
      surface: "#120e0c",
      onDark: "#f0e4d8",
      sky500: "#e07a4a",
      sky600: "#f09060",
      sky700: "#f5c4b0",
      heroFrom: "#161210",
      heroTo: "#060505",
    },
  },
  {
    id: "clay",
    label: "Clay Pot",
    note: "Earthy terracotta",
    swatches: ["#a05a3c", "#f4ebe3", "#2a1810"],
    darkSwatches: ["#d4a080", "#120e0c", "#f0e4d8"],
    light: {
      forest950: "#2a1810",
      forest900: "#3a2218",
      forest800: "#4a2e20",
      forest700: "#6b4030",
      sage500: "#8b5a3c",
      sage300: "#d4a06a",
      sage100: "#f0e4d8",
      cream50: "#faf5f0",
      cream100: "#f4ebe3",
      cream200: "#e0d0c0",
      gold500: "#a05a3c",
      gold300: "#c47850",
      rose500: "#b54830",
      blossom: "#a05a3c",
      blossomSoft: "#e8c4b0",
      wood: "#6b4030",
      ink: "#2a1810",
      inkSoft: "#5c4030",
      line: "rgba(42, 24, 16, 0.12)",
      surface: "#fffcf9",
      onDark: "#f4ebe3",
      sky500: "#a05a3c",
      sky600: "#844830",
      sky700: "#683820",
      heroFrom: "#efe2d6",
      heroTo: "#e0ccba",
    },
    dark: {
      forest950: "#0c0a09",
      forest900: "#120e0c",
      forest800: "#1e1814",
      forest700: "#d4a080",
      sage500: "#c49878",
      sage300: "#e0bca0",
      sage100: "#322820",
      cream50: "#221a16",
      cream100: "#120e0c",
      cream200: "#322820",
      gold500: "#c48860",
      gold300: "#dcb090",
      rose500: "#d07058",
      blossom: "#c89070",
      blossomSoft: "#e8c8b0",
      wood: "#b89878",
      ink: "#f0e4d8",
      inkSoft: "#c8b0a0",
      line: "rgba(212, 160, 128, 0.14)",
      surface: "#181210",
      onDark: "#f0e4d8",
      sky500: "#c89070",
      sky600: "#dcb090",
      sky700: "#e8c8b0",
      heroFrom: "#1e1814",
      heroTo: "#0c0a09",
    },
  },
];

export const DEFAULT_COLOR_THEME: ColorThemeId = "curry-leaf";

export function getColorTheme(id: string | null | undefined): ColorTheme {
  return COLOR_THEMES.find((t) => t.id === id) ?? COLOR_THEMES[0];
}

/** Apply palette accents + Light/Dark paper surfaces. */
export function applySiteTheme(
  theme: ColorTheme,
  appearance: "light" | "dark",
) {
  const root = document.documentElement;
  const v = appearance === "dark" ? theme.dark : theme.light;
  root.dataset.palette = theme.id;
  root.dataset.theme = appearance;

  const set = (name: string, value: string) => root.style.setProperty(name, value);

  set("--forest-950", v.forest950);
  set("--forest-900", v.forest900);
  set("--forest-800", v.forest800);
  set("--forest-700", v.forest700);
  set("--sage-500", v.sage500);
  set("--sage-300", v.sage300);
  set("--sage-100", v.sage100);
  set("--cream-50", v.cream50);
  set("--cream-100", v.cream100);
  set("--cream-200", v.cream200);
  set("--gold-500", v.gold500);
  set("--gold-300", v.gold300);
  set("--rose-500", v.rose500);
  set("--blossom", v.blossom);
  set("--blossom-soft", v.blossomSoft);
  set("--wood", v.wood);
  set("--ink", v.ink);
  set("--ink-soft", v.inkSoft);
  set("--line", v.line);
  set("--surface", v.surface);
  set("--on-dark", v.onDark);
  set("--sky-500", v.sky500);
  set("--sky-600", v.sky600);
  set("--sky-700", v.sky700);
  set("--bp-hero-from", v.heroFrom);
  set("--bp-hero-to", v.heroTo);
}
