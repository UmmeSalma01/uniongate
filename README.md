# Union Gate Trading — Frontend Deployment Handoff

This README is a step-by-step handoff for deploying the finished frontend for Union Gate Trading Establishment. It is written for the teammate who will take the completed frontend and make the site live on the client’s domain (GoDaddy). The preferred, free hosting platform is Vercel.

Follow each section in order. If anything is unclear or you hit an unexpected error, stop and save logs/screenshots — they are very helpful when troubleshooting.

1) Project Overview
--------------------

- Project: Union Gate Trading Establishment — frontend only
- Stage: Frontend is finished. Repository contains the complete front-end code. The remaining task is deployment (build + host + point the client domain).
- Goal: Deploy the site on Vercel and connect the client’s GoDaddy domain so the site is live over HTTPS.

2) Prerequisites
----------------

Make sure you have the following before you start:

- Access to the project files (this repository on your machine)
- Access to the client’s GoDaddy account (to edit DNS for their domain)
- Access to the client’s domain management panel (same as above)
- A GitHub account (to host the repo)
- A Vercel account (free tier is sufficient)
- Node.js installed locally (recommended: Node 18+)
- npm installed (comes with Node) or yarn if preferred
- Python locally if you need to run helper scripts included in the repo (this project contains scripts/setup_public.py)
- Basic comfort with the terminal / command prompt (commands listed below will help)

3) Local Setup (verify the site locally first)
--------------------------------------------

1. Open the project folder in your terminal or file explorer:

   cd /path/to/uniongate

2. Install dependencies:

   npm install

3. Prepare public assets (project-specific):

   This repository includes a helper script that copies repo assets into the public/ folder used by the build. Run it before building locally or pushing if public/ is not already present or up-to-date:

   python scripts/setup_public.py

   If you do not have Python, manually ensure `public/assets` contains the image files and other static files that must be served.

4. Run the development server and verify everything loads:

   npm run dev

   - Open http://localhost:3000 in a browser.
   - Verify the Certifications (images), all pages, menu links, and animations load.

5. Optional: Produce a production build and preview it locally:

   npm run build
   npm run start

   - The production server will usually run on port 3000 by default.

Notes:
- If you see missing images in the Certifications section, confirm the files exist in public/assets/certs and that filenames and casing match the references in the code. File systems on the server are case-sensitive.

4) GitHub Setup (prepare the code for Vercel)
--------------------------------------------

If the code is not already in a GitHub repository, create one and push the final production-ready commit.

Example commands (run from the project root):

1. Check git status and review changes

   git status

2. Stage and commit final changes

   git add .
   git commit -m "chore: final frontend ready for deployment"

3. Create or point to a GitHub repo

   # Create the repo on GitHub (UI) and then:
   git remote add origin git@github.com:<your-org-or-user>/<repo-name>.git
   git branch -M main
   git push -u origin main

Notes and checks:
- Make sure package.json, package-lock.json (or yarn.lock), next.config.js (if present), public/ (committed), and any build scripts are all committed.
- Ensure sensitive secrets are NOT committed. If the project needs environment variables, add them in Vercel instead of committing them.

5) Vercel Deployment (step-by-step)
-----------------------------------

Use the Vercel dashboard for the simplest flow. You can also use the Vercel CLI if you prefer — both methods are covered briefly.

UI method (recommended for handoff):

1. Sign in to https://vercel.com with the GitHub account that has access to the project repository. If you don’t have an account, create one and connect GitHub when prompted.

2. From the Vercel dashboard, click "New Project" → "Import Git Repository" and select the repository you pushed in the previous step.

3. Vercel will auto-detect Next.js. Review the settings:

   - Framework: Next.js (auto)
   - Build command: npm run build (or leave default: next build)
   - Output directory: leave blank for Next.js
   - Install command: npm install (default)

4. Environment variables: If your site requires any env vars, add them now under "Environment Variables". Set values for Production, Preview, and Development as needed.

5. Click "Deploy". Vercel will queue a build and show build logs. Watch for a successful build.

6. When complete, Vercel provides a preview URL like https://your-project.vercel.app. Open the preview and test the site (click through all pages, check images and contact links).

Optional CLI method:

1. Install the Vercel CLI (optional):

   npm i -g vercel

2. Login and deploy (this performs a single deployment):

   vercel login
   vercel --prod

3. Follow the interactive prompts to connect to your Vercel account and select the project/repo.

6) Connect the GoDaddy Domain (DNS configuration)
-------------------------------------------------

Once the project is deployed to Vercel and the preview URL works, connect the custom domain from GoDaddy. The process uses DNS records in GoDaddy and domain registration in Vercel.

High-level steps (detailed below):

1. Add the domain in Vercel
2. Edit DNS in GoDaddy to point the domain to Vercel
3. Wait for DNS propagation and final verification

Step-by-step:

1) Add domain in Vercel

- In your Vercel project dashboard, go to the "Domains" tab and click "Add".
- Enter the client’s domain (example: uniongatetrading.com) and follow the prompts.

2) In Vercel you will see instructions and the DNS records Vercel expects. Use the records Vercel shows, but the common recommended setup is:

- For the root / apex domain (example.com), add an A record:

  Host: @
  Type: A
  Value: 76.76.21.21
  TTL: 1 hour (or default)

- For the www subdomain (www.example.com), add a CNAME record:

  Host: www
  Type: CNAME
  Value: cname.vercel-dns.com
  TTL: 1 hour (or default)

Notes:
- Do NOT create a CNAME record on the apex (root) record — many registrars, including GoDaddy, do not permit a CNAME for the root. Use the A record above.
- If Vercel provides additional verification TXT or CNAME records, follow the exact instructions shown in Vercel’s dashboard.

3) Apply the changes in GoDaddy

- Sign in to GoDaddy.com → My Products → Manage DNS for the domain.
- Add or update the A record and CNAME as shown above. Save changes.
- If there are other A or CNAME records for @ or www pointing elsewhere, remove them to avoid conflicts.

4) Wait for propagation and verify

- DNS changes often propagate quickly (minutes), but sometimes take up to 24–48 hours. Typically Vercel detects the DNS change within minutes.
- In Vercel, after DNS resolves, the domain status will show as Verified.

7) SSL / HTTPS
----------------

- Once Vercel detects the correct DNS setup, it will automatically provision SSL certificates (Let's Encrypt) for the domain.
- This is automatic — no manual certificate handling is needed.
- After verification, visit https://your-domain and confirm the browser shows the secure padlock.

If HTTPS is not available after DNS is verified:
- Re-check DNS entries and ensure there are no conflicting records.
- Ensure the domain is added in the correct Vercel project (not another project/account).

8) Final Verification Checklist
------------------------------

Perform these checks before handing off the live URL to the client:

- [ ] Preview URL (https://<project>.vercel.app) loads and pages render correctly
- [ ] Custom domain (https://uniongatetrading.com and https://www.uniongatetrading.com) resolves
- [ ] HTTPS is active and the padlock icon is shown in the browser
- [ ] All pages and sections load with no 404s
- [ ] Mobile (small viewport) layout is responsive and usable
- [ ] Images, fonts, and animations load and behave as expected
- [ ] Contact links (mailto:, tel:) and any forms/buttons are functional
- [ ] No console errors in the browser devtools (F12) that indicate missing resources
- [ ] Check network tab for any 404/403 responses (assets or API endpoints)

9) Troubleshooting (common problems & fixes)
--------------------------------------------

- Build failure on Vercel
  - Check the Vercel build log (Dashboard → Project → Deployments → select the failed deployment).
  - Common causes: missing dependencies (ensure package.json is correct), incorrect build script, or missing public assets.
  - Fix locally, commit the fix, and push. Vercel will auto-deploy on push.

- Missing environment variables
  - If the app requires env vars, add them in Vercel: Project → Settings → Environment Variables.
  - After adding, redeploy the project (via push or using "Redeploy" in the Vercel dashboard).

- DNS not propagating / domain not verified
  - Double-check GoDaddy DNS entries (A and CNAME) match Vercel instructions.
  - Remove conflicting records for the same host (e.g., multiple A records for @).
  - Use tools to check DNS: `nslookup uniongatetrading.com`, `dig uniongatetrading.com A`, or online DNS checkers.

- Wrong domain records (example: accidentally created CNAME for root)
  - Replace with the A record (host @) pointing to 76.76.21.21 as instructed by Vercel.

- 404 or missing assets after deploy
  - Confirm static assets are present in the repository under `public/` and paths in the code reference `/`-based paths (e.g. `/assets/...`).
  - Check case-sensitivity: filenames on Vercel’s Linux servers are case-sensitive.

- Deployment shows an old version
  - Ensure you pushed the latest commit to the branch linked to Vercel (usually main).
  - Trigger a redeploy from Vercel Dashboard → Deployments → Redeploy or push a dummy commit.

- Images not loading or wrong images
  - Confirm the filenames in `public/assets/...` match exactly the paths referenced in code (including case).
  - If images are generated/processed by a script, run the script before commit (e.g. `python scripts/setup_public.py`).

10) Handover Notes (after deployment)
------------------------------------

When the site is live and verified, complete the handoff:

1. Share the final live URL(s) with the client and the team.

2. Save configuration details (store safely):
   - GitHub repo URL and branch used for production
   - Vercel project name and team/account
   - DNS records added in GoDaddy (A and CNAME values and any TXT/verification records)
   - Any environment variables set in Vercel

3. Keep a final backup of the project (zip the repo at the release tag) or rely on the GitHub repo as the single source of truth.

4. Organize repository and access:
   - Confirm the client and/or team members have the correct access to GitHub (repo access) and Vercel (project access).
   - If the client should not have direct access, maintain a shared account and a list of credentials stored in the team password manager.

5. Future maintenance notes:
   - To publish updates: make changes locally → commit → push to the branch connected to Vercel → Vercel auto-deploys.
   - To rollback: Vercel Dashboard → Deployments → choose the previous deployment → Promote to Production.

Contact & records
-----------------

Project: Union Gate Trading — Frontend

Repository: (insert GitHub repo URL here)

Live domain (when ready): https://uniongatetrading.com

Primary contacts:
- Developer / Handoff contact: <your-name> — <your-email>
- Client contact: <client-name> — <client-email>

Concluding note
----------------

The deployment process is complete once the site is reachable at the custom domain (e.g., https://uniongatetrading.com) and the site is served over HTTPS with all pages, images and links functioning correctly. At that point share the final URL with the client, archive the release, and hand over access details per the Handover Notes.

Good luck — if anything stalls during the process, collect logs/screenshots and reach out to the developer or the team for support.
