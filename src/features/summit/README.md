# Convergence Summit — immersive website

Canonical URL: **`/convergence-summit-2026/`**

Run `npm run dev` from the repository root. Source is in `src/features/summit`; the final public assets are in `public/summit` (approximately 540 KB). Old `/next`, `/immersive`, `/summit-immersive` and missing-trailing-slash routes redirect to the canonical page while preserving the query string and hash.

The previous two designs, source-specific scripts and large reference assets were moved out of the project to `/tmp/eclub-summit-archive-eldczu9b`. They are not deployed or included by the Git commands below. This is a local temporary backup; it is not a second public website.

Nothing has been committed or pushed by the assistant.

## Content and programme

The supplied **The Convergence Summit 2026 Brief.pdf** was compared against the site. The timetable below reflects both pages of the supplied brief; venue and registration details were subsequently supplied by the organiser.

The eight sessions are registration 09:30–10:00, opening 10:00–10:30, panel/Q&A 10:30–12:00, magazine 12:00–12:15, networking 12:15–12:30, Boardroom Challenge 12:30–14:00, Showdown 14:00–15:00, and closing/final networking from 15:00 until around 16:00 (later organiser correction to the brief). The calendar reserves 09:30–16:00 in Asia/Colombo, with an approximate-finish note. The magazine is **Innovator’s Digest: Volume 4**. Boardroom teams have a maximum of 10 members, and the top three teams are recognised.

The date **26 November 2026** comes from earlier organiser instructions. The venue is **University of Staffordshire Building (APIIT), 85 Braybrooke Place, Colombo 00200, Sri Lanka**, identified by the organiser’s supplied [Google Maps place](https://www.google.com/maps?ftid=0x3ae2590054cd6db5%3A0xf7050eed8ee76b9e). It is distinct from the institutional Union Place address in the PDF footer. The opening shows the date and building name only. The street address and map remain in registration details and the calendar; timings remain in the programme and registration details.

The official Microsoft registration form is configured in `event.js`. Confirmed speaker names/portraits are still missing. No price, capacity, speakers or claims of a past public summit are invented.

## Visitor experience

Six native-scroll 3D chapters: architectural arrival → panel stage and host → microphone disassembly/Q&A → magazine launch and opening cover → Boardroom → invitation. Buttons navigate directly between chapters; event details and programme anchors are available without watching the story. No wheel or touch interception.

The first viewport displays the summit wordmark in the hero and date/GEW context in the navigation. The summit header shows Register Now only when no in-page registration action is visible. The hero, final story invitation and registration section take priority when their own button is on screen; the header action returns between them and on reverse scrolling. Buttons consistently use Manrope at weight 600, including Save the date. After the arrival chapter, the navigation wordmark returns. The invitation states 9:30 am onwards without repeating the opening or finish time. On the club navigation, Sandbox retains its purple gradient and Convergence Summit uses a separate teal outline. The E-Club, APIIT and supplied full GEW Sri Lanka logos appear in the opening and footer, preserving original colours and aspect ratios. The About organiser credit uses the E-Club logo.

All 3D objects are original procedural Three.js geometry. The venue is an architectural interpretation of the supplied photos, not a surveyed venue or a confirmed seating plan. The right side has a rear wall section and perimeter frame; its open foreground is a deliberate cutaway for interior visibility. Empty chairs do not imply attendance or a completed event. The anonymous presenter has adult proportions, a navy jacket, shirt collar, tie, short hair and hands resting at the lectern.

Projected microphone callouts follow the grille, capsule and connector, connecting them to a voice, an idea and a connection. They appear during separation and fade before reassembly. The competing scene caption is hidden during this chapter. The magazine has a hinged cover, page block and typographic Volume 4 concept artwork; this is illustrative, not final supplied editorial artwork.

The panel introduction is a separate scroll-led sequence: seats or confirmed portraits move into focus through CSS perspective, with spotlights, narrative copy and direct focus controls. Unconfirmed speaker identities remain announcements. Confirmed images render from the speaker data. Reduced-motion mode shows all speakers in a normal grid.

Sound controls and audio code have been removed at the organiser’s request.

Neither the reference photographs, screen recording, earlier generated images nor Kagura assets are served by this route. Only authorised event/organisation logos and licensed local Sora/Manrope fonts are used as image/font assets.

## Editing

- `event.js`: event facts, all eight programme entries, Boardroom rules, audiences, speakers, venue and registration validation. The supplied official HTTPS Microsoft form is the default. `VITE_SUMMIT_REGISTRATION_URL` can override it. URL validation permits Microsoft response pages with an ID and the previously supported Google Forms hosts, rejecting HTTP, credentials and lookalike hosts. CTAs open the form in a new tab. An invalid configured override shows the forthcoming state rather than a fake registration flow. No data is collected locally.
- `SummitPage.jsx`: content, main story controller, navigation and programme.
- `Speakers.jsx`: native-scroll speaker focus sequence and portrait rendering.
- `scene.js`: geometry, materials, lighting, camera keyframes and disposal.
- `host.js`: anonymous presenter model.
- `summit.css`: styles scoped to this version.

## Motion and rendering

One lazy-loaded WebGL canvas. Chairs use instanced meshes. Rendering stops when camera/object motion settles, the scene leaves the viewport or the tab is hidden. Pixel ratio is capped at 1.6. Geometry, textures, renderer, observers and event listeners are disposed on route exit.

The canvas stays hidden until the logo texture has loaded and two complete frames have rendered. A quiet Entering the room loading message appears during preparation; the simplified SVG room is reserved for actual WebGL failure rather than being flashed before the 3D model.

Reduced-motion visitors get all content in normal document flow with a still architectural view and readable microphone meanings. WebGL failure/context loss exposes the same content with a lightweight SVG fallback. Mobile places the 3D area above the story text. No essential event fact exists only in the canvas.

## Reference research

Reviewed the supplied 35-second recording as 16 timestamped frames, the live [Kagura experience](https://kagura-three.vercel.app/) and the venue/Boardroom references. Adopted solid objects, camera movement and chapter navigation, without copying its code, models, brand or assets. Consulted [Three.js documentation](https://threejs.org/docs/) for rendering and instancing.

## Verification

`npm run build`

`node src/features/summit/check.mjs http://127.0.0.1:5173`

Checks use installed Google Chrome via Playwright. They cover the PDF timetable, calendar timezone/end time, six story chapters, reverse/direct scrolling, opening wordmark treatment, absence of sound, logos, Microsoft registration URLs, validation and configured-form variants, magazine cover, speaker perspective/focus controls, mobile layouts including 320×568, reduced motion, unavailable WebGL, route cleanup and earlier summit routes. Screenshots go to `/tmp/summit-immersive-review`.

Checks verify canonical URL redirects and the final production folders. Successful checks do not imply that a registration has been submitted. Speaker announcements remain organiser inputs.

## Push to GitHub

From this checkout, the following commands stage the website changes explicitly. They do not stage local credential files or archived references. The repository's current branch is `main`, with `origin` pointing to `https://github.com/eclub-apiit/e-club-website.git`.

```sh
cd /Users/brittni/Eclub/e-club-website
git add .gitignore package.json package-lock.json src/App.jsx src/ClubRoutes.jsx src/components/layout/Navbar.jsx src/features/summit public/summit
git diff --cached --stat
git commit -m "Launch Convergence Summit 2026 website"
git push origin main
```

The build was checked locally. No commit, push or deployment has been executed by the assistant.
