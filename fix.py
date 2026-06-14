with open('d:/Placement/SellSavvy/src/index.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_top = """@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@font-face {
  font-family: "Gilmer";
  src: url("https://cdn.jsdelivr.net/gh/reziamini/laravel-easypanel@master/resources/assets/css/fonts/Gilmer-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Gilmer";
  src: url("https://cdn.jsdelivr.net/gh/reziamini/laravel-easypanel@master/resources/assets/css/fonts/Gilmer-Bold.otf") format("opentype");
  font-weight: 700 900;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-sans: "Gilmer", "Outfit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Gilmer", "Outfit", system-ui, sans-serif;
  --font-mono: "Gilmer", "Outfit", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

@layer base {
  :root {
    color-scheme: light;
    --brand-navy: #0b2540;
    --brand-navy-900: #071827;
    --brand-gold: #cf9c2d;
    --brand-gold-hover: #b98216;
    --brand-gold-soft: #f2e4bd;
    --brand-gold-muted: #a87312;
    --surface-light: #f8faf7;
    --surface-light-elevated: rgba(255, 255, 255, 0.86);
    --surface-dark: #071017;
    --surface-dark-elevated: #0d1a24;
    --text-primary: #071122;
    --text-muted: #46566e;
    --border-soft: rgba(148, 163, 184, 0.26);
    --hero-video-scale: 1.25;
    --hero-media-width: clamp(620px, 58vw, 1080px);
  }

  .dark {
    color-scheme: dark;
    --brand-gold: #e4bd60;
    --brand-gold-hover: #f0cf7a;
    --brand-gold-soft: rgba(228, 189, 96, 0.15);
    --brand-gold-muted: #f0cf7a;
    --surface-light-elevated: rgba(248, 250, 252, 0.92);
    --text-primary: #f8fafc;
    --text-muted: #c6d0dc;
    --border-soft: rgba(255, 255, 255, 0.12);
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    text-rendering: optimizeLegibility;
  }

  body {
    min-width: 320px;
    margin: 0;
    overflow-x: hidden;
    font-family: var(--font-sans);
    background: var(--surface-light);
  }
"""

dark_body_idx = -1
for i, l in enumerate(lines):
    if l.strip() == ".dark body {":
        dark_body_idx = i
        break

if dark_body_idx != -1:
    with open('d:/Placement/SellSavvy/src/index.css', 'w', encoding='utf-8') as f:
        f.write(new_top + "\n")
        for line in lines[dark_body_idx:]:
            f.write(line)
    print("CSS restored successfully.")
else:
    print("Could not find .dark body {")
