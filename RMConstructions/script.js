window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('pricingModal');
  const closeBtn = document.querySelector('.close-btn');
  const modalBtn = document.querySelector('.modal-btn');

  if (modal) {
    setTimeout(() => {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }, 900);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (modalBtn) {
    modalBtn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  const navMenu = document.querySelector('.nav-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((item) => {
    item.classList.add('reveal-item');
    observer.observe(item);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-item {
      opacity: 0;
      transform: translateY(26px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal-item.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentSection = 'home';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const sectionName = href.slice(1);
      link.classList.toggle('active', sectionName === currentSection);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const form = document.getElementById('leadForm');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const mobileNumber = document.getElementById('mobileNumber').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const projectType = document.getElementById('projectType').value;
      const plotLocation = document.getElementById('plotLocation').value.trim();
      const plotSize = document.getElementById('plotSize').value.trim();
      const timeline = document.getElementById('timeline').value;
      const projectDetails = document.getElementById('projectDetails').value.trim();

      if (!fullName || !mobileNumber || !projectType || !plotLocation || !plotSize || !timeline) {
        alert('Please fill in all required fields.');
        return;
      }

      const message = `Hello RM Constructions, I would like to request a consultation.%0A%0A` +
        `Name: ${fullName}%0A` +
        `Phone: ${mobileNumber}%0A` +
        `Email: ${email || 'Not provided'}%0A` +
        `Project Type: ${projectType}%0A` +
        `Location: ${plotLocation}%0A` +
        `Built-up Area: ${plotSize}%0A` +
        `Timeline: ${timeline}%0A` +
        `Project Details: ${projectDetails || 'Not provided'}`;

      window.open(`https://wa.me/919738039034?text=${message}`, '_blank');
      form.reset();
      alert('Your project enquiry has been prepared for WhatsApp.');
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Select Plot Size logic
document.getElementById("plotSize").addEventListener("change", function () {
    const otherInput = document.getElementById("otherPlotSize");

    if (this.value === "other") {
        otherInput.style.display = "block";
        otherInput.required = true;
    } else {
        otherInput.style.display = "none";
        otherInput.required = false;
        otherInput.value = "";
    }
});

console.log('RMConstructions website loaded successfully!');