/* ==== assets/js/script.js ==== */

/* ------------------- Helper: Theme Toggle ------------------- */
const THEME_KEY = 'portfolio-theme';
const html = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  html.dataset.theme = theme;
  // toggle icon
  const icon = themeToggleBtn.querySelector('i');
  if (theme === 'light') {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
  localStorage.setItem(THEME_KEY, theme);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else {
    // respect OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}
themeToggleBtn.addEventListener('click', () => {
  const newTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

/* ------------------- Scroll Progress Bar ------------------- */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / docHeight) * 100;
  progressBar.style.width = percent + '%';
}
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
updateProgress(); // initial

/* ------------------- Smooth Scroll for Nav Links ------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // close mobile menu if needed (not implemented for simplicity)
    }
  });
});

/* ------------------- AOS Init ------------------- */
AOS.init({
  duration: 800,
  easing: 'slide',
  once: true,          // animate only once
  mirror: false
});

/* ------------------- GSAP Animations ------------------- */
// Hero title stagger
gsap.from('.hero-title', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power3.out',
  delay: 0.5
});
gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.8
});
gsap.from('.hero-stats .stat', {
  opacity: 0,
  y: 20,
  stagger: 0.15,
  duration: 0.8,
  ease: 'power3.out',
  delay: 1.1
});
gsap.from('.hero-btn', {
  opacity: 0,
  scale: 0.9,
  duration: 0.6,
  ease: 'back.out(1.7)',
  delay: 1.5
});

// Skill bars fill on scroll (using GSAP ScrollTrigger)
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.skill-bar .fill').forEach(bar => {
    const width = bar.getAttribute('style').match(/width:\s*(\d+)%/);
    const targetWidth = width ? parseInt(width[1], 10) : 0;
    gsap.fromTo(bar,
      { width: '0%' },
      { width: targetWidth + '%', ease: 'power3.out', scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }}
    );
  });
}

/* ------------------- Testimonial Slider (simple) ------------------- */
const testimonials = document.querySelectorAll('.testimonial');
let current = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.style.display = i === idx ? 'block' : 'none';
  });
}
showTestimonial(current);
setInterval(() => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}, 5000);

/* ------------------- Lazy Load Images (native) ------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.src = img.dataset.src || img.src; // if using data-src, replace; else native lazyload works
  });
});

/* ------------------- Year in Footer ------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
