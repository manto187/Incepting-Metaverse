 // Update copyright year automatically
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Mobile menu toggle
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });

        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });

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

        // Search functionality
        const searchBar = document.querySelector('.search-bar');
        const searchResults = document.getElementById('searchResults');
        const resultItems = document.querySelectorAll('.search-result-item');

        // Define page URLs for each search result
        const pageUrls = {
            "AI & Machine Learning": "machineLearning.html",
            "Futuristic Tech": "future.html",
            "Web3 & Blockchain": "ndex2.html",
            "Drifting into Metaverse": "enteringIntoMetaverse.html",
            "Startup Bugs": "startUps.html"
        };

        searchBar.addEventListener('input', function() {
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
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });

        // Handle search result selection and redirection
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
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
        searchBar.addEventListener('keydown', function(e) {
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