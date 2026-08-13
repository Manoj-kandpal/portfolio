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
        textContent: 'Add your photo at assets/profile-placeholder.jpg (or update the photo path in data.json)'
      }));
    });
  }
}

// ---------- Custom GA4 & dataLayer Event Tracking ----------
function initAnalyticsEvents() {
  // Track Resume Downloads
  document.querySelectorAll('a[href*="resume"]').forEach(el => {
    el.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'download_resume', {
          event_category: 'engagement',
          event_label: 'Manoj Kandpal Resume PDF'
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'download_resume',
          file_name: 'Manoj_kandpal_resume.pdf'
        });
      }
    });
  });

  // Track Contact Links (Email / Phone)
  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => {
      const type = el.href.startsWith('mailto:') ? 'email' : 'phone';
      if (typeof gtag === 'function') {
        gtag('event', 'contact_click', {
          contact_type: type,
          contact_value: el.href
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_click',
          contact_type: type
        });
      }
    });
  });

  // Track Social Links (LinkedIn / GitHub)
  document.querySelectorAll('a[href*="linkedin.com"], a[href*="github.com"]').forEach(el => {
    el.addEventListener('click', () => {
      const platform = el.href.includes('linkedin') ? 'linkedin' : 'github';
      if (typeof gtag === 'function') {
        gtag('event', 'social_click', {
          platform: platform,
          url: el.href
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'social_click',
          platform: platform
        });
      }
    });
  });
}

// Launch interactive features & event tracking on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTimelineProgress();
  initProfileImgFallback();
  initFooterYear();
  initAnalyticsEvents();
});
