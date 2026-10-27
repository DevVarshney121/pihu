
/* =========================================
   PIHU CREATORS — VIDEO CONTENT PAGE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const servicesDropdown = document.getElementById("servicesDropdown");
  const servicesToggle = document.getElementById("servicesToggle");
  const scrollProgress = document.getElementById("scrollProgress");
  const currentYear = document.getElementById("currentYear");

  /* =====================================
     1. FOOTER CURRENT YEAR
  ===================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }

  /* =====================================
     3. SERVICES DROPDOWN
  ===================================== */

  function closeServicesDropdown() {
    if (!servicesDropdown || !servicesToggle) return;

    servicesDropdown.classList.remove("open");
    servicesToggle.setAttribute("aria-expanded", "false");
  }

  if (servicesDropdown && servicesToggle) {
    servicesToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = servicesDropdown.classList.toggle("open");

      servicesToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close dropdown when clicking outside it
    document.addEventListener("click", (event) => {
      if (!servicesDropdown.contains(event.target)) {
        closeServicesDropdown();
      }
    });

    // Close dropdown when a service is selected
    servicesDropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        closeServicesDropdown();
        closeMobileMenu();
      });
    });
  }

  /* =====================================
     4. ESCAPE KEY SUPPORT
  ===================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeServicesDropdown();
    }
  });

  /* =====================================
     5. SCROLL PROGRESS BAR
  ===================================== */

  function updateScrollProgress() {
    if (!scrollProgress) return;

    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

    scrollProgress.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  /* =====================================
     6. SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealTargets = document.querySelectorAll(
    ".service-card, .workflow-step, .stat-item, .portfolio-note-inner"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealTargets.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealTargets.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =====================================
     7. SMOOTH SCROLL FOR PAGE ANCHORS
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });
});
