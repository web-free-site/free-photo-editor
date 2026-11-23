# Cursor agent brief — free-photo-editor

Target: https://free-photo-editor.web-free.site
Repo name (wrangler `name`): `free-photo-editor`
English name: "Free Photo Editor". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is a **browser photo editor**: open a local image, crop, rotate, adjust, apply filters or draw, and download the result. No account, no upload, no watermark.

## Recommended base (use this)

- Repo: https://github.com/viliusle/miniPaint
- License: MIT (keep `MIT-LICENSE.txt`, credit ViliusL / miniPaint in the footer and on `/about`)
- Stars: 3505
- Last commit: 9 Nov 2026, 20:19 Africa/Kigali — `c9192c1591` on `master`
- Official demo: `https://viliusle.github.io/miniPaint/`
- Stack: a complete online image editor (HTML5 canvas): layers, filters, crop, text, clone, open/save PNG/JPG/WEBP and more. Everything stays in the browser. Opening a remote URL is optional and must not become an upload to your server. English the default UI (you may leave existing translation files unused).
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. License text is in `MIT-LICENSE.txt` (Copyright (c) ViliusL) — keep that file. 3505 stars, still maintained in 2026, live demo, no required backend.
- Why this one: a well-known MIT editor that is already a complete website (not only a library), with crop/filters/layers and a local-file workflow.

## Backup (MIT image-editor libraries)

- Repo: https://github.com/scaleflex/filerobot-image-editor
- License: MIT (LICENSE file, Copyright (c) 2022 scaleflex)
- Stars: 1935
- Last commit: 4 Jun 2026, 15:35 Africa/Kigali — `a7cce3173c` on `master`
- A full-featured editor component (Vite demo in the repo). Use it only if miniPaint cannot be rebranded or built as static assets; you must still add prerendered marketing/how-to/legal pages.

`nhn/tui.image-editor` is MIT (7664 stars) but **archived** (last commit 13 Oct 2022). `ikuaitu/vue-fabric-editor` is MIT and large, but it ships axios, Docker, and `.env` API targets — do not use it unless you first strip every remote material/template API.

## Do not use these

- Photopea (not a permissive base you can rebrand and host).
- `1j01/jspaint` as the primary product (it is MS Paint, and it has no root `LICENSE` file; license is `NOASSERTION` on GitHub).
- Desktop, Flutter, or server-side editors, or any tool that uploads the photo.

## What to build on top of viliusle/miniPaint

1. Import the base into this repo, keep the MIT license file, and credit ViliusL / miniPaint. Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them).
2. Rebrand to "Free Photo Editor". English primary. No FR/SW translations of the site. Keep open-from-device, crop, rotate, basic adjustments/filters, and download. Do not add a watermark. You may slim rarely used tools, but crop, text, and export must work.
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no file upload to a server.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not cover the canvas or break export.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-photo-editor.web-free.site`; English how-to pages, at least `/online-photo-editor-no-sign-up`, `/how-to-crop-a-photo`, and `/photo-filters-in-the-browser` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-photo-editor.web-free.site`. No French landing page.
6. Footer: credit the upstream project, and add a link back to the hub `https://web-free.site/?ref=photo-editor`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the nine other sites in this batch (50 tools in total). Show **Free Photo Editor** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=photo-editor`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=photo-editor`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=photo-editor`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=photo-editor`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=photo-editor`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=photo-editor`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=photo-editor`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=photo-editor`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=photo-editor`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=photo-editor`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=photo-editor`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=photo-editor`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=photo-editor`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=photo-editor`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=photo-editor`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=photo-editor`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=photo-editor`), Free Meme Generator (`https://free-meme-generator.web-free.site/?ref=photo-editor`), Free Color Picker (`https://free-color-picker.web-free.site/?ref=photo-editor`), Free GIF Maker (`https://free-gif-maker.web-free.site/?ref=photo-editor`), **Free Photo Editor**, Free Logo Maker (`https://free-logo-maker.web-free.site/?ref=photo-editor`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/?ref=photo-editor`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=photo-editor`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=photo-editor`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=photo-editor`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=photo-editor`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=photo-editor`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=photo-editor`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=photo-editor`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=photo-editor`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=photo-editor`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=photo-editor`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=photo-editor`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=photo-editor`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=photo-editor`), Free Citation Generator (`https://free-citation-generator.web-free.site/?ref=photo-editor`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=photo-editor`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=photo-editor`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=photo-editor`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=photo-editor`), Free Video to GIF Converter (`https://free-video-to-gif.web-free.site/?ref=photo-editor`), Free Audio Converter (`https://free-audio-converter.web-free.site/?ref=photo-editor`), Free Video Converter (`https://free-video-converter.web-free.site/?ref=photo-editor`).
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=photo-editor`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=photo-editor`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=photo-editor`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=photo-editor`).
     - **Time:** Free Time Zone Converter (`https://free-time-zone-converter.web-free.site/?ref=photo-editor`).
     - **Drawing:** Free Whiteboard (`https://free-whiteboard.web-free.site/?ref=photo-editor`).
     - **Random & pickers:** Free Spin Wheel (`https://free-spin-wheel.web-free.site/?ref=photo-editor`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-photo-editor"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-photo-editor.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally, open a local photo, crop or rotate it, apply one filter or adjustment, download the result and open it, check mobile at 390px, confirm no file is uploaded, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes are not ready yet (sites are not live). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23bplaceholder`). After a browser agent writes real keys to `adsterra-codes.md`, a later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-photo-editor.web-free.site — site ID 6222783
Popunder 63a55326b3aba451afa990c9e98a5a5c
Native Banner 1d662b2d4d7667b529ebf220d4937091
Smartlink 526e2a5b848cb97cdbc826bcb72432b4
Social Bar 3cb4daad3299a3acb007060d0827eff5
468x60 f308f5c8bcf60456d31aaaea35726921
160x300 15c75b09014a96d2a02cde7ad35689a1
320x50 3f8ba2ba6ca92ec9c5775a4b4c998d5f
300x250 4695ab273af8e5f1e896567a41888aeb
160x600 c15ab05270ed2ac4b37ba6479fe494b8
728x90 0ed51aa3dc36cfd34bcc106d93ccf41d
