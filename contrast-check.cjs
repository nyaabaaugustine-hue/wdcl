const fs = require("fs");

const css = fs.readFileSync("app/globals.css", "utf8");

function block(sel) {
  const i = css.indexOf(sel);
  const start = css.indexOf("{", i);
  const end = css.indexOf("}", start);
  return css.slice(start + 1, end);
}

function tokens(src) {
  const out = {};
  for (const m of src.matchAll(/--([a-z-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)) {
    out[m[1]] = [parseFloat(m[2]), parseFloat(m[3]) / 100, parseFloat(m[4]) / 100];
  }
  return out;
}

function hsl2rgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return [r + m, g + m, b + m];
}

const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const over = (fg, bg, alpha) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
const hex = (c) => "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const themes = { light: tokens(block(":root{")), dark: tokens(block(".dark{")) };

const pairs = [
  ["body text", "foreground", "background", 4.5],
  ["muted text", "muted-foreground", "background", 4.5],
  ["muted on band", "muted-foreground", "surface-tint", 4.5],
  ["muted on card", "muted-foreground", "card", 4.5],
  ["muted on muted fill", "muted-foreground", "muted", 4.5],
  ["card title", "card-foreground", "card", 4.5],
  ["eyebrow (brand-ink)", "brand-ink", "background", 4.5],
  ["eyebrow on band", "brand-ink", "surface-tint", 4.5],
  ["badge-brand text", "brand-ink", "brand-soft", 4.5],
  ["btn-default text", "primary-foreground", "primary", 4.5],
  ["nav link", "muted-foreground", "background", 4.5],
  ["display h1 span (large)", "brand", "background", 3.0],
  ["icon in icon-box", "brand-ink", "brand-soft", 3.0],
  ["timeline dot", "brand", "background", 3.0],
  ["focus ring", "ring", "background", 3.0],
  ["form input border", "input", "background", 3.0],
  ["clay accent", "clay", "background", 3.0],
  ["border/separator", "border", "background", 1.0],
  // sub-page components
  ["mark-inkind icon", "clay-ink", "clay-soft", 3.0],
  ["mark-capital icon", "brand-ink", "brand-soft", 3.0],
  ["mark-programme icon", "primary-foreground", "primary", 3.0],
  ["supporter role label", "brand-ink", "card", 4.5],
  ["pending role label", "muted-foreground", "surface-tint", 4.5],
  ["badge-secondary text", "secondary-foreground", "secondary", 4.5],
  ["partner body", "muted-foreground", "card", 4.5],
  ["privacy body", "muted-foreground", "card", 4.5],
  ["privacy aside muted", "muted-foreground", "card", 4.5],
  ["role-card body", "muted-foreground", "card", 4.5],
  // news & stories
  ["chip resting text", "muted-foreground", "card", 4.5],
  ["read-more link", "brand-ink", "card", 4.5],
  ["post-meta text", "muted-foreground", "card", 4.5],
  ["cat-skills text", "foreground", "muted", 4.5],
  ["feature flag text", "primary-foreground", "brand", 4.5],
  ["source-box body", "muted-foreground", "surface-tint", 4.5],
  ["source-box link", "brand-ink", "surface-tint", 4.5],
  ["crumbs link", "muted-foreground", "background", 4.5],
  ["form error text", "clay-ink", "background", 4.5],
  ["status/copy text", "primary", "background", 4.5],
];

// worst composited hero-photo backgrounds (measured via hero_photo_check.py)
const hexPairs = {
  light: [
    ["hero h1 over photo (lg)", "foreground", "#bfb6b5", 3.0],
    ["hero span over photo (lg)", "brand-ink", "#bfb6b5", 3.0],
    ["hero lead over photo", "foreground", "#bfb6b5", 4.5],
  ],
  dark: [
    ["hero h1 over photo (lg)", "foreground", "#67655f", 3.0],
    ["hero span over photo (lg)", "brand-ink", "#67655f", 3.0],
    ["hero lead over photo", "foreground", "#67655f", 4.5],
  ],
};

const allPairs = (theme) => [
  ...pairs,
  ...(hexPairs[theme] || []),
];

function bgColor(t, bg) {
  return bg.startsWith("#") ? hex2rgb(bg) : hsl2rgb(...t[bg]);
}

let fail = 0;
for (const [theme, t] of Object.entries(themes)) {
  console.log(`\n===== ${theme.toUpperCase()} =====`);
  for (const [label, fg, bg, min] of allPairs(theme)) {
    if (!t[fg]) { console.log(`  ??  ${label}: missing token`); continue; }
    if (!bg.startsWith("#") && !t[bg]) { console.log(`  ??  ${label}: missing token`); continue; }
    const r = ratio(hsl2rgb(...t[fg]), bgColor(t, bg));
    const ok = r >= min;
    if (!ok) fail++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${label.padEnd(24)} ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${hex(hsl2rgb(...t[fg]))} on ${bg.startsWith("#") ? bg : hex(hsl2rgb(...t[bg]))}`
    );
  }
  // cta-card muted paragraph at opacity .82 over primary
  const p = ratio(over(hsl2rgb(...t["primary-foreground"]), hsl2rgb(...t["primary"]), 0.82), hsl2rgb(...t["primary"]));
  console.log(`  ${p >= 4.5 ? "PASS" : "FAIL"}  ${"cta-card p (.82 opacity)".padEnd(24)} ${p.toFixed(2).padStart(6)}:1  (min 4.5)`);
  if (p < 4.5) fail++;
  // cta-card icon + eyebrow now derive from primary-foreground
  const ci = ratio(hsl2rgb(...t["primary-foreground"]), hsl2rgb(...t["primary"]));
  console.log(`  ${ci >= 3 ? "PASS" : "FAIL"}  ${"cta-card check icon".padEnd(24)} ${ci.toFixed(2).padStart(6)}:1  (min 3)`);
  if (ci < 3) fail++;
  const ce = ratio(over(hsl2rgb(...t["primary-foreground"]), hsl2rgb(...t["primary"]), 0.82), hsl2rgb(...t["primary"]));
  console.log(`  ${ce >= 4.5 ? "PASS" : "FAIL"}  ${"cta-card eyebrow".padEnd(24)} ${ce.toFixed(2).padStart(6)}:1  (min 4.5)`);
  if (ce < 4.5) fail++;
  // outline button boundary must be visible
  const ob = ratio(hsl2rgb(...t["input"]), hsl2rgb(...t["background"]));
  console.log(`  ${ob >= 3 ? "PASS" : "FAIL"}  ${"btn-outline border".padEnd(24)} ${ob.toFixed(2).padStart(6)}:1  (min 3)`);
  if (ob < 3) fail++;
  // form success callout: primary text on primary@10% blended into card
  const fsc = ratio(hsl2rgb(...t["primary"]), over(hsl2rgb(...t["primary"]), hsl2rgb(...t["card"]), 0.1));
  console.log(`  ${fsc >= 4.5 ? "PASS" : "FAIL"}  ${"form success text".padEnd(24)} ${fsc.toFixed(2).padStart(6)}:1  (min 4.5)`);
  if (fsc < 4.5) fail++;
}

console.log(`\n${fail === 0 ? "ALL CHECKS PASSED" : fail + " CHECK(S) FAILED"}`);