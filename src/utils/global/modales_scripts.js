export const cerrar_modales = (modal) => {
  if (!modal) return;

  modal.classList.remove("opacity-100", "scale-100");
  modal.classList.add("opacity-0", "scale-95", "pointer-events-none");
};

export const abrir_modales = (modal) => {
  if (!modal) return;

  modal.classList.remove("opacity-0", "scale-95", "pointer-events-none");
  modal.classList.add("opacity-100", "scale-100");
};

export const closeModal = cerrar_modales;
export const openModal = abrir_modales;


export const deshabilitarCampos = (modal) => {
    const campos = modal.querySelectorAll('input, select, textarea');

    campos.forEach(campo => {
        campo.disabled = true;
    });
};
export const habilitarCampos = (modal) => {
    const campos = modal.querySelectorAll('input, select, textarea');

    campos.forEach(campo => {
        campo.disabled = false;
    });
};
