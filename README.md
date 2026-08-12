# Manoj Kandpal — Portfolio

A lightweight, dependency-free developer portfolio built with plain HTML, CSS, and JavaScript.

The site features a **JSON-driven template architecture** where all portfolio content (bio, work experience, projects, skills, education, and certifications) is dynamically rendered from a single `data.json` file.

## ✨ Key Features

- **JSON-Driven Architecture**: All text, links, and content are decoupled into `data.json`. Easily update or add new projects, skills, or experience without touching HTML.
- **Zero External Dependencies**: Built with native HTML5, modern CSS3 variables, and ES6 JavaScript — ultra-fast load time with no npm packages or build steps.
- **Dark & Light Mode**: Includes an interactive theme toggle with `localStorage` persistence and automatic OS `prefers-color-scheme` detection.
- **Responsive & Animated UI**: Fully mobile-responsive layout with smooth scroll-reveal animations, animated experience timeline progress bar, and mobile navigation overlay.
- **SEO & Social Share Ready**: Configured with Open Graph and Twitter Card meta tags for social media previews on LinkedIn/Twitter/WhatsApp, plus downloadable resume PDF support.
- **Robust Local & Server Rendering**: Uses `fetch('data.json')` with an embedded fallback dataset so the site renders smoothly whether hosted on a web server or opened directly via `file://`.

## 🚀 Quick Start / Local Preview

Open `index.html` directly in any browser, or serve it locally:

```bash
# Serve locally using Python 3
python3 -m http.server 8000

# Then visit http://localhost:8000 in your browser
```

## 📂 Project Structure

```
portfolio/
├── data.json           # Content database (profile, experience, skills, projects, background)
├── index.html          # Semantic HTML shell & template containers
├── styles.css          # Design system tokens, CSS variables & responsive layouts
├── script.js           # Template rendering engine & UI interactive logic
├── assets/
│   ├── favicon.svg               # MK Monogram favicon
│   ├── profile-placeholder.jpg   # Profile photo
│   └── Manoj_kandpal_resume.pdf  # Resume PDF
└── README.md
```

## 📝 Customizing Content (`data.json`)

To personalize or extend your portfolio, edit `data.json`:

- **Profile & Resume**: Update the `profile` object (name, headline, bio, photo, resume PDF path, contact details).
- **Experience**: Add or edit job roles and bullet highlights in `experience.jobs`.
- **Skills**: Add tools or categories under `skills.categories`.
- **Projects**: Add or edit projects in `projects.items` (supports both `github` repo and live `demo` links).
- **Background**: Add education, certs (with verification URLs), and achievements under `background`.
