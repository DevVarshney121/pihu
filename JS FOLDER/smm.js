document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const progressBar = document.getElementById("scrollProgressBar");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("current-year");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const creativeCards = document.querySelectorAll(".creative-card");
  const modal = document.getElementById("creativeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const creativeOpenButtons = document.querySelectorAll(".creative-open");
  let previousFocus = null;

  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", scrollTop > 20);
    if (backToTop) backToTop.classList.toggle("visible", scrollTop > 420);
    if (progressBar) progressBar.style.width = `${scrollable > 0 ? (scrollTop / scrollable) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900 && !link.classList.contains("dropdown-trigger")) {
          mainNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener("click", event => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        const isOpen = dropdownMenu.classList.toggle("show");
        dropdownTrigger.setAttribute("aria-expanded", String(isOpen));
      }
    });
  }

  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal elements on scroll; show everything if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Portfolio category filter.
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      creativeCards.forEach(card => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  });

  // Accessible creative preview modal.
  const openModal = button => {
    if (!modal) return;
    previousFocus = document.activeElement;
    if (modalTitle) modalTitle.textContent = button.dataset.title || "Creative preview";
    if (modalDescription) modalDescription.textContent = button.dataset.description || "Sample creative concept.";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) closeButton.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  };
  creativeOpenButtons.forEach(button => button.addEventListener("click", () => openModal(button)));
  if (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }
});
