/* =============================================
   PIHU CREATORS — WEBSITE PORTFOLIO JAVASCRIPT
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ---------------------------------------------
  // CURRENT YEAR
  // ---------------------------------------------

  const currentYear = $("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ---------------------------------------------
  // HEADER & SCROLL PROGRESS
  // ---------------------------------------------

  const header = $("#siteHeader");
  const progressBar = $("#scrollProgressBar");
  const backToTop = $("#backToTop");

  let scrollScheduled = false;

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 30);
    }

    if (progressBar) {
      const percent = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

      progressBar.style.width =
        `${Math.min(100, Math.max(0, percent))}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 400);
    }

    scrollScheduled = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollScheduled) {
      requestAnimationFrame(updateScrollUI);
      scrollScheduled = true;
    }
  }, { passive: true });

  updateScrollUI();

  // ---------------------------------------------
  // MOBILE MENU
  // ---------------------------------------------

  const menuToggle = $("#menuToggle");
  const primaryNav = $(".primary-nav");
  const primaryMenu = $("#primaryMenu");

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    primaryNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.classList.add("is-active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    primaryNav.classList.add("open");
    document.body.classList.add("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const expanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    expanded ? closeMenu() : openMenu();
  });

  primaryMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      primaryNav &&
      menuToggle &&
      !primaryNav.contains(event.target) &&
      !menuToggle.contains(event.target) &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      closeMenu();
    }
  });

  // ---------------------------------------------
  // SERVICES DROPDOWN
  // ---------------------------------------------

  const servicesDropdown = $("#servicesDropdown");
  const dropdownTrigger = $(".dropdown-trigger", servicesDropdown || document);

  dropdownTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      dropdownTrigger.getAttribute("aria-expanded") === "true";

    dropdownTrigger.setAttribute("aria-expanded", String(!isOpen));
    servicesDropdown?.classList.toggle("open", !isOpen);
  });

  document.addEventListener("click", (event) => {
    if (
      servicesDropdown &&
      !servicesDropdown.contains(event.target)
    ) {
      servicesDropdown.classList.remove("open");
      dropdownTrigger?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();

      servicesDropdown?.classList.remove("open");
      dropdownTrigger?.setAttribute("aria-expanded", "false");
    }
  });

  // ---------------------------------------------
  // PROJECT SEARCH & CATEGORY FILTER
  // ---------------------------------------------

  const projectGrid = $("#projectGrid");
  const projectCards = projectGrid
    ? $$(".project-card", projectGrid)
    : [];

  const projectSearch = $("#projectSearch");
  const filterButtons = $$(".filter-btn");
  const emptyProjects = $("#emptyProjects");
  const resetProjects = $("#resetProjects");

  let activeCategory = "all";

  function normalise(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function filterProjects() {
    const searchTerm = normalise(projectSearch?.value);
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const category = card.dataset.category || "all";

      const searchableText = normalise([
        card.dataset.search,
        card.textContent
      ].join(" "));

      const categoryMatches =
        activeCategory === "all" ||
        category === activeCategory;

      const searchMatches =
        !searchTerm ||
        searchableText.includes(searchTerm);

      const visible = categoryMatches && searchMatches;

      card.hidden = !visible;
      card.setAttribute("aria-hidden", String(!visible));

      if (visible) visibleCount++;
    });

    if (emptyProjects) {
      emptyProjects.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        const active = item === button;

        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      filterProjects();
    });
  });

  projectSearch?.addEventListener("input", filterProjects);

  resetProjects?.addEventListener("click", () => {
    activeCategory = "all";

    if (projectSearch) {
      projectSearch.value = "";
    }

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === "all";

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    filterProjects();
    projectSearch?.focus();
  });

  filterProjects();

  // ---------------------------------------------
  // PREFILL SERVICE WHEN CLICKING SERVICE LINKS
  // ---------------------------------------------

  const serviceSelect = $("#leadService");

  $$("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const selectedService = link.dataset.service;

      if (serviceSelect && selectedService) {
        const option = Array.from(serviceSelect.options).find(
          (item) => item.value === selectedService ||
                    item.textContent.trim() === selectedService
        );

        if (option) {
          serviceSelect.value = option.value;
        }
      }
    });
  });

  // ---------------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // ---------------------------------------------

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay =
        `${(index % 4) * 65}ms`;

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ---------------------------------------------
  // BACK TO TOP
  // ---------------------------------------------

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  // ---------------------------------------------
  // WHATSAPP LEAD FORM
  // ---------------------------------------------

  const leadForm = $("#leadForm");
  const formStatus = $("#formStatus");

  leadForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!leadForm.reportValidity()) {
      return;
    }

    const name = $("#leadName")?.value.trim() || "";
    const phone = $("#leadPhone")?.value.trim() || "";
    const service = $("#leadService")?.value || "";
    const budget = $("#leadBudget")?.value || "Not specified";
    const message = $("#leadMessage")?.value.trim() || "";

    if (!name || !phone || !service || !message) {
      if (formStatus) {
        formStatus.textContent =
          "Please complete all required fields.";
      }

      return;
    }

    const enquiry = [
      "Hello Pihu Creators!",
      "",
      "I would like to discuss a website project.",
      "",
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      "",
      "Project details:",
      message
    ].join("\n");

    const whatsappURL =
      "https://wa.me/918882374164?text=" +
      encodeURIComponent(enquiry);

    if (formStatus) {
      formStatus.textContent =
        "Opening WhatsApp with your project enquiry...";
    }

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });

  // ---------------------------------------------
  // EXTERNAL LINK SAFETY
  // ---------------------------------------------

  $$('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  // ---------------------------------------------
  // READY
  // ---------------------------------------------

  document.documentElement.classList.add("js-ready");

  console.info("Pihu Creators portfolio is ready.");
});