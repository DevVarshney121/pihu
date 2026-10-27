/* =========================================
   PIHU CREATORS — TESTIMONIAL PAGE JS
   Complete replacement for testimonial.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================
     1. CURRENT YEAR
  ========================================= */
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================
     2. MOBILE NAVIGATION
  ========================================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  function closeMenu() {
    mainNav?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    dropdown?.classList.remove("open");
    dropdownTrigger?.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = !mainNav.classList.contains("open");

      mainNav.classList.toggle("open", isOpen);
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        const isServicesTrigger = link.classList.contains("dropdown-trigger");

        if (isMobile && isServicesTrigger && dropdown) {
          if (!dropdown.classList.contains("open")) {
            event.preventDefault();
            dropdown.classList.add("open");
            dropdownTrigger?.setAttribute("aria-expanded", "true");
            return;
          }
        }

        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* =========================================
     3. SERVICES DROPDOWN
  ========================================= */
  if (dropdown && dropdownTrigger) {
    dropdownTrigger.setAttribute("aria-haspopup", "true");
    dropdownTrigger.setAttribute("aria-expanded", "false");

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > 900) {
        dropdown.classList.add("open");
        dropdownTrigger.setAttribute("aria-expanded", "true");
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth > 900) {
        dropdown.classList.remove("open");
        dropdownTrigger.setAttribute("aria-expanded", "false");
      }
    });

    dropdownTrigger.addEventListener("focus", function () {
      if (window.innerWidth > 900) {
        dropdown.classList.add("open");
        dropdownTrigger.setAttribute("aria-expanded", "true");
      }
    });

    dropdown.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (
          window.innerWidth > 900 &&
          !dropdown.contains(document.activeElement)
        ) {
          dropdown.classList.remove("open");
          dropdownTrigger.setAttribute("aria-expanded", "false");
        }
      }, 0);
    });
  }

  /* =========================================
     4. HEADER, SCROLL PROGRESS & TOP BUTTON
  ========================================= */
  const header = document.querySelector(".site-header");
  const progressBar = document.getElementById("scrollProgressBar");
  const backToTop = document.getElementById("backToTop");
  const floatingTop = document.querySelector(".floating-top");

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

    if (progressBar) {
      progressBar.style.width = Math.min(progress, 100) + "%";
    }

    header?.classList.toggle("scrolled", scrollTop > 20);

    const showTopButton = scrollTop > 400;

    [backToTop, floatingTop].forEach(function (button) {
      if (!button) return;

      button.classList.toggle("visible", showTopButton);
      button.setAttribute("aria-hidden", String(!showTopButton));
      button.tabIndex = showTopButton ? 0 : -1;
    });
  }

  let scrollTicking = false;

  window.addEventListener("scroll", function () {
    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(function () {
      updateScrollUI();
      scrollTicking = false;
    });
  }, { passive: true });

  updateScrollUI();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  }

  backToTop?.addEventListener("click", scrollToTop);
  floatingTop?.addEventListener("click", scrollToTop);

  /* =========================================
     5. REVEAL ANIMATION
  ========================================= */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10px 0px"
      }
    );

    revealElements.forEach(function (element, index) {
      element.style.transitionDelay = (index % 4) * 60 + "ms";
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* =========================================
     6. TESTIMONIAL SLIDER
  ========================================= */
  function initializeTestimonials() {
    const slider = document.querySelector(".testimonialSwiper");

    if (!slider) {
      console.warn("Testimonial slider not found: .testimonialSwiper");
      return;
    }

    if (typeof window.Swiper === "undefined") {
      console.error(
        "Swiper is missing. Check the Swiper CDN script in testimonial.html."
      );
      return;
    }

    if (slider.swiper) return;

    const wrapper = slider.querySelector(".swiper-wrapper");
    const slides = slider.querySelectorAll(".swiper-slide");

    if (!wrapper || slides.length === 0) {
      console.error(
        "Slider needs .swiper-wrapper containing .swiper-slide elements."
      );
      return;
    }

    // The controls are siblings of the slider inside the same .container.
    const container = slider.parentElement;
    const controls = container?.querySelector(".slider-controls");

    const nextButton = controls?.querySelector(".review-next");
    const prevButton = controls?.querySelector(".review-prev");
    const pagination = controls?.querySelector(".review-pagination");

    function updateButtons(swiper) {
      if (prevButton) {
        prevButton.disabled = swiper.isBeginning;
        prevButton.classList.toggle(
          "swiper-button-disabled",
          swiper.isBeginning
        );
        prevButton.setAttribute(
          "aria-disabled",
          String(swiper.isBeginning)
        );
      }

      if (nextButton) {
        nextButton.disabled = swiper.isEnd;
        nextButton.classList.toggle(
          "swiper-button-disabled",
          swiper.isEnd
        );
        nextButton.setAttribute("aria-disabled", String(swiper.isEnd));
      }
    }

    try {
      const testimonialSwiper = new window.Swiper(slider, {
        init: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 18,
        speed: 450,
        grabCursor: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        loop: false,
        autoplay: false,

        // Keep fewer cards visible so navigation still works with 3 reviews.
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1000: {
            slidesPerView: 2,
            spaceBetween: 22
          }
        },

        pagination: pagination ? {
          el: pagination,
          clickable: true
        } : undefined,

        navigation: nextButton && prevButton ? {
          nextEl: nextButton,
          prevEl: prevButton
        } : undefined,

        keyboard: {
          enabled: true,
          onlyInViewport: true
        },

        a11y: {
          enabled: true
        },

        on: {
          init: function () {
            slider.classList.add("swiper-ready");
            updateButtons(this);
          },

          slideChange: function () {
            updateButtons(this);
          },

          update: function () {
            updateButtons(this);
          },

          resize: function () {
            updateButtons(this);
          }
        }
      });

      // Explicit click handlers provide a reliable fallback for the controls.
      if (nextButton) {
        nextButton.addEventListener("click", function () {
          testimonialSwiper.slideNext();
        });
      }

      if (prevButton) {
        prevButton.addEventListener("click", function () {
          testimonialSwiper.slidePrev();
        });
      }

      // Recalculate sizes after the page has rendered.
      window.requestAnimationFrame(function () {
        testimonialSwiper.update();
        updateButtons(testimonialSwiper);
      });

      window.addEventListener("load", function () {
        testimonialSwiper.update();
        updateButtons(testimonialSwiper);
      }, { once: true });

    } catch (error) {
      console.error("Could not initialize testimonial slider:", error);
    }
  }

  initializeTestimonials();

  /* =========================================
     7. SMOOTH INTERNAL LINKS
  ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      let target;

      try {
        target = document.querySelector(targetId);
      } catch (error) {
        return;
      }

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", targetId);
      }
    });
  });

});
