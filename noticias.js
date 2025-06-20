// Script para la página de noticias

document.addEventListener('DOMContentLoaded', function() {
    const noticiasData = [
        {
            titulo: "¡Nuevo RPG de mundo abierto anunciado!",
            imagen: "images/noticia1.jpg",
            resumen: "Un estudio indie sorprende con el anuncio de un RPG de mundo abierto inspirado en clásicos del género.",
            enlace: "https://ejemplo.com/noticia1",
            fecha: "2024-06-01"
        },
        {
            titulo: "Actualización masiva para Minecraft",
            imagen: "images/noticia2.jpg",
            resumen: "La última actualización de Minecraft trae nuevas criaturas, biomas y mecánicas de juego.",
            enlace: "https://ejemplo.com/noticia2",
            fecha: "2024-05-28"
        },
        {
            titulo: "Zenless Zone Zero: fecha de lanzamiento confirmada",
            imagen: "images/noticia3.jpg",
            resumen: "HoYoverse confirma la fecha de lanzamiento global de su esperado ARPG urbano.",
            enlace: "https://ejemplo.com/noticia3",
            fecha: "2024-05-25"
        }
    ];

    function renderNoticias() {
        const noticiasSection = document.querySelector('.noticias-section');
        if (!noticiasSection) return;
        noticiasSection.innerHTML = `
            <h2 class="noticias-title">Noticias</h2>
            <div class="noticias-grid">
                ${noticiasData.map((noticia, idx) => `
                    <div class="noticia-card" data-noticia-idx="${idx}">
                        <img src="${noticia.imagen}" alt="${noticia.titulo}">
                        <div class="noticia-info">
                            <h3>${noticia.titulo}</h3>
                            <p class="noticia-fecha">${noticia.fecha}</p>
                            <p class="noticia-resumen">${noticia.resumen}</p>
                            <a href="${noticia.enlace}" target="_blank" class="noticia-link">Leer más</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    renderNoticias();

    // Modal para detalles de noticia
    const noticiaModal = document.getElementById('noticia-modal');
    if (noticiaModal) {
        document.body.addEventListener('click', function(e) {
            const card = e.target.closest('.noticia-card');
            if (card && noticiaModal) {
                const idx = card.dataset.noticiaIdx;
                const noticia = noticiasData[idx];
                noticiaModal.querySelector('.noticia-modal-content').innerHTML = `
                    <button class="noticia-modal-close">&times;</button>
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                    <h2>${noticia.titulo}</h2>
                    <p class="noticia-fecha">${noticia.fecha}</p>
                    <p>${noticia.resumen}</p>
                    <a href="${noticia.enlace}" target="_blank">Leer noticia completa</a>
                `;
                noticiaModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
            if (e.target.classList.contains('noticia-modal-close') || e.target === noticiaModal) {
                noticiaModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !noticiaModal.classList.contains('hidden')) {
                noticiaModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
});
