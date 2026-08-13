# Manoj Kandpal — Portfolio

A lightweight, high-performance developer portfolio built with plain HTML, CSS, JavaScript, and Static Site Generation (SSG).

The site features a **JSON-driven SSG architecture** where all portfolio content (bio, work experience, projects, skills, education, and certifications) is maintained in `data.json` and pre-rendered directly into static `index.html` for maximum SEO, instant initial page load, and search crawler visibility.

## ✨ Key Features

- **Static Site Generation (SSG)**: Pre-renders complete semantic HTML at build time (`build.js`) from `data.json`. Search engine crawlers and web clients receive 100% of text content immediately on first paint without client-side rendering delay.
- **Zero-Dependency Build Pipeline**: Uses native Node.js (`npm run build`) without requiring heavy frameworks or external npm packages.
- **Dark & Light Mode**: Includes an interactive theme toggle with `localStorage` persistence and automatic OS `prefers-color-scheme` detection.
- **Responsive & Animated UI**: Fully mobile-responsive layout with smooth scroll-reveal animations, animated experience timeline progress bar, and mobile navigation overlay.
- **SEO & Social Share Ready**: Pre-rendered semantic HTML markup paired with Open Graph and Twitter Card meta tags for optimal social media previews on LinkedIn/Twitter/WhatsApp.

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

## 📂 Project Structure

```
portfolio/
├── data.json           # Single source of truth for portfolio content
├── build.js            # SSG pre-rendering build script
├── package.json        # Build script configurations (npm run build)
├── index.html          # Pre-rendered static semantic HTML
├── styles.css          # Design system tokens, CSS variables & responsive layouts
├── script.js           # Lightweight client-side interactivity (theme toggle, scroll reveal, timeline)
├── assets/
│   ├── favicon.svg               # MK Monogram favicon
│   ├── profile-placeholder.jpg   # Profile photo
│   └── Manoj_kandpal_resume.pdf  # Resume PDF
└── README.md
```

## 📝 Customizing Content (`data.json`)

To update portfolio content, edit `data.json` and run `npm run build`:

- **Profile & Resume**: Update the `profile` object (name, headline, bio, photo, resume PDF path, contact details).
- **Experience**: Add or edit job roles and bullet highlights in `experience.jobs`.
- **Skills**: Add tools or categories under `skills.categories`.
- **Projects**: Add or edit projects in `projects.items` (supports both `github` repo and live `demo` links).
- **Background**: Add education, certs (with verification URLs), and achievements under `background`.
