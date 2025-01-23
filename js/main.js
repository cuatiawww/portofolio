// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-indicator');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// Project Rendering and Filtering
function renderProjects(category = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter buttons functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProjects(button.dataset.filter);
    });
});

// Experience Timeline Rendering
function renderExperience() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = experiences.map(exp => `
        <div class="timeline-item">
            <div class="timeline-date">${exp.period}</div>
            <div class="timeline-content">
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
                <ul class="timeline-achievements">
                    ${exp.achievements.map(achievement => `
                        <li>${achievement}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Skills Rendering
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = skills.map(skillCategory => `
        <div class="skill-category">
            <h3>${skillCategory.category}</h3>
            <div class="skill-tags">
                ${skillCategory.items.map(skill => `
                    <span class="tag">${skill}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderCertifications() {
    const certificationsGrid = document.querySelector('.certifications-grid');
    certificationsGrid.innerHTML = certifications.map(cert => `
        <div class="certification-card">
            <div class="certification-image">
                <img src="${cert.image}" alt="${cert.title}">
                <div class="certification-overlay">
                    <a href="${cert.link}" class="view-credential" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        View Credential
                    </a>
                </div>
            </div>
            <div class="certification-content">
                <h3>${cert.title}</h3>
                <div class="certification-info">
                    <span class="issuer">
                        <i class="fas fa-certificate"></i>
                        ${cert.issuer}
                    </span>
                    <span class="date">
                        <i class="fas fa-calendar-alt"></i>
                        ${cert.date}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize all sections
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderExperience();
    renderSkills();
    renderCertifications();
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});