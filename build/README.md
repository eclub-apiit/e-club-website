# Search and social pages

`seo.mjs` is part of the Vite build, imported by `vite.config.js`. Commit this folder along with `src/seo`, `src/data/registrations.js` and the application edits. It is required build code; the unrelated optional `scripts/` folder is not needed for deployment.

Run `npm ci` and `npm run build` as usual. The build generates:

- Route-specific HTML for the 14 public pages, with unique titles, descriptions, canonical URLs, Open Graph/Twitter tags and readable content before JavaScript starts.
- Convergence Event JSON-LD, based on `src/features/summit/event.js`, with the confirmed venue/address and registration action.
- Separate Sandbox page identity, described as the inter-school pitching competition. Its event date and prices are not assumed.
- `dist/robots.txt`, `dist/sitemap.xml` and three 1200×630 JPEG sharing cards.

The initial HTML is the same for all visitors and bots. React replaces the initial readable content with the interactive website. `PageSeo.jsx` keeps metadata consistent during client-side navigation. The event experience and static description use the same date, programme and registration source.

The public origin is `https://eclub.apiit.lk`. Summit has its own canonical `/convergence-summit-2026/`; Sandbox has `/sandbox/`. Public page canonicals use trailing slashes to match the generated directories. Query strings and hashes are excluded from canonical URLs.

Serve the complete `dist` directory. Nginx should prefer generated pages before the SPA fallback, for example:

```nginx
index index.html;
location / {
    try_files $uri $uri/ /index.html;
}
```

No Node server is needed in production. With an existing deployment, verify that a raw request to `/convergence-summit-2026/` returns the Summit title and `site-structured-data`, and that `/sandbox/` returns the Sandbox title.

After publishing, submit `https://eclub.apiit.lk/sitemap.xml` in Google Search Console. Request indexing for the homepage, Summit and Sandbox URLs using URL Inspection. Validate the published Summit URL in Google's Rich Results Test. Changes in indexing, rankings and AI Overviews remain Google's decision and can take time after recrawling.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event).

## Homepage event rollover

Convergence is promoted through 26 November 2026 in Sri Lanka. At `2026-11-27T00:00:00+05:30`, the interactive homepage automatically replaces the two registration cards with the original standalone purple Sandbox feature. Open tabs update at the boundary and recheck when resumed. A client timezone change does not change the cutoff instant. The Summit page itself remains available.

The homepage's client-side metadata also stops promoting Convergence after this cutoff. Fresh production builds follow the same schedule for their initial static HTML; existing static HTML is refreshed on the next build.
