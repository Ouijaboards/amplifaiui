// Main JavaScript for AMPLIFAI
document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // CSRF protection - would be implemented with server-side token
            // For now, simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Input sanitization for form fields to prevent XSS
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Sanitize input by removing potentially harmful characters
            this.value = this.value.replace(/<script.*?>.*?<\/script>/gi, '');
        });
    });
});

// OpenManus Integration Simulation
class OpenManusIntegration {
    constructor() {
        this.initialized = false;
    }
    
    initialize() {
        console.log('OpenManus integration initialized');
        this.initialized = true;
    }
    
    processQuery(query) {
        if (!this.initialized) {
            this.initialize();
        }
        
        return {
            status: 'success',
            response: 'OpenManus has processed your query: ' + query
        };
    }
}

// Critical Thinking Framework Simulation
class CriticalThinkingFramework {
    analyzeArgument(argument) {
        const steps = [
            'Identify the claim',
            'Examine the evidence',
            'Consider alternative perspectives',
            'Evaluate logical consistency',
            'Draw conclusions'
        ];
        
        return {
            analysis: 'Analysis complete',
            steps: steps,
            result: 'Critical analysis of: ' + argument
        };
    }
}

// Initialize components when needed
window.amplifaiComponents = {
    openManus: new OpenManusIntegration(),
    criticalThinking: new CriticalThinkingFramework()
};
