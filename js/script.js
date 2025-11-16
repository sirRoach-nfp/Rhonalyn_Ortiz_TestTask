document.addEventListener('DOMContentLoaded', function () {
    // insert current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    navToggle && navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // smooth scroll for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // collapse mobile nav after click
                if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
            }
        });
    });

    

    // IntersectionObserver for fade-in sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
            if (ent.isIntersecting) {
                ent.target.classList.add('visible');
                // optionally unobserve after visible
                observer.unobserve(ent.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // highlight nav based on scroll (basic)
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            const id = e.target.id;
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (e.isIntersecting) {
                navLinks.forEach(n => n.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => highlightObserver.observe(s));

    /* -------------------------
       Form validation & submit
       ------------------------- */
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');

    function showError(id, message) {
        const el = document.getElementById('err-' + id);
        if (el) el.textContent = message;
    }
    function clearErrors() {
        ['name', 'email', 'phone', 'message'].forEach(k => showError(k, ''));
    }

    function isValidEmail(email) {
        // simple regex for demo purposes
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();
        statusEl.textContent = '';

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();

        let hasError = false;
        if (name.length < 2) { showError('name', 'Please enter your name'); hasError = true; }
        if (!isValidEmail(email)) { showError('email', 'Please enter a valid email'); hasError = true; }
        if (phone.length < 6) { showError('phone', 'Please enter a valid phone number'); hasError = true; }
        if (message.length < 8) { showError('message', 'Please add a short message'); hasError = true; }

        if (hasError) return;

        // simulate sending (no backend) — this is where you'd call your API
        statusEl.textContent = 'Sending...';
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        setTimeout(() => {
            statusEl.textContent = 'Thanks! Your request has been received. We will contact you shortly.';
            form.reset();
            submitBtn.disabled = false;
        }, 900); // simulated delay
    });

});
