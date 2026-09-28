import type { PalettePair } from "./palettes";

export type FoxOneLayout = {
  rounded: 0 | 1;
  borderRadius: number;
  hideUrlbarButtons: 0 | 1;
  hideExtensionIcons: 0 | 1;
  dynamicBookmarks: 0 | 1;
  dynamicBookmarksNewtab: 0 | 1;
  extensionsButtonRight: 0 | 1;
  showAllTabsButton: 0 | 1;
  hideNavButtons: 0 | 1;
  showLoadingProgress: 0 | 1;
  containerLineTop: 0 | 1;
  autohideNavButtons: 0 | 1 | 2;
  tabMinWidth: number;
};

export const DEFAULT_LAYOUT: FoxOneLayout = {
  rounded: 0,
  borderRadius: 8,
  hideUrlbarButtons: 0,
  hideExtensionIcons: 1,
  dynamicBookmarks: 1,
  dynamicBookmarksNewtab: 1,
  extensionsButtonRight: 1,
  showAllTabsButton: 0,
  hideNavButtons: 0,
  showLoadingProgress: 0,
  containerLineTop: 1,
  autohideNavButtons: 0,
  tabMinWidth: 76,
};

function setHex(css: string, name: string, value: string) {
  const re = new RegExp(`(${name}:\\s*)#[0-9A-Fa-f]{3,8}`, "g");
  return css.replace(re, `$1${value}`);
}

function setNum(css: string, name: string, value: string) {
  const re = new RegExp(`(${name}:\\s*)\\d+`, "g");
  return css.replace(re, `$1${value}`);
}

function setPx(css: string, name: string, value: number) {
  const re = new RegExp(`(${name}:\\s*)\\d+px`, "g");
  return css.replace(re, `$1${value}px`);
}

function setLightVar(css: string, name: string, value: string) {
  const re = new RegExp(`(${name}:\\s*)#[0-9A-Fa-f]{3,8}`, "g");
  return css.replace(re, `$1${value}`);
}

function applyLayout(css: string, layout: FoxOneLayout) {
  let out = css;
  out = setNum(out, "--uc-rounded", String(layout.rounded));
  out = setPx(out, "--uc-border-radius", layout.borderRadius);
  out = setNum(out, "--uc-hide-urlbar-buttons", String(layout.hideUrlbarButtons));
  out = setNum(out, "--uc-hide-extension-icons", String(layout.hideExtensionIcons));
  out = setNum(out, "--uc-dynamic-bookmarks-newtab", String(layout.dynamicBookmarksNewtab));
  out = setNum(out, "--uc-dynamic-bookmarks", String(layout.dynamicBookmarks));
  out = setNum(out, "--uc-extensions-button-right", String(layout.extensionsButtonRight));
  out = setNum(out, "--uc-show-all-tabs-button", String(layout.showAllTabsButton));
  out = setNum(out, "--uc-hide-nav-buttons", String(layout.hideNavButtons));
  out = setNum(out, "--uc-show-loading-progress", String(layout.showLoadingProgress));
  out = setNum(out, "--uc-container-line-top", String(layout.containerLineTop));
  out = setNum(out, "--uc-autohide-nav-buttons", String(layout.autohideNavButtons));
  out = setPx(out, "--uc-tab-min-width", layout.tabMinWidth);
  return out;
}

function applyDarkHex(css: string, pair: PalettePair) {
  let out = css;
  out = setHex(out, "--uc-color-base", pair.dark.base);
  out = setHex(out, "--uc-color-surface", pair.dark.surface);
  out = setHex(out, "--uc-color-accent", pair.dark.accent);
  out = setHex(out, "--uc-color-text", pair.dark.text);
  out = setHex(out, "--uc-color-hover", pair.dark.hover);
  out = setHex(out, "--uc-tab-hover-text", pair.dark.tabHover);
  return out;
}

function applyLightVars(css: string, pair: PalettePair) {
  let out = css;
  out = setLightVar(out, "--uc-light-color-base", pair.light.base);
  out = setLightVar(out, "--uc-light-color-surface", pair.light.surface);
  out = setLightVar(out, "--uc-light-color-accent", pair.light.accent);
  out = setLightVar(out, "--uc-light-color-text", pair.light.text);
  out = setLightVar(out, "--uc-light-color-hover", pair.light.hover);
  out = setLightVar(out, "--uc-light-tab-hover-text", pair.light.tabHover);
  return out;
}

export function applyFoxOneConfig(
  css: string,
  kind: "chrome" | "content",
  pair: PalettePair,
  layout: FoxOneLayout,
) {
  if (kind === "chrome") {
    let out = applyDarkHex(css, pair);
    out = applyLightVars(out, pair);
    return applyLayout(out, layout);
  }

  const lightRe = /@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}/;
  const lightBlock = css.match(lightRe)?.[0];
  let out = lightBlock ? css.replace(lightBlock, "\0LIGHT\0") : css;
  out = applyDarkHex(out, pair);
  out = out.replace(
    /--newtab-background-color:\s*[^;]+/,
    `--newtab-background-color: ${pair.dark.base}`,
  );
  out = out.replace(
    /--newtab-text-primary-color:\s*[^;]+/,
    `--newtab-text-primary-color: ${pair.dark.text}`,
  );
  out = out.replace(
    /::selection \{\s*background-color:\s*[^;]+;\s*color:\s*[^;]+;/,
    `::selection {\n    background-color: ${pair.dark.accent} !important;\n    color: ${pair.dark.base} !important;`,
  );
  out = applyLayout(out, layout);
  if (lightBlock) {
    let lb = lightBlock;
    lb = setHex(lb, "--uc-color-base", pair.light.base);
    lb = setHex(lb, "--uc-color-surface", pair.light.surface);
    lb = setHex(lb, "--uc-color-accent", pair.light.accent);
    lb = setHex(lb, "--uc-color-text", pair.light.text);
    lb = setHex(lb, "--uc-color-hover", pair.light.hover);
    lb = setHex(lb, "--uc-tab-hover-text", pair.light.tabHover);
    out = out.replace("\0LIGHT\0", lb);
  }
  return out;
}

export function paletteSnippet(pair: PalettePair, layout: FoxOneLayout) {
  return `/* Den — FoxOne 3.8.1 palette overlay
   Paste over the CONFIG colors in userChrome.css and the PALETTE block in userContent.css. */

:root {
  --uc-color-base:    ${pair.dark.base};
  --uc-color-surface: ${pair.dark.surface};
  --uc-color-accent:  ${pair.dark.accent};
  --uc-color-text:    ${pair.dark.text};
  --uc-color-hover:   ${pair.dark.hover};
  --uc-tab-hover-text: ${pair.dark.tabHover};

  --uc-light-color-base:    ${pair.light.base};
  --uc-light-color-surface: ${pair.light.surface};
  --uc-light-color-accent:  ${pair.light.accent};
  --uc-light-color-text:    ${pair.light.text};
  --uc-light-color-hover:   ${pair.light.hover};
  --uc-light-tab-hover-text: ${pair.light.tabHover};

  --uc-rounded: ${layout.rounded};
  --uc-border-radius: ${layout.borderRadius}px;
  --uc-hide-urlbar-buttons: ${layout.hideUrlbarButtons};
  --uc-hide-extension-icons: ${layout.hideExtensionIcons};
  --uc-dynamic-bookmarks: ${layout.dynamicBookmarks};
  --uc-dynamic-bookmarks-newtab: ${layout.dynamicBookmarksNewtab};
  --uc-extensions-button-right: ${layout.extensionsButtonRight};
  --uc-show-all-tabs-button: ${layout.showAllTabsButton};
  --uc-hide-nav-buttons: ${layout.hideNavButtons};
  --uc-show-loading-progress: ${layout.showLoadingProgress};
  --uc-container-line-top: ${layout.containerLineTop};
  --uc-autohide-nav-buttons: ${layout.autohideNavButtons};
  --uc-tab-min-width: ${layout.tabMinWidth}px;
}
`;
}

export async function downloadPatchedCss(
  kind: "chrome" | "content",
  pair: PalettePair,
  layout: FoxOneLayout,
) {
  const path = kind === "chrome" ? "/foxone/userChrome.css" : "/foxone/userContent.css";
  const name = kind === "chrome" ? "userChrome.css" : "userContent.css";
  const raw = await fetch(path).then((r) => {
    if (!r.ok) throw new Error(`Could not load ${name}`);
    return r.text();
  });
  const patched = applyFoxOneConfig(raw, kind, pair, layout);
  const blob = new Blob([patched], { type: "text/css" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

export function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}
