/* ==========================================================
   ====== 1. CONFIGURACIÓN FÁCIL ==============================
   ========================================================== */
// ¡Modifica los textos entre las comillas para actualizar tu página!
const CONFIGURACION = {
    nombrePagina: "Nexus Data",
    tituloHero: "El Futuro Está Aquí",
    subtituloHero: "Una experiencia visual única diseñada con la mejor tecnología web de la actualidad."
};

/* ==========================================================
   ====== 2. LÓGICA DE LA PÁGINA (No necesitas tocarlo) =====
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar configuración inicial
    document.title = CONFIGURACION.nombrePagina;
    document.getElementById('logoName').innerText = CONFIGURACION.nombrePagina;
    document.querySelector('.brand-footer').innerText = CONFIGURACION.nombrePagina;
    document.getElementById('heroTitle').innerText = CONFIGURACION.tituloHero;
    document.getElementById('heroSubtitle').innerText = CONFIGURACION.subtituloHero;
    document.getElementById('year').innerText = new Date().getFullYear();

    // Efecto de scroll en la barra de navegación (Navbar)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú en dispositivos móviles
    const menuBtn = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Ocultar menú móvil al hacer clic en enlaces
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerText = '☰';
        });
    });

    // Animación y efecto al hacer clic en el botón interactivo
    const interactiveBtn = document.getElementById('interactiveBtn');
    interactiveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Efecto visual en el botón
        const originalText = interactiveBtn.innerText;
        interactiveBtn.innerText = "¡Activado! 🚀";
        interactiveBtn.style.background = "var(--primary-color)";
        interactiveBtn.style.boxShadow = "0 0 20px var(--primary-color)";
        
        // Crear partículas (confeti digital)
        createParticles(e.clientX, e.clientY);
        
        setTimeout(() => {
            interactiveBtn.innerText = originalText;
            interactiveBtn.style.background = "";
            interactiveBtn.style.boxShadow = "";
        }, 2500);
    });

    // Lógica para la Galería Interactiva (Modal / Pop-up de Imágenes)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImg');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-modal');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const text = item.querySelector('.overlay span').innerText;
            modal.classList.add('active');
            modalImg.src = img.src;
            captionText.innerText = text;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar el modal al hacer clic en el fondo oscuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Función interna para crear partículas en la pantalla
    function createParticles(x, y) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = Math.random() * 8 + 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 10px currentColor';
            
            const destX = x + (Math.random() - 0.5) * 250;
            const destY = y + (Math.random() - 0.5) * 250;
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 600,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
});
