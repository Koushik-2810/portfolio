// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.ai-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
    }, 3000);
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Skill Bars Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    const level = item.getAttribute('data-level');
                    const progress = item.querySelector('.skill-progress');
                    progress.style.width = level + '%';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-container');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Typing Effect for Terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Background for Project Cards
const projectCards = document.querySelectorAll('.project-visual');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animationDuration = '1s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.animationDuration = '3s';
    });
});

// Add Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            document.querySelector('.ai-cursor').style.transform = 'scale(1.5)';
        });
        button.addEventListener('mouseleave', () => {
            document.querySelector('.ai-cursor').style.transform = 'scale(1)';
        });
    });

    // Add typing effect to hero description
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        const originalText = heroDesc.innerHTML;
        heroDesc.innerHTML = '';
        setTimeout(() => {
            typeWriter(heroDesc, originalText, 30);
        }, 1000);
    }

    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                let currentValue = 0;
                const increment = finalValue.includes('%') ? 1 : 
                                finalValue.includes('+') ? 1 : 
                                finalValue.includes('TB') ? 0.1 : 1;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (finalValue.includes('%')) {
                        target.textContent = currentValue + '%';
                        if (currentValue >= parseInt(finalValue)) clearInterval(timer);
                    } else if (finalValue.includes('TB')) {
                        target.textContent = currentValue.toFixed(1) + 'TB';
                        if (currentValue >= 2) clearInterval(timer);
                    } else {
                        target.textContent = currentValue + '+';
                        if (currentValue >= 5) clearInterval(timer);
                    }
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statObserver.observe(stat));
});

// Add Matrix-style falling code effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Initialize matrix effect on load
window.addEventListener('load', () => {
    createMatrixEffect();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add WebGL background effect (optional enhancement)
function initWebGLBackground() {
    // This would require a WebGL library like Three.js
    // For now, we'll keep it simple with CSS animations
    console.log('WebGL background ready for enhancement');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', initWebGLBackground);

// Export for potential module use
window.KoushikPortfolio = {
    init: () => {
        console.log('Koushik Reddy Gunjala - Senior AI Engineer Portfolio Loaded');
    },
    getSkills: () => {
        return [
            'Azure OpenAI (GPT-4o)',
            'LangGraph',
            'RAG Systems',
            'Multi-Agent AI',
            'PySpark',
            'AWS/Azure',
            'Python',
            'HIPAA Compliance'
        ];
    }
};

// Auto-init
window.KoushikPortfolio.init();