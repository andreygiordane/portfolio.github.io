const portfolioData = [
    // Logos
    { title: "Arash Logo", category: "logos", img: "./Logos/Arash.png" },
    { title: "Arena Sports", category: "logos", img: "./Logos/Arena.jpg" },
    { title: "Açai Mania", category: "logos", img: "./Logos/Açai%20Mania.png" },
    { title: "ChrosynPM", category: "logos", img: "./Logos/ChrosynPM%20LOGO%202.png" },
    { title: "Fazenda de Bettas", category: "logos", img: "./Logos/Fazenda%20de%20Bettas.png" },
    { title: "J.A Comedoria", category: "logos", img: "./Logos/J.A%20COMEDORIA.png" },
    { title: "NK Logo", category: "logos", img: "./Logos/NK%20LOGO.png" },
    { title: "Siqueira Cred", category: "logos", img: "./Logos/Siqueira%20Cred.jpg" },

    // Instagram
    { title: "Maragogi Tour", category: "instagram", img: "./Instagram/Bate%20volta%20Maragogi.png" },
    { title: "Dia do Cliente", category: "instagram", img: "./Instagram/Dia%20do%20cliente%20-%20Atitude.png" },
    { title: "Feijoada Day", category: "instagram", img: "./Instagram/HOJE%20É%20DIA%20DE%20FEIJOADA.png" },
    { title: "Rodízio de Carne", category: "instagram", img: "./Instagram/Rodizio%20de%20Carne.png" },
    { title: "Açai Mania Social", category: "instagram", img: "./Instagram/açaimaninaarte.png" },
    { title: "Coleção Verão", category: "instagram", img: "./Instagram/coleção%20verão.png" },
    { title: "Vaga de Emprego", category: "instagram", img: "./Instagram/vaga%20de%20emprego.png" },

    // Eventos
    { title: "Dall Ribeira", category: "eventos", img: "./Eventos/DALL%20R%20IBEIRA.png" },
    { title: "Fabíola Leite", category: "eventos", img: "./Eventos/Fabíola%20Leite.png" },
    { title: "João Pedro e Lucas", category: "eventos", img: "./Eventos/JOÃO%20PEDRO%20E%20LUCAS.png" },
    { title: "Noite da Sofrência", category: "eventos", img: "./Eventos/noite%20da%20sofrencia.png" },

    // Materiais Visuais
    { title: "Base 23 Branding", category: "materiais", img: "./Materiais%20visuais/BASE23.png" },
    { title: "Cartão de Visita", category: "materiais", img: "./Materiais%20visuais/CARTÃO%20DE%20VISITA.png" },
    { title: "Cardápio", category: "materiais", img: "./Materiais%20visuais/Cardapio%20Frente%20(1).png" },
    { title: "Mockup Arash", category: "materiais", img: "./Materiais%20visuais/Everton%20Arash mockup.png" },
    { title: "Camisa Betta", category: "materiais", img: "./Materiais%20visuais/modelo%20camisa%20betta.png" }
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
