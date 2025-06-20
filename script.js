// ¡Bienvenido a mi código JavaScript! Aquí es donde la magia ocurre y todo cobra vida

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar y anuncios
    const sidebarToggle = document.getElementById('sidebarToggle');
    const container = document.querySelector('.container');
    const ads = document.querySelectorAll('.ad-space');
    const adsContainer = document.querySelector('.ads');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Acerca de Nosotros
    const acercaLink = document.querySelector('a[href="#acerca"]');
    const acercaSection = document.getElementById('acerca-section');
    const acercaCloseBtn = document.querySelector('.acerca-close');

    // Filtros y tarjetas de juegos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const juegoCards = document.querySelectorAll('.juego-card');

    // Menús desplegables
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const menuItemDropdowns = document.querySelectorAll('.menu-item-dropdown');
    const plataformaLinks = document.querySelectorAll('.menu-item-dropdown:nth-child(3) .submenu-link');

    // --- Sidebar ---
    if (sidebarToggle && container) {
        sidebarToggle.addEventListener('click', () => {
            container.classList.toggle('sidebar-collapsed');
            // Móvil: mostrar overlay y bloquear scroll
            if (window.innerWidth <= 900) {
                const isOpen = container.classList.contains('sidebar-collapsed');
                if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }
        });
    }
    // Botón para ocultar menú (restaurar funcionalidad)
    if (sidebarToggle && container) {
        sidebarToggle.addEventListener('click', () => {
            container.classList.toggle('sidebar-collapsed');
            if (window.innerWidth <= 900) {
                const isOpen = container.classList.contains('sidebar-collapsed');
                if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }
        });
    }
    // Cerrar sidebar tocando el overlay en móvil
    if (sidebarOverlay && container) {
        sidebarOverlay.addEventListener('click', () => {
            container.classList.remove('sidebar-collapsed');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Cerrar sidebar al seleccionar un enlace del menú en móvil
    document.querySelectorAll('.sidebar .menu-link, .sidebar .submenu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                container.classList.remove('sidebar-collapsed');
                if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Acerca de Nosotros ---
    if (acercaLink && acercaSection) {
        acercaLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.overflow = 'hidden';
            acercaSection.classList.add('active');
        });
    }
    if (acercaCloseBtn && acercaSection) {
        acercaCloseBtn.addEventListener('click', function() {
            acercaSection.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && acercaSection && acercaSection.classList.contains('active')) {
            acercaSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Anuncios ---
    function checkAllAdsHidden() {
        const visibleAds = Array.from(ads).some(ad => !ad.classList.contains('hidden'));
        if (adsContainer) adsContainer.classList.toggle('hidden', !visibleAds);
    }
    function hideAllAds() {
        ads.forEach(ad => ad.classList.add('hidden'));
        checkAllAdsHidden();
    }
    function showAllAds() {
        ads.forEach(ad => ad.classList.remove('hidden'));
        if (adsContainer) adsContainer.classList.remove('hidden');
    }
    ads.forEach(ad => {
        const closeBtn = ad.querySelector('.ad-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                ad.classList.add('hidden');
                checkAllAdsHidden();
                setTimeout(() => {
                    ad.classList.remove('hidden');
                    if (adsContainer && adsContainer.classList.contains('hidden')) {
                        adsContainer.classList.remove('hidden');
                    }
                }, 30000);
            });
        }
    });
    if (adsContainer) {
        const closeAllAdsBtn = document.createElement('button');
        closeAllAdsBtn.className = 'ad-close close-all-ads';
        closeAllAdsBtn.innerHTML = '<i class="fas fa-times"></i>';
        adsContainer.insertBefore(closeAllAdsBtn, adsContainer.firstChild);
        closeAllAdsBtn.addEventListener('click', () => {
            hideAllAds();
            setTimeout(showAllAds, 3000000);
        });
    }
    checkAllAdsHidden();

    // --- Filtros de juegos ---
    function filtrarJuegos(categoria) {
        juegoCards.forEach(card => {
            const cardCategoria = card.dataset.categoria;
            if (categoria === 'todos' || cardCategoria === categoria) {
                card.classList.remove('hidden');
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarJuegos(this.dataset.categoria);
        });
    });

    // --- Menús desplegables ---
    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            menuItemDropdowns.forEach((dropdown, i) => {
                if (i !== index) dropdown.classList.remove('active');
            });
            menuItemDropdowns[index].classList.toggle('active');
        });
    });
    document.addEventListener('click', function(e) {
        if (![...menuItemDropdowns].some(dropdown => dropdown.contains(e.target))) {
            menuItemDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // --- Filtrado por plataforma desde menú lateral ---
    function filtrarJuegosPorPlataforma(plataforma) {
        // ...aquí iría la lógica de plataformasJuegos si existiera...
        // Este bloque se mantiene para compatibilidad, pero no se implementa porque no hay plataformasJuegos en el código actual.
    }
    plataformaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // ...aquí iría la llamada a filtrarJuegosPorPlataforma...
        });
    });

    // --- Mostrar detalles del juego ---
    document.querySelectorAll('.juego-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const juegoId = this.closest('.juego-card').dataset.juegoId;
            const juego = obtenerDatosJuego(juegoId);
            mostrarDetallesJuego(juego);
        });
    });

    // --- Reset filtros con ESC ---
    const btnTodos = document.querySelector('.filtro-btn[data-categoria="todos"]');
    if (btnTodos) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') btnTodos.click();
        });
    }

    // --- Cerrar detalles del juego ---
    const detallesSection = document.getElementById('juego-detalles');
    if (detallesSection) {
        detallesSection.querySelector('.detalles-close').addEventListener('click', () => {
            detallesSection.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        detallesSection.addEventListener('click', (e) => {
            if (e.target === detallesSection) {
                detallesSection.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Login/Register Modal mejorado ---
    const loginModal = document.getElementById('login-modal');
    const openLoginBtn = document.getElementById('open-login-modal');
    const loginCloseBtn = document.querySelector('.login-close');
    const loginFormSection = document.getElementById('login-form-section');
    const registerFormSection = document.getElementById('register-form-section');
    const userInfoSection = document.getElementById('user-info-section');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    function getUser() {
      return JSON.parse(localStorage.getItem('alpha_user') || '{}');
    }
    function isLoggedIn() {
      const user = getUser();
      return user && user.username;
    }
    function updateLoginBtn() {
      const btn = document.getElementById('open-login-modal');
      const userDisplay = document.getElementById('user-display');
      if (!btn) return;
      if (isLoggedIn()) {
        btn.textContent = "Mi cuenta";
        btn.title = "Ver información de usuario o cerrar sesión";
        if (userDisplay) userDisplay.textContent = "Usuario: " + getUser().username;
      } else {
        btn.textContent = "Iniciar Sesión";
        btn.title = "Iniciar sesión o registrarse";
        if (userDisplay) userDisplay.textContent = "";
      }
    }
    updateLoginBtn();
    window.addEventListener('storage', updateLoginBtn);
    window.updateLoginBtn = updateLoginBtn;

    function clearErrors() {
      if (loginError) loginError.textContent = '';
      if (registerError) registerError.textContent = '';
    }

    // Mostrar modal de login/cuenta
    if (openLoginBtn && loginModal) {
      openLoginBtn.addEventListener('click', () => {
        if (isLoggedIn()) {
          loginFormSection.classList.add('hidden');
          registerFormSection.classList.add('hidden');
          userInfoSection.classList.remove('hidden');
          const user = getUser();
          document.getElementById('user-name').textContent = user.name || '';
          document.getElementById('user-username').textContent = user.username || '';
          document.getElementById('user-email').textContent = user.email || '';
        } else {
          loginFormSection.classList.remove('hidden');
          registerFormSection.classList.add('hidden');
          userInfoSection.classList.add('hidden');
          setTimeout(() => {
            document.getElementById('login-username').focus();
          }, 100);
        }
        loginModal.classList.remove('hidden');
        clearErrors();
      });
      // Permite abrir el modal desde otras páginas (comunidad)
      window.openLoginModal = function() {
        openLoginBtn.click();
      };
    }
    // Cerrar modal
    if (loginCloseBtn && loginModal) {
      loginCloseBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        clearErrors();
      });
    }
    // Cambiar a registro
    if (showRegister) {
      showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormSection.classList.add('hidden');
        registerFormSection.classList.remove('hidden');
        userInfoSection.classList.add('hidden');
        clearErrors();
        setTimeout(() => {
          document.getElementById('register-name').focus();
        }, 100);
      });
    }
    // Cambiar a login
    if (showLogin) {
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormSection.classList.add('hidden');
        loginFormSection.classList.remove('hidden');
        userInfoSection.classList.add('hidden');
        clearErrors();
        setTimeout(() => {
          document.getElementById('login-username').focus();
        }, 100);
      });
    }

    // Registro de usuario mejorado
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        const name = document.getElementById('register-name').value.trim();
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        if (!name || !username || !email || !password) {
          registerError.textContent = 'Completa todos los campos.';
          return;
        }
        if (!/^[\w\.\-]+@[\w\.\-]+\.\w+$/.test(email)) {
          registerError.textContent = 'Email no válido.';
          return;
        }
        if (password.length < 4) {
          registerError.textContent = 'La contraseña debe tener al menos 4 caracteres.';
          return;
        }
        // Solo permite un usuario (demo simple)
        const user = getUser();
        if (user && (user.username === username || user.email === email)) {
          registerError.textContent = 'El usuario o email ya está registrado.';
          return;
        }
        localStorage.setItem('alpha_user', JSON.stringify({ name, username, email, password }));
        updateLoginBtn();
        loginFormSection.classList.add('hidden');
        registerFormSection.classList.add('hidden');
        userInfoSection.classList.remove('hidden');
        document.getElementById('user-name').textContent = name;
        document.getElementById('user-username').textContent = username;
        document.getElementById('user-email').textContent = email;
        window.dispatchEvent(new Event('storage')); // sincroniza otras pestañas
      });
    }

    // Inicio de sesión mejorado
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const user = getUser();
        if (!username || !password) {
          loginError.textContent = 'Completa todos los campos.';
          return;
        }
        if (
          (user.username === username || user.email === username) &&
          user.password === password
        ) {
          updateLoginBtn();
          loginFormSection.classList.add('hidden');
          registerFormSection.classList.add('hidden');
          userInfoSection.classList.remove('hidden');
          document.getElementById('user-name').textContent = user.name || '';
          document.getElementById('user-username').textContent = user.username || '';
          document.getElementById('user-email').textContent = user.email || '';
          window.dispatchEvent(new Event('storage'));
        } else {
          loginError.textContent = 'Usuario o contraseña incorrectos.';
        }
      });
    }

    // Cerrar sesión
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('alpha_user');
        updateLoginBtn();
        loginModal.classList.add('hidden');
        loginFormSection.classList.remove('hidden');
        registerFormSection.classList.add('hidden');
        userInfoSection.classList.add('hidden');
        clearErrors();
        window.dispatchEvent(new Event('storage'));
      });
    }

    // Cerrar modal con Escape y cerrar al hacer click fuera del modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && loginModal && !loginModal.classList.contains('hidden')) {
        loginModal.classList.add('hidden');
        clearErrors();
      }
    });
    if (loginModal) {
      loginModal.addEventListener('mousedown', function(e) {
        if (e.target === loginModal) {
          loginModal.classList.add('hidden');
          clearErrors();
        }
      });
    }

    // --- Mostrar detalles del juego ---
    function mostrarDetallesJuego(juego) {
        const detallesSection = document.getElementById('juego-detalles');
        const detallesContainer = detallesSection.querySelector('.detalles-container');
        // Imagen
        const imagen = detallesContainer.querySelector('#detalles-imagen');
        imagen.src = juego.imagen;
        imagen.alt = juego.titulo;
        // Fondo con la imagen del juego y elimina cualquier color de fondo
        detallesSection.style.backgroundImage = `url('${juego.imagen}')`;
        detallesSection.style.backgroundSize = 'cover';
        detallesSection.style.backgroundPosition = 'center';
        detallesSection.style.backgroundRepeat = 'no-repeat';
        detallesSection.style.backgroundColor = ''; // Elimina el color de fondo
        // Título y categoría
        detallesContainer.querySelector('.detalles-info h2').textContent = juego.titulo;
        detallesContainer.querySelector('.detalles-categoria').textContent = juego.categoria;
        // Plataformas
        const plataformasContainer = detallesContainer.querySelector('.detalles-plataformas');
        plataformasContainer.innerHTML = '';
        juego.plataformas.forEach(plataforma => {
            const span = document.createElement('span');
            span.textContent = plataforma;
            span.className = 'plataforma';
            plataformasContainer.appendChild(span);
        });
        // Descripción
        detallesContainer.querySelector('.detalles-descripcion').textContent = juego.descripcion;
        // Características
        const caracteristicasList = detallesContainer.querySelector('.detalles-caracteristicas ul');
        caracteristicasList.innerHTML = '';
        juego.caracteristicas.forEach(caracteristica => {
            const li = document.createElement('li');
            li.textContent = caracteristica;
            caracteristicasList.appendChild(li);
        });
        // Enlaces
        const enlacesGrid = detallesContainer.querySelector('.enlaces-grid');
        enlacesGrid.innerHTML = '';
        if (juego.enlaces && juego.enlaces.length > 0) {
            detallesContainer.querySelector('.detalles-enlaces').style.display = 'block';
            juego.enlaces.forEach(enlace => {
                const link = document.createElement('a');
                link.href = enlace.url;
                link.target = '_blank';
                link.className = 'enlace-juego';
                                                                                                                                                                                                                       const icono = document.createElement('i');
                icono.className = `fab fa-${enlace.icono}`;
                const texto = document.createElement('span');
                texto.textContent = enlace.texto;
                link.appendChild(icono);
                link.appendChild(texto);
                enlacesGrid.appendChild(link);
            });
        } else {
            detallesContainer.querySelector('.detalles-enlaces').style.display = 'none';
        }
        // Video
        const videoContainer = detallesContainer.querySelector('.detalles-video');
        videoContainer.innerHTML = '';
        // Asegura que juego.enlaces exista y sea un array
        const enlacesArray = Array.isArray(juego.enlaces) ? juego.enlaces : [];
        const trailerEnlace = enlacesArray.find(enlace =>
            enlace.texto && (
                enlace.texto.toLowerCase().includes('tráiler') ||
                enlace.texto.toLowerCase().includes('trailer') ||
                enlace.texto.toLowerCase().includes('video')
            )
        );
        if (trailerEnlace || juego.videoUrl) {
            videoContainer.style.display = 'block';
            const iframe = document.createElement('iframe');
            let videoUrl = '';
            const url = trailerEnlace ? trailerEnlace.url : juego.videoUrl;
            // Si es un enlace de YouTube, embebe, si no, usa la url tal cual (para videos locales)
            const match = url ? url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/) : null;
            if (match) {
                videoUrl = `https://www.youtube.com/embed/${match[1]}`;
            } else {
                videoUrl = url;
            }
            iframe.src = videoUrl;
            iframe.title = `Video de ${juego.titulo}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        } else {
            videoContainer.style.display = 'none';
        }
        detallesSection.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // --- Obtener datos del juego ---
    function obtenerDatosJuego(juegoId) {
        return datosJuegos[juegoId];
    }

    // ¡Aquí guardo todos los datos de los juegos! Es como mi biblioteca personal
    const datosJuegos = {
        "baldurs-gate": {
            titulo: "Baldur's Gate 3",
            imagen: "images/baldurs-gate-3-review_z2q4.jpg",
            categoria: "RPG, Fantasía",
            plataformas: ["PC", "PlayStation 5", "Xbox Series X|S"],
            descripcion: "Sumérgete en un mundo de fantasía épica en Baldur's Gate 3, un RPG de la aclamada Larian Studios. Elige entre una amplia gama de razas y clases, forma un grupo de compañeros únicos y embárcate en una aventura moldeada por tus decisiones. Un parásito mental ha sido implantado en tu mente, otorgándote poderes misteriosos pero amenazando con transformarte. ¿Resistirás la oscuridad o la abrazarás?",
            caracteristicas: [
                "Un sistema de combate por turnos profundo y táctico basado en D&D 5e.",
                "Una historia épica con múltiples finales basados en tus decisiones.",
                "Gráficos impresionantes y un mundo detallado para explorar.",
                "Un elenco de personajes memorables con sus propias historias y motivaciones.",
                "Modo multijugador cooperativo para hasta 4 jugadores."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://baldursgate3.game/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/XuCfkgaaa08?si=oYjGRO5O7-SHT2E0" ,
                    icono: "youtube"
                }
            ],
        videoUrl: "https://www.youtube.com/embed/XuCfkgaaa08?si=oYjGRO5O7-SHT2E0" ,
            
        },
        "zelda": {
            titulo: "The Legend of Zelda: Tears of the Kingdom",
            imagen: "images/zelda.png",
            categoria: "Aventura, Mundo Abierto",
            plataformas: ["Nintendo Switch"],
            descripcion: "La secuela de The Legend of Zelda: Breath of the Wild lleva a Link a una aventura épica a través de las vastas tierras de Hyrule y los cielos expansivos que se extienden sobre ellas. Una nueva amenaza se cierne sobre el reino, y Link deberá despertar nuevas habilidades y forjar su camino a través de un mundo lleno de misterios, desafíos y descubrimientos.",
            caracteristicas: [
                "Exploración sin límites de un mundo interconectado, tanto en tierra como en el cielo.",
                "Nuevas habilidades para Link que permiten la creación y manipulación de objetos.",
                "Una historia épica que continúa la leyenda de Zelda.",
                "Puzzles ingeniosos y desafiantes en santuarios y mazmorras.",
                "Un elenco de personajes memorables y un mundo lleno de vida."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://www.nintendo.com/es-mx/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.zelda.com/tears-of-the-kingdom/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/uHGShqcAHlQ?si=uT482Wk2jY5erAax" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/uHGShqcAHlQ?si=uT482Wk2jY5erAax" ,
        },
        "honkai-star-rail": {
            titulo: "Honkai: Star Rail",
            imagen: "images/honkai.jpg",
            categoria: "RPG, Gacha, Aventura",
            plataformas: ["PC", "PlayStation 5", "iOS", "Android"],
            descripcion: "Embárcate en una épica aventura espacial en Honkai: Star Rail, un RPG por turnos que combina una narrativa profunda con un sistema de combate estratégico. Únete a la tripulación del Astral Express mientras viajan por el universo, descubriendo misterios y enfrentándose a desafíos únicos en cada mundo que visitan.",
            caracteristicas: [
                "Sistema de combate por turnos estratégico y profundo",
                "Narrativa inmersiva con personajes memorables",
                "Gráficos de alta calidad con estilo anime",
                "Sistema de personajes coleccionables con mecánicas únicas",
                "Mundos diversos con diferentes mecánicas y desafíos"
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://hsr.hoyoverse.com/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://hsr.hoyoverse.com/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/CxGowChsEdo?si=3OU9HbRfbKCSUwpc",
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/CxGowChsEdo?si=3OU9HbRfbKCSUwpc"
       
        },
        "fc-24": {
            titulo: "EA SPORTS FC 25",
            imagen: "images/fc 25.jpg",
            categoria: "Deportes, Simulación de Fútbol",
            plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch"],
            descripcion: "Vive la emoción del fútbol mundial con EA SPORTS FC 25, la nueva era del juego de fútbol interactivo. Con ligas, equipos y jugadores auténticos, gráficos mejorados y una jugabilidad inmersiva, cada partido se siente como si estuvieras en el campo. Construye tu equipo de ensueño en Ultimate Team, lidera a tu club a la gloria en el Modo Carrera o salta al campo para partidos rápidos y emocionantes.",
            caracteristicas: [
                "Autenticidad incomparable con licencias de las ligas, clubes y jugadores más importantes del mundo.",
                "Gráficos de nueva generación que ofrecen un realismo visual sorprendente.",
                "Jugabilidad mejorada con nuevas mecánicas y animaciones fluidas.",
                "El popular modo Ultimate Team para construir y competir con tu equipo ideal.",
                "Modos de carrera inmersivos para jugador y entrenador."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://www.ea.com/es-es/games/ea-sports-fc/fc-24/buy",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.ea.com/es-es/games/ea-sports-fc/fc-24",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/pBM2xyco_Kg?si=bn0l9E8QtESO1w-X" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/pBM2xyco_Kg?si=bn0l9E8QtESO1w-X" ,
            
        },
        "zenless": {
            titulo: "Zenless Zone Zero",
            imagen: "images/zenless.png",
            categoria: "Acción RPG, Urbano, Anime",
            plataformas: ["PC", "PlayStation 5", "iOS", "Android"],
            descripcion: "Adéntrate en el vibrante y peligroso mundo de Zenless Zone Zero, un nuevo Action RPG de HoYoverse ambientado en una metrópolis moderna post-apocalíptica. Conviértete en un 'Proxy' y guía a un grupo de singulares agentes a través de los 'Hollows', dimensiones peligrosas llenas de misterios y amenazas. Con un estilo visual anime distintivo y un sistema de combate dinámico, tu aventura en Nueva Eridu apenas comienza.",
            caracteristicas: [
                "Un estilo visual anime urbano moderno y atractivo.",
                "Un sistema de combate de acción en tiempo real fluido y estilizado.",
                "Un elenco de personajes carismáticos con habilidades únicas.",
                "Una historia intrigante ambientada en una ciudad al borde del colapso.",
                "Exploración de entornos urbanos y dimensiones paralelas ('Hollows')."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://zenless.hoyoverse.com/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://zenless.hoyoverse.com/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/bLEL0nU0LxI?si=TSHo0Fdc-PIWhzhc" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/bLEL0nU0LxI?si=TSHo0Fdc-PIWhzhc" ,
            
        },
        "marvel-rivals": {
            titulo: "Marvel Rivals",
            imagen: "images/marvel rivals.png",
            categoria: "Shooter Heroico, PvP, Multijugador",
            plataformas: ["PC", "PlayStation 5", "Xbox Series X|S"],
            descripcion: "Prepárate para la acción superpoderosa en Marvel Rivals, un shooter heroico PvP multijugador donde equipos de héroes y villanos de Marvel se enfrentan en batallas dinámicas y destructibles. Forma tu escuadrón, domina las habilidades únicas de cada personaje y desata combos devastadores en escenarios icónicos del Universo Marvel.",
            caracteristicas: [
                "Un roster diverso de héroes y villanos icónicos de Marvel.",
                "Combate en equipo dinámico y estratégico.",
                "Escenarios destructibles que cambian el curso de la batalla.",
                "Poderosas habilidades y combos únicos para cada personaje.",
                "Un universo Marvel reimaginado con giros inesperados."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://store.steampowered.com/app/2346830/Marvel_Rivals/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://marvel.com/games/marvel-rivals",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/thyG51IdChc?si=yhx-R4U0W1Rc-wCN" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/thyG51IdChc?si=yhx-R4U0W1Rc-wCN" ,
       
        },
        "gta-v": {
            titulo: "Grand Theft Auto V",
            imagen: "images/grand-theft-auto-v-gta-5-poster_1920x1080_xtrafondos.com.jpg",
            categoria: "Acción",
            plataformas: ["PC", "PS5", "PS4", "Xbox Series X", "Xbox One"],
            descripcion: "Adéntrate en el vasto y vibrante mundo de Los Santos y el condado de Blaine en Grand Theft Auto V. Experimenta las vidas entrelazadas de tres criminales muy diferentes: Michael, un ex ladrón de bancos buscando una vida tranquila; Franklin, un joven estafador callejero en busca de oportunidades; y Trevor, un maníaco impredecible impulsado por la adrenalina y la violencia. Sus ambiciones y circunstancias los llevarán a una serie de golpes audaces y peligrosos en una ciudad corrupta donde el dinero y el poder lo son todo.",
            caracteristicas: [
                "Un extenso y detallado mundo abierto para explorar libremente.",
                "Tres personajes jugables con historias interconectadas.",
                "Una trama principal cinematográfica llena de giros y humor negro.",
                "Innumerables misiones secundarias y actividades para realizar.",
                "Un modo multijugador online masivo y dinámico: Grand Theft Auto Online.",
                "Gran variedad de vehículos terrestres, aéreos y acuáticos.",
                "Un sistema de personalización de personajes y vehículos.",
                "Actualizaciones constantes de contenido para GTA Online."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.rockstargames.com/games/V",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/hvoD7ehZPcM?si=XJCR6JS2WWMnAGrC" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/hvoD7ehZPcM?si=XJCR6JS2WWMnAGrC" ,
            
        },
        "fortnite": {
            titulo: "Fortnite",
            imagen: "images/fornite.png",
            categoria: "Battle Royale, Shooter, Construcción",
            plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch", "Android"],
            descripcion: "Salta del autobús de batalla y lucha por ser el último en pie en Fortnite, el fenómeno global que combina acción shooter con elementos de construcción. Explora una isla en constante evolución, recolecta recursos, construye estructuras defensivas y ofensivas, y enfréntate a otros jugadores en intensas batallas hasta que solo quede un ganador. Con eventos regulares, colaboraciones y modos de juego variados, la diversión nunca termina.",
            caracteristicas: [
                "Un modo Battle Royale masivo y gratuito para jugar.",
                "Un sistema de construcción único que añade profundidad estratégica.",
                "Eventos de temporada y colaboraciones con franquicias populares.",
                "Una gran variedad de armas, objetos y vehículos.",
                "Actualizaciones constantes con nuevo contenido y modos de juego."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://www.epicgames.com/fortnite/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.epicgames.com/fortnite/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/fTBRpV4iNR8?si=DnASbBbvEXV7yIya" ,
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/fTBRpV4iNR8?si=DnASbBbvEXV7yIya" ,
           
        },
        "minecraft": {
            titulo: "Minecraft",
            imagen: "images/minecraft.jpg",
            categoria: "Sandbox, Aventura, Supervivencia, Creatividad",
            plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch", "iOS", "Android"],
            descripcion: "Desata tu creatividad y explora mundos infinitos en Minecraft, un juego sandbox que te permite construir cualquier cosa que puedas imaginar. Extrae recursos, fabrica herramientas, construye estructuras, lucha contra monstruos y sobrevive en entornos diversos. Juega solo o con amigos en un mundo donde los límites solo los pone tu imaginación.",
            caracteristicas: [
                "Un mundo generado proceduralmente que ofrece una exploración infinita.",
                "Libertad total para construir cualquier cosa que imagines con bloques.",
                "Un modo Supervivencia desafiante donde debes recolectar recursos y defenderte de criaturas.",
                "Un modo Creativo donde tienes recursos ilimitados para construir sin restricciones.",
                "Posibilidad de jugar en solitario o en modo multijugador con amigos.",
                "Una comunidad activa que crea mods, mapas y servidores personalizados."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://www.minecraft.net/es-es/store/minecraft-deluxe-collection-pc",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.minecraft.net/es-es",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/3ad8n7T9GEI?si=si900XI9itNSIewr",
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/3ad8n7T9GEI?si=si900XI9itNSIewr" ,
            
        },
        "cyberpunk": {
            titulo: "Cyberpunk 2077",
            imagen: "images/cyberpunk-2077.jpg",
            categoria: "RPG, Mundo Abierto, Ciencia Ficción",
            plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One"],
            descripcion: "Sumérgete en la metrópolis futurista de Night City en Cyberpunk 2077, un RPG de mundo abierto donde juegas como V, un mercenario en busca de un implante único que es la clave para la inmortalidad. Explora una ciudad vibrante y peligrosa, toma decisiones que impactan la historia y personaliza a tu personaje con implantes cibernéticos y habilidades únicas.",
            caracteristicas: [
                "Un vasto y detallado mundo abierto para explorar: Night City.",
                "Una historia profunda y ramificada con múltiples finales posibles.",
                "Amplia personalización del personaje, incluyendo implantes cibernéticos.",
                "Un sistema de combate dinámico con diversas armas y habilidades.",
                "Un elenco de personajes memorables e intrigantes."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://www.cyberpunk.net/es",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/1gvGn8NtIpE?si=hUeGj6vpyyIfLwhf",
                    icono: "youtube"
                }
            ],
        videoUrl: "https://www.youtube.com/embed/1gvGn8NtIpE?si=hUeGj6vpyyIfLwhf",
        },
        "Gigabash": {
            titulo: "Gigabash",
            imagen: "images/gigabash.jpg",
            categoria: "Acción y aventura, Campo de batalla en línea, Juegos de rol",
            plataformas: ["PC", "PlayStation 5", "Xbox Series X/S"],
            descripcion: "¡Lucha como un kaiju gigante o un héroe titánico en Gigabash! Destruye ciudades, enfréntate a otros monstruos y domina el campo de batalla en este juego multijugador lleno de acción y caos.",
            caracteristicas: [
                "Combate multijugador local y en línea para hasta 4 jugadores.",
                "Destrucción de escenarios y poderes especiales únicos.",
                "Variedad de monstruos y héroes jugables.",
                "Modos de juego cooperativos y competitivos.",
                "Estilo visual colorido y animado."
            ],
            enlaces: [
                {
                    texto: "Comprar",
                    url: "https://store.steampowered.com/app/1546400/GigaBash/",
                    icono: "shopping-cart"
                },
                {
                    texto: "Sitio Oficial",
                    url: "https://twinfinite.com/2021/06/gigabash-release-date-trailer/",
                    icono: "globe"
                },
                {
                    texto: "Tráiler",
                    url: "https://www.youtube.com/embed/az7vXvvI2jA?si=dcWy3PWkzKH_X5XG",
                    icono: "youtube"
                }
            ],
            videoUrl: "https://www.youtube.com/embed/az7vXvvI2jA?si=dcWy3PWkzKH_X5XG",
        },

    };
});
