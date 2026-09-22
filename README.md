# Video Editor Portfolio — GitHub Pages ready

A static, responsive, cinematic video-editor portfolio with five **real** supplied reels, subtle card wiggle, a 30%-opacity portrait in the hero, center-expanding playback and a blurred backdrop. No React, backend, build step or paid hosting needed.

## Files

- `index.html` — all page content and reel cards
- `styles.css` — visual design, subtle animation, responsive layout, hero image opacity
- `script.js` — play/close animation, menu, navigation and UI behavior
- `site-config.js` — contact email, YouTube link, video titles/filenames
- `assets/images/` — compressed photo, reel posters and preview image
- `assets/videos/` — five compressed, browser-ready MP4 videos, all under 100 MB each

## Put it online using GitHub Pages

1. **UNZIP** `video-editor-portfolio.zip` on your computer. Do not upload only the ZIP into the repository; upload its **contents**.
2. Sign in to GitHub and create a **Public** repository, such as `video-editor-portfolio`.
3. Choose **Add file → Upload files**. Drag in the unzipped files **and `assets` folder**, keeping the same folder structure. `index.html` must be at the repo root. Commit.
4. In the repo, go to **Settings → Pages → Build and deployment → Source: Deploy from a branch → main → /(root)**, then save.
5. GitHub will display the website URL, normally `https://YOUR-USERNAME.github.io/video-editor-portfolio/`. Wait a few minutes for publication.

Alternatively, name the repository `YOUR-USERNAME.github.io` to publish at `https://YOUR-USERNAME.github.io/`.

## Personalize

- In `site-config.js`, update `email`, `youtube`, video names, and video paths.
- In `index.html`, change headline, About text, services and titles. **Ensure titles on hero cards and work grid match your new videos.**
- In `styles.css`, `.hero-photo` has `opacity:.30`. Change it only if you want your portrait brighter/dimmer.
- Swap `assets/images/editor.webp` to change your portrait; keep the filename or update CSS.
- Add more videos to `assets/videos/`, register them in `site-config.js`, then add a matching card with its `data-video` index in `index.html`.

## Check locally

Run `python -m http.server 8000` in the unzipped folder and open `http://localhost:8000`. Opening `index.html` directly generally works too, but a local server better mirrors GitHub Pages.

## Notes

These are *web-optimized copies* of the supplied files (720 × 1280 H.264/AAC; originals remain yours). The audio stays in the videos. MP4 bytes are served by GitHub Pages (not Git LFS), avoiding GitHub's 100 MB per-file upload restriction. Browser playback requires one click; the dialog can be closed with Escape, outside click, or ✕. On mobile the hero reels swipe horizontally. Motion is reduced for users who request reduced motion.

Fonts are loaded from Google Fonts when available, with system-font fallbacks. There are no other third-party assets or dependencies.
