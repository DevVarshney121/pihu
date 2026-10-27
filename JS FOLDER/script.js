
/* =========================================
   PIHU CREATORS - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // ELEMENTS
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  const navDropdowns = document.querySelectorAll(".nav-dropdown");
  const revealElements = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector(".contact-form");
  const serviceLinks = document.querySelectorAll(".service-link");

  /* =========================================
     1. MOBILE NAVIGATION
  ========================================= */

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close mobile menu after clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navLinks) navLinks.classList.remove("active");
      if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });


  /* =========================================
     2. SERVICES DROPDOWN
  ========================================= */

  navDropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector(
      ".dropdown-toggle, .nav-dropdown-toggle"
    );

    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      // On mobile, click opens/closes the dropdown.
      if (window.innerWidth <= 768) {
        event.preventDefault();

        const isOpen = dropdown.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      }
    });
  });


  /* =========================================
     3. NAVBAR SCROLL EFFECT
  ========================================= */

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);


  /* =========================================
     4. SCROLL REVEAL ANIMATIONS
  ========================================= */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, observerInstance) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }


  /* =========================================
     5. SMOOTH SCROLLING
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Close mobile navigation after selection
        if (navLinks) navLinks.classList.remove("active");
        if (menuToggle) {
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        }

        // Close open dropdowns
        navDropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("open");

          const trigger = dropdown.querySelector(
            ".dropdown-toggle, .nav-dropdown-toggle"
          );

          if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  });


  /* =========================================
     6. SERVICE LINKS - CONTACT FORM
  ========================================= */

  serviceLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const serviceName = link.dataset.service;

      const serviceSelect = document.querySelector(
        '#service, #services-select, select[name="service"]'
      );

      if (serviceName && serviceSelect) {
        const matchingOption = Array.from(serviceSelect.options).find(
          function (option) {
            return option.text.trim().toLowerCase() ===
              serviceName.trim().toLowerCase();
          }
        );

        if (matchingOption) {
          serviceSelect.value = matchingOption.value;
        }
      }
    });
  });


  /* =========================================
     7. CONTACT FORM - WHATSAPP
  ========================================= */

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameField = document.querySelector("#name");
      const emailField = document.querySelector("#email");
      const phoneField = document.querySelector("#phone");
      const serviceField = document.querySelector(
        '#service, #services-select, select[name="service"]'
      );
      const budgetField = document.querySelector("#budget");
      const messageField = document.querySelector("#message");

      const name = nameField ? nameField.value.trim() : "";
      const email = emailField ? emailField.value.trim() : "";
      const phone = phoneField ? phoneField.value.trim() : "";
      const service = serviceField ? serviceField.value : "";
      const budget = budgetField ? budgetField.value : "";
      const message = messageField ? messageField.value.trim() : "";

      if (!name || !message) {
        alert("Please enter your name and project details.");
        return;
      }

      // Pihu Creators WhatsApp number (country code + number)
      const whatsappNumber = "918882374164";

      const whatsappMessage =
        "Hello Pihu Creators! I would like to discuss a project.\n\n" +
        "Name: " + name + "\n" +
        "Email: " + (email || "Not provided") + "\n" +
        "Phone: " + (phone || "Not provided") + "\n" +
        "Service: " + (service || "Not selected") + "\n" +
        "Budget: " + (budget || "Not specified") + "\n" +
        "Project Details: " + message;

      const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }


  /* =========================================
     8. CURRENT YEAR IN FOOTER
  ========================================= */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================
     9. CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================= */

  document.addEventListener("click", function (event) {
    navDropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");

        const trigger = dropdown.querySelector(
          ".dropdown-toggle, .nav-dropdown-toggle"
        );

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }
      }
    });
  });


  /* =========================================
     10. RESET MOBILE MENU ON RESIZE
  ========================================= */

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (navLinks) navLinks.classList.remove("active");
      if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }

      navDropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
      });
    }
  });

});
