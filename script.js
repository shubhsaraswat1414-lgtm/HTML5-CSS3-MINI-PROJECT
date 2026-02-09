/**
 * Milano Cortina 2026 - JavaScript Functionality
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initFAQToggle();
    initSmoothScroll();
    initNavHighlight();
    initScrollAnimations();
    
});

/**
 * FAQ Accordion Toggle
 * Expands/collapses FAQ answers when clicked
 */
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer) {
            // Set initial state - hide answers
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
            answer.style.padding = '0 20px';
            
            question.addEventListener('click', function() {
                // Check if this item is currently open
                const isOpen = item.classList.contains('active');
                
                // Close all FAQ items first
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.padding = '0 20px';
                    }
                    if (otherToggle) {
                        otherToggle.textContent = '+';
                    }
                });
                
                // If it wasn't open, open it
                if (!isOpen) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                    answer.style.padding = '20px';
                    if (toggle) {
                        toggle.textContent = '−';
                    }
                }
            });
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight Current Section in Navigation
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    if (sections.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links (only for hash links)
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === '#' + current) {
                    link.classList.add('active');
                }
            }
        });
    });
}

/**
 * Scroll Animations - Fade in elements as they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.sport-card, .stat-card, .athlete-card, .venue-card, .news-card, .about-card, .next-game-card'
    );
    
    if (animatedElements.length === 0) return;
    
    // Add initial hidden state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Mobile Navigation Toggle (if needed)
 */
function initMobileNav() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
    `;
    
    // Show hamburger on mobile
    if (window.innerWidth <= 600) {
        hamburger.style.display = 'block';
        nav.style.display = 'none';
    }
    
    header.appendChild(hamburger);
    
    hamburger.addEventListener('click', function() {
        if (nav.style.display === 'none' || nav.style.display === '') {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = '#003366';
            nav.style.padding = '20px';
            hamburger.innerHTML = '✕';
        } else {
            nav.style.display = 'none';
            hamburger.innerHTML = '☰';
        }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            hamburger.style.display = 'none';
        } else {
            hamburger.style.display = 'block';
            nav.style.display = 'none';
        }
    });
}

/**
 * Newsletter Form Validation
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert('Thank you for subscribing! You will receive Olympic updates soon.');
        emailInput.value = '';
    });
}

// Initialize newsletter form
document.addEventListener('DOMContentLoaded', initNewsletterForm);
