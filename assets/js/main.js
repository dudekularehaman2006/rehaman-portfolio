/**
 * MAIN INTERACTION & APP INITIALIZATION SCRIPT
 * - Typewriter Hero Effect
 * - 3D Hologram Tilt Physics
 * - Theme Switcher & Persistence
 * - Audio Toggle Engine
 * - Skill Matrix Filtering
 * - Copy Clipboard & Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. TYPEWRITER EFFECT
  // ==========================================
  const typewriterTarget = document.getElementById('typewriter-text');
  const roles = [
    'Core Computer Science Engineer',
    'Cloud & DevOps Practitioner',
    'Full-Stack Systems Developer',
    'AWS Storage & Cost Optimizer',
    'Software Engineer • Open For All Domains'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeRole() {
    if (!typewriterTarget) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typewriterTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 450;
    }

    setTimeout(typeRole, typeSpeed);
  }

  typeRole();

  // ==========================================
  // 2. 3D HOLOGRAM CARD PERSPECTIVE TILT
  // ==========================================
  const holoCard = document.getElementById('hero-holo-card');
  const holoShine = document.getElementById('card-shine');

  if (holoCard) {
    holoCard.addEventListener('mousemove', (e) => {
      const rect = holoCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      holoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (holoShine) {
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        holoShine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
      }
    });

    holoCard.addEventListener('mouseleave', () => {
      holoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (holoShine) {
        holoShine.style.background = 'linear-gradient(125deg, transparent 30%, rgba(255, 255, 255, 0.1) 45%, transparent 60%)';
      }
    });
  }

  // ==========================================
  // 3. THEME TOGGLING (CYAN / MATRIX / VIOLET)
  // ==========================================
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themes = ['', 'theme-matrix', 'theme-violet'];
  let currentThemeIdx = 0;

  const savedTheme = localStorage.getItem('rehaman_theme');
  if (savedTheme) {
    document.body.className = savedTheme;
    currentThemeIdx = Math.max(0, themes.indexOf(savedTheme));
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const newTheme = themes[currentThemeIdx];
      document.body.className = newTheme;
      localStorage.setItem('rehaman_theme', newTheme);
      window.soundEngine?.playLaser();

      const themeNames = ['Cyber Cyan', 'Matrix Emerald', 'Electric Violet'];
      window.showToast?.(`Theme changed: ${themeNames[currentThemeIdx]}`, 'info');
    });
  }

  // ==========================================
  // 4. AUDIO TOGGLE
  // ==========================================
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  function updateSoundUI() {
    const isMuted = window.soundEngine?.isMuted();
    if (soundIcon) {
      soundIcon.innerHTML = isMuted
        ? '<path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>'
        : '<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>';
    }
  }

  updateSoundUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const muted = window.soundEngine?.toggleMute();
      updateSoundUI();
      if (!muted) window.soundEngine?.playSuccess();
      window.showToast?.(muted ? 'Audio SFX muted' : 'Audio SFX enabled 🔊', 'info');
    });
  }

  // Global Click and Hover Sounds
  document.querySelectorAll('button, a, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => window.soundEngine?.playHover());
    el.addEventListener('click', () => window.soundEngine?.playClick());
  });

  // ==========================================
  // 5. SKILLS MATRIX FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundEngine?.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });

  // ==========================================
  // 6. COPY TO CLIPBOARD BUTTONS
  // ==========================================
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text);
        window.soundEngine?.playSuccess();
        window.showToast?.(`Copied to clipboard: "${text}"`, 'success');
      }
    });
  });

  // ==========================================
  // 7. CONTACT FORM TRANSMISSION SIMULATOR
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name')?.value;
      const email = document.getElementById('c-email')?.value;
      const msg = document.getElementById('c-msg')?.value;

      window.soundEngine?.playSuccess();
      window.showToast?.(`Dispatch received from ${name}! Preparing email route...`, 'success');

      // Also open pre-filled mailto
      setTimeout(() => {
        const mailtoLink = `mailto:rehamandudekula77@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
        window.location.href = mailtoLink;
      }, 900);

      contactForm.reset();
    });
  }

  // ==========================================
  // 8. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      window.soundEngine?.playClick();
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Quick Resume Link Copy
  const copyResumeBtn = document.getElementById('copy-resume-link-btn');
  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const link = 'https://drive.google.com/file/d/1_aTO5HzmB3VFalkCwZp41Kcx_EbTfN6x/view?usp=sharing';
      navigator.clipboard.writeText(link);
      window.soundEngine?.playSuccess();
      window.showToast?.('Google Drive Resume Link copied to clipboard!', 'success');
    });
  }
});
