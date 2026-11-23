#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const dist = path.join(root, 'dist');

function cpDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    if (name === 'node_modules' || name === '.git') continue;
    const s = path.join(src, name);
    const d = path.join(dest, name);
    const st = fs.statSync(s);
    if (st.isDirectory()) cpDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

fs.mkdirSync(dist, { recursive: true });
cpDir(path.join(root, 'images'), path.join(dist, 'images'));
for (const f of fs.readdirSync(path.join(root, 'public'))) {
  fs.copyFileSync(path.join(root, 'public', f), path.join(dist, f));
}

let index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
index = index.replace(/src="dist\/bundle\.js"/, 'src="/bundle.js"');
fs.writeFileSync(path.join(dist, 'index.html'), index);

const robots = `User-agent: *
Allow: /

Sitemap: https://free-photo-editor.web-free.site/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

console.log('assemble-dist: copied static assets into dist/');