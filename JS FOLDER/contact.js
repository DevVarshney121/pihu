
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. ELEMENTS
  // ==========================================
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const servicesDropdown = document.getElementById("servicesDropdown");
  const dropdownToggle = servicesDropdown?.querySelector(".dropdown-toggle");
  const servicesMenu = document.getElementById("servicesMenu");

  const scrollProgressBar = document.getElementById("scrollProgressBar");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  const contactForm = document.getElementById("contactForm");
  const detailsInput = document.getElementById("details");
  const charCount = document.getElementById("charCount");
  const formStatus = document.getElementById("formStatus");

  const projectAmount = document.getElementById("projectAmount");
  const displayTotal = document.getElementById("displayTotal");
  const displayAdvance = document.getElementById("displayAdvance");
  const displayBalance = document.getElementById("displayBalance");
  const payAdvanceBtn = document.getElementById("payAdvanceBtn");
  const paymentStatus = document.getElementById("paymentStatus");

  const paymentMethods = document.querySelectorAll(".payment-method");

  // ==========================================
  // 2. CURRENT YEAR
  // ==========================================
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. MOBILE NAVIGATION
  // ==========================================
  function closeServicesDropdown() {
    if (dropdownToggle && servicesMenu) {
      dropdownToggle.setAttribute("aria-expanded", "false");
      servicesMenu.classList.remove("show");
    }

    servicesDropdown?.classList.remove("open");
  }

  function closeMobileMenu() {
    navLinks?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");

    const menuIcon = menuToggle?.querySelector("i");

    if (menuIcon) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }

    closeServicesDropdown();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      const menuIcon = menuToggle.querySelector("i");

      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars", !isOpen);
        menuIcon.classList.toggle("fa-xmark", isOpen);
      }

      if (!isOpen) {
        closeServicesDropdown();
      }
    });
  }

  // Close mobile menu after clicking a normal navigation link.
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.closest(".nav-dropdown")) {
        closeMobileMenu();
      }
    });
  });

  // ==========================================
  // 4. SERVICES DROPDOWN
  // ==========================================
  if (dropdownToggle && servicesMenu) {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen =
        dropdownToggle.getAttribute("aria-expanded") === "true";

      dropdownToggle.setAttribute("aria-expanded", String(!isOpen));
      servicesMenu.classList.toggle("show", !isOpen);
      servicesDropdown?.classList.toggle("open", !isOpen);
    });

    servicesMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        servicesDropdown &&
        !servicesDropdown.contains(event.target)
      ) {
        closeServicesDropdown();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeServicesDropdown();
      }
    });
  }

  // Close navigation when clicking outside it on mobile.
  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 900 &&
      navLinks?.classList.contains("active") &&
      !header?.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Reset mobile menu when switching to desktop layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  // ==========================================
  // 5. SCROLL PROGRESS + HEADER
  // ==========================================
  let scrollTicking = false;

  function updateScrollElements() {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
        : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 400);
    }

    scrollTicking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollElements);
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  updateScrollElements();

  // ==========================================
  // 6. BACK TO TOP
  // ==========================================
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ==========================================
  // 7. TEXTAREA CHARACTER COUNTER
  // ==========================================
  function updateCharacterCount() {
    if (!detailsInput || !charCount) return;

    charCount.textContent = detailsInput.value.length;

    const hint = charCount.parentElement;

    if (hint) {
      hint.classList.toggle(
        "limit-near",
        detailsInput.value.length >= 2300
      );
    }
  }

  detailsInput?.addEventListener("input", updateCharacterCount);
  updateCharacterCount();

  // ==========================================
  // 8. CONTACT FORM -> WHATSAPP
  // ==========================================
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const budget = String(formData.get("budget") || "Need a quote").trim();
    const deadline = String(formData.get("deadline") || "Flexible").trim();
    const details = String(formData.get("details") || "").trim();

    if (details.length < 10) {
      if (formStatus) {
        formStatus.textContent =
          "Please enter at least 10 characters in project details.";
        formStatus.classList.add("error");
      }

      detailsInput?.focus();
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Opening WhatsApp with your inquiry...";
      formStatus.classList.remove("error", "success");
    }

    const message = [
      "Hello Pihu Creators! 👋",
      "",
      "I would like to discuss a project.",
      "",
      "PROJECT INQUIRY",
      "-------------------------",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || "Not provided"}`,
      `Service Required: ${service}`,
      `Estimated Budget: ${budget}`,
      `Preferred Timeline: ${deadline}`,
      "",
      "Project Details:",
      details,
      "",
      "I understand that the quotation, scope and payment terms will be confirmed before work begins."
    ].join("\n");

    const whatsappNumber = "919310688455";

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp only after the user submits the form.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (whatsappWindow) {
      if (formStatus) {
        formStatus.textContent =
          "WhatsApp opened. Please review and send your inquiry there.";
        formStatus.classList.add("success");
      }
    } else {
      // Fallback if the browser blocks the new window.
      if (formStatus) {
        formStatus.textContent =
          "If WhatsApp did not open, use the button below to continue.";
        formStatus.classList.add("error");
      }

      let fallbackLink = document.getElementById("whatsappFallback");

      if (!fallbackLink) {
        fallbackLink = document.createElement("a");
        fallbackLink.id = "whatsappFallback";
        fallbackLink.className = "button button-secondary";
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        fallbackLink.textContent = "Continue to WhatsApp";
        fallbackLink.style.marginTop = "12px";

        formStatus?.insertAdjacentElement("afterend", fallbackLink);
      }

      fallbackLink.href = whatsappURL;
      fallbackLink.hidden = false;
    }
  });

  // ==========================================
  // 9. PAYMENT METHOD SELECTION
  // ==========================================
  const paymentMessages = {
    upi:
      "UPI selected. Contact Pihu Creators to confirm the verified UPI ID and exact amount.",
    online:
      "Online payment selected. Request an official payment link after approving your quotation.",
    bank:
      "Bank transfer selected. Request verified account details directly from Pihu Creators."
  };

  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      paymentMethods.forEach((item) => {
        const isActive = item === method;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      const selectedMethod = method.dataset.paymentMethod;

      if (paymentStatus) {
        paymentStatus.textContent =
          paymentMessages[selectedMethod] ||
          "Please contact Pihu Creators to confirm payment details.";
        paymentStatus.classList.remove("error");
      }
    });
  });

  // ==========================================
  // 10. ADVANCE CALCULATOR
  // ==========================================
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  });

  function formatCurrency(amount) {
    return currencyFormatter.format(amount);
  }

  function updatePaymentCalculator() {
    if (
      !projectAmount ||
      !displayTotal ||
      !displayAdvance ||
      !displayBalance
    ) {
      return;
    }

    const rawValue = projectAmount.value.trim();
    const amount = Number(rawValue);

    const valid =
      rawValue !== "" &&
      Number.isFinite(amount) &&
      amount >= 1 &&
      amount <= 100000000;

    if (!valid) {
      displayTotal.textContent = "₹0";
      displayAdvance.textContent = "₹0";
      displayBalance.textContent = "₹0";
      return;
    }

    const advance = amount * 0.5;
    const balance = amount - advance;

    displayTotal.textContent = formatCurrency(amount);
    displayAdvance.textContent = formatCurrency(advance);
    displayBalance.textContent = formatCurrency(balance);
  }

  projectAmount?.addEventListener("input", updatePaymentCalculator);

  updatePaymentCalculator();

  // ==========================================
  // 11. REQUEST PAYMENT DETAILS ON WHATSAPP
  // ==========================================
  payAdvanceBtn?.addEventListener("click", () => {
    const rawValue = projectAmount?.value.trim() || "";
    const amount = Number(rawValue);

    if (
      rawValue === "" ||
      !Number.isFinite(amount) ||
      amount < 1 ||
      amount > 100000000
    ) {
      if (paymentStatus) {
        paymentStatus.textContent =
          "Please enter a valid project price between ₹1 and ₹10,00,00,000.";
        paymentStatus.classList.add("error");
      }

      projectAmount?.focus();
      return;
    }

    const advance = amount * 0.5;
    const balance = amount - advance;

    const activeMethod = document.querySelector(
      ".payment-method.active"
    );

    const methodName = {
      upi: "UPI Payment",
      online: "Secure Online Payment",
      bank: "Bank Transfer"
    };

    const selectedMethod =
      activeMethod?.dataset.paymentMethod || "upi";

    const message = [
      "Hello Pihu Creators! 👋",
      "",
      "I would like to request payment details for my project.",
      "",
      `Total Project Price: ${formatCurrency(amount)}`,
      `Estimated 50% Advance: ${formatCurrency(advance)}`,
      `Remaining Balance: ${formatCurrency(balance)}`,
      `Preferred Payment Method: ${methodName[selectedMethod] || "UPI Payment"}`,
      "",
      "Please confirm the quotation, payment recipient and payment details before I proceed."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/919310688455?text=${encodeURIComponent(message)}`;

    if (paymentStatus) {
      paymentStatus.textContent =
        "Opening WhatsApp to request verified payment details...";
      paymentStatus.classList.remove("error");
    }

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow && paymentStatus) {
      paymentStatus.textContent =
        "WhatsApp may have been blocked. Open WhatsApp using the contact button and request your payment details.";
      paymentStatus.classList.add("error");
    }
  });

  // ==========================================
  // 12. REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
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
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ==========================================
  // 13. SMOOTH SCROLL FOR INTERNAL LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    });
  });

  // ==========================================
  // 14. REDUCED MOTION ACCESSIBILITY
  // ==========================================
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.documentElement.classList.add("reduce-motion");
  }
});
