document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LIVE DATE AND TIME UPDATER ---
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dateTimeString = now.toLocaleDateString('en-ZA', options);
        const dateElements = document.querySelectorAll('.live-date-time');
        dateElements.forEach(el => { el.textContent = "Today is " + dateTimeString; });
    }
    setInterval(updateDateTime, 1000); 
    updateDateTime();

    // --- 2. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) { el.classList.add('active'); }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 3. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById("backToTop");
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            if(backToTopBtn) backToTopBtn.style.display = "block";
        } else {
            if(backToTopBtn) backToTopBtn.style.display = "none";
        }
        revealOnScroll();
    };
    if(backToTopBtn) {
        backToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // --- 4. FORM VALIDATION & EMAIL SENDING ---
    function handleFormSubmit(form, name, email, message, successMsg) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            let isValid = true;
            form.querySelectorAll('.error').forEach(err => err.style.display = 'none');
            successMsg.style.display = 'none';
            successMsg.style.backgroundColor = "#D4EDDA";
            successMsg.style.color = "#155724";

            if (name.value.trim() === "") { name.nextElementSibling.style.display = 'block'; isValid = false; }
            if (email.value.trim() === "" || !email.value.includes("@")) { email.nextElementSibling.style.display = 'block'; isValid = false; }
            if (message.value.trim() === "") { message.nextElementSibling.style.display = 'block'; isValid = false; }

            if (isValid) {
                try {
                    const response = await fetch("https://formspree.io/f/xyyqkdpw", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
                    });
                    if (response.ok) {
                        successMsg.textContent = "Success! Your information has been submitted. We will contact you soon.";
                        successMsg.style.display = 'block';
                        form.reset();
                    } else { throw new Error("Server error"); }
                } catch (error) {
                    successMsg.textContent = "Oops! There was a problem submitting your form. Please try again.";
                    successMsg.style.backgroundColor = "#f8d7da";
                    successMsg.style.color = "#721c24";
                    successMsg.style.display = 'block';
                }
            }
        });
    }

    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) { handleFormSubmit(enquiryForm, document.getElementById("enqName"), document.getElementById("enqEmail"), document.getElementById("enqMessage"), document.getElementById("enqSuccess")); }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) { handleFormSubmit(contactForm, document.getElementById("conName"), document.getElementById("conEmail"), document.getElementById("conMessage"), document.getElementById("conSuccess")); }
});

// --- 5. DYNAMIC SEARCH ---
function filterServices() {
    const input = document.getElementById("searchInput");
    if (!input) return;
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(filter) ? "block" : "none";
    });
}

// --- 6. LIGHTBOX GALLERY ---
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightboxImg.src = src;
    }
}
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
}