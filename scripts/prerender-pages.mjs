#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-photo-editor.web-free.site';

const faqJson = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Free Photo Editor really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Free Photo Editor runs in your browser. There is no account, no watermark, and your images are not uploaded to our servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What formats can I export?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can save edited photos as PNG, JPG, or WEBP directly from your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you store my photos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Editing happens locally in your browser using HTML5 canvas. Files stay on your device unless you choose to download them.',
      },
    },
  ],
};

function shell({ title, description, canonical, body, extraJsonLd = [] }) {
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
    },
    ...extraJsonLd,
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Free Photo Editor" />
  <meta name="twitter:card" content="summary" />
  <link rel="stylesheet" href="/wf-site.css" />
  <script src="https://ref.web-free.site/r.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
  <main class="wf-page">
    <header>
      <nav>
        <a href="/">Free Photo Editor</a>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </nav>
    </header>
    ${body}
    <p><a class="wf-cta" href="/">Open the editor</a></p>
  </main>
  <script src="/wf-ads.js" defer></script>
</body>
</html>`;
}

const pages = [
  {
    dir: 'online-photo-editor-no-sign-up',
    title: 'Online Photo Editor — No Sign-Up | Free Photo Editor',
    description:
      'Edit photos online without creating an account. Crop, rotate, filter, and download in your browser. No upload to our servers.',
    body: `<h1>Online photo editor with no sign-up</h1>
<p>Use Free Photo Editor to adjust your pictures instantly. Open a file from your phone or computer, edit with layers and filters, then export PNG or JPG. We never ask for a login and we do not watermark your work.</p>
<p>Everything runs client-side, which is ideal for quick social posts, documents, and personal albums.</p>`,
  },
  {
    dir: 'how-to-crop-a-photo',
    title: 'How to Crop a Photo in Your Browser | Free Photo Editor',
    description:
      'Step-by-step guide to crop photos online using Free Photo Editor. Free, private, no account.',
    body: `<h1>How to crop a photo</h1>
<ol>
<li>Open <a href="/">Free Photo Editor</a> and choose <strong>File → Open</strong> to load your image.</li>
<li>Select the <strong>Crop</strong> tool from the left toolbar.</li>
<li>Drag the handles to frame the area you want to keep, then confirm the crop.</li>
<li>Use <strong>File → Save as</strong> to download the result as PNG or JPG.</li>
</ol>
<p>Cropping never leaves your device — the tool works offline once the page has loaded.</p>`,
  },
  {
    dir: 'photo-filters-in-the-browser',
    title: 'Photo Filters in the Browser | Free Photo Editor',
    description:
      'Apply brightness, contrast, and creative filters to photos online. Free Photo Editor keeps files on your device.',
    body: `<h1>Photo filters in the browser</h1>
<p>After opening an image, open the <strong>Effects</strong> menu to try Instagram-style presets, black and white, blur, vignette, and more. Combine filters with adjustment layers for finer control.</p>
<p>Because processing uses your device CPU, you can experiment freely without waiting on a remote server.</p>`,
  },
  {
    dir: 'privacy',
    title: 'Privacy Policy | Free Photo Editor',
    description: 'Privacy policy for Free Photo Editor on web-free.site — local-only image editing.',
    body: `<h1>Privacy policy</h1>
<p><strong>Free Photo Editor</strong> (operated as part of <a href="https://web-free.site/?ref=photo-editor">web-free.site</a>) processes photos in your browser. We do not receive your image files unless you explicitly choose to open a remote URL; even then we do not store them on our servers.</p>
<p>We use Cloudflare Web Analytics and may show third-party advertisements. Those providers have their own privacy policies.</p>
<p>Contact: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>.</p>`,
  },
  {
    dir: 'terms',
    title: 'Terms of Use | Free Photo Editor',
    description: 'Terms of use for the Free Photo Editor browser tool.',
    body: `<h1>Terms of use</h1>
<p>The editor is provided “as is” without warranty. You are responsible for the images you edit and how you use exported files.</p>
<p>The underlying editor is <a href="https://github.com/viliusle/miniPaint">miniPaint</a> (MIT). Do not use the service for unlawful content.</p>`,
  },
  {
    dir: 'about',
    title: 'About Free Photo Editor',
    description:
      'About Free Photo Editor — browser-based image editing powered by miniPaint (MIT).',
    body: `<h1>About Free Photo Editor</h1>
<p>Free Photo Editor is a rebranded deployment of <a href="https://github.com/viliusle/miniPaint">miniPaint</a> by ViliusL, licensed under the MIT License. We thank the open-source community for maintaining a capable HTML5 canvas editor.</p>
<p>This site is part of the <a href="https://web-free.site/?ref=photo-editor">web-free.site</a> collection of privacy-friendly tools.</p>`,
  },
  {
    dir: 'contact',
    title: 'Contact | Free Photo Editor',
    description: 'Contact the web-free.site team about Free Photo Editor.',
    body: `<h1>Contact</h1>
<p>Questions or feedback: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>.</p>
<p>Operator: Gentil M. — <a href="https://gentil.quevvy.com">gentil.quevvy.com</a>.</p>`,
  },
];

const dist = path.resolve('dist');
for (const p of pages) {
  const dir = path.join(dist, p.dir);
  fs.mkdirSync(dir, { recursive: true });
  const canonical = `${HOST}/${p.dir}/`;
  const html = shell({
    title: p.title,
    description: p.description,
    canonical,
    body: p.body,
  });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const homeLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Photo Editor',
    url: HOST + '/',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Free browser photo editor: crop, rotate, filters, layers, and download. No account, no watermark.',
  },
  faqJson,
];

const homePath = path.join(dist, 'index.html');
if (fs.existsSync(homePath)) {
  let home = fs.readFileSync(homePath, 'utf8');
  if (!home.includes('application/ld+json')) {
    const scripts = ldTags(homeLd);
    home = home.replace('</head>', `${scripts}\n</head>`);
    fs.writeFileSync(homePath, home);
  }
}

function ldTags(items) {
  return items.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
}

console.log('Prerendered', pages.length, 'content pages');