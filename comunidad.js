document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('comentario-form');
  const textarea = document.getElementById('mensaje');
  const lista = document.getElementById('comentarios-lista');
  const loginMsg = document.getElementById('comentario-login-msg');
  const foroTabs = document.querySelectorAll('.foro-tab');
  const usuarioComunidad = document.getElementById('usuario-comunidad');
  let foroActual = 'general';

  function usuarioAutenticado() {
    const user = JSON.parse(localStorage.getItem('alpha_user') || '{}');
    return user && user.username;
  }

  function mostrarFormSegunLogin() {
    if (usuarioAutenticado()) {
      form.style.display = '';
      loginMsg.style.display = 'none';
      usuarioComunidad.textContent = "Usuario: " + JSON.parse(localStorage.getItem('alpha_user')).username;
    } else {
      form.style.display = 'none';
      loginMsg.style.display = '';
      usuarioComunidad.textContent = "";
    }
    // Actualiza el botón de login y usuario arriba
    if (typeof updateLoginBtn === "function") updateLoginBtn();
    else {
      const btn = document.getElementById('open-login-modal');
      const userDisplay = document.getElementById('user-display');
      const user = JSON.parse(localStorage.getItem('alpha_user') || '{}');
      if (btn) {
        if (user && user.username) {
          btn.textContent = "Mi cuenta";
          btn.title = "Ver información de usuario o cerrar sesión";
          if (userDisplay) userDisplay.textContent = "Usuario: " + user.username;
        } else {
          btn.textContent = "Iniciar Sesión";
          btn.title = "Iniciar sesión o registrarse";
          if (userDisplay) userDisplay.textContent = "";
        }
      }
    }
  }

  foroTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      foroTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      foroActual = this.dataset.foro;
      mostrarFormSegunLogin();
      cargarComentarios();
    });
  });

  function cargarComentarios() {
    const comentariosForos = JSON.parse(localStorage.getItem('alpha_comentarios_foros') || '{}');
    const comentarios = comentariosForos[foroActual] || [];
    lista.innerHTML = '';
    if (comentarios.length === 0) {
      lista.innerHTML = '<p class="comentario-vacio">No hay comentarios aún en este foro.</p>';
    } else {
      comentarios.forEach((comentario, idx) => {
        const div = document.createElement('div');
        div.className = 'comentario-item';
        div.innerHTML = `
          <div class="comentario-contenido">${comentario.texto}</div>
          <div class="comentario-meta">
            <span class="comentario-fecha">${comentario.fecha} - <b>${comentario.usuario}</b></span>
            ${usuarioAutenticado() && comentario.usuario === JSON.parse(localStorage.getItem('alpha_user')).username
              ? `<button class="comentario-eliminar" title="Eliminar comentario" data-idx="${idx}"><i class="fas fa-trash"></i></button>`
              : ''}
          </div>
        `;
        lista.appendChild(div);
      });
    }
  }

  function actualizarVistaComentarios() {
    mostrarFormSegunLogin();
    cargarComentarios();
  }

  actualizarVistaComentarios();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!usuarioAutenticado()) {
      mostrarFormSegunLogin();
      return;
    }
    const texto = textarea.value.trim();
    if (!texto) return;
    const user = JSON.parse(localStorage.getItem('alpha_user'));
    if (!user || !user.username) {
      mostrarFormSegunLogin();
      return;
    }
    const comentariosForos = JSON.parse(localStorage.getItem('alpha_comentarios_foros') || '{}');
    const comentarios = comentariosForos[foroActual] || [];
    const fecha = new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    comentarios.unshift({ texto, fecha, usuario: user.username });
    comentariosForos[foroActual] = comentarios;
    localStorage.setItem('alpha_comentarios_foros', JSON.stringify(comentariosForos));
    textarea.value = '';
    actualizarVistaComentarios();
  });

  lista.addEventListener('click', function(e) {
    if (e.target.closest('.comentario-eliminar')) {
      const idx = e.target.closest('.comentario-eliminar').dataset.idx;
      const comentariosForos = JSON.parse(localStorage.getItem('alpha_comentarios_foros') || '{}');
      const comentarios = comentariosForos[foroActual] || [];
      const user = JSON.parse(localStorage.getItem('alpha_user'));
      if (comentarios[idx].usuario === user.username) {
        comentarios.splice(idx, 1);
        comentariosForos[foroActual] = comentarios;
        localStorage.setItem('alpha_comentarios_foros', JSON.stringify(comentariosForos));
        actualizarVistaComentarios();
      }
    }
  });

  // Abrir el modal de login de la página principal
  document.getElementById('abrir-login-comunidad').addEventListener('click', function(e) {
    e.preventDefault();
    // Busca el botón de login principal y haz click para abrir el modal
    const openLoginBtn = window.parent ? window.parent.document.getElementById('open-login-modal') : document.getElementById('open-login-modal');
    if (openLoginBtn) {
      openLoginBtn.click();
    } else if (window.openLoginModal) {
      window.openLoginModal();
    } else {
      alert('Función de login no implementada aquí. Usa el botón de login principal.');
    }
  });

  window.addEventListener('storage', function(e) {
    if (e.key === 'alpha_user') {
      actualizarVistaComentarios();
    }
  });
});
