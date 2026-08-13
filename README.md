# Manoj Kandpal — Portfolio

A lightweight, high-performance developer portfolio built with plain HTML, CSS, JavaScript, and Static Site Generation (SSG).

The site features a **JSON-driven SSG architecture** where all portfolio content (bio, work experience, projects, skills, education, and certifications) is maintained in `data.json` and pre-rendered directly into static `index.html` for maximum SEO, instant initial page load, and search crawler visibility.

---

## ✨ Key Features

- **Static Site Generation (SSG)**: Pre-renders complete semantic HTML at build time (`build.js`) from `data.json`. Search engine crawlers and web clients receive 100% of text content immediately on first paint without client-side rendering delay.
- **Zero-Dependency Build Pipeline**: Uses native Node.js (`npm run build`) without requiring heavy frameworks or external npm packages.
- **Privacy-Compliant Analytics & Consent Mode v2**: Integrated Google Analytics 4 (GA4) with official **Google Consent Mode v2** and custom zero-dependency Cookie Consent Banner + Footer preference trigger.
- **Custom GA4 Event Tracking**: Tracks resume downloads, email/phone clicks, and social links with explicit consent guards.
- **High-Performance & Lighthouse 100/100**: Non-render-blocking font loading, deferred JavaScript, compressed images, and preloaded CSS hints.
- **DevOps CI Workflow**: Automated GitHub Actions workflow (`.github/workflows/build.yml`) that validates SSG build integrity on every push.
- **Dark & Light Mode**: Interactive theme toggle with `localStorage` persistence and automatic OS `prefers-color-scheme` detection.
- **Recruiter & UX Polish**: Active navigation scrollspy, floating Back to Top button, Copy Email toast notifications, custom `404.html` page, and clean `@media print` PDF resume view (`Cmd+P` / `Ctrl+P`).

---

## 🚀 Quick Start / Local Preview

### 1. Build Static HTML (SSG)
Whenever you update content in `data.json`, rebuild `index.html`:

```bash
npm run build
# OR
node build.js
```

### 2. Preview Locally
Open `index.html` directly in any browser, or serve it locally:

```bash
# Serve locally using Python 3
python3 -m http.server 8000

# Then visit http://localhost:8000 in your browser
```

---

## 📂 Project Structure

```
portfolio/
├── data.json                   # Single source of truth for portfolio content
├── build.js                    # SSG pre-rendering build script
├── package.json                # Build script configurations (npm run build)
├── index.html                  # Pre-rendered static semantic HTML
├── 404.html                    # Custom 404 error page for GitHub Pages
├── styles.css                  # Design system tokens, CSS variables & print rules
├── script.js                   # Interactivity (theme, scrollspy, consent, toasts)
├── sitemap.xml                 # Search engine sitemap
├── robots.txt                  # Search engine crawler directives
├── .github/
│   └── workflows/build.yml     # GitHub Actions CI workflow
├── assets/
│   ├── favicon.svg             # MK Monogram favicon
│   ├── manoj-kandpal.jpg       # Optimized profile photo
│   └── Manoj_kandpal_resume.pdf# Resume PDF
└── README.md
```

---

## 📝 Customizing Content (`data.json`)

To update portfolio content, edit `data.json` and run `npm run build`:

- **Profile & Resume**: Update the `profile` object (name, status pill, headline, bio, photo, resume PDF path, contact details).
- **Experience**: Add or edit job roles and bullet highlights in `experience.jobs`.
- **Skills**: Add tools or categories under `skills.categories`.
- **Projects**: Add or edit projects in `projects.items` (supports both `github` repo and live `demo` links).
- **Background**: Add education, certs (with verification URLs), and achievements under `background`.
