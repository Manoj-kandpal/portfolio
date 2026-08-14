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

// ---------- Interactive Initializations ----------
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
        textContent: 'Add your photo at assets/manoj-kandpal.jpg (or update the photo path in data.json)'
      }));
    });
  }
}

// ---------- Custom GA4 Event Tracking ----------
function initAnalyticsEvents() {
  function trackEvent(name, params) {
    // Only track analytics events if user explicitly accepted cookies
    const savedConsent = localStorage.getItem('mk-cookie-consent');
    if (savedConsent !== 'granted') return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  }

  // Track Resume Downloads
  document.querySelectorAll('a[href*="resume"]').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent('download_resume', {
        event_category: 'engagement',
        event_label: 'Manoj Kandpal Resume PDF',
        file_name: 'Manoj_kandpal_resume.pdf'
      });
    });
  });

  // Track Contact Links (Email / Phone)
  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => {
      const isEmail = el.href.startsWith('mailto:');
      const eventName = isEmail ? 'email_click' : 'phone_click';
      trackEvent(eventName, {
        contact_type: isEmail ? 'email' : 'phone',
        contact_value: el.href
      });
      trackEvent('contact_click', {
        contact_type: isEmail ? 'email' : 'phone',
        contact_value: el.href
      });
    });
  });

  // Track Social Links (LinkedIn / GitHub)
  document.querySelectorAll('a[href*="linkedin.com"], a[href*="github.com"]').forEach(el => {
    el.addEventListener('click', () => {
      const isLinkedIn = el.href.includes('linkedin');
      const eventName = isLinkedIn ? 'linkedin_click' : 'github_click';
      trackEvent(eventName, {
        platform: isLinkedIn ? 'linkedin' : 'github',
        url: el.href
      });
      trackEvent('social_click', {
        platform: isLinkedIn ? 'linkedin' : 'github',
        url: el.href
      });
    });
  });
}

// ---------- Cookie Consent Management ----------
function initCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  const overlay = document.getElementById('cookieOverlay');
  if (!banner) return;

  function showConsentModal() {
    banner.removeAttribute('hidden');
    if (overlay) overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function hideConsentModal() {
    banner.setAttribute('hidden', 'true');
    if (overlay) overlay.setAttribute('hidden', 'true');
    document.body.style.overflow = '';
  }

  const savedConsent = localStorage.getItem('mk-cookie-consent');
  if (!savedConsent) {
    showConsentModal();
  }

  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  const settingsBtn = document.getElementById('cookieSettingsBtn');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('mk-cookie-consent', 'granted');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
        window.gtag('config', 'G-BNMFMG4EMJ', {
          'send_page_view': true
        });
      }
      hideConsentModal();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('mk-cookie-consent', 'denied');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }
      hideConsentModal();
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      showConsentModal();
    });
  }
}

// ---------- Scrollspy (Active Nav Link Indicator) ----------
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

// ---------- Floating Back to Top Button ----------
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', 'true');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
}

// ---------- Toast Notification & Copy Email ----------
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.removeAttribute('hidden');

  setTimeout(() => {
    toast.setAttribute('hidden', 'true');
  }, 2500);
}

function initCopyEmailToast() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener('click', () => {
      const email = el.href.replace('mailto:', '').trim();
      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('📋 Email copied to clipboard!');
        }).catch(() => { });
      }
    });
  });
}

// ---------- AI Assistant Chatbot ----------
function initAIChatWidget() {
  const toggle = document.getElementById('aiChatToggle');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiChatClose');
  const messagesContainer = document.getElementById('aiChatMessages');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiChatInput');

  if (!toggle || !chatWindow || !form || !input || !messagesContainer) return;

  function loadTurnstileOnDemand() {
    if (!window.location.protocol.startsWith('http')) return;

    let container = document.getElementById('turnstileWrapper');
    if (!container) {
      container = document.createElement('div');
      container.id = 'turnstileWrapper';
      container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none;';
      container.innerHTML = '<div class="cf-turnstile" data-sitekey="0x4AAAAAAEPyGx_6TKaYFa0b" data-size="compact" data-theme="dark"></div>';
      chatWindow.appendChild(container);
    }

    if (typeof turnstile === 'undefined' && !document.getElementById('turnstile-script')) {
      const tsScript = document.createElement('script');
      tsScript.id = 'turnstile-script';
      tsScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      tsScript.async = true;
      tsScript.defer = true;
      document.head.appendChild(tsScript);
    }
  }

  function loadMarkedOnDemand() {
    if (typeof window.marked === 'undefined' && !document.getElementById('marked-script')) {
      const script = document.createElement('script');
      script.id = 'marked-script';
      script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  function toggleWindow() {
    const isHidden = chatWindow.hasAttribute('hidden');
    if (isHidden) {
      chatWindow.removeAttribute('hidden');
      input.focus();
      loadTurnstileOnDemand();
      loadMarkedOnDemand();
    } else {
      chatWindow.setAttribute('hidden', 'true');
    }
  }

  // Touch / Mouse Dragging for Floating Chat Toggle
  let isDragging = false;
  let hasMoved = false;
  let startX = 0, startY = 0, origX = 0, origY = 0;

  function handleDragStart(e) {
    const pt = e.touches ? e.touches[0] : e;
    startX = pt.clientX;
    startY = pt.clientY;
    const rect = toggle.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    hasMoved = false;
    isDragging = true;

    window.addEventListener('mousemove', handleDragMove, { passive: false });
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - startX;
    const dy = pt.clientY - startY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      hasMoved = true;
    }

    if (hasMoved) {
      if (e.cancelable) e.preventDefault();
      toggle.style.position = 'fixed';
      toggle.style.bottom = 'auto';
      toggle.style.right = 'auto';

      const maxLeft = window.innerWidth - toggle.offsetWidth;
      const maxTop = window.innerHeight - toggle.offsetHeight;
      const newLeft = Math.min(Math.max(10, origX + dx), maxLeft - 10);
      const newTop = Math.min(Math.max(10, origY + dy), maxTop - 10);

      toggle.style.left = `${newLeft}px`;
      toggle.style.top = `${newTop}px`;
    }
  }

  function handleDragEnd() {
    isDragging = false;
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('touchmove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  }

  toggle.addEventListener('mousedown', handleDragStart);
  toggle.addEventListener('touchstart', handleDragStart, { passive: true });

  toggle.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopImmediatePropagation();
      hasMoved = false;
      return;
    }
    toggleWindow();
  });

  if (closeBtn) closeBtn.addEventListener('click', () => chatWindow.setAttribute('hidden', 'true'));

  // Markdown Formatter (uses marked.js if available)
  function formatMarkdownText(text) {
    if (typeof window.marked !== 'undefined' && typeof window.marked.parse === 'function') {
      return window.marked.parse(text);
    }
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n\* /g, '<br>• ')
      .replace(/\n- /g, '<br>• ');
  }

  // Local Knowledge Base Fallback
  function generateFallbackResponse(userText) {
    const query = userText.toLowerCase();
    const kb = window.PORTFOLIO_KB || {};

    if (query.includes('edu') || query.includes('degree') || query.includes('gradu') || query.includes('college') || query.includes('rns')) {
      const edu = kb.education || {};
      return `Manoj completed his <strong>${edu.degree || 'Bachelor of Engineering (B.E.) in Computer Science'}</strong> from <strong>${edu.institution || 'RNS Institute of Technology'}</strong> (${edu.duration || '2018–2022'}, CGPA: ${edu.cgpa || '8.44/10'}).`;
    }

    if (query.includes('tech') || query.includes('stack') || query.includes('skill') || query.includes('java') || query.includes('react') || query.includes('spring')) {
      return "Manoj is a Full Stack Software Engineer specializing in <strong>Java & Spring Boot</strong> microservices on Azure, paired with <strong>React, Next.js, & Nuxt.js</strong> frontends.<br><br>• <strong>Backend</strong>: Java, Spring Boot, REST APIs, Microservices, PostgreSQL, JWT<br>• <strong>Frontend</strong>: React, Next.js, Nuxt.js, JavaScript (ES6+), HTML5, SCSS/CSS3<br>• <strong>Cloud & Tools</strong>: Azure, Webpack, Docker, Git, Agile/Scrum";
    }

    if (query.includes('maersk') || query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('role')) {
      return "Manoj has <strong>4+ years of engineering experience</strong> as a Full Stack Software Engineer at <strong>A.P. Moller – Maersk</strong> (Jul 2022 – Present).<br><br>Highlights:<br>• Modernized global website navigation on maersk.com serving <strong>10,000+ daily active users</strong>.<br>• Led integration of an AI-powered customer support widget.<br>• Built Azure-hosted Spring Boot microservices & REST APIs.<br>• Awarded <strong>3x Spot Awards</strong> at Maersk for technical excellence!";
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('hire') || query.includes('linkedin')) {
      return "You can reach Manoj directly via:<br>• <strong>Email</strong>: <a href='mailto:manojkandpal.official@gmail.com'>manojkandpal.official@gmail.com</a><br>• <strong>Phone</strong>: +91 72480 43509<br>• <strong>LinkedIn</strong>: <a href='https://linkedin.com/in/m-kandpal' target='_blank' rel='noopener'>linkedin.com/in/m-kandpal</a><br>• <strong>GitHub</strong>: <a href='https://github.com/Manoj-kandpal' target='_blank' rel='noopener'>github.com/Manoj-kandpal</a>";
    }

    return "I'm Manoj's AI Assistant! You can ask me about his <strong>experience at Maersk</strong>, <strong>education (B.E. at RNSIT)</strong>, <strong>technical stack (Java, Spring Boot, React)</strong>, <strong>projects</strong>, or <strong>contact info</strong>.";
  }

  // Live Google Gemini 1.5/2.0 Flash LLM Call (via Proxy or API Key)
  async function fetchGeminiResponse(userQuery) {
    const DEFAULT_PROXY = 'https://manoj-portfolio-ai.manojkandpal-official.workers.dev';
    const proxyUrl = window.AI_PROXY_URL || localStorage.getItem('mk-ai-proxy') || DEFAULT_PROXY;
    const apiKey = localStorage.getItem('mk-gemini-key') || window.DEFAULT_GEMINI_KEY || '';
    const kbData = window.PORTFOLIO_KB || {};
    const systemInstruction = `You are Manoj Kandpal's official AI Portfolio Assistant. Answer the user's question accurately, concisely, and professionally using ONLY the following knowledge base about Manoj. Format your response cleanly using short paragraphs and bullet points if helpful. Do NOT make up facts not present in the knowledge base.

MANOJ KANDPAL KNOWLEDGE BASE:
${JSON.stringify(kbData, null, 2)}`;

    const combinedPrompt = `${systemInstruction}\n\nUSER QUESTION: ${userQuery}`;

    const payload = {
      userQuery: userQuery,
      kbData: kbData,
      systemInstruction: systemInstruction,
      // Backward compatibility fallback for generateContent or single input
      input: combinedPrompt,
      contents: [{
        parts: [{ text: combinedPrompt }]
      }]
    };

    try {
      let res;
      if (proxyUrl) {
        // Option 1: Secure Cloudflare Worker Proxy (Key is 100% secret)
        const reqHeaders = { 'Content-Type': 'application/json' };
        if (!window.location.hostname.includes('manoj-kandpal.github.io')) {
          reqHeaders['X-Portfolio-Dev-Secret'] = 'mk-dev-secret-local';
        }
        if (window.location.protocol.startsWith('http') && typeof turnstile !== 'undefined') {
          let turnstileToken = turnstile.getResponse();
          // Poll briefly up to 1.5s if Turnstile token is still generating in background
          if (!turnstileToken) {
            turnstileToken = await new Promise((resolve) => {
              let attempts = 0;
              const interval = setInterval(() => {
                attempts++;
                const tok = turnstile.getResponse();
                if (tok || attempts >= 15) {
                  clearInterval(interval);
                  resolve(tok || '');
                }
              }, 100);
            });
          }
          if (turnstileToken) {
            reqHeaders['cf-turnstile-response'] = turnstileToken;
          }
        }
        res = await fetch(proxyUrl, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        if (typeof turnstile !== 'undefined') {
          try { turnstile.reset(); } catch (e) {}
        }
      } else if (apiKey) {
        // Option 2: Direct Gemini API Call
        res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        return generateFallbackResponse(userQuery);
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error(`Gemini AI Proxy Error (HTTP ${res.status}):`, errData);
        throw new Error(`HTTP ${res.status}: ${errData.error || res.statusText}`);
      }
      const data = await res.json();

      // Support both Interactions API format and generateContent format
      let rawText = null;
      if (data?.steps && Array.isArray(data.steps)) {
        const modelStep = data.steps.find(s => s.type === 'model_output' || s.content);
        const textObj = modelStep?.content?.find(c => c.type === 'text' || c.text);
        if (textObj?.text) rawText = textObj.text;
      }
      if (!rawText && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        rawText = data.candidates[0].content.parts[0].text;
      }

      return rawText ? formatMarkdownText(rawText) : generateFallbackResponse(userQuery);
    } catch (err) {
      console.warn('AI LLM call failed, falling back to knowledge base:', err);
      return generateFallbackResponse(userQuery);
    }
  }

  function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    msgDiv.innerHTML = isUser ? `<p>${escapeHtml(text)}</p>` : text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  async function handleUserQuery(promptText) {
    addMessage(promptText, true);

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = '<p><em>✨ Gemini LLM is thinking...</em></p>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const reply = await fetchGeminiResponse(promptText);
    typingDiv.remove();
    addMessage(reply, false);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    handleUserQuery(val);
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.chip-btn')) {
      const prompt = e.target.getAttribute('data-prompt');
      if (prompt) handleUserQuery(prompt);
    }
  });
}

// Launch interactive features & event tracking on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTimelineProgress();
  initProfileImgFallback();
  initFooterYear();
  initAnalyticsEvents();
  initCookieConsent();
  initScrollspy();
  initBackToTop();
  initCopyEmailToast();
  initAIChatWidget();
});
