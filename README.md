# Manoj Kandpal — Developer Portfolio & AI Assistant 🚀

A lightweight, high-performance developer portfolio co-engineered with Google Antigravity AI pair programming. Built with plain HTML5, CSS3, JavaScript, Static Site Generation (SSG), and a **100% Free Cloudflare AI Edge Proxy** powering a live **Google Gemini 2.0 / 3.6 LLM Chatbot**.

---

## ✨ Key Features & Architecture

### 🤖 Live Google Gemini AI Assistant & Cloudflare Worker Proxy
- **Google Gemini LLM Integration**: Powered by Google's **Interactions API** (`v1beta/interactions`) with automatic model fallback (`gemini-3.6-flash`, `gemini-2.5-flash`, `gemini-2.0-flash`).
- **100% Free Edge Proxy**: Custom Cloudflare Worker proxy (`manoj-portfolio-ai.manojkandpal-official.workers.dev`) secures the Google Gemini API key on the server side with zero hosting costs.
- **Security Access Guards**: Origin guard restricted to `https://manoj-kandpal.github.io` alongside `X-Portfolio-Dev-Secret` authentication for local testing (`localhost`, `127.0.0.1`, `file://`).
- **Touch & Mouse Draggable Toggle**: Floating chatbot icon can be dragged anywhere across the screen on mobile phones and desktop displays so it never blocks underlying UI buttons.
- **Rich Markdown Response Rendering**: Powered by `marked.js` with custom CSS typography for lists, headers, code blocks, bold text, and clickable verification links.
- **Structured Knowledge Repository**: Fed by `src/data/knowledge-base.json` containing detailed professional experience at Maersk, education (B.E. in Computer Science at RNSIT, CGPA 9.21/10), hometown background (Haridwar, Uttarakhand), certificate verification URLs, and personal interests.

### ⚡ Static Site Generation (SSG) Architecture
- **Pre-rendered HTML**: All portfolio content (bio, work experience, projects, skills, education, and certs) is defined in `src/data/data.json` and pre-rendered into static `index.html` at build time (`scripts/build.js`).
- **Lighthouse 100/100 Performance & SEO**: Search engine crawlers receive 100% semantic HTML on first paint without client-side rendering delays.
- **Zero-Dependency Build**: Uses native Node.js (`npm run build`) without requiring heavy framework dependencies.

### 📊 Privacy-Compliant Analytics & Consent Mode v2
- **Google Analytics 4 (GA4)**: Integrated with official **Google Consent Mode v2** and custom zero-dependency Cookie Consent Modal + Footer settings trigger.
- **Custom GA4 Event Tracking**: Tracks resume downloads, email/phone clicks, and social links with explicit consent guards.

### 🎨 Recruiter & UX Polish
- **Dark & Light Theme**: Interactive toggle with `localStorage` persistence and OS `prefers-color-scheme` detection.
- **Interactive UI**: Active navigation scrollspy, floating Back to Top button, Copy Email toast notifications, custom `404.html` page, and clean `@media print` PDF view (`Cmd+P` / `Ctrl+P`).

---

## 🚀 Quick Start / Local Preview

### 1. Build Static HTML (SSG)
Whenever you update content in `src/data/data.json` or `src/data/knowledge-base.json`, rebuild `index.html`:

```bash
npm run build
# OR
node scripts/build.js
```

### 2. Preview Locally
Open `index.html` directly in your browser, or serve it locally:

```bash
# Serve locally using Python 3
python3 -m http.server 8000

# Visit http://localhost:8000 in your browser
```

---

## 📂 Refactored Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── build.yml          # GitHub Actions CI build check
├── scripts/
│   └── build.js               # SSG Pre-renderer script
├── src/
│   ├── css/
│   │   └── styles.css         # Design system tokens, CSS variables & print rules
│   ├── js/
│   │   └── script.js          # Chatbot logic, draggable toggle, theme & events
│   └── data/
│       ├── data.json          # Single source of truth for portfolio site content
│       └── knowledge-base.json # Structured AI LLM knowledge repository
├── assets/
│   ├── favicon.svg            # MK Monogram favicon
│   ├── manoj-kandpal.jpg      # Profile photo
│   └── Manoj_kandpal_resume.pdf# Resume PDF
├── index.html                 # Pre-rendered static semantic HTML page
├── 404.html                   # Custom 404 page for GitHub Pages
├── sitemap.xml                # Search engine sitemap
├── robots.txt                 # Search engine crawler directives
└── package.json               # Build script configurations (npm run build)
```

---

## 📝 Updating Content

- **Portfolio Site Content**: Edit `src/data/data.json` and run `npm run build`.
- **AI Chatbot Knowledge Base**: Edit `src/data/knowledge-base.json` and run `npm run build`.
- **Cloudflare AI Proxy**: Worker source script deployed to `manoj-portfolio-ai.manojkandpal-official.workers.dev`.
