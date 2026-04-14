document.getElementById('btn-change').addEventListener('click', async () => {
  const inputNueva = document.getElementById('input-nueva');
  const valorNueva = inputNueva.value.trim();

  const inputConfirmar = document.getElementById('input-password');
  const valorConfirmar = inputConfirmar.value.trim();

  const regexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._\-]).{8,}$/;

  const nuevaContrasena = valorNueva;

  // ❌ Validaciones
  if (!regexPass.test(valorNueva) || !regexPass.test(valorConfirmar)) {
    mostrarModal({
      title: 'Valide los datos',
      texto: 'La nueva contraseña no cumple los requisitos',
      accion: 'Reintentar',
      tipo: 'error'
    });
    return;
  }

  if (valorNueva !== valorConfirmar) {
    mostrarModal({
      title: 'Valide los datos',
      texto: 'Las contraseñas no coinciden',
      accion: 'Reintentar',
      tipo: 'error'
    });
    return;
  }

  // ✅ Fetch
  try {
    const res = await fetch('/api/api/Auth/nuevContrasena', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nuevaContrasena })
    });

    if (res.ok) {
      mostrarModal({
        title: 'Cambio exitoso',
        texto: 'Contraseña cambiada correctamente',
        accion: 'Volver al Inicio',
        tipo: 'success'
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }

  } catch (error) {
    console.error(error);
  }
});

function mostrarModal({ title, texto, accion, tipo = 'error' }) {
  const modal = document.getElementById('modal-change');
  const titleH = document.getElementById('modal-change-title');
  const textoContenido = document.getElementById('modal-change-text');
  const cerrar = document.getElementById('btn-modal');

  const iconWrapper = modal.querySelector('.mx-auto');
  const icon = modal.querySelector('.material-symbols-outlined');

  titleH.textContent = title;
  textoContenido.textContent = texto;
  cerrar.textContent = accion;

  // Reset
  iconWrapper.classList.remove('bg-red-100', 'bg-green-100');
  icon.classList.remove('text-red-600', 'text-green-600');

  if (tipo === 'success') {
    iconWrapper.classList.add('bg-green-100');
    icon.classList.add('text-green-600');
    icon.textContent = 'check_circle';
  } else {
    iconWrapper.classList.add('bg-red-100');
    icon.classList.add('text-red-600');
    icon.textContent = 'lock';
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');

  modal.addEventListener('click', cerrarModal, { once: true });
}

function cerrarModal() {
  const modal = document.getElementById('modal-change');
  const inputConfirmar = document.getElementById('input-password');
  const cerrar = document.getElementById('btn-modal');

  if (cerrar.textContent.trim() === 'Reintentar') {
    const inputNueva = document.getElementById('input-nueva');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    inputConfirmar.value = '';
    inputNueva.value = '';
  } else if (cerrar.textContent.trim() === 'Volver al Inicio') {
    window.location.href = '/';
  }
}
