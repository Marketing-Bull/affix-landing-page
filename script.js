// Multi-Step Form Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Form step navigation
    const form = document.getElementById('eligibilityForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 1;

    // Show specific step
    function showStep(stepNumber) {
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            progressSteps[index].classList.remove('active');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
                progressSteps[index].classList.add('active');
            } else if (index + 1 < stepNumber) {
                progressSteps[index].classList.add('completed');
            } else {
                progressSteps[index].classList.remove('completed');
            }
        });
        currentStep = stepNumber;

        // Scroll to form
        document.getElementById('apply').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Validate current step
    function validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
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
            // Show error message
            let errorMsg = currentStepElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields';
                currentStepElement.insertBefore(errorMsg, currentStepElement.firstChild);

                setTimeout(() => errorMsg.remove(), 3000);
            }
        }

        return isValid;
    }

    // Next button click handlers
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < formSteps.length) {
                    showStep(currentStep + 1);
                }
            }
        });
    });

    // Previous button click handlers
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateStep(currentStep)) {
                e.preventDefault();
                return false;
            }
            // Form will submit naturally to FormSubmit.co
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
