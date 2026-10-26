# ADVERUNE — Premium Digital Marketing Agency Website

A production-ready, single-page agency landing website for **ADVERUNE** (Digital Growth • Creative Strategy).
White theme, hand-crafted CSS, vanilla JavaScript, zero frameworks, zero build step.

## Sections

Announcement bar, sticky navigation with mobile menu, hero, services (6 cards), selected work
(6 clearly-labeled concept projects with detail dialog), why choose ADVERUNE, 4-step process,
about, 3 engagement packages, FAQ accordion, project inquiry form, final CTA, footer with
privacy & terms pages.

## Project structure

```
├── index.html            # Landing page (single page)
├── privacy.html          # Privacy policy
├── terms.html            # Terms of service
├── robots.txt            # Crawler rules (update domain)
├── sitemap.xml           # Sitemap (update domain)
├── assets/
│   ├── css/styles.css    # All styling, design tokens, responsive rules
│   ├── js/config.js      # ⚙️ SINGLE configuration file (contact + social)
│   ├── js/main.js        # All interactions
│   └── img/              # Favicon + original concept-project illustrations
└── README.md
```

## Configuration (required before launch)

Open `assets/js/config.js` — it is the only file you need to edit:

1. `contact.whatsappNumber` — international format, digits only (e.g. `8801712345678`).
2. `contact.whatsappDisplay` — human-readable number shown in UI (optional).
3. `contact.email` — the inquiry inbox (e.g. `hello@adverune.com`).
4. `social.*` — full profile URLs; leave `""` to hide a link.
5. `siteUrl` and the `canonical` / `og:url` tags in `index.html`, plus `robots.txt` and
   `sitemap.xml` — set the final domain once it is live.

Until WhatsApp/e-mail are configured, the inquiry form still validates and prepares the
message, but the contact buttons show a clear "not configured yet" notice instead of
silently failing. **Do not put API keys or secrets in this repository** — none are needed.

## How the inquiry flow works

There is no backend or database (by design — free static hosting). When the visitor submits
the form, the site validates the input and prepares a full inquiry message, then opens it in
WhatsApp (`wa.me` deep link) or their e-mail client (`mailto:`) for them to send from their own
account. Every "Book This Service" / "Request a Quote" button prefills the selected service in
the form. To collect inquiries server-side later, connect the form to a service like Formspree,
Netlify Forms, or Base44 — the form markup is standard and ready for it.

## Local preview

No dev server needed — open `index.html` in a browser.
Optional: `python3 -m http.server 8000` then visit `http://localhost:8000`.

## Deployment (free static hosting)

### Option A — GitHub Pages (simplest if this repo is on GitHub)

1. Push this project to the root of your GitHub repository.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
3. Your site goes live at `https://<username>.github.io/<repo-name>/` within a few minutes.
   All asset paths are relative, so it works from any sub-path without changes.

### Option B — Netlify Drop (no account needed to try)

1. Go to `app.netlify.com/drop` and drag the unzipped project folder onto the page.
2. You get an instant live URL. Sign up to keep it and claim a subdomain.

### Option C — Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect your Git repository.
2. Framework preset: *None*. Build command: empty. Output directory: `/`.
3. Deploy.

### Connecting a custom domain

- **GitHub Pages**: Settings → Pages → Custom domain → enter `adverune.com`, then add the
  shown `CNAME` record at your domain registrar. Wait for DNS, then enable *Enforce HTTPS*.
- **Netlify**: Site settings → Domain management → Add custom domain, follow the DNS prompts,
  free HTTPS certificate is issued automatically.
- **Cloudflare Pages**: Custom domains tab → Set up a custom domain (easiest if the domain's
  DNS is already on Cloudflare).
- After the domain is live, update `siteUrl` in `config.js`, the canonical/OG URLs in
  `index.html`, and the domain in `robots.txt` + `sitemap.xml`.

## Testing performed

- Static checks: all internal links/anchors resolve, all referenced local files exist,
  HTML well-formedness parse, JavaScript syntax check, all six images verified.
- Responsive rules included for ~320px to 1440px+; `prefers-reduced-motion` respected;
  accessibility: skip link, keyboard-navigable menu and accordion, ARIA states, focus styles.
- (If any browser-based check could not be run in the build environment, it is noted in the
  delivery report rather than claimed.)

## License & content notes

All illustrations are original concept works generated for ADVERUNE. Portfolio items are
labeled "Concept Project" / "Speculative Campaign" — no fabricated clients, testimonials,
metrics, or claims are included anywhere on the site.
