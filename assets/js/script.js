// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Top Gear Fan Page Carregada!');

    // --- INICIALIZAÇÃO DA GALERIA DE IMAGENS (LIGHTBOX) ---
    new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'title'
    });


    // --- ANIMAÇÃO DE FADE-IN AO ROLAR A PÁGINA ---
    const sections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% da seção está visível
    });
    sections.forEach(section => {
        observer.observe(section);
    });


    // --- EASTER EGG DO KONAMI CODE (SEM ÁUDIO) ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                alert('Easter Egg Encontrado! NITRO!'); 
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });


    // --- FUNCIONALIDADES BÁSICAS ---
    const navLinks = document.querySelectorAll('.anchors nav ul li a');
    
    // Navegação suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Destaque do menu lateral ao rolar
    const activateMenuLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', activateMenuLink);
});