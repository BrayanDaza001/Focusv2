import { openModal, closeModal } from "../global/modales_scripts";
import { updateProyecto } from "../../services/proyectos";
let proyectoIndexSeleccionado = null;
let proyectoSeleccionado = null;
const modal = document.getElementById("toogle_accion");
const tabla = document.getElementById("tabla-nomenclatura");
const btnCancelarModal = document.getElementById("btn_cancelar_modal");
const btnConfirmarModal = document.getElementById("confirmar_btn_modal");


btnCancelarModal?.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(modal);
});
btnConfirmarModal?.addEventListener("click", async (event) => {
  event.preventDefault();

const fila = document.querySelector(
  `.btn-toogle[data-id="toogle-${proyectoIndexSeleccionado}"]`
);

const idProyecto = Number(fila.dataset.proyectoId);
const estadoActual = fila.dataset.estado === "true";

await updateProyecto(proyectoSeleccionado.id, {
  ...proyectoSeleccionado,
  activo: !proyectoSeleccionado.activo
});

closeModal(modal);

location.reload();
});
tabla?.addEventListener("click", (event) => {
  const btnToggle = event.target.closest(".btn-toogle");
  if (!btnToggle) return;
  proyectoSeleccionado = {
  id: Number(btnToggle.dataset.proyectoId),
  glpi: btnToggle.dataset.glpi,
  siigo: btnToggle.dataset.siigo,
  codigo: btnToggle.dataset.codigo,
  activo: btnToggle.dataset.estado === "true"
};
  if (!btnToggle) return;

const contenedor = btnToggle.parentElement;

proyectoIndexSeleccionado = Number(
  contenedor.getAttribute("id")
);


  const estado = btnToggle.dataset.estado === "true";
  const accion = estado ? "Desactivar" : "Activar";

  const titulo = document.getElementById("modal-titulo");
  const texto = document.getElementById("modal-texto");
  const icono = document.getElementById("modal-icono");
  const iconoBg = document.getElementById("modal-icono-bg");
  const boton = document.getElementById("confirmar_btn_modal");
  const advertencia = document.getElementById("modal-advertencia");

  if (accion === "Activar") {
    titulo.textContent = "Activar proyecto";
    texto.textContent = "Activar este proyecto?";

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

    advertencia.textContent = "Se habilitaran sincronizaciones.";
  } else {
    titulo.textContent = "Desactivar proyecto";
    texto.textContent = "Desactivar este proyecto?";

    icono.innerHTML = `
      <svg class="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 13h-2V7h2m0 10h-2v-2h2m-1-13C6.47 2 2 6.5 2 12a10 10 0 1010-10z"/>
      </svg>
    `;

    iconoBg.classList.remove("bg-green-500/20");
    iconoBg.classList.add("bg-red-500/20");

    boton.textContent = "Desactivar";
    boton.classList.remove("bg-green-500");
    boton.classList.add("bg-red-500");

    advertencia.textContent = "Se bloquearan sincronizaciones.";
  }

  openModal(modal);
});
