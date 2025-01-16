// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Service item expansion
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const btn = item.querySelector('.expand-btn');
        btn.addEventListener('click', () => {
            item.classList.toggle('expanded');
            btn.textContent = item.classList.contains('expanded') ? '−' : '+';
        });
    });

    // Smooth scroll for footer links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});