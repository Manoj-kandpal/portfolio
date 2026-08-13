const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/data.json');
const indexPath = path.join(__dirname, '../index.html');

console.log('⚡ Starting SSG build process...');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let htmlContent = fs.readFileSync(indexPath, 'utf8');

function renderNavLogo(data) {
  const p = data.profile || {};
  return `<span class="logo-mark">${p.initials || 'MK'}</span> ${p.name || 'Manoj Kandpal'}`;
}

function renderFooterName(data) {
  const p = data.profile || {};
  return p.name || 'Manoj Kandpal';
}

function renderHero(data) {
  if (!data.profile) return '';
  const p = data.profile;
  return `
    ${p.status ? `<div class="status-pill reveal in"><span>${p.status}</span></div>` : ''}
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
  if (!data.about) return '';
  const a = data.about;
  const p = data.profile || {};

  const paragraphsHtml = a.paragraphs ? a.paragraphs.map(text => `<p>${text}</p>`).join('\n      ') : '';
  const statsHtml = a.stats ? a.stats.map(s => `
        <div class="stat"><b>${s.value}</b><span>${s.label}</span></div>
  `).join('') : '';

  return `
    <div class="about-photo reveal">
      <img id="profileImg" src="${p.photo || 'assets/manoj-kandpal.jpg'}" alt="${p.name || 'Profile'}" loading="lazy" decoding="async">
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
  if (!data.experience) return '';
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
            ${job.highlights ? job.highlights.map(h => `<li>${h}</li>`).join('\n            ') : ''}
          </ul>
        </div>
      </div>
  `).join('') : '';

  return `
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
  if (!data.skills) return '';
  const s = data.skills;

  const categoriesHtml = s.categories ? s.categories.map(cat => `
      <div class="skill-group reveal">
        <h3>${cat.name}</h3>
        <div class="chip-row">
          ${cat.items ? cat.items.map(item => `<span class="chip">${item}</span>`).join('\n          ') : ''}
        </div>
      </div>
  `).join('') : '';

  return `
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
  if (!data.projects) return '';
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
          ${item.tags ? item.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n          ') : ''}
        </div>
      </div>
  `).join('') : '';

  return `
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
  if (!data.background) return '';
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
    `;
  }).join('') : '';

  return `
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
  if (!data.contact) return '';
  const c = data.contact;
  const p = data.profile || {};

  return `
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

function replaceSection(content, containerId, innerMarkup, startMarker, endMarker) {
  const markerRegex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'g');
  if (markerRegex.test(content)) {
    return content.replace(markerRegex, `${startMarker}\n${innerMarkup.trim()}\n${endMarker}`);
  }

  const containerRegex = new RegExp(`(<[a-z0-9]+[^>]*id="${containerId}"[^>]*>)([\\s\\S]*?)(<\\/[a-z0-9]+>)`, 'i');
  if (containerRegex.test(content)) {
    return content.replace(containerRegex, `$1\n${startMarker}\n${innerMarkup.trim()}\n${endMarker}\n$3`);
  }

  return content;
}

// Perform section pre-render replacements
htmlContent = replaceSection(htmlContent, 'navLogo', renderNavLogo(data), '<!-- NAV_LOGO_START -->', '<!-- NAV_LOGO_END -->');
htmlContent = replaceSection(htmlContent, 'heroContent', renderHero(data), '<!-- HERO_START -->', '<!-- HERO_END -->');
htmlContent = replaceSection(htmlContent, 'aboutContent', renderAbout(data), '<!-- ABOUT_START -->', '<!-- ABOUT_END -->');
htmlContent = replaceSection(htmlContent, 'experienceContent', renderExperience(data), '<!-- EXPERIENCE_START -->', '<!-- EXPERIENCE_END -->');
htmlContent = replaceSection(htmlContent, 'skillsContent', renderSkills(data), '<!-- SKILLS_START -->', '<!-- SKILLS_END -->');
htmlContent = replaceSection(htmlContent, 'projectsContent', renderProjects(data), '<!-- PROJECTS_START -->', '<!-- PROJECTS_END -->');
htmlContent = replaceSection(htmlContent, 'backgroundContent', renderBackground(data), '<!-- BACKGROUND_START -->', '<!-- BACKGROUND_END -->');
htmlContent = replaceSection(htmlContent, 'contactContent', renderContact(data), '<!-- CONTACT_START -->', '<!-- CONTACT_END -->');

// Replace footer name and year
const footerNameRegex = /<span id="footerName">[\s\S]*?<\/span>/i;
if (footerNameRegex.test(htmlContent)) {
  htmlContent = htmlContent.replace(footerNameRegex, `<span id="footerName">${renderFooterName(data)}</span>`);
}

const yearRegex = /<span id="year">[\s\S]*?<\/span>/i;
const currentYear = new Date().getFullYear();
if (yearRegex.test(htmlContent)) {
  htmlContent = htmlContent.replace(yearRegex, `<span id="year">${currentYear}</span>`);
}

// Embed Knowledge Base data, Proxy URL & optional Gemini API Key for AI Assistant
const kbPath = path.join(__dirname, '../src/data/knowledge-base.json');
if (fs.existsSync(kbPath)) {
  const kbData = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
  const proxyScript = process.env.AI_PROXY_URL ? `<script>window.AI_PROXY_URL = "${process.env.AI_PROXY_URL}";</script>\n` : '';
  const keyScript = process.env.GEMINI_API_KEY ? `<script>window.DEFAULT_GEMINI_KEY = "${process.env.GEMINI_API_KEY}";</script>\n` : '';
  const kbScript = `<script>window.PORTFOLIO_KB = ${JSON.stringify(kbData)};</script>\n${proxyScript}${keyScript}<script src="src/js/script.js" defer></script>`;

  // Strip old injected scripts if present
  htmlContent = htmlContent.replace(/<script>window\.PORTFOLIO_KB = [\s\S]*?<\/script>\s*/g, '');
  htmlContent = htmlContent.replace(/<script>window\.AI_PROXY_URL = [\s\S]*?<\/script>\s*/g, '');
  htmlContent = htmlContent.replace(/<script>window\.DEFAULT_GEMINI_KEY = [\s\S]*?<\/script>\s*/g, '');

  htmlContent = htmlContent.replace(/<script\s+src="src\/js\/script\.js"\s+defer><\/script>/gi, kbScript);
}

fs.writeFileSync(indexPath, htmlContent, 'utf8');

// Update sitemap.xml lastmod date with ISO timestamp
const sitemapPath = path.join(__dirname, '../sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const nowISO = new Date().toISOString();
  sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${nowISO}</lastmod>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

// Update robots.txt timestamp header & AI bot permissions
const robotsPath = path.join(__dirname, '../robots.txt');
if (fs.existsSync(robotsPath)) {
  const nowISO = new Date().toISOString();
  const robotsContent = `# Last updated: ${nowISO}
User-agent: *
Allow: /

# AEO / AI Engine Crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://manoj-kandpal.github.io/portfolio/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
}

// Generate llms.txt standard for AEO (Answer Engine Optimization)
const llmsPath = path.join(__dirname, '../llms.txt');
if (fs.existsSync(kbPath)) {
  const kbData = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
  const p = kbData.profile || {};
  const c = kbData.contact || {};
  const edu = kbData.education || {};
  const expList = kbData.experience || [];
  const certs = kbData.certifications || [];
  const ach = kbData.achievements || [];
  const skills = kbData.skills || {};
  const pb = p.personalBackground || {};

  const llmsContent = `# ${p.name || 'Manoj Kandpal'} — ${p.title || 'Full Stack Software Engineer'}

> ${p.summary || ''}

## Summary & Contact
- **Name**: ${p.name}
- **Title**: ${p.title}
- **Location**: ${p.location} (Hometown: ${p.hometown || 'Haridwar, Uttarakhand'})
- **Education**: ${edu.degree}, ${edu.institution} (CGPA: ${edu.cgpa})
- **Email**: ${c.email}
- **Phone**: ${c.phone}
- **Links**: [LinkedIn](${c.linkedin}) | [GitHub](${c.github}) | [Portfolio](${c.portfolio})

## Core Technical Skills
- **Languages**: ${(skills.languages || []).join(', ')}
- **Frontend**: ${(skills.frontend || []).join(', ')}
- **Backend & APIs**: ${(skills.backendAndApis || []).join(', ')}
- **Databases**: ${(skills.databases || []).join(', ')}
- **Cloud, DevOps & Testing**: ${(skills.cloudDevOpsTesting || []).join(', ')}
- **Engineering Fundamentals**: ${(skills.engineeringFundamentals || []).join(', ')}

## Professional Experience
${expList.map(job => `### ${job.role} — ${job.company} (${job.period} | ${job.location})
${(job.highlights || []).map(h => `- ${h}`).join('\n')}`).join('\n\n')}

## Certifications
${certs.map(cert => `- **${cert.title}** (${cert.issuer}): ${cert.verificationUrl}`).join('\n')}

## Achievements
${ach.map(item => `- **${item.title}** (${item.issuer}): ${item.description || ''}`).join('\n')}

## Personal Background & Interests
- **Hometown**: ${pb.origin || 'Haridwar, Uttarakhand'}
- **Schooling**: ${pb.schooling || 'Gayatri Vidyapeeth, Shantikunj, Haridwar'}
- **Hobbies**: ${(pb.hobbies || []).join(', ')}
`;

  fs.writeFileSync(llmsPath, llmsContent, 'utf8');
}

// Generate IndexNow verification key file & ping Bing/DuckDuckGo for instant indexing
const indexNowKey = '2bf6bc6102cbc0d4791e';
const indexNowPath = path.join(__dirname, `../${indexNowKey}.txt`);
fs.writeFileSync(indexNowPath, indexNowKey, 'utf8');

async function pingIndexNow() {
  const https = require('https');
  const payload = JSON.stringify({
    host: 'manoj-kandpal.github.io',
    key: indexNowKey,
    keyLocation: `https://manoj-kandpal.github.io/portfolio/${indexNowKey}.txt`,
    urlList: [
      'https://manoj-kandpal.github.io/portfolio/',
      'https://manoj-kandpal.github.io/portfolio/index.html'
    ]
  });

  return new Promise((resolve) => {
    const req = https.request('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      res.resume();
      console.log(`⚡ IndexNow ping submitted (HTTP ${res.statusCode}) — Bing & DuckDuckGo notified for instant indexing!`);
      resolve();
    });

    req.on('error', () => {
      /* Silent fallback if offline */
      resolve();
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

async function runBuild() {
  await pingIndexNow();
  console.log('✅ SSG build complete! Pre-rendered index.html, sitemap.xml, robots.txt, llms.txt, & IndexNow key updated.');
}

runBuild();
