/* =========================================================
   PORTFOLIO — CLEAN & CORRECT INTERACTION JS
========================================================= */


/* =========================================================
   SELECTORS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
    initNavbar();
    initBackToTop();
    initScrollReveal();
    initActiveNavigation();
    initSmoothNavigation();
    initCursorGlow();
    initProfileTilt();
    initProjectCards();
    initScrollProgress();
    initProjectKeyboard();
    initButtonRipple();
    initLazyImages();
    initActiveYear();
    initPageVisibility();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

    const loader = $(".page-loader");

    if (!loader) return;

    const hideLoader = () => {

        setTimeout(() => {

            loader.classList.add("hide");
            document.body.classList.add("loaded");

        }, 600);

    };

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn = $("#menuBtn");
    const nav = $("nav");

    if (!menuBtn || !nav) return;

    const closeMenu = () => {

        nav.classList.remove("open");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };


    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );


    menuBtn.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        menuBtn.classList.toggle(
            "active",
            isOpen
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    $$("nav a").forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function initNavbar() {

    const navbar = $(".navbar");

    if (!navbar) return;

    const updateNavbar = () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const backTop = $("#backTop");

    if (!backTop) return;

    const updateButton = () => {

        backTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    };

    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

    updateButton();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements = $$(
        ".reveal, " +
        ".skill-card, " +
        ".service-card, " +
        ".project-card, " +
        ".about-content, " +
        ".section-title"
    );

    if (!elements.length) return;


    elements.forEach((element, index) => {

        element.style.transitionDelay =
            `${(index % 6) * 80}ms`;

    });


    /* Fallback if IntersectionObserver
       is not supported */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    elements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        $$("section[id]");

    const navLinks =
        $$("nav a[href^='#']");

    if (!sections.length || !navLinks.length)
        return;


    const setActiveLink = id => {

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${id}`
            );

        });

    };


    if (!("IntersectionObserver" in window)) {
        return;
    }


    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    setActiveLink(
                        entry.target.id
                    );

                });

            },

            {
                rootMargin:
                    "-30% 0px -60% 0px",
                threshold: 0
            }

        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    $$("a[href^='#']").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.getElementById(
                        targetId.substring(1)
                    );

                if (!target) return;


                event.preventDefault();


                const navbar =
                    $(".navbar");

                const navHeight =
                    navbar?.offsetHeight || 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navHeight -
                    10;


                window.scrollTo({

                    top: Math.max(
                        targetPosition,
                        0
                    ),

                    behavior: "smooth"

                });


                /* Update URL without reload */

                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });

}


/* =========================================================
   CURSOR GLOW
========================================================= */

function initCursorGlow() {

    const glow =
        $(".cursor-glow");

    if (!glow) return;


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !finePointer ||
        reducedMotion
    ) {

        glow.style.display = "none";
        return;

    }


    let mouseX = -100;
    let mouseY = -100;

    let currentX = mouseX;
    let currentY = mouseY;


    window.addEventListener(
        "pointermove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );


    const animateGlow = () => {

        currentX +=
            (mouseX - currentX) * 0.12;

        currentY +=
            (mouseY - currentY) * 0.12;


        glow.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;


        requestAnimationFrame(
            animateGlow
        );

    };


    animateGlow();

}


/* =========================================================
   PROFILE 3D TILT
========================================================= */

function initProfileTilt() {

    const profile =
        $(".profile-card");

    if (!profile) return;


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !finePointer ||
        reducedMotion
    ) {
        return;
    }


    profile.addEventListener(
        "pointermove",
        event => {

            const rect =
                profile.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;


            const y =
                (event.clientY - rect.top) /
                rect.height;


            const rotateX =
                (0.5 - y) * 8;


            const rotateY =
                (x - 0.5) * 10;


            profile.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        }
    );


    profile.addEventListener(
        "pointerleave",
        () => {

            profile.style.transform = "";

        }
    );

}


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

function initProjectCards() {

    const cards =
        $$(".project-card");

    if (!cards.length) return;


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !finePointer ||
        reducedMotion
    ) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    let progress =
        $(".scroll-progress");


    if (!progress) {

        progress =
            document.createElement("div");

        progress.className =
            "scroll-progress";

        document.body.appendChild(
            progress
        );

    }


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const windowHeight =
            window.innerHeight;


        const scrollable =
            documentHeight -
            windowHeight;


        const percentage =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;


        progress.style.width =
            `${Math.min(
                Math.max(percentage, 0),
                100
            )}%`;

    };


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateProgress,
        { passive: true }
    );


    updateProgress();

}


/* =========================================================
   PROJECT KEYBOARD SUPPORT
========================================================= */

function initProjectKeyboard() {

    $$(".project-card a").forEach(link => {

        link.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    link.click();

                }

            }
        );

    });

}


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

function initButtonRipple() {

    const buttons =
        $$(
            ".btn, " +
            ".button, " +
            ".contact-btn, " +
            ".primary-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "ripple";


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                ripple.style.left =
                    `${x}px`;


                ripple.style.top =
                    `${y}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}


/* =========================================================
   IMAGE LAZY LOADING
========================================================= */

function initLazyImages() {

    $$("img").forEach(image => {

        /* Don't force lazy loading
           on images that already have
           loading preference */

        if (
            image.hasAttribute("loading")
        ) {
            return;
        }


        image.setAttribute(
            "loading",
            "lazy"
        );

    });

}


/* =========================================================
   ACTIVE YEAR
========================================================= */

function initActiveYear() {

    const year =
        new Date().getFullYear();


    $$("[data-year]").forEach(
        element => {

            element.textContent =
                year;

        }
    );

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

function initPageVisibility() {

    const updateVisibility = () => {

        document.body.classList.toggle(
            "page-active",
            document.visibilityState ===
            "visible"
        );

    };


    document.addEventListener(
        "visibilitychange",
        updateVisibility
    );


    updateVisibility();

}


/* =========================================================
   REDUCED MOTION
========================================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document.documentElement.style
        .scrollBehavior = "auto";

}

/* =========================================
   PIHU CREATORS — LIVE WEBSITE JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const liveCard = document.querySelector(".live-site-card");

    if (!liveCard) return;


    /* =====================================
       IMAGE LOAD EFFECT
    ===================================== */

    const previewImage =
        liveCard.querySelector(".live-site-preview img");

    if (previewImage) {

        previewImage.addEventListener("load", () => {
            liveCard.classList.add("image-loaded");
        });

    }


    /* =====================================
       MOUSE MOVEMENT EFFECT
    ===================================== */

    liveCard.addEventListener("mousemove", (event) => {

        const rect = liveCard.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        liveCard.style.transform =
            `translateY(-8px) rotateX(${y * -1.5}deg) rotateY(${x * 1.5}deg)`;

    });


    /* =====================================
       RESET CARD
    ===================================== */

    liveCard.addEventListener("mouseleave", () => {

        liveCard.style.transform =
            "translateY(0) rotateX(0) rotateY(0)";

    });


});