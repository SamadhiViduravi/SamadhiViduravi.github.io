// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log('Form Submission:', { name, email, subject, message });
        
        // Show success message (in a real application)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animate skill bars on scroll
const skillSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.opacity = 0;
        p.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
    }
});