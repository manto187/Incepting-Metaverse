 document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnIcon = document.getElementById('btnIcon');
            const successMessage = document.getElementById('successMessage');
            
            // Form validation
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset errors
                document.querySelectorAll('.error-message').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.form-input').forEach(el => {
                    el.classList.remove('error');
                });
                
                // Validate form
                let isValid = true;
                
                // Name validation
                const name = document.getElementById('name');
                if (!name.value.trim()) {
                    document.getElementById('nameError').style.display = 'block';
                    name.classList.add('error');
                    isValid = false;
                }
                
                // Email validation
                const email = document.getElementById('email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    document.getElementById('emailError').style.display = 'block';
                    email.classList.add('error');
                    isValid = false;
                }
                
                // Subject validation
                const subject = document.getElementById('subject');
                if (!subject.value.trim()) {
                    document.getElementById('subjectError').style.display = 'block';
                    subject.classList.add('error');
                    isValid = false;
                }
                
                // Message validation
                const message = document.getElementById('message');
                if (!message.value.trim()) {
                    document.getElementById('messageError').style.display = 'block';
                    message.classList.add('error');
                    isValid = false;
                }
                
                // If form is valid, submit (simulated here)
                if (isValid) {
                    // Change button state
                    submitBtn.disabled = true;
                    btnText.textContent = 'Sending...';
                    btnIcon.className = 'fas fa-spinner fa-spin';
                    
                    // Simulate API call with timeout
                    setTimeout(() => {
                        // Show success message
                        successMessage.style.display = 'block';
                        
                        // Reset button state
                        setTimeout(() => {
                            btnText.textContent = 'Message Sent!';
                            btnIcon.className = 'fas fa-check';
                        }, 500);
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                            
                            // Reset button after delay
                            setTimeout(() => {
                                btnText.textContent = 'Send Message';
                                btnIcon.className = 'fas fa-paper-plane';
                                submitBtn.disabled = false;
                            }, 1000);
                        }, 5000);
                    }, 1500);
                }
            });
            
            // Animate elements when they come into view
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.option-card, .form-container');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.style.animationPlayState = 'running';
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load

            // Dark mode toggle
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;

            // Check for saved user preference, if any
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme) {
                body.classList.add(currentTheme);
                updateIcon();
            }

            // Toggle theme on button click
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
                localStorage.setItem('theme', theme);
                updateIcon();
            });

            function updateIcon() {
                if (body.classList.contains('dark-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }

            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });

            // Search functionality
            const searchBar = document.querySelector('.search-bar');
            const searchResults = document.querySelector('.search-results');
            const resultItems = document.querySelectorAll('.search-result-item');

            // Define page URLs for each search result
            const pageUrls = {
                "AI & Machine Learning": "machineLearning.html",
                "Futuristic Tech": "future.html",
                "Web3 & Blockchain": "ndex2.html",
                "Drifting into Metaverse": "enteringIntoMetaverse.html",
                "Startup Bugs": "startUps.html",
                "Web Development": "websitedevelopment.html"
            };

            searchBar.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();

                if (searchTerm.length > 0) {
                    searchResults.style.display = 'block';

                    let hasVisibleResults = false;

                    resultItems.forEach(item => {
                        const text = item.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            item.style.display = 'block';
                            hasVisibleResults = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // Hide results container if no matches
                    searchResults.style.display = hasVisibleResults ? 'block' : 'none';
                } else {
                    searchResults.style.display = 'none';
                }
            });

            // Close search results when clicking outside
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.search-container')) {
                    searchResults.style.display = 'none';
                }
            });

            // Handle search result selection and redirection
            resultItems.forEach(item => {
                item.addEventListener('click', function () {
                    const selectedText = this.textContent;
                    searchBar.value = selectedText;
                    searchResults.style.display = 'none';

                    // Redirect to the corresponding page
                    if (pageUrls[selectedText]) {
                        window.location.href = pageUrls[selectedText];
                    }
                });
            });

            // Handle Enter key press to navigate to first visible result
            searchBar.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    const visibleResults = document.querySelectorAll('.search-result-item[style="display: block;"]');
                    if (visibleResults.length > 0) {
                        const firstResultText = visibleResults[0].textContent;
                        if (pageUrls[firstResultText]) {
                            window.location.href = pageUrls[firstResultText];
                        }
                    }
                }
            });
        });