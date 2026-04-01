/**
 * Minimal JavaScript for fade-in scroll animations
 * Uses Intersection Observer API for performance
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize fade-in animations
    initScrollAnimations();
});

/**
 * Initialize scroll-based fade-in animations using Intersection Observer
 */
function initScrollAnimations() {
    // Select all elements with fade-in-section class
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: make all sections visible immediately
        fadeInSections.forEach(section => {
            section.classList.add('is-visible');
        });
        return;
    }

    // Configure the Intersection Observer
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated (for performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in sections
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Smooth scroll to anchor links (already handled by CSS scroll-behavior: smooth)
 * This is a fallback for browsers that don't support CSS scroll-behavior
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Only handle if it's an actual anchor link
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
