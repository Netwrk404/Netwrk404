// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll to Top on Nav Link Click
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

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 0);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition to portfolio items
portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease';
});

// Form Submit Handler
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');

    // Simple validation
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelectorAll('input[type="text"]')[1].value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !phone || !message) {
        messageDiv.textContent = 'Please fill in all fields!';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Please enter a valid email address!';
        messageDiv.classList.remove('success');
        messageDiv.classList.add('error');
        return;
    }

    // Simulate form submission (in real scenario, this would send to a server)
    messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
    messageDiv.classList.remove('error');
    messageDiv.classList.add('success');

    // Reset form
    form.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('success', 'error');
    }, 5000);
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, testimonials, and portfolio items
document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounters() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const statItems = document.querySelectorAll('.stat-item h4');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateNumber();
            }
        });
    }, observerOptions);

    counterObserver.observe(statsSection);

    function animateNumber() {
        statItems.forEach(item => {
            const target = parseInt(item.textContent);
            const duration = 2000;
            const start = Date.now();

            function updateNumber() {
                const elapsed = Date.now() - start;
                const progress = elapsed / duration;

                if (progress < 1) {
                    const current = Math.floor(progress * target);
                    item.textContent = current + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    item.textContent = target + '+';
                }
            }

            updateNumber();
        });
    }
}

// Call counter animation on page load
document.addEventListener('DOMContentLoaded', animateCounters);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Scroll Reveal Animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.section-header, .about-text, .contact-form, .contact-info');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
};

// Initialize reveal elements
document.querySelectorAll('.section-header, .about-text, .contact-form, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealElements);
revealElements();

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderTopColor = '#1a5490';
    });
    card.addEventListener('mouseleave', () => {
        card.style.borderTopColor = '#e74c3c';
    });
});

// Prevent Multiple Form Submissions
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    let isSubmitting = false;

    contactForm.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 2000);
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Scroll Progress Indicator (optional feature)
const createScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.id = 'scrollIndicator';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #f39c12);
        width: 0%;
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = scrollPercentage + '%';
    });
};

createScrollIndicator();

// Lazy Load Images (future implementation when adding real images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('Al Raed Group Website Loaded Successfully!');
