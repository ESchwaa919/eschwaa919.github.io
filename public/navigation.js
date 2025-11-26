// Navigation Component - Shared across all pages

class NavigationComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        console.log('NavigationComponent: Current path:', path);
        if (path.includes('insights.html')) return 'insights';
        if (path.includes('media.html')) return 'media';
        if (path.includes('faq.html')) return 'faq';
        if (path.includes('ai-roi-calculator.html')) return 'roi-calculator';
        if (path.includes('ai-assessment.html')) return 'ai-assessment';
        if (path.includes('sitemap.html')) {
            console.log('NavigationComponent: Detected sitemap page');
            return 'sitemap';
        }
        if (path.includes('automlr')) return 'automlr';
        if (path.includes('ailms')) return 'ailms';
        if (path.includes('ai-learning')) return 'ai-learning';
        if (path.includes('promptfluency')) {
            console.log('NavigationComponent: Detected promptfluency page');
            return 'promptfluency';
        }
        if (path.includes('/skills/')) {
            console.log('NavigationComponent: Detected skills page');
            return 'skills';
        }
        if (path.includes('/services/')) {
            console.log('NavigationComponent: Detected services page');
            return 'services';
        }
        return 'index';
    }

    getNavigationHTML() {
        const isIndexPage = this.currentPage === 'index';
        const isInServicesDirectory = window.location.pathname.includes('/services/');
        const isInSubdirectory = window.location.pathname.includes('/automlr/') || window.location.pathname.includes('/ailms/') || window.location.pathname.includes('/ai-learning/') || window.location.pathname.includes('/promptfluency/') || window.location.pathname.includes('/skills/') || isInServicesDirectory;
        const linkPrefix = isIndexPage ? '' : (isInSubdirectory ? '../index.html' : 'index.html');
        const logoHref = isIndexPage ? '#hero' : (isInSubdirectory ? '../index.html' : 'index.html');

        // Special handling for services links - if we're in services directory, use relative links
        const servicePrefix = isInServicesDirectory ? '' : (isInSubdirectory ? '../services/' : 'services/');

        // Logo image path - adjust for subdirectories
        const logoImagePath = isInSubdirectory ? '../theaiexpert-transparent-logo.png' : 'theaiexpert-transparent-logo.png';

        console.log('NavigationComponent: Current page:', this.currentPage, 'isIndexPage:', isIndexPage, 'isInServicesDirectory:', isInServicesDirectory, 'logoHref:', logoHref);

        return `
            <header>
                <nav class="container">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <img src="${logoImagePath}" alt="aiexpert.ai" style="height: 32px; width: auto;">
                        <a href="${logoHref}" class="logo">aiexpert.ai</a>
                    </div>
                    <ul class="nav-links">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">Services ▼</a>
                            <ul class="dropdown-menu">
                                <li><a href="${isInSubdirectory ? '../' : ''}ai-learning/index.html">AI Learning Resources</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}ai-assessment.html">AI Assessment</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}ai-roi-calculator.html">ROI Calculator</a></li>
                                <li style="border-top: 1px solid #e5e7eb; margin: 0.5rem 0; padding-top: 0.5rem;"></li>
                                <li><a href="${servicePrefix}strategic-guidance.html">Strategic Guidance</a></li>
                                <li><a href="${servicePrefix}implementation.html">Implementation</a></li>
                                <li><a href="${servicePrefix}expert-network.html">Expert Network</a></li>
                                <li><a href="${servicePrefix}specialised.html">Specialised</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle">Solutions ▼</a>
                            <ul class="dropdown-menu">
                                <li><a href="${servicePrefix}strategic-guidance.html">AI Onboarding</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}automlr/index.html">Compliance & Governance</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}ailms/index.html">E-Learning Solutions</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}promptfluency/index.html">AI Skills Development</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="${linkPrefix}#about" class="dropdown-toggle">About ▼</a>
                            <ul class="dropdown-menu">
                                <li><a href="${linkPrefix}#about">About Erik</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}insights.html">Featured</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}media.html">Media</a></li>
                                <li><a href="${isInSubdirectory ? '../' : ''}faq.html">FAQ</a></li>
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

            // Close mobile menu when clicking nav links (including dropdown items)
            document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuToggle.innerHTML = '☰';
                    // Also close any open dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.style.display = '';
                    });
                });
            });

            // Handle mobile dropdown toggles (all of them)
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdownMenu = this.nextElementSibling;
                        const isOpen = dropdownMenu.style.display === 'block';

                        // Close all other dropdowns first
                        document.querySelectorAll('.dropdown-menu').forEach(menu => {
                            if (menu !== dropdownMenu) {
                                menu.style.display = '';
                            }
                        });

                        // Toggle this dropdown
                        dropdownMenu.style.display = isOpen ? '' : 'block';
                    }
                });
            });

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