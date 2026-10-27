
/* ==========================================
   PIHU CREATORS — PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

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

      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close mobile menu when a normal navigation link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close the mobile menu when clicking outside it
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    // Reset navigation when moving back to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  // Services dropdown
  const servicesDropdown = document.getElementById("servicesDropdown");
  const dropdownToggle = servicesDropdown
    ? servicesDropdown.querySelector(".dropdown-toggle")
    : null;

  if (servicesDropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = servicesDropdown.classList.toggle("open");

      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!servicesDropdown.contains(event.target)) {
        servicesDropdown.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close dropdown after choosing a service
    servicesDropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        servicesDropdown.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
        closeMobileMenu();
      });
    });

    // Close dropdown with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        servicesDropdown.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
        closeMobileMenu();
      }
    });
  }

  // Portfolio category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      // Update active filter button
      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      // Show matching projects
      projectCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.classList.toggle("is-filtered-out", !shouldShow);
      });
    });

    button.setAttribute(
      "aria-pressed",
      button.classList.contains("active") ? "true" : "false"
    );
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".reveal");

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
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Make anchor scrolling comfortable
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });
      }
    });
  });
});
