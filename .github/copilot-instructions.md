# Copilot instructions for Affix HEA Landing Page

## Quick summary
- Small static marketing site: single page `index.html` (no build system, no server-side code). Styles have been extracted to `styles.css`.
- Uses Google Fonts and a YouTube embed. References `privacy-policy.html`, `legal-disclosures.html`, and `terms.html` which are currently not present.

## Big picture / architecture
- This repository is a plain static landing page meant to be served as-is from any static host (S3, Netlify, GitHub Pages).
- All styling lives inline in `index_2.html` (a `<style>` block + some inline style attributes). No JS is included currently.
- Naming note: file is named `index_2.html` (likely a staging/versioned copy). When deploying to root, prefer `index.html`.

## Key patterns & conventions (project-specific)
- CSS variables are defined in `:root` (e.g., `--gold`, `--bg-black`); honor these for color changes.
- Typography: primary serif used for headings is `Cinzel` and body uses `Montserrat`. Keep font imports in `<head>` when adding pages.
- Responsive approach: simple mobile breakpoint at `768px` with minimal layout rules. Keep additions light-weight and avoid heavy frameworks.
- Accessibility focus: add `title` to iframes, add `alt` text for any future images, and ensure color contrast stays high (gold on near-black background).

## Examples (concrete edits an AI might perform)
- Update the video embed: replace `YOUR_VIDEO_ID` in the iframe src and add a title attribute:

```html
<iframe title="Affix VSL" src="https://www.youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>
```

- Make the CTA link a button element for better semantics and add `aria-label` for screen readers:

```html
<a href="#apply" id="apply" class="main-btn" aria-label="See how much I qualify for">See How Much I Qualify For →</a>
```

- If extracting CSS to `styles.css`, move the `<style>` block into the file and replace with `<link rel="stylesheet" href="styles.css">` in the `<head>`.

## Developer workflows / preview & debug
- Local preview (no build): open `index_2.html` in a browser or run a static server:
  - Python: `python -m http.server 8000` (then visit `http://localhost:8000/index_2.html`)
  - Or use VS Code "Live Server" extension for quicker reloads.
- Debugging: use browser DevTools and Lighthouse for accessibility/SEO/performance checks.

## Integrations & external dependencies
- Google Fonts (external network), YouTube embed (external content) and a contact email visible in footer (`info@affixfunding.com`).
- NMLS placeholder (`NMLS #XXXXXX`) should not be changed without legal confirmation.

## Safety & legal notes
- Legal pages are referenced but not in repo. Do not invent or change legal text—flag changes for legal review.
- Replace `NMLS #XXXXXX` only after validation by a human reviewer.

## PR guidance for visual changes
- Provide screenshots for desktop and mobile in PR description.
- Note which browsers were tested (Chrome, Safari are relevant for macOS users).

## What I couldn't infer (ask before changing)
- Intended canonical filename: should `index_2.html` be renamed to `index.html` for deployment?
- Where legal copy lives and who approves updates to `privacy-policy.html`, `legal-disclosures.html`, and `terms.html`.

---


If you'd like, I can also:
- Create placeholders for `privacy-policy.html` / `terms.html` with a legal-review TODO,
- Run a quick accessibility lint (e.g., Lighthouse) and add any small fixes I find.

Tell me which of these you'd like me to do next.