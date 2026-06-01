# Project Handover & Context — Union Gate Trading (Frontend)

Purpose
-------

This document is a complete project context file intended for another developer or an AI assistant to quickly understand the Union Gate Trading frontend project. It records what the project is, its current state, architecture, design and implementation decisions, libraries and dependencies, and the remaining work. Treat this as the canonical project memory.

If you are an AI model, you can use this file to answer developer questions, suggest changes, or continue work with full context.

1. Project Overview
-------------------

- Project name: Union Gate Trading — frontend
- Client: Union Gate Trading Establishment (Riyadh, Saudi Arabia)
- Purpose: Corporate marketing website to present company services, expertise, projects, clients, and official certifications. It provides a premium, corporate, trust-oriented online presence for client outreach.
- Current stage: Frontend is complete and ready for deployment. The repository contains a Next.js app with static content and a small set of scripts for asset preparation.
- Primary goal: Deliver a polished, responsive, and animated single-page (multi-section) website that the client will host on their custom domain (GoDaddy) and run on Vercel.

2. Tech Stack Used
------------------

- Next.js 13 (React 18) — framework for server-side rendering and static export.
- React — core UI library.
- Tailwind CSS — utility-first CSS framework for styling.
- Framer Motion — primary animation library for declarative motion and transitions.
- GSAP (runtime dynamic import) — used for an advanced pinning effect in Projects (dynamically imported to avoid bundling cost).
- No Lenis included — a small custom ScrollProvider approximates smoothed scrolling.
- PostCSS + Autoprefixer — tooling for Tailwind CSS.
- Vercel — target deployment platform (recommended, free tier).

Node / NPM scripts
- npm run dev — runs Next.js dev server
- npm run build — production build
- npm run start — start built app

Dependencies (from package.json)
- next 13.4.12
- react 18.2.0
- react-dom 18.2.0
- framer-motion 10.12.5
- gsap 3.12.2
- tailwindcss 3.4.12
- autoprefixer 10.4.14
- postcss 8.4.21

3. Project Structure
--------------------

Top-level files and folders (relevant):

- pages/ — Next.js pages
  - index.js — main single-page layout and imports all sections
  - _app.js — global styles and loader component wrapper
- components/ — React components by section and utilities
  - Header.js — top navigation (fixed)
  - Hero.js — large hero with logo, title, CTA, hero image and parallax translate
  - About.js — company bio and hero image
  - Services.js — grid of service cards (static list)
  - Expertise.js — values/competencies grid
  - Projects.js — projects section (uses dynamic import of GSAP for pinning)
  - Clients.js — clients grid
  - Certifications.js — certifications gallery (lightbox)
  - Contact.js — footer + contact details
  - ScrollProvider.js — framer-motion MotionValue-based scroll abstraction (smooth-like values)
  - ScrollProgress.js — top progress bar based on scrollY MotionValue
  - Loader.js — initial splash loader shown for 1.5s
  - Lightbox.js — simple lightbox for certificate images
- styles/ — global CSS (Tailwind directives + CSS variables)
- public/ — static assets used by the site (images, pdf catalog, etc.)
- scripts/ — small helper scripts
  - setup_public.py — copies repo assets into public/ (should be run before building if public is missing)
  - copy_certs.py, extract_catalog.py — utilities used during content preparation
- tailwind.config.js, postcss.config.js — Tailwind + PostCSS configuration
- package.json — npm scripts and dependencies

Important file notes
- pages/index.js imports all components and places them inside a single-page flow.
- components/ScrollProvider.js does not use a third-party smoothing library — instead it exposes smoothed framer-motion MotionValues derived from window.scrollY. This is deliberate to avoid adding Lenis.

4. UI / UX Direction and Design Decisions
----------------------------------------

Visual theme
- Dark, premium, industrial — black/charcoal backgrounds with a gold accent color (#c9a24a) for a premium corporate feel.
- Font pairing: Fraunces (display serif) for headings and Inter for body text — creates a refined, trust-forward brand voice.

Layout and interaction
- Single-page, multi-section layout with internal anchor navigation (Header links to page sections via # anchors).
- Cinematic style using large hero imagery, subtle radial gradients, and generous spacing.
- Focus on tactile interactions: hover scale, subtle depth with shadows and rings, and a smooth loading state.

Animation philosophy
- Framer Motion is used everywhere for in-view transitions, initial entrance animations, small hover effects and modals.
- GSAP is imported dynamically in Projects.js for a pinning effect — used only where advanced control is needed.
- The ScrollProvider provides smoothed scroll values for parallax and motion timing without a third-party dependency.

Accessibility
- Focus ring styling included for keyboard users.
- Links and CTAs use clear text and accessible semantics; ensure alt attributes exist for images.

5. Website Sections — Detailed Breakdown
--------------------------------------

Hero
- Purpose: First impression, brand, CTA to download the PDF catalog and contact email.
- Content: logo, headline, description, CTA buttons, large hero image with parallax translate effect.
- Animations: entry motion via Framer Motion; parallax translate of hero image driven by ScrollProvider MotionValue.

About
- Purpose: Company description and value bullets.
- Content: descriptive text + image.
- Animations: simple in-view fade/translate via Framer Motion.

Services
- Purpose: static list of service cards describing offerings.
- Content: list of 18 services rendered as cards.
- Animations: cards animate into view with staggered delays and hover scale.

Expertise
- Purpose: short values list (Reliable Execution, Quality & Safety, Client-Focused, Integrity & Commitment).
- Content: card grid and supporting copy.
- Animations: in-view fade/translate.

Projects
- Purpose: highlight two representative projects for credibility.
- Content: two project cards with title and description.
- Animations/effects: background parallax/translate driven by scroll value; dynamic import of GSAP + ScrollTrigger for a pinning effect (registered at runtime). Error handling gracefully falls back if pin fails.

Clients
- Purpose: list of client names to show trust and experience.
- Content: grid of client names.
- Animations: simple hover/shadow interaction and fade-in.

Certifications
- Purpose: show official registration documents and certificates.
- Content: grid of certificate thumbnails (4 items), clicking opens Lightbox to view larger image.
- Animations: Framer Motion hover scaling; Lightbox uses a motion modal for opening/closing.
- Important: images must live in public/assets/certs and filenames must match the import paths exactly. A setup script is provided to copy these files into public/.

Contact / Footer
- Purpose: contact details and simple contact prompt.
- Content: logo, address, phone (tel: link), email (mailto: link) and a small "Get In Touch" panel.

6. Assets & Resources
---------------------

- public/images — hero/team images, logo
- public/UNITED GATE TRADING CATALOUGE.pdf — the downloadable catalog
- public/assets/certs — certificate images (expect 4 official docs)
- Keep images in public/ so Next.js serves them as static assets, use absolute paths like /images/… and /assets/certs/…

7. Animation System & Scroll Architecture
----------------------------------------

Framer Motion
- Used for declarative animations: initial/animate/whileInView/whileHover/exit.
- Motion values (useMotionValue) are used inside ScrollProvider to expose scrollY and velocity.

ScrollProvider
- Creates two MotionValues: scrollY and velocity.
- Implements an internal RAF loop to interpolate (ease) the current value toward the target window.scrollY using a fixed ease constant (0.12). This yields a smoothed value suitable for subtle parallax and motion timing.
- Provides a drop-in replacement for more complex libraries; it keeps the bundle small and avoids introducing Lenis.

GSAP
- Dynamically imported only inside Projects.js to provide ScrollTrigger pinning. This keeps GSAP out of the primary bundle unless the Projects section is visited.

Lightbox
- Simple modal using Framer Motion for the entry/exit animation. Click the overlay to close.

8. Problems Encountered and How They Were Solved
------------------------------------------------

1) Certificate filename mismatch
- Problem: certificate filenames changed after extraction, which caused the site to show missing images.
- Solution: normalized filenames under assets/certs and updated components to reference the canonical names. Provided scripts/setup_public.py to copy files into public/.

2) Keeping scroll effects lightweight
- Problem: Lenis provides great smooth scrolling but adds dependency and complexity.
- Solution: implemented a lightweight ScrollProvider that uses MotionValue and RAF smoothing to approximate smooth scroll for parallax and motion values without adding Lenis.

3) GSAP bundle size
- Problem: GSAP can be large if bundled always.
- Solution: dynamic import only when needed in Projects.js; register plugin at runtime and guard registration in try/catch.

4) Case sensitivity and public assets
- Problem: images missing in production due to case sensitivity on the server environment.
- Solution: enforce consistent lowercase filenames for public assets and recommend running the setup script before builds.

9. Deployment Expectations
-------------------------

- Hosting target: Vercel (free tier) — configured to handle Next.js projects and provide automatic SSL via Let's Encrypt.
- Domain registrar: GoDaddy — DNS must be updated to point to Vercel (A record for apex and CNAME for www) or follow Vercel's specific instructions.
- Build process: `npm run build` — Next.js will compile the site. Ensure `public/` contains static assets before building.

10. Remaining Work / Suggested Improvements
-----------------------------------------

Immediate deployment tasks (handoff):
- Deploy to Vercel and verify preview URL
- Add the custom domain in Vercel and update GoDaddy DNS
- Confirm SSL certificate issuance and HTTPS

Recommended post-deployment tasks:
- QA & responsiveness sweep across breakpoints (mobile/tablet/desktop)
- Performance audit via Lighthouse: optimize images, preconnect, caching headers
- SEO basics: add meta og:title, og:description, og:image, canonical tags, and structured data as needed
- Analytics: add Google Analytics / Matomo if the client needs traffic tracking
- Accessibility check: run axe or Lighthouse accessibility audit and fix issues
- CI: add a small CI check (lint/build) to protect main branch

Optional feature ideas:
- Multi-language support (i18n) if the client wants Arabic content later
- Serverless contact form (Vercel Functions or a SaaS form endpoint)

11. Important Notes for Future Developers / AI Models
---------------------------------------------------

- Naming and assets: public/ and public/assets/ filenames are authoritative. Keep them lowercase and stable. Avoid changing names unless you update the references.
- ScrollProvider intentionally mimics Lenis to keep dependencies small. If you replace it with Lenis or other smooth-scrolling library, remove the RAF loop and ensure MotionValue compatibility with existing components.
- Animations: Framer Motion is the primary animation tool. Prefer it for entry/exit/hover animations to keep animations consistent.
- GSAP: used only where fine-grained scroll control is required (pinning). Keep it dynamically imported.
- Styling conventions: Tailwind utility classes are used throughout. Use the existing theme colors and font pairs — maintain the gold accent and the dark background to preserve the brand feel.
- Accessibility: preserve alt text for images and use semantic HTML for any new sections.
- Performance: lazy-load large images where possible and use correct image dimensions. Keep an eye on initial bundle size.

12. Quick Onboarding Checklist for a New Developer / AI Model
-----------------------------------------------------------

1. Clone the repo and install dependencies:

   git clone <repo>
   cd uniongate
   npm install

2. Run the asset preparation (if working locally):

   python scripts/setup_public.py

3. Start the dev server and review the site:

   npm run dev

4. Review components in /components and search for hard-coded paths that may require updates.

5. Check `components/Projects.js` to understand GSAP dynamic import and `components/ScrollProvider.js` for scroll behavior.

6. If deploying to Vercel, ensure the public/ folder is committed or the setup_public.py script runs during your build process.

13. Contact & Records
---------------------

- Repository: [insert GitHub repo URL]
- Live domain (planned): https://uniongatetrading.com
- Maintainer / Developer: <your-name> — <your-email>
- Client contact: <client-name> — <client-email>

Concluding note
---------------

This file is intended to be the single source of project knowledge for the Union Gate Trading frontend. It should be updated whenever significant architectural changes are made (new libraries, major refactors, or deployment changes). If you are an AI assistant, use this document as context before making code changes or answering questions about the project.
