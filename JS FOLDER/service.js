
/* =====================================================
   PIHU CREATORS — SERVICES PAGE JAVASCRIPT
   Fixed Navbar • Dropdown • Mobile Menu • Search
   Category Filters • Scroll Effects • Swiper • Counters
===================================================== */

(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS — MATCHED TO YOUR ACTUAL HTML
    // ==========================================

    const header =
      document.getElementById("siteHeader") ||
      document.querySelector(".site-header");

    const menuToggle =
      document.getElementById("menuToggle") ||
      document.querySelector(".menu-toggle");

    const primaryMenu =
      document.getElementById("primaryMenu") ||
      document.querySelector(".main-nav");

    const primaryNav = document.querySelector(".main-nav");

    const servicesDropdown =
      document.getElementById("servicesDropdown") ||
      document.querySelector(".nav-dropdown");

    const servicesTrigger =
      servicesDropdown?.querySelector(".dropdown-trigger") ||
      servicesDropdown?.querySelector(":scope > a");

    const dropdownMenu =
      servicesDropdown?.querySelector(".dropdown-menu");

    const scrollProgressBar =
      document.getElementById("scrollProgressBar");

    const currentYear =
      document.getElementById("currentYear") ||
      document.getElementById("current-year");

    const serviceSearch =
      document.getElementById("serviceSearch");

    const servicesGrid =
      document.getElementById("servicesGrid");

    const filterStatus =
      document.getElementById("filterStatus");

    const noResults =
      document.getElementById("noServiceResults");

    const resetFilters =
      document.getElementById("resetServiceFilters");

    const filterButtons = [
      ...document.querySelectorAll(".filter-chip")
    ];

    const serviceCards = servicesGrid
      ? [...servicesGrid.querySelectorAll(".service-card")]
      : [];

    const backToTop =
      document.getElementById("backToTop") ||
      document.querySelector(".floating-top");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


    // ==========================================
    // FOOTER YEAR
    // ==========================================

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }


    // ==========================================
    // SCROLL PROGRESS + HEADER
    // ==========================================

    let scrollPending = false;

    function updateScroll() {
      const scrollTop = window.scrollY;

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress = maxScroll > 0
        ? (scrollTop / maxScroll) * 100
        : 0;

      header?.classList.toggle("scrolled", scrollTop > 30);

      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
      }

      if (backToTop) {
        const visible = scrollTop > 450;

        backToTop.classList.toggle("visible", visible);
        backToTop.classList.toggle("show", visible);
        backToTop.setAttribute(
          "aria-hidden",
          String(!visible)
        );

        backToTop.tabIndex = visible ? 0 : -1;
      }
    }

    window.addEventListener("scroll", () => {
      if (scrollPending) return;

      scrollPending = true;

      window.requestAnimationFrame(() => {
        updateScroll();
        scrollPending = false;
      });
    }, { passive: true });

    updateScroll();


    // ==========================================
    // MOBILE MENU — ACTUAL HTML SELECTORS
    // ==========================================

    function openMobileMenu() {
      if (!menuToggle || !primaryMenu) return;

      menuToggle.classList.add("is-active");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
      );

      primaryMenu.classList.add("open", "is-open");
      primaryNav?.classList.add("open", "is-open");
      header?.classList.add("menu-open");
      document.body.classList.add("menu-open");
    }

    function closeMobileMenu() {
      if (!menuToggle || !primaryMenu) return;

      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      primaryMenu.classList.remove("open", "is-open");
      primaryNav?.classList.remove("open", "is-open");
      header?.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    }

    menuToggle?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });


    // ==========================================
    // SERVICES DROPDOWN — NO PAGE JUMP
    // Works with your existing <a href="Service.html">
    // ==========================================

    function openServicesDropdown() {
      if (!servicesDropdown) return;

      servicesDropdown.classList.add("open", "is-open");

      servicesTrigger?.setAttribute(
        "aria-expanded",
        "true"
      );

      // Ensure the submenu becomes visible even if
      // the stylesheet only supports hover.
      if (dropdownMenu) {
        dropdownMenu.style.display = "block";
      }
    }

    function closeServicesDropdown() {
      if (!servicesDropdown) return;

      servicesDropdown.classList.remove("open", "is-open");

      servicesTrigger?.setAttribute(
        "aria-expanded",
        "false"
      );

      if (dropdownMenu) {
        dropdownMenu.style.display = "";
      }
    }

    servicesTrigger?.addEventListener("click", (event) => {
      // IMPORTANT: prevents Service.html navigation
      // and stops the browser from jumping/reloading.
      event.preventDefault();
      event.stopPropagation();

      const isOpen =
        servicesDropdown.classList.contains("open") ||
        servicesDropdown.classList.contains("is-open");

      if (isOpen) {
        closeServicesDropdown();
      } else {
        openServicesDropdown();
      }
    });

    // Desktop hover support.
    servicesDropdown?.addEventListener("mouseenter", () => {
      if (
        window.matchMedia(
          "(hover: hover) and (min-width: 901px)"
        ).matches
      ) {
        openServicesDropdown();
      }
    });

    servicesDropdown?.addEventListener("mouseleave", () => {
      if (
        window.matchMedia(
          "(hover: hover) and (min-width: 901px)"
        ).matches
      ) {
        closeServicesDropdown();
      }
    });

    // Close when clicking outside the dropdown.
    document.addEventListener("click", (event) => {
      if (
        servicesDropdown &&
        !servicesDropdown.contains(event.target)
      ) {
        closeServicesDropdown();
      }

      if (
        header &&
        !header.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close mobile navigation after selecting a link.
    // Do not prevent normal navigation for submenu links.
    primaryMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        const isDropdownTrigger =
          servicesDropdown?.contains(link) &&
          link === servicesTrigger;

        if (isDropdownTrigger) return;

        closeMobileMenu();
        closeServicesDropdown();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const menuWasOpen =
          menuToggle?.getAttribute("aria-expanded") === "true";

        closeServicesDropdown();
        closeMobileMenu();

        if (menuWasOpen) {
          menuToggle?.focus();
        }
      }
    });


    // ==========================================
    // SERVICE SEARCH + CATEGORY FILTERS
    // ==========================================

    let activeFilter = "all";

    function normalise(value) {
      return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
    }

    function updateServiceResults() {
      const searchTerm = normalise(serviceSearch?.value);
      let visibleCount = 0;

      serviceCards.forEach((card) => {
        const category = normalise(card.dataset.category);

        const searchableText = normalise([
          card.dataset.search || "",
          card.querySelector("h3")?.textContent || "",
          card.textContent || ""
        ].join(" "));

        const matchesCategory =
          activeFilter === "all" ||
          category === activeFilter;

        const matchesSearch =
          !searchTerm ||
          searchableText.includes(searchTerm);

        const isVisible =
          matchesCategory && matchesSearch;

        card.style.display = isVisible ? "" : "none";

        card.setAttribute(
          "aria-hidden",
          String(!isVisible)
        );

        if (isVisible) visibleCount++;
      });

      if (filterStatus) {
        if (searchTerm) {
          filterStatus.textContent =
            `${visibleCount} service${visibleCount === 1 ? "" : "s"} found`;
        } else if (activeFilter === "all") {
          filterStatus.textContent =
            `Showing all ${visibleCount} services`;
        } else {
          const activeButton = filterButtons.find(
            (button) =>
              button.dataset.filter === activeFilter
          );

          const label = activeButton
            ? activeButton.textContent.trim()
            : "selected";

          filterStatus.textContent =
            `Showing ${visibleCount} ${label.toLowerCase()} service${visibleCount === 1 ? "" : "s"}`;
        }
      }

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";

        filterButtons.forEach((item) => {
          const isActive = item === button;

          item.classList.toggle("active", isActive);
          item.setAttribute(
            "aria-pressed",
            String(isActive)
          );
        });

        updateServiceResults();
      });
    });

    serviceSearch?.addEventListener(
      "input",
      updateServiceResults
    );

    resetFilters?.addEventListener("click", () => {
      activeFilter = "all";

      if (serviceSearch) {
        serviceSearch.value = "";
      }

      filterButtons.forEach((button) => {
        const isActive =
          button.dataset.filter === "all";

        button.classList.toggle("active", isActive);
        button.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      updateServiceResults();
      serviceSearch?.focus();
    });

    updateServiceResults();


    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements =
      document.querySelectorAll(".reveal");

    if (
      "IntersectionObserver" in window &&
      !reduceMotion
    ) {
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
          `${(index % 4) * 70}ms`;

        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
    }


    // ==========================================
    // TESTIMONIAL SWIPER
    // ==========================================

    const reviewSlider =
      document.querySelector(".clientReviewSwiper");

    if (
      reviewSlider &&
      typeof window.Swiper === "function"
    ) {
      const pagination =
        reviewSlider.querySelector(".client-pagination");

      const nextButton =
        reviewSlider.querySelector(".client-next");

      const prevButton =
        reviewSlider.querySelector(".client-prev");

      const slideCount =
        reviewSlider.querySelectorAll(".swiper-slide").length;

      if (slideCount > 0) {
        new window.Swiper(reviewSlider, {
          slidesPerView: 1,
          spaceBetween: 22,
          speed: reduceMotion ? 0 : 650,
          loop: slideCount > 3,
          grabCursor: true,
          watchOverflow: true,

          autoplay: reduceMotion ? false : {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },

          navigation: {
            nextEl: nextButton,
            prevEl: prevButton
          },

          pagination: pagination ? {
            el: pagination,
            clickable: true
          } : false,

          keyboard: {
            enabled: true,
            onlyInViewport: true
          },

          breakpoints: {
            600: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            950: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }
        });
      }
    }


    // ==========================================
    // BACK TO TOP + FOOTER TOP LINK
    // ==========================================

    function scrollToTop(event) {
      event?.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    }

    backToTop?.addEventListener("click", scrollToTop);

    document.querySelectorAll(
      ".footer-top, .back-to-top:not(button)"
    ).forEach((link) => {
      link.addEventListener("click", scrollToTop);
    });


    // ==========================================
    // SMOOTH INTERNAL ANCHOR LINKS
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        // Let the dropdown trigger handler manage itself.
        if (
          servicesDropdown &&
          servicesDropdown.contains(link)
        ) {
          return;
        }

        let target;

        try {
          target = document.querySelector(href);
        } catch {
          return;
        }

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });
      });
    });


    // ==========================================
    // EXTERNAL LINK SECURITY
    // ==========================================

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });


    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================

    const counters =
      document.querySelectorAll(".counter[data-target]");

    function animateCounter(counter) {
      if (counter.dataset.animated === "true") return;

      const target = Number(counter.dataset.target);

      if (!Number.isFinite(target)) return;

      counter.dataset.animated = "true";

      const prefix = counter.dataset.prefix || "";
      const suffix = counter.dataset.suffix || "";

      if (reduceMotion) {
        counter.textContent =
          `${prefix}${target.toLocaleString()}${suffix}`;
        return;
      }

      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(now) {
        const progress = Math.min(
          (now - startTime) / duration,
          1
        );

        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        counter.textContent =
          `${prefix}${current.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent =
            `${prefix}${target.toLocaleString()}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );

      counters.forEach((counter) => {
        counterObserver.observe(counter);
      });
    } else {
      counters.forEach(animateCounter);
    }


    // ==========================================
    // READY
    // ==========================================

    document.documentElement.classList.add("js-ready");

    console.info(
      "Pihu Creators Services page initialized successfully."
    );

  });
})();
