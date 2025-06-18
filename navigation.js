// Navigation Component - Shared across all pages

class NavigationComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('insights.html')) return 'insights';
        if (path.includes('media.html')) return 'media';
        if (path.includes('faq.html')) return 'faq';
        return 'index';
    }

    getNavigationHTML() {
        const isIndexPage = this.currentPage === 'index';
        const linkPrefix = isIndexPage ? '' : 'index.html';
        
        return `
            <header>
                <nav class="container">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <img src="theaiexpert-transparent-logo.png" alt="aiexpert.ai" style="height: 32px; width: auto;">
                        <a href="${isIndexPage ? '#hero' : 'index.html'}" class="logo">aiexpert.ai</a>
                    </div>
                    <ul class="nav-links">
                        <li><a href="${linkPrefix}#services">Services</a></li>
                        <li><a href="${linkPrefix}#assessment">AI Assessment</a></li>
                        <li class="dropdown">
                            <a href="${linkPrefix}#about" class="dropdown-toggle">About ▼</a>
                            <ul class="dropdown-menu">
                                <li><a href="${linkPrefix}#about">About Erik</a></li>
                                <li><a href="insights.html">Insights</a></li>
                                <li><a href="media.html">Media</a></li>
                                <li><a href="faq.html">FAQ</a></li>
                            </ul>
                        </li>
                        <li><a href="${linkPrefix}#contact">Contact</a></li>
                    </ul>
                    <button class="mobile-menu-toggle">☰</button>
                </nav>
            </header>
        `;
    }

    injectNavigation() {
        // Inject navigation HTML at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', this.getNavigationHTML());
        
        // Add margin-top to main content to account for fixed header
        const main = document.querySelector('main');
        if (main) {
            main.style.marginTop = '80px';
        }
    }

    initializeMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('mobile-open');
                
                if (navLinks.classList.contains('mobile-open')) {
                    this.innerHTML = '✕';
                } else {
                    this.innerHTML = '☰';
                }
            });

            // Close mobile menu when clicking nav links (but not dropdown toggle)
            document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
                link.addEventListener('click', function() {
                    if (!this.closest('.dropdown-menu')) {
                        navLinks.classList.remove('mobile-open');
                        mobileMenuToggle.innerHTML = '☰';
                    }
                });
            });

            // Handle mobile dropdown toggle
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdownMenu = this.nextElementSibling;
                        const isOpen = dropdownMenu.style.display === 'block';
                        dropdownMenu.style.display = isOpen ? 'none' : 'block';
                    }
                });
            }

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('nav')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuToggle.innerHTML = '☰';
                    // Reset mobile dropdown
                    const dropdownMenu = document.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = '';
                    }
                }
            });
        }
    }

    initializeHeaderEffects() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.injectNavigation();
                this.initializeMobileMenu();
                this.initializeHeaderEffects();
            });
        } else {
            this.injectNavigation();
            this.initializeMobileMenu();
            this.initializeHeaderEffects();
        }
    }
}

// Auto-initialize navigation when script loads
new NavigationComponent();

// Export for manual initialization if needed
window.NavigationComponent = NavigationComponent; 