// ---------- Theme Toggle ----------
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('mk-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.setAttribute('data-theme', storedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('mk-theme', next);
  });
}

// ---------- Mobile Navigation ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- Data Load & Section Renderers ----------
async function initPortfolio() {
  let data;
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.warn('Could not load data.json via fetch, using inline fallback data:', err);
    data = getFallbackData();
  }

  renderNavAndFooter(data);
  renderHero(data);
  renderAbout(data);
  renderExperience(data);
  renderSkills(data);
  renderProjects(data);
  renderBackground(data);
  renderContact(data);

  // Initialize interactive features post-render
  initScrollReveal();
  initTimelineProgress();
  initProfileImgFallback();
  initFooterYear();
}

function renderNavAndFooter(data) {
  if (!data.profile) return;
  const p = data.profile;
  const navLogo = document.getElementById('navLogo');
  if (navLogo) {
    navLogo.innerHTML = `<span class="logo-mark">${p.initials || 'MK'}</span> ${p.name || 'Manoj Kandpal'}`;
  }
  const footerName = document.getElementById('footerName');
  if (footerName) {
    footerName.textContent = p.name || 'Manoj Kandpal';
  }
}

function renderHero(data) {
  const container = document.getElementById('heroContent');
  if (!container || !data.profile) return;
  const p = data.profile;

  container.innerHTML = `
    <p class="eyebrow reveal in">${p.eyebrow}</p>
    <h1 class="reveal in">${p.heroHeadline}<span class="role">${p.heroRole}</span></h1>
    <p class="hero-sub reveal in">${p.heroSub}</p>
    <div class="hero-cta reveal in">
      <a href="#experience" class="btn btn-primary">View my work</a>
      ${p.resume ? `
        <a href="${p.resume}" class="btn btn-ghost" download target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Resume</span>
        </a>
      ` : ''}
      <a href="mailto:${p.email}" class="btn btn-ghost">Get in touch</a>
    </div>
    <svg class="hero-route" viewBox="0 0 640 60" preserveAspectRatio="none">
      <path d="M0,30 C 100,10 180,50 280,28 S 460,4 640,34" />
      <circle cx="0" cy="30" r="4"/>
      <circle cx="640" cy="34" r="4"/>
    </svg>
  `;
}

function renderAbout(data) {
  const container = document.getElementById('aboutContent');
  if (!container || !data.about) return;
  const a = data.about;
  const p = data.profile || {};

  const paragraphsHtml = a.paragraphs ? a.paragraphs.map(text => `<p>${text}</p>`).join('') : '';
  const statsHtml = a.stats ? a.stats.map(s => `
    <div class="stat"><b>${s.value}</b><span>${s.label}</span></div>
  `).join('') : '';

  container.innerHTML = `
    <div class="about-photo reveal">
      <img id="profileImg" src="${p.photo || 'assets/profile-placeholder.svg'}" alt="${p.name || 'Profile'}">
    </div>
    <div class="about-text reveal">
      <p class="eyebrow">${a.eyebrow || 'About'}</p>
      ${paragraphsHtml}
      <div class="about-stats">
        ${statsHtml}
      </div>
    </div>
  `;
}

function renderExperience(data) {
  const container = document.getElementById('experienceContent');
  if (!container || !data.experience) return;
  const exp = data.experience;

  const jobsHtml = exp.jobs ? exp.jobs.map(job => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="role-row">
          <h3>${job.role}</h3>
          <span class="role-date">${job.date}</span>
        </div>
        <span class="role-company">${job.company}</span>
        <ul class="role-list">
          ${job.highlights ? job.highlights.map(h => `<li>${h}</li>`).join('') : ''}
        </ul>
      </div>
    </div>
  `).join('') : '';

  container.innerHTML = `
    <div class="section-head reveal">
      <p class="eyebrow">${exp.eyebrow || 'Experience'}</p>
      <h2>${exp.title}</h2>
      <p>${exp.subtitle}</p>
    </div>
    <div class="timeline" id="timeline">
      <div class="timeline-progress" id="timelineProgress"></div>
      ${jobsHtml}
    </div>
  `;
}

function renderSkills(data) {
  const container = document.getElementById('skillsContent');
  if (!container || !data.skills) return;
  const s = data.skills;

  const categoriesHtml = s.categories ? s.categories.map(cat => `
    <div class="skill-group reveal">
      <h3>${cat.name}</h3>
      <div class="chip-row">
        ${cat.items ? cat.items.map(item => `<span class="chip">${item}</span>`).join('') : ''}
      </div>
    </div>
  `).join('') : '';

  container.innerHTML = `
    <div class="section-head reveal">
      <p class="eyebrow">${s.eyebrow || 'Skills'}</p>
      <h2>${s.title}</h2>
      <p>${s.subtitle}</p>
    </div>
    <div class="skills-grid">
      ${categoriesHtml}
    </div>
  `;
}

function renderProjects(data) {
  const container = document.getElementById('projectsContent');
  if (!container || !data.projects) return;
  const proj = data.projects;

  const projectsHtml = proj.items ? proj.items.map(item => `
    <div class="project-card reveal">
      <div class="project-top">
        <h3>${item.title}</h3>
        <div class="project-links">
          ${item.github ? `
            <a class="icon-link" href="${item.github}" target="_blank" rel="noopener" aria-label="View source on GitHub" title="View source on GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.3.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.8 11.8 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/></svg>
            </a>
          ` : ''}
          ${item.demo ? `
            <a class="icon-link" href="${item.demo}" target="_blank" rel="noopener" aria-label="View live demo" title="View live demo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          ` : ''}
        </div>
      </div>
      <p class="desc">${item.description}</p>
      <div class="project-tags">
        ${item.tags ? item.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
      </div>
    </div>
  `).join('') : '';

  container.innerHTML = `
    <div class="section-head reveal">
      <p class="eyebrow">${proj.eyebrow || 'Projects'}</p>
      <h2>${proj.title}</h2>
      <p>${proj.subtitle}</p>
    </div>
    <div class="projects-grid">
      ${projectsHtml}
    </div>
  `;
}

function renderBackground(data) {
  const container = document.getElementById('backgroundContent');
  if (!container || !data.background) return;
  const bg = data.background;

  const eduHtml = bg.education ? bg.education.map(e => `
    <div class="edu-item">
      <h4 class="edu-degree">${e.degree || 'Bachelor of Engineering in Computer Science'}</h4>
      <div class="edu-institution">${e.institution || 'RNS Institute of Technology, Bengaluru'}</div>
      <div class="edu-meta">
        ${e.grade ? `<span class="edu-badge">${e.grade}</span>` : (e.details ? `<span class="edu-badge">${e.details}</span>` : '')}
        ${e.period ? `<span class="edu-date">${e.period}</span>` : ''}
      </div>
    </div>
  `).join('') : '';

  const certsHtml = bg.certifications ? bg.certifications.map(c => `
    <li class="cert-card-item">
      <div class="cert-info">
        <b class="cert-title">${c.title}</b>
        <span class="cert-issuer">${c.issuer}</span>
      </div>
      ${c.link ? `
        <a href="${c.link}" target="_blank" rel="noopener" class="cert-link" title="Verify Certificate" aria-label="Verify certificate for ${c.title}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span>Verify</span>
        </a>
      ` : ''}
    </li>
  `).join('') : '';

  const achHtml = bg.achievements ? bg.achievements.map(a => {
    let linksHtml = '';
    if (a.link) {
      linksHtml = `
        <div style="margin-top:8px;">
          <a href="${a.link}" target="_blank" rel="noopener" class="cert-link" title="Verify Certificate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Verify</span>
          </a>
        </div>
      `;
    } else if (a.links && a.links.length > 0) {
      linksHtml = `<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">` + a.links.map(l => `
        <a href="${l.url}" target="_blank" rel="noopener" class="cert-link" title="${l.label}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span>${l.label}</span>
        </a>
      `).join('') + `</div>`;
    }

    return `
    <div class="achievement-row">
      <div class="achievement-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="achievement-body">
        <div class="achievement-header">
          <b class="achievement-title">${a.title}</b>
          <span class="achievement-issuer">${a.issuer}</span>
        </div>
        ${a.description ? `<p class="achievement-desc" style="font-size:0.85rem; color:var(--ink-muted); margin-top:4px;">${a.description}</p>` : ''}
        ${linksHtml}
      </div>
    </div>
  `;}).join('') : '';

  container.innerHTML = `
    <div class="section-head reveal">
      <p class="eyebrow">${bg.eyebrow || 'Background'}</p>
      <h2>${bg.title}</h2>
    </div>
    <div class="background-stack">
      <div class="info-card reveal">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/></svg>Education</h3>
        <div class="edu-list">
          ${eduHtml}
        </div>
      </div>
      <div class="info-card reveal">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5"/></svg>Certifications</h3>
        <ul class="cert-grid">
          ${certsHtml}
        </ul>
      </div>
      <div class="info-card reveal">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Z"/></svg>Achievements</h3>
        <div class="achievements-list">
          ${achHtml}
        </div>
      </div>
    </div>
  `;
}

function renderContact(data) {
  const container = document.getElementById('contactContent');
  if (!container || !data.contact) return;
  const c = data.contact;
  const p = data.profile || {};

  container.innerHTML = `
    <p class="eyebrow" style="justify-content:center;">${c.eyebrow || 'Contact'}</p>
    <h2 class="reveal">${c.title}</h2>
    <p class="reveal">${c.subtitle}</p>
    <div class="contact-links reveal">
      ${p.email ? `<a class="btn btn-primary" href="mailto:${p.email}">${p.email}</a>` : ''}
      ${p.resume ? `<a class="btn btn-ghost" href="${p.resume}" download target="_blank" rel="noopener">Resume PDF</a>` : ''}
      ${p.phone ? `<a class="btn btn-ghost" href="tel:${p.phoneRaw || p.phone}">${p.phone}</a>` : ''}
      ${p.linkedin ? `<a class="btn btn-ghost" href="${p.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
      ${p.github ? `<a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
    </div>
  `;
}

// ---------- Post-Render Initializations ----------
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

function initTimelineProgress() {
  const timeline = document.getElementById('timeline');
  const progress = document.getElementById('timelineProgress');
  if (!timeline || !progress) return;

  function updateTimelineProgress() {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), rect.height);
    const pct = Math.min((visible / rect.height) * 100, 100);
    progress.style.height = pct + '%';
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress);
  updateTimelineProgress();
}

function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initProfileImgFallback() {
  const img = document.getElementById('profileImg');
  if (img) {
    img.addEventListener('error', () => {
      img.replaceWith(Object.assign(document.createElement('div'), {
        className: 'placeholder',
        textContent: 'Add your photo at assets/profile-placeholder.svg (or update the src in data.json)'
      }));
    });
  }
}

// ---------- Fallback Data (For local file:// browsing) ----------
function getFallbackData() {
  return {
    "profile": {
      "name": "Manoj Kandpal",
      "initials": "MK",
      "title": "Full Stack Software Engineer",
      "location": "Bengaluru, India",
      "eyebrow": "Full Stack Software Engineer — Bengaluru, India",
      "heroHeadline": "Manoj Kandpal",
      "heroRole": "Building enterprise platforms that ship, from API to interface.",
      "heroSub": "4+ years engineering web applications end to end — <strong>Java & Spring Boot</strong> microservices on Azure, paired with <strong>React, Next.js & Nuxt.js</strong> frontends used by <strong>10,000+ daily users</strong> at A.P. Moller – Maersk.",
      "photo": "assets/profile-placeholder.jpg",
      "resume": "assets/Manoj_kandpal_resume.pdf",
      "email": "manojkandpal.official@gmail.com",
      "phone": "+91 72480 43509",
      "phoneRaw": "+917248043509",
      "linkedin": "https://linkedin.com/in/m-kandpal",
      "github": "https://github.com/Manoj-kandpal"
    },
    "about": {
      "eyebrow": "About",
      "paragraphs": [
        "I'm a full stack engineer who enjoys the whole stack — designing REST APIs and Spring Boot microservices on one side, and building fast, accessible React and Next.js interfaces on the other.",
        "At A.P. Moller – Maersk, I've spent 4+ years shipping features for enterprise web platforms — from modernizing global navigation on maersk.com to leading an AI-powered support widget and driving double-digit engagement gains through A/B testing and behavioral analytics."
      ],
      "stats": [
        { "value": "4+", "label": "Years of experience" },
        { "value": "10k+", "label": "Daily active users served" },
        { "value": "3x", "label": "Spot Awards at Maersk" }
      ]
    },
    "experience": {
      "eyebrow": "Experience",
      "title": "Four years, one company, two chapters of growth.",
      "subtitle": "Every stop on this route is a real milestone — from associate engineer to owning AI-driven features end to end.",
      "jobs": [
        {
          "role": "Software Engineer",
          "company": "A.P. Moller – Maersk, Bengaluru",
          "date": "Sep 2025 — Present",
          "highlights": [
            "Design and build new Java & Spring Boot microservices and REST APIs, integrating them with the Next.js frontend on Azure and optimizing data serialization and caching for UI responsiveness.",
            "Migrated legacy Spring Boot 2.x microservices to modern releases, enhancing application security posture, startup speed, and API reliability.",
            "Build reusable Sitecore CMS components and Nuxt.js enterprise web apps used by 10,000+ daily global users.",
            "Modernized Maersk.com's Integrated Global Navigation frontend into a scalable, intuitive UI.",
            "Lead the Ask Maersk AI web component, maintaining a 30–35% CTR while lowering support case creation.",
            "Design and run targeted A/B experiments that lifted overall engagement by 10–15%.",
            "Instrument GTM dataLayer events and build dashboards to map user traffic and guide content improvements."
          ]
        },
        {
          "role": "Associate Software Engineer",
          "company": "A.P. Moller – Maersk, Bengaluru",
          "date": "Mar 2022 — Aug 2025",
          "highlights": [
            "Full stack developer on the core Case Management platform — built backend microservices in Java & Spring Boot on Azure, and the Next.js frontend.",
            "Migrated manual testing to Cypress, cutting regression testing effort by 80–90%.",
            "Optimized frontend and backend performance across legacy modules to improve UI responsiveness and API efficiency.",
            "Deployed semantic, SEO-friendly frontend architecture across production pages to maximize discoverability.",
            "Active in sprint planning, estimation, retrospectives and daily PR code reviews."
          ]
        }
      ]
    },
    "skills": {
      "eyebrow": "Skills",
      "title": "The toolkit, end to end.",
      "subtitle": "From data structures to deployment — the layers I work across daily.",
      "categories": [
        { "name": "Languages", "items": ["Java", "JavaScript", "TypeScript", "Python (Basic)"] },
        { "name": "Frontend", "items": ["React", "Next.js", "Nuxt.js", "Vue", "HTML5", "CSS3 / SCSS"] },
        { "name": "Backend & APIs", "items": ["Spring Boot", "Hibernate (JPA)", "Node.js", "REST APIs", "Microservices", "Kafka", "Apigee", "OpenAPI / Swagger"] },
        { "name": "Databases", "items": ["PostgreSQL", "MySQL", "Oracle SQL Developer"] },
        { "name": "Cloud, DevOps & Testing", "items": ["Azure", "Docker", "Kubernetes", "GitHub Actions", "Grafana", "Cypress", "Mockito"] },
        { "name": "AI-Assisted Development", "items": ["GitHub Copilot", "Claude Code", "Cursor", "Google Antigravity", "OpenAI API", "OpenAI Codex"] },
        { "name": "Development Tools", "items": ["IntelliJ IDEA", "VS Code", "Postman", "Bruno"] }
      ]
    },
    "projects": {
      "eyebrow": "Projects",
      "title": "A couple of things built outside the day job.",
      "subtitle": "Personal builds that dig into frontend craft and backend architecture.",
      "items": [
        {
          "title": "Website Navigation",
          "description": "A fully responsive, template-based website navigation bar with dynamic menu states and smooth UI transitions, bundled with Webpack for automated asset management.",
          "tags": ["JavaScript", "HTML", "SCSS", "Webpack"],
          "github": "https://github.com/Manoj-kandpal/Header",
          "demo": "https://manoj-kandpal.github.io/Header/"
        },
        {
          "title": "Article Hub",
          "description": "A scalable RESTful backend built with Java, Spring Boot and PostgreSQL, with JWT authentication, role-based access control and full OpenAPI/Swagger documentation.",
          "tags": ["Java", "Spring Boot", "PostgreSQL", "JWT"],
          "github": "https://github.com/Manoj-kandpal/Article-hub-backend"
        }
      ]
    },
    "background": {
      "eyebrow": "Background",
      "title": "Education, certifications & recognition.",
      "education": [
        {
          "degree": "Bachelor of Engineering in Computer Science & Engineering",
          "institution": "RNS Institute of Technology, Bengaluru, Karnataka",
          "grade": "CGPA: 9.21 / 10",
          "period": "Graduated Jul 2022"
        }
      ],
      "certifications": [
        { "title": "Algorithmic Toolbox", "issuer": "UC San Diego", "link": "https://coursera.org/verify/SXPU9566KL2J" },
        { "title": "Python 3 Programming Specialization", "issuer": "University of Michigan", "link": "https://coursera.org/verify/specialization/YCNU37CH6EUE" },
        { "title": "HTML, CSS & JavaScript for Web Developers", "issuer": "Johns Hopkins University", "link": "https://coursera.org/verify/Y4ZVB7RNGKL9" },
        { "title": "Python for Data Science", "issuer": "IBM", "link": "https://courses.cognitiveclass.ai/certificates/fca2b8a43015432caad55427f1a37795" }
      ],
      "achievements": [
        { "title": "Spot Awards (x3)", "issuer": "A.P. Moller – Maersk", "description": "Recognized with 3 Spot Awards for technical excellence, ownership, and impactful delivery on global platforms." },
        { "title": "Certified Software Programmer", "issuer": "Infosys", "description": "Cleared the Infosys Certified Software Programmer assessment." },
        {
          "title": "5-Star Problem Solving & Python",
          "issuer": "HackerRank",
          "description": "Earned 5-Star badges & verified certifications in Problem Solving and Python tracks.",
          "links": [
            { "label": "Problem Solving Cert", "url": "https://www.hackerrank.com/certificates/13dd11ff06f5" },
            { "label": "Python Cert", "url": "https://www.hackerrank.com/certificates/11c0b1cd54f3" }
          ]
        }
      ]
    },
    "contact": {
      "eyebrow": "Contact",
      "title": "Let's build something reliable together.",
      "subtitle": "Open to full stack roles and interesting collaborations. The fastest way to reach me is email."
    }
  };
}

// Launch portfolio application on DOM load
document.addEventListener('DOMContentLoaded', initPortfolio);
