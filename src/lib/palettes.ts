export type Palette = {
  base: string;
  surface: string;
  accent: string;
  text: string;
  hover: string;
  tabHover: string;
};

export type PalettePair = {
  dark: Palette;
  light: Palette;
};

export type Preset = {
  id: string;
  name: string;
  pair: PalettePair;
};

export const GRUVBOX: PalettePair = {
  dark: {
    base: "#282828",
    surface: "#3c3836",
    accent: "#fabd2f",
    text: "#ffffff",
    hover: "#7c6f64",
    tabHover: "#ffda85",
  },
  light: {
    base: "#fbf1c7",
    surface: "#ebdbb2",
    accent: "#b57614",
    text: "#3c3836",
    hover: "#bdae93",
    tabHover: "#855d22",
  },
};

export const PRESETS: Preset[] = [
  { id: "gruvbox", name: "Gruvbox", pair: GRUVBOX },
  {
    id: "nord",
    name: "Nord",
    pair: {
      dark: {
        base: "#2e3440",
        surface: "#3b4252",
        accent: "#88c0d0",
        text: "#eceff4",
        hover: "#4c566a",
        tabHover: "#8fbcbb",
      },
      light: {
        base: "#eceff4",
        surface: "#e5e9f0",
        accent: "#5e81ac",
        text: "#2e3440",
        hover: "#d8dee9",
        tabHover: "#81a1c1",
      },
    },
  },
  {
    id: "everforest",
    name: "Everforest",
    pair: {
      dark: {
        base: "#2b3339",
        surface: "#3a454a",
        accent: "#a7c080",
        text: "#d3c6aa",
        hover: "#4a555b",
        tabHover: "#dbbc7f",
      },
      light: {
        base: "#fdf6e3",
        surface: "#efebd4",
        accent: "#8da101",
        text: "#5c6a72",
        hover: "#e6e2cc",
        tabHover: "#dfa000",
      },
    },
  },
  {
    id: "tokyo",
    name: "Tokyo Night",
    pair: {
      dark: {
        base: "#1a1b26",
        surface: "#24283b",
        accent: "#7aa2f7",
        text: "#c0caf5",
        hover: "#414868",
        tabHover: "#89ddff",
      },
      light: {
        base: "#d5d6db",
        surface: "#e1e2e7",
        accent: "#34548a",
        text: "#343b58",
        hover: "#c4c8da",
        tabHover: "#166775",
      },
    },
  },
  {
    id: "kanagawa",
    name: "Kanagawa",
    pair: {
      dark: {
        base: "#1f1f28",
        surface: "#2a2a37",
        accent: "#e6c384",
        text: "#dcd7ba",
        hover: "#363646",
        tabHover: "#ffa066",
      },
      light: {
        base: "#f2ecbc",
        surface: "#e7dba0",
        accent: "#cc6d00",
        text: "#545464",
        hover: "#d5cea3",
        tabHover: "#b35b00",
      },
    },
  },
];

export function findPreset(id: string) {
  return PRESETS.find((p) => p.id === id);
}
