// Global Variables
let currentTestimonial = 0;
let currentLightboxImage = 0;
let isMenuOpen = false;

const testimonials = [
    {
        name: "Aziza Karimova",
        location: "Toshkent",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        text: "Zomin haqiqatan ham ajoyib joy! Toza havo, go'zal manzaralar va tinch muhit. Oilam bilan o'tkazgan eng yaxshi dam olish kunlari edi. Albatta qaytib kelamiz!"
    },
    {
        name: "Bobur Rahimov",
        location: "Samarqand",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        text: "Tog'larda piyoda yurish va tabiat bilan birga bo'lish - bu haqiqiy zavq! Zomin sanatoriyasida davolanish ham juda samarali bo'ldi. Hammaga tavsiya qilaman."
    },
    {
        name: "Malika Tosheva",
        location: "Buxoro",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        text: "Milliy bog'dagi noyob o'simliklar va hayvonlar meni hayratda qoldirdi. Fotografiya uchun ajoyib joylar ko'p. Tabiat sevuvchilar uchun jannat!"
    },
    {
        name: "Jasur Alimov",
        location: "Andijon",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        text: "Shahar shovqinidan charchagan har bir kishi Zominga kelishi kerak. Bu yerda haqiqiy tinchlik va osoyishtalik bor. Eng yaxshi tanlov!"
    }
];

const galleryImages = [
    {
        src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Zomin tog'lari",
        description: "Qorli tog' cho'qqilari va yashil vodiylar"
    },
    {
        src: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Milliy bog' manzarasi",
        description: "Zomin Milliy bog'ining noyob tabiat manzaralari"
    },
    {
        src: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Tog' ko'li",
        description: "Kristal toza suvi bilan mashhur tog' ko'li"
    },
    {
        src: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Piyoda yo'l",
        description: "Tog'lardagi sayohat yo'llari"
    },
    {
        src: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Quyosh chiqishi",
        description: "Tog'lardan ajoyib quyosh chiqishi manzarasi"
    },
    {
        src: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        title: "Sanatoriya binosi",
        description: "Zamonaviy sanatoriya majmuasi"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Initialize theme
    initializeTheme();
    
    // Initialize testimonials
    initializeTestimonials();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize scroll to top button
    initializeScrollToTop();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations on scroll
    initializeScrollAnimations();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active', isMenuOpen);
        mobileMenuToggle.textContent = isMenuOpen ? '✕' : '☰';
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            navMenu.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        });
    });
}

// Testimonials Slider
function initializeTestimonials() {
    createTestimonialDots();
    showTestimonial(0);
    
    // Auto-play testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function createTestimonialDots() {
    const dotsContainer = document.getElementById('testimonial-dots');
    dotsContainer.innerHTML = '';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'testimonial-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
}

function changeTestimonial(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    // Remove active class from current slide
    slides[currentTestimonial].classList.remove('active');
    
    // Calculate new index
    currentTestimonial = (currentTestimonial + direction + totalSlides) % totalSlides;
    
    // Show new slide
    showTestimonial(currentTestimonial);
}

function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active', 'prev'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active classes
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Gallery Lightbox
function openLightbox(index) {
    currentLightboxImage = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const image = galleryImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentLightboxImage = (currentLightboxImage + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentLightboxImage = (currentLightboxImage - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const image = galleryImages[currentLightboxImage];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Scroll Effects
function initializeScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header background opacity
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(31, 41, 55, 0.95)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(31, 41, 55, 0.9)';
            }
        }
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .attraction-card, .benefit-card, .gallery-item, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact Form
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    
    // Reset form
    event.target.reset();
    
    console.log('Form submitted:', data);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation to images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('fade-in');
        });
        
        // If image is already loaded
        if (img.complete) {
            img.classList.add('fade-in');
        }
    });
}

// Initialize image loading effects
document.addEventListener('DOMContentLoaded', addImageLoadingEffect);

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .attraction-card, .benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-0.5rem) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize card hover effects
document.addEventListener('DOMContentLoaded', addCardHoverEffects);

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after loading screen
    setTimeout(typeWriter, 3500);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', addTypingEffect);

// Add floating animation to hero particles
function addFloatingAnimation() {
    const particles = document.querySelectorAll('.hero-particles::before');
    
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for images
function addImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn('Failed to load image:', img.src);
        });
    });
}

// Initialize image error handling
document.addEventListener('DOMContentLoaded', addImageErrorHandling);

// Add accessibility improvements
function addAccessibilityFeatures() {
    // Add keyboard navigation for testimonials
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.testimonials-slider')) {
            if (e.key === 'ArrowLeft') {
                changeTestimonial(-1);
            } else if (e.key === 'ArrowRight') {
                changeTestimonial(1);
            }
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, textarea');
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #10b981';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);

// Add preloader for better UX
function addPreloader() {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    // All images loaded
                    document.body.classList.add('loaded');
                }
            });
        }
    });
    
    if (loadedImages === images.length) {
        document.body.classList.add('loaded');
    }
}

// Initialize preloader
document.addEventListener('DOMContentLoaded', addPreloader);