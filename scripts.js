// main.js
// Smooth scrolling effect
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add event listener for the links in the Contact section
document.querySelectorAll('#contact ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        alert('You clicked a contact link!');
    });
});


window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 0);
});