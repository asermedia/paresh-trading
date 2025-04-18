// Hero Carousel Functionality
let slideIndex = 1;
showSlide(slideIndex);

// Auto slide change
let carouselInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

function changeSlide(n) {
    clearInterval(carouselInterval);
    showSlide(slideIndex += n);
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function currentSlide(n) {
    clearInterval(carouselInterval);
    showSlide(slideIndex = n);
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

// Logo Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoCarousel = document.querySelector('.logo-carousel');
    const logoSlides = document.querySelectorAll('.logo-slide');
    
    if (!logoCarousel || logoSlides.length === 0) return;
    
    // Clone the logo slides to create a continuous loop
    logoSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        logoCarousel.appendChild(clone);
    });
    
    // Set the width of the carousel
    const slideWidth = logoSlides[0].offsetWidth + 
                      parseInt(window.getComputedStyle(logoSlides[0]).marginLeft) + 
                      parseInt(window.getComputedStyle(logoSlides[0]).marginRight);
    
    const totalWidth = slideWidth * logoSlides.length * 2;
    logoCarousel.style.width = `${totalWidth}px`;
    
    // Animate the carousel
    let position = 0;
    const speed = 1; // pixels per frame
    
    function animate() {
        position -= speed;
        
        // Reset position when all logos have scrolled
        if (Math.abs(position) >= slideWidth * logoSlides.length) {
            position = 0;
        }
        
        logoCarousel.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause animation on hover
    logoCarousel.addEventListener('mouseenter', function() {
        logoCarousel.style.animationPlayState = 'paused';
    });
    
    logoCarousel.addEventListener('mouseleave', function() {
        logoCarousel.style.animationPlayState = 'running';
    });
});

// Brand Tabs Functionality
const brandTabs = document.querySelectorAll('.brand-tab');
const brandInfos = document.querySelectorAll('.brand-info');

brandTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and info panels
        brandTabs.forEach(t => t.classList.remove('active'));
        brandInfos.forEach(info => info.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding brand info
        const brandId = tab.getAttribute('data-brand');
        document.getElementById(brandId).classList.add('active');
        
        // Smooth scroll to brand content on mobile
        if (window.innerWidth < 768) {
            const brandContent = document.querySelector('.brand-content');
            brandContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile Navigation Toggle
function createMobileNav() {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert button before nav
    header.insertBefore(mobileMenuBtn, nav);
    
    // Add toggle functionality
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Change icon based on state
        if (mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Check if screen width is less than 768px
if (window.innerWidth < 768) {
    createMobileNav();
}

// Add mobile nav on resize if needed
window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
        createMobileNav();
    } else if (window.innerWidth >= 768 && document.querySelector('.mobile-menu-btn')) {
        document.querySelector('.mobile-menu-btn').remove();
        document.querySelector('nav').classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (document.querySelector('nav.active')) {
                document.querySelector('nav').classList.remove('active');
                document.querySelector('.mobile-menu-btn').classList.remove('active');
                document.querySelector('.mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate form submission
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .about-logo, .brand-tabs-container, .discount-content, .discount-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Add animation class to CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .about-content, .about-logo, .brand-tabs-container, .discount-content, .discount-image {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .about-content.animate, .about-logo.animate, .brand-tabs-container.animate, .discount-content.animate, .discount-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on load
window.addEventListener('load', animateOnScroll);



