// Page Navigation Component - Previous/Next links between related pages

class PageNavigationComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.pageSequence = [
            { 
                id: 'about', 
                title: 'About Erik', 
                url: 'index.html#about',
                description: 'Learn about Erik\'s background and expertise'
            },
            { 
                id: 'insights', 
                title: 'Featured Insights', 
                url: 'insights.html',
                description: 'AI thought leadership and strategic frameworks'
            },
            { 
                id: 'media', 
                title: 'Media', 
                url: 'media.html',
                description: 'Speaking engagements and expert interviews'
            }
        ];
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        if (path.includes('insights.html')) return 'insights';
        if (path.includes('media.html')) return 'media';
        if (hash === '#about' || (!path.includes('.html') && !hash)) return 'about';
        
        return null; // Not a page that needs navigation
    }

    getCurrentPageIndex() {
        return this.pageSequence.findIndex(page => page.id === this.currentPage);
    }

    getPreviousPage() {
        const currentIndex = this.getCurrentPageIndex();
        if (currentIndex <= 0) return null;
        return this.pageSequence[currentIndex - 1];
    }

    getNextPage() {
        const currentIndex = this.getCurrentPageIndex();
        if (currentIndex >= this.pageSequence.length - 1) {
            // Complete the loop: Media -> About Erik
            return this.pageSequence[0];
        }
        return this.pageSequence[currentIndex + 1];
    }

    createNavigationHTML() {
        if (!this.currentPage) return '';

        const prevPage = this.getPreviousPage();
        const nextPage = this.getNextPage();
        
        if (!prevPage && !nextPage) return '';

        return `
            <div class="page-navigation">
                <div class="page-nav-container">
                    ${prevPage ? `
                        <a href="${prevPage.url}" class="page-nav-link prev-page">
                            <div class="nav-arrow">←</div>
                            <div class="nav-content">
                                <div class="nav-label">Previous</div>
                                <div class="nav-title">${prevPage.title}</div>
                                <div class="nav-description">${prevPage.description}</div>
                            </div>
                        </a>
                    ` : '<div class="page-nav-spacer"></div>'}
                    
                    ${nextPage ? `
                        <a href="${nextPage.url}" class="page-nav-link next-page">
                            <div class="nav-content">
                                <div class="nav-label">Next</div>
                                <div class="nav-title">${nextPage.title}</div>
                                <div class="nav-description">${nextPage.description}</div>
                            </div>
                            <div class="nav-arrow">→</div>
                        </a>
                    ` : '<div class="page-nav-spacer"></div>'}
                </div>
            </div>
        `;
    }

    injectNavigation() {
        const navigationHTML = this.createNavigationHTML();
        if (!navigationHTML) return;

        // Find the main content area or footer to insert before
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        
        if (main) {
            main.insertAdjacentHTML('afterend', navigationHTML);
        } else if (footer) {
            footer.insertAdjacentHTML('beforebegin', navigationHTML);
        } else {
            // Fallback: append to body
            document.body.insertAdjacentHTML('beforeend', navigationHTML);
        }
    }

    addStyles() {
        // Check if styles already exist
        if (document.getElementById('page-navigation-styles')) return;

        const styles = `
            <style id="page-navigation-styles">
                .page-navigation {
                    margin: 4rem 0;
                    padding: 0 2rem;
                }

                .page-nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 2rem 0;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .page-nav-link {
                    display: flex;
                    align-items: center;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    gap: 1rem;
                    min-height: 120px;
                }

                .page-nav-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    border-color: #2563eb;
                }

                .page-nav-link.prev-page {
                    justify-content: flex-start;
                }

                .page-nav-link.next-page {
                    justify-content: flex-end;
                    text-align: right;
                }

                .nav-arrow {
                    font-size: 2rem;
                    color: #2563eb;
                    font-weight: bold;
                    transition: transform 0.3s ease;
                }

                .page-nav-link:hover .nav-arrow {
                    transform: scale(1.2);
                }

                .nav-content {
                    flex: 1;
                }

                .nav-label {
                    font-size: 0.875rem;
                    color: #6b7280;
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .nav-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                    transition: color 0.3s ease;
                }

                .page-nav-link:hover .nav-title {
                    color: #2563eb;
                }

                .nav-description {
                    font-size: 0.875rem;
                    color: #6b7280;
                    line-height: 1.4;
                }

                .page-nav-spacer {
                    /* Empty space for alignment when only one navigation link exists */
                }

                @media (max-width: 768px) {
                    .page-nav-container {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .page-nav-link {
                        padding: 1rem;
                        min-height: 100px;
                    }

                    .nav-arrow {
                        font-size: 1.5rem;
                    }

                    .nav-title {
                        font-size: 1.1rem;
                    }

                    .page-navigation {
                        margin: 2rem 0;
                        padding: 0 1rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    init() {
        if (!this.currentPage) return;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.addStyles();
                this.injectNavigation();
            });
        } else {
            this.addStyles();
            this.injectNavigation();
        }
    }
}

// Auto-initialize page navigation when script loads
new PageNavigationComponent();

// Export for manual initialization if needed
window.PageNavigationComponent = PageNavigationComponent; 