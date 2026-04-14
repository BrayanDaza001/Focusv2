import { abrir_modales,cerrar_modales } from "../global/modales_scripts";

const modal = document.getElementById("toogle_accion");
const modal_editar_proyecto = document.getElementById("modal_editar_proyecto");
const tabla = document.getElementById('tabla-nomenclatura')
console.log(tabla)

tabla.addEventListener("click", (e) => {

  // 🔘 BOTÓN TOGGLE
  const btnToggle = e.target.closest(".btn-toogle");
  
  if (btnToggle) {
    const id = btnToggle.dataset.id;
    const estado = btnToggle.dataset.estado === "true";

    const accion = estado ? "Desactivar" : "Activar";

    // 🔥 TU LÓGICA DEL MODAL
    const titulo = document.getElementById("modal-titulo");
    const texto = document.getElementById("modal-texto");
    const icono = document.getElementById("modal-icono");
    const iconoBg = document.getElementById("modal-icono-bg");
    const boton = document.getElementById("confirmar_btn_modal");
    const advertencia = document.getElementById("modal-advertencia");

    if (accion === "Activar") {
      titulo.textContent = "¿Activar proyecto?";
      texto.textContent = "¿Activar este proyecto?";

      icono.innerHTML = `
      <svg class="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    `;
      iconoBg.classList.remove("bg-red-500/20");
      iconoBg.classList.add("bg-green-500/20");

      boton.textContent = "Activar";
      boton.classList.remove("bg-red-500");
      boton.classList.add("bg-green-500");

      advertencia.textContent = "Se habilitarán sincronizaciones.";
    } else {
      titulo.textContent = "¿Desactivar proyecto?";
      texto.textContent = "¿Desactivar este proyecto?";

       icono.innerHTML = `
      <svg class="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 13h-2V7h2m0 10h-2v-2h2m-1-13C6.47 2 2 6.5 2 12a10 10 0 1010-10z"/>
      </svg>
    `;
      iconoBg.classList.remove("bg-green-500/20");
      iconoBg.classList.add("bg-red-500/20");

      boton.textContent = "Desactivar";
      iconoBg.classList.remove("bg-green-500/20");
      boton.classList.add("bg-red-500");

      advertencia.textContent = "Se bloquearán sincronizaciones.";
    }

    abrir_modales(modal);
    cerrar_modales(modal)
    return; // 🔥 IMPORTANTE: evita que siga abajo
  }

  // ✏️ BOTÓN EDITAR
  const btnEditar = e.target.closest(".btn-editar-proyecto");
  if (btnEditar) {
    const id = btnEditar.dataset.id;

    console.log("Editar:", id);

abrir_modales(modal_editar_proyecto)
cerrar_modales(modal_editar_proyecto)

    return;
  }
  

});