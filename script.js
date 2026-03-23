// =============================================
// PARTICLES ANIMÉES
// =============================================
const particlesContainer = document.getElementById('particles');
const particleIcons = ['fa-dumbbell', 'fa-running', 'fa-heartbeat', 'fa-star', 'fa-bolt', 'fa-fire'];

for (let i = 0; i < 18; i++) {
  const p = document.createElement('i');
  const icon = particleIcons[Math.floor(Math.random() * particleIcons.length)];
  p.className = `particle fas ${icon}`;
  p.style.left     = Math.random() * 100 + '%';
  p.style.fontSize = (0.6 + Math.random() * 1.2) + 'rem';
  p.style.animationDuration  = (6 + Math.random() * 10) + 's';
  p.style.animationDelay     = (Math.random() * 8) + 's';
  p.style.color = `rgba(255,255,255,${0.06 + Math.random() * 0.10})`;
  particlesContainer.appendChild(p);
}

// =============================================
// EFFET TYPEWRITER
// =============================================
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Coach Sportif Certifié',
  'Vignoble Nantais',
  'Master STAPS EOPS',
  'À domicile & en plein air',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 50 : 80);
}

setTimeout(typeWriter, 1000);

// =============================================
// BARRE DE PROGRESSION
// =============================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// =============================================
// CURSEUR PERSONNALISÉ (PC uniquement)
// =============================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

// Curseur personnalisé désactivé
const hasMouseDevice = false;
cursor.style.display = 'none';
follower.style.display = 'none';

const darkSections = ['.hero', '.stats', '.footer'];

if (hasMouseDevice) {
  document.addEventListener('mousemove', e => {
    cursor.style.left   = e.clientX + 'px';
    cursor.style.top    = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const onDark = el && darkSections.some(sel => el.closest(sel));
    document.body.classList.toggle('cursor-dark', !!onDark);
  });

  document.querySelectorAll('a, button, .service-card, .faq-question, .video-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}


// =============================================
// BOUTON RETOUR EN HAUT
// =============================================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// =============================================
// MODE SOMBRE
// =============================================
const darkToggle = document.getElementById('darkToggle');
const darkIcon   = document.getElementById('darkIcon');

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkIcon.classList.replace('fa-moon', 'fa-sun');
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkIcon.classList.toggle('fa-moon', !isDark);
  darkIcon.classList.toggle('fa-sun',   isDark);
  localStorage.setItem('darkMode', isDark);
});

// =============================================
// NAVBAR — scroll effect
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// =============================================
// BURGER MENU
// =============================================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =============================================
// SMOOTH SCROLL — active nav link
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// =============================================
// SCROLL REVEAL — bas + latéral
// =============================================
const revealElements = document.querySelectorAll(
  '.service-card, .contact-item, .stat, .badge, .tarif-card, .video-card, .faq-item, .avis-card'
);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Éléments latéraux
const lateralEls = [
  { el: document.querySelector('.apropos-img-wrap'), dir: 'left' },
  { el: document.querySelector('.apropos-text'),     dir: 'right' },
  { el: document.querySelector('.contact-infos'),    dir: 'left' },
  { el: document.querySelector('.contact-form'),     dir: 'right' },
  { el: document.querySelector('.contact-map'),      dir: 'left' },
];

lateralEls.forEach(({ el, dir }) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = dir === 'left' ? 'translateX(-60px)' : 'translateX(60px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const lateralObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const dir = lateralEls.find(e => e.el === entry.target)?.dir;
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    } else {
      entry.target.style.opacity = '0';
      entry.target.style.transform = dir === 'left' ? 'translateX(-60px)' : 'translateX(60px)';
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

lateralEls.forEach(({ el }) => { if (el) lateralObserver.observe(el); });

// =============================================
// PARALLAXE HERO
// =============================================
const heroContent = document.querySelector('.hero-content');
const heroShapes  = document.querySelectorAll('.hero-shape, .hero-ring, .hero-dumbbell');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
    heroShapes.forEach((s, i) => {
      const speed = 0.1 + i * 0.04;
      s.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
});

// =============================================
// HOVER 3D SUR LES CARTES SERVICES
// =============================================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// =============================================
// POPUP BIENVENUE
// =============================================
function closePopup() {
  document.getElementById('popup-overlay').classList.remove('visible');
  sessionStorage.setItem('popupSeen', 'true');
}

if (!sessionStorage.getItem('popupSeen')) {
  setTimeout(() => {
    document.getElementById('popup-overlay').classList.add('visible');
  }, 5000);
}

// =============================================
// FAQ — accordéon
// =============================================
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Ferme tous les autres
  document.querySelectorAll('.faq-question.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  // Ouvre celui cliqué si il était fermé
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// =============================================
// COMPTEURS ANIMÉS
// =============================================
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';

    if (entry.isIntersecting) {
      let current = 0;
      const step = target / (1500 / 16);
      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };
      update();
    } else {
      el.textContent = '0' + suffix;
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// =============================================
// EMAILJS — Formulaire de contact
// =============================================
// Remplace les 3 valeurs ci-dessous par tes clés EmailJS
const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';

emailjs.init(EMAILJS_PUBLIC_KEY);

function sendForm(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      btn.style.background = '#8C1C1C';
      success.style.display = 'block';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        btn.style.background = '';
        success.style.display = 'none';
      }, 4000);
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
      alert('Une erreur est survenue. Veuillez réessayer ou contacter Hugo directement.');
    });
}
