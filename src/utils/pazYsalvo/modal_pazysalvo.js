import { abrir_modales, cerrar_modales } from "../global/modales_scripts.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnAbrir = document.getElementById("cargue_acta");
  const modal = document.getElementById("modal_cargar_pazysalvo");
  const btnCancelar = document.getElementById("btn_cancelar_cargue_pazysalvo");
  const btnGuardar = document.getElementById("btn_cargar_cargue_pazysalvo");

  if (btnAbrir && modal) {
    btnAbrir.addEventListener("click", () => abrir_modales(modal));
  }
  if (btnCancelar && modal) {
    btnCancelar.addEventListener("click", () => cerrar_modales(modal));
  }
  if (btnGuardar && modal) {
    btnGuardar.addEventListener("click", () => cerrar_modales(modal));
  }
});
