document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    // --- Navigation Toggle ---
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', navList.classList.contains('nav-open'));
        });

        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // --- Image Slider (Carousel) ---
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (sliderTrack && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        const slideWidth = slides[0].clientWidth;
        let autoSlideInterval;

        const updateSliderPosition = () => {
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            updateDots();
        };

        const updateDots = () => {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;
            updateSliderPosition();
        };

        const showNextSlide = () => {
            goToSlide(currentIndex + 1);
        };

        const showPrevSlide = () => {
            goToSlide(currentIndex - 1);
        };

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);

        // Auto-slide functionality
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(showNextSlide, 2500);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        // Pause auto-slide on hover
        sliderTrack.addEventListener('mouseenter', stopAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);

        // Initialize
        updateSliderPosition();
        startAutoSlide();

        // Handle window resize to adjust slide position
        window.addEventListener('resize', () => {
            // Recalculate slideWidth on resize to ensure correct positioning
            const newSlideWidth = slides[0].clientWidth;
            sliderTrack.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
        });
    }


    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Basic Form Validation ---

    // Login Form Validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            const usernameInput = loginForm.querySelector('#username');
            const passwordInput = loginForm.querySelector('#password');
            let isValid = true;

            // Clear previous errors
            clearError(usernameInput);
            clearError(passwordInput);

            if (usernameInput.value.trim() === '') {
                showError(usernameInput, 'Username or Email is required.');
                isValid = false;
            }
            if (passwordInput.value.trim() === '') {
                showError(passwordInput, 'Password is required.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission
            } else {
                alert('Login form submitted successfully (client-side validation passed)!');
                // In a real application, you'd send data to a server here.
            }
        });
    }

    // Signup Form Validation
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            const usernameInput = signupForm.querySelector('#new-username');
            const emailInput = signupForm.querySelector('#new-email');
            const passwordInput = signupForm.querySelector('#new-password');
            const confirmPasswordInput = signupForm.querySelector('#confirm-password');
            let isValid = true;

            // Clear previous errors
            clearError(usernameInput);
            clearError(emailInput);
            clearError(passwordInput);
            clearError(confirmPasswordInput);

            if (usernameInput.value.trim() === '') {
                showError(usernameInput, 'Username is required.');
                isValid = false;
            }
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }
            if (passwordInput.value.trim() === '') {
                showError(passwordInput, 'Password is required.');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters long.');
                isValid = false;
            }
            if (confirmPasswordInput.value.trim() === '') {
                showError(confirmPasswordInput, 'Please confirm your password.');
                isValid = false;
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'Passwords do not match.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission
            } else {
                alert('Signup form submitted successfully (client-side validation passed)!');
                // In a real application, you'd send data to a server here.
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorText = formGroup.querySelector('.error-message');
        if (!errorText) {
            errorText = document.createElement('div');
            errorText.classList.add('error-message');
            formGroup.appendChild(errorText);
        }
        errorText.textContent = message;
        input.classList.add('invalid');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorText = formGroup.querySelector('.error-message');
        if (errorText) {
            errorText.remove();
        }
        input.classList.remove('invalid');
    }

    function isValidEmail(email) {
        // Basic regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});