// Homepage JavaScript
class Homepage {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupFormHandling();
        this.setupNavbarScroll();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.problem-card, .feature-card, .access-card, .impact-card').forEach(el => {
            observer.observe(el);
        });

        // Animate stats on scroll
        this.animateStats();
    }

    animateStats() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumbers(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number, .impact-number').forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateNumbers(element) {
        const finalNumber = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = formattedNumber + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    setupNavbarScroll() {
        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Demo video functionality
function playDemo() {
    // Create modal for demo video
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeDemo()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>GloSpot Demo Video</h3>
                    <button class="modal-close" onclick="closeDemo()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <h4>Demo Video Coming Soon</h4>
                        <p>Watch our comprehensive demo showcasing GloSpot's AI-powered talent identification platform.</p>
                        <div class="demo-features">
                            <div class="demo-feature">
                                <i class="fas fa-mobile-alt"></i>
                                <span>Mobile App Demo</span>
                            </div>
                            <div class="demo-feature">
                                <i class="fas fa-chalkboard-teacher"></i>
                                <span>Coach Dashboard</span>
                            </div>
                            <div class="demo-feature">
                                <i class="fas fa-landmark"></i>
                                <span>Government Portal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        .modal-header h3 {
            color: #333;
            font-size: 1.3rem;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .modal-body {
            padding: 2rem;
        }
        .demo-placeholder {
            text-align: center;
            padding: 2rem;
        }
        .demo-placeholder i {
            font-size: 4rem;
            color: #667eea;
            margin-bottom: 1rem;
        }
        .demo-placeholder h4 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        .demo-placeholder p {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .demo-features {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .demo-feature {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            min-width: 120px;
        }
        .demo-feature i {
            font-size: 1.5rem;
            color: #667eea;
        }
        .demo-feature span {
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);
}

function closeDemo() {
    const modal = document.querySelector('.demo-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Add click handler for demo button
document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.querySelector('a[href="#demo"]');
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            playDemo();
        });
    }
});

// Initialize homepage when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Homepage();
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .problem-card,
    .feature-card,
    .access-card,
    .impact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .problem-card.animate-in,
    .feature-card.animate-in,
    .access-card.animate-in,
    .impact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(animationStyles);
