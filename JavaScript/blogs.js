 // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Check for saved user preference
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
            navLinks.classList.toggle('active');
        });

        // Search functionality
        const searchBar = document.querySelector('.search-bar');
        const searchResults = document.getElementById('searchResults');
        const resultItems = document.querySelectorAll('.search-result-item');

        // Show results when search bar is focused
        searchBar.addEventListener('focus', () => {
            searchResults.style.display = 'block';
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });

        // Filter results based on input
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
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

            searchResults.style.display = hasVisibleResults ? 'block' : 'none';
        });

        // Handle result selection
        resultItems.forEach(item => {
            item.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Article display functionality
            const readMoreLinks = document.querySelectorAll('.read-more');
            const backToBlogLinks = document.querySelectorAll('.back-to-blog');
            
            // Show article when "Read More" is clicked
            readMoreLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const articleId = this.getAttribute('data-article');
                    const articleFull = document.getElementById(articleId);
                    
                    // Hide all articles first
                    document.querySelectorAll('.article-full').forEach(article => {
                        article.classList.remove('active');
                    });
                    
                    // Hide all blog cards and section titles
                    document.querySelectorAll('.blog-card, .section-title').forEach(el => {
                        el.style.display = 'none';
                    });
                    
                    // Show the selected article
                    articleFull.classList.add('active');
                    
                    // Scroll to the article
                    articleFull.scrollIntoView({ behavior: 'smooth' });
                });
            });
            
            // Back to blog functionality
            backToBlogLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Hide all full articles
                    document.querySelectorAll('.article-full').forEach(article => {
                        article.classList.remove('active');
                    });
                    
                    // Show all blog cards and section titles
                    document.querySelectorAll('.blog-card, .section-title').forEach(el => {
                        el.style.display = 'block';
                    });
                    
                    // Scroll back to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                });
            });
        });