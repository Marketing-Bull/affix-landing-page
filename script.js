// Simple Lead Capture Form
document.addEventListener('DOMContentLoaded', function() {

    // Form submission
    const form = document.getElementById('leadCaptureForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });

            if (!isValid) {
                e.preventDefault();

                // Show error message
                let errorMsg = form.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please fill in all required fields';
                    form.insertBefore(errorMsg, form.firstChild);

                    setTimeout(() => errorMsg.remove(), 3000);
                }

                return false;
            }

            // Form will submit to FormSubmit, which will redirect to Unlock
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion functionality (if needed in future)
    const faqItems = document.querySelectorAll('.faq-item h4');
    faqItems.forEach(question => {
        question.style.cursor = 'pointer';
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            // Close all answers
            document.querySelectorAll('.faq-item p').forEach(p => {
                p.style.display = 'none';
            });

            // Toggle current answer
            if (!isOpen) {
                answer.style.display = 'block';
            }
        });
    });

    // Initialize FAQ - show all answers by default
    document.querySelectorAll('.faq-item p').forEach(p => {
        p.style.display = 'block';
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }

    // Track CTA clicks (basic event tracking)
    document.querySelectorAll('.main-btn, .nav-cta').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('CTA Clicked:', buttonText);
            // Add analytics tracking here when ready
        });
    });

});
