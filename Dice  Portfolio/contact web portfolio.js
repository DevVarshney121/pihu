/* =====================================================
   CONTACT PAGE JS
   WhatsApp Contact Form
===================================================== */


/* =====================================================
   SELECTORS
===================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);


const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];



/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = $("#menuBtn");
const nav = $("#nav");


menuBtn?.addEventListener("click", () => {

    const isOpen =
        nav?.classList.toggle("open");


    menuBtn.classList.toggle(
        "active",
        isOpen
    );


    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

$$("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav?.classList.remove("open");

        menuBtn?.classList.remove("active");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});



/* =====================================================
   NAVBAR SCROLL
===================================================== */

const navbar = $(".navbar");


function updateNavbar() {

    navbar?.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();



/* =====================================================
   FORM SELECTORS
===================================================== */

const form = $("#contactForm");

const nameInput = $("#name");

const emailInput = $("#email");

const subjectInput = $("#subject");

const messageInput = $("#message");

const submitBtn = $("#submitBtn");

const formStatus = $("#formStatus");

const charCount = $("#charCount");



/* =====================================================
   CHARACTER COUNTER
===================================================== */

messageInput?.addEventListener(
    "input",
    () => {

        const length =
            messageInput.value.length;


        if (charCount) {

            charCount.textContent =
                `${length} / 1000`;

        }

    }
);



/* =====================================================
   ERROR HANDLING
===================================================== */

function showError(input, message) {

    if (!input) return;


    const group =
        input.closest(".input-group");


    if (!group) return;


    const error =
        $(".error", group);


    if (error) {

        error.textContent =
            message;

    }


    input.classList.add("invalid");

}



function clearError(input) {

    if (!input) return;


    const group =
        input.closest(".input-group");


    if (!group) return;


    const error =
        $(".error", group);


    if (error) {

        error.textContent = "";

    }


    input.classList.remove("invalid");

}



/* =====================================================
   VALIDATE NAME
===================================================== */

function validateName() {

    if (!nameInput) return false;


    const value =
        nameInput.value.trim();


    if (!value) {

        showError(
            nameInput,
            "Please enter your name."
        );

        return false;

    }


    if (value.length < 2) {

        showError(
            nameInput,
            "Name must contain at least 2 characters."
        );

        return false;

    }


    clearError(nameInput);

    return true;

}



/* =====================================================
   VALIDATE EMAIL
===================================================== */

function validateEmail() {

    if (!emailInput) return false;


    const value =
        emailInput.value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!value) {

        showError(
            emailInput,
            "Please enter your email."
        );

        return false;

    }


    if (!emailPattern.test(value)) {

        showError(
            emailInput,
            "Please enter a valid email."
        );

        return false;

    }


    clearError(emailInput);

    return true;

}



/* =====================================================
   VALIDATE SUBJECT
===================================================== */

function validateSubject() {

    if (!subjectInput) return false;


    const value =
        subjectInput.value.trim();


    if (!value) {

        showError(
            subjectInput,
            "Please enter a subject."
        );

        return false;

    }


    clearError(subjectInput);

    return true;

}



/* =====================================================
   VALIDATE MESSAGE
===================================================== */

function validateMessage() {

    if (!messageInput) return false;


    const value =
        messageInput.value.trim();


    if (!value) {

        showError(
            messageInput,
            "Please enter your message."
        );

        return false;

    }


    if (value.length < 10) {

        showError(
            messageInput,
            "Message should contain at least 10 characters."
        );

        return false;

    }


    clearError(messageInput);

    return true;

}



/* =====================================================
   LIVE VALIDATION
===================================================== */

nameInput?.addEventListener(
    "blur",
    validateName
);


emailInput?.addEventListener(
    "blur",
    validateEmail
);


subjectInput?.addEventListener(
    "blur",
    validateSubject
);


messageInput?.addEventListener(
    "blur",
    validateMessage
);



/* =====================================================
   WHATSAPP NUMBER
===================================================== */

/*
   Country code +91
   WhatsApp number:
   9310688455

   No +, spaces or dashes.
*/

const whatsappNumber =
    "919310688455";



/* =====================================================
   FORM SUBMIT → WHATSAPP
===================================================== */

form?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        /* =============================================
           VALIDATE FORM
        ============================================= */

        const validName =
            validateName();


        const validEmail =
            validateEmail();


        const validSubject =
            validateSubject();


        const validMessage =
            validateMessage();


        if (
            !validName ||
            !validEmail ||
            !validSubject ||
            !validMessage
        ) {

            if (formStatus) {

                formStatus.textContent =
                    "Please fix the highlighted fields.";

                formStatus.className =
                    "form-status error-message";

            }

            return;

        }



        /* =============================================
           GET FORM VALUES
        ============================================= */

        const name =
            nameInput.value.trim();


        const email =
            emailInput.value.trim();


        const subject =
            subjectInput.value.trim();


        const message =
            messageInput.value.trim();



        /* =============================================
           WHATSAPP MESSAGE
        ============================================= */

        const whatsappMessage =
`Hello Priyanshi,

I would like to get in touch with you.

Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}

Thank you.`;



        /* =============================================
           ENCODE MESSAGE
        ============================================= */

        const encodedMessage =
            encodeURIComponent(
                whatsappMessage
            );



        /* =============================================
           WHATSAPP URL
        ============================================= */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;



        /* =============================================
           BUTTON LOADING
        ============================================= */

        submitBtn?.classList.add("loading");


        if (submitBtn) {

            submitBtn.disabled = true;


            submitBtn.innerHTML = `
                <span>Opening WhatsApp...</span>
                <i class="fa-brands fa-whatsapp"></i>
            `;

        }



        /* =============================================
           STATUS
        ============================================= */

        if (formStatus) {

            formStatus.textContent =
                "Opening WhatsApp...";

            formStatus.className =
                "form-status success";

        }



        /* =============================================
           OPEN WHATSAPP
        ============================================= */

        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );


            /* =========================================
               RESET FORM
            ========================================= */

            form.reset();


            if (charCount) {

                charCount.textContent =
                    "0 / 1000";

            }



            /* =========================================
               RESET BUTTON
            ========================================= */

            if (submitBtn) {

                submitBtn.classList.remove(
                    "loading"
                );


                submitBtn.disabled = false;


                submitBtn.innerHTML = `
                    <span>Send on WhatsApp</span>
                    <i class="fa-brands fa-whatsapp"></i>
                `;

            }

        }, 500);

    }
);



/* =====================================================
   CURRENT YEAR
===================================================== */

$$("[data-year]").forEach(element => {

    element.textContent =
        new Date().getFullYear();

});



/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            nav?.classList.remove("open");

            menuBtn?.classList.remove(
                "active"
            );

            menuBtn?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);