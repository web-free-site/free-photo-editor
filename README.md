# Free Photo Editor

Browser-based photo editor for [free-photo-editor.web-free.site](https://free-photo-editor.web-free.site): crop, rotate, filters, layers, and export. No account, no watermark, no server upload.

Based on [miniPaint](https://github.com/viliusle/miniPaint) by ViliusL (see `MIT-LICENSE.txt`).

## Scripts

```bash
npm install
npm run server    # local dev (webpack-dev-server)
npm run build     # production → dist/
npm run preview:cf  # build + wrangler dev (not deploy)
```

Agent build instructions: `AGENT_BRIEF.md`.