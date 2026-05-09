const portfolioData = [
    // Logos
    { title: "Arash Logo", category: "logos", img: "./Logos/Arash.webp" },
    { title: "Arena Sports", category: "logos", img: "./Logos/Arena.webp" },
    { title: "Açai Mania", category: "logos", img: "./Logos/Açai%20Mania.webp" },
    { title: "ChrosynPM", category: "logos", img: "./Logos/ChrosynPM%20LOGO%202.webp" },
    { title: "Fazenda de Bettas", category: "logos", img: "./Logos/Fazenda%20de%20Bettas.webp" },
    { title: "J.A Comedoria", category: "logos", img: "./Logos/J.A%20COMEDORIA.webp" },
    { title: "NK Logo", category: "logos", img: "./Logos/NK%20LOGO.webp" },
    { title: "Siqueira Cred", category: "logos", img: "./Logos/Siqueira%20Cred.webp" },

    // Instagram
    { title: "Maragogi Tour", category: "instagram", img: "./Instagram/Bate%20volta%20Maragogi.webp" },
    { title: "Dia do Cliente", category: "instagram", img: "./Instagram/Dia%20do%20cliente%20-%20Atitude.webp" },
    { title: "Feijoada Day", category: "instagram", img: "./Instagram/HOJE%20É%20DIA%20DE%20FEIJOADA.webp" },
    { title: "Rodízio de Carne", category: "instagram", img: "./Instagram/Rodizio%20de%20Carne.webp" },
    { title: "Açai Mania Social", category: "instagram", img: "./Instagram/açaimaninaarte.webp" },
    { title: "Coleção Verão", category: "instagram", img: "./Instagram/coleção%20verão.webp" },
    { title: "Vaga de Emprego", category: "instagram", img: "./Instagram/vaga%20de%20emprego.webp" },

    // Eventos
    { title: "Dall Ribeira", category: "eventos", img: "./Eventos/DALL%20R%20IBEIRA.webp" },
    { title: "Fabíola Leite", category: "eventos", img: "./Eventos/Fabíola%20Leite.webp" },
    { title: "João Pedro e Lucas", category: "eventos", img: "./Eventos/JOÃO%20PEDRO%20E%20LUCAS.webp" },
    { title: "Noite da Sofrência", category: "eventos", img: "./Eventos/noite%20da%20sofrencia.webp" },

    // Materiais Visuais
    { title: "Base 23 Branding", category: "materiais", img: "./Materiais%20visuais/BASE23.webp" },
    { title: "Cartão de Visita", category: "materiais", img: "./Materiais%20visuais/CARTÃO%20DE%20VISITA.webp" },
    { title: "Cardápio", category: "materiais", img: "./Materiais%20visuais/Cardapio%20Frente%20(1).webp" },
    { title: "Mockup Arash", category: "materiais", img: "./Materiais%20visuais/Everton%20Arash mockup.webp" },
    { title: "Camisa Betta", category: "materiais", img: "./Materiais%20visuais/modelo%20camisa%20betta.webp" }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('portfolio-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Render Portfolio Items
    function renderPortfolio(filter = 'all') {
        grid.innerHTML = '';
        
        const filteredData = filter === 'all' 
            ? portfolioData 
            : portfolioData.filter(item => item.category === filter);

        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <div class="project-info">
                    <h3>${item.title}</h3>
                    <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });

    // Initial Render
    renderPortfolio();

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Delegate click event to the grid for dynamically rendered items
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const img = card.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    const closeViewer = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', closeViewer);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeViewer();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeViewer();
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
