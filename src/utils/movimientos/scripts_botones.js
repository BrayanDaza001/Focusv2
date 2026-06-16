import { abrir_modales, cerrar_modales } from "../global/modales_scripts";
import { accesorios } from "../accesorios/accesoriosData";

const btn_cargar_robo = document.getElementById("cargar_robo");
const btn_generar_acta = document.getElementById("btn_generar_acta");
const btn_realizar_formulario = document.getElementById(
  "btn_realizar_formulario",
);
const btn_abrir_accesorios_acta = document.getElementById(
  "btn_abrir_accesorios_acta",
);
const btn_agregar_accesorios_acta = document.getElementById(
  "btn_agregar_accesorios_acta",
);

const modal_acta_robo = document.getElementById("modal_acta_robo");
const modal_generar_actas = document.getElementById("modal_generar_actas");
const modal_registro_elementos = document.getElementById(
  "modal_registro_elementos",
);
const modal_accesorios_acta = document.getElementById("modal_accesorios_acta");
const btn_cerrar_modal_accesorios_acta = document.getElementById(
  "btn_cerrar_modal_accesorios_acta",
);
const btn_cancelar_acta_robo = document.getElementById("cancelar_Robo");
const btn_cancelar_generar_acta = document.getElementById(
  "cancelar_generar_acta",
);
const btn_cancelar_formulario = document.getElementById("cancelar_formulario");
const btn_cerrar_modal_sin_seleccion = document.getElementById(
  "btn_cerrar_modal_sin_seleccion",
);
const accesoriosActaList = document.getElementById("accesorios-acta-list");
const elementosActaContainer = document.getElementById("elementos-acta");
const container_acta_robo = document.getElementById("container_acta_robo");

function renderAccesoriosActa() {
  if (!accesoriosActaList) return;

  accesoriosActaList.innerHTML = accesorios
    .map(
      (item, index) => `
        <label class="border border-slate-200 rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors duration-200">
          <input
            type="checkbox"
            name="accesorioActaSeleccionado"
            value="${index}"
            class="accent-sky-600 w-4 h-4"
          />
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-slate-900 truncate">${item.nombre}</p>
            <p class="text-xs text-slate-500 truncate">${item.categoria}</p>
            <p class="text-xs text-slate-500">Stock: ${item.stock}</p>
          </div>
        </label>
      `,
    )
    .join("");
}

function buildAccesorioActaElemento(accesorio, index) {
  return `
    <div
      class="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm flex items-start gap-3"
      data-accesorio-id="${index}"
    >
      <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">
        📎
      </div>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold text-slate-900">
          ${accesorio.nombre}
        </p>
        <p class="truncate text-xs text-slate-500">
          ${accesorio.categoria}
        </p>
        <p class="truncate text-xs text-slate-500">
          Stock: ${accesorio.stock}
        </p>
      </div>

      <button
        type="button"
        class="btn-eliminar-accesorio text-red-500 hover:text-red-700 text-lg font-bold"
        data-accesorio-id="${index}"
        title="Quitar accesorio"
      >
        ✕
      </button>
    </div>
  `;
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-eliminar-accesorio");

  if (!btn) return;

  const card = btn.closest("[data-accesorio-id]");

  if (card) {
    card.remove();
  }
});
function appendAccesoriosSeleccionados() {
  if (!accesoriosActaList || !elementosActaContainer) return;

  const selectedIndexes = Array.from(
    accesoriosActaList.querySelectorAll(
      'input[name="accesorioActaSeleccionado"]:checked',
    ),
  ).map((input) => Number(input.value));

  if (selectedIndexes.length === 0) {
    return;
  }

  const existingIds = new Set(
    Array.from(
      elementosActaContainer.querySelectorAll("[data-accesorio-id]"),
    ).map((node) => Number(node.dataset.accesorioId)),
  );

  const nuevos = selectedIndexes
    .filter((index) => !existingIds.has(index))
    .map((index) => buildAccesorioActaElemento(accesorios[index], index));

  if (nuevos.length > 0) {
    elementosActaContainer.insertAdjacentHTML("beforeend", nuevos.join(""));
  }

  if (modal_accesorios_acta) {
    cerrar_modales(modal_accesorios_acta);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAccesoriosActa();

  // Modales
  if (btn_cancelar_acta_robo) {
    btn_cancelar_acta_robo.addEventListener("click", (event) => {
      event.preventDefault();
      cerrar_modales(modal_acta_robo);
    });
  }

  if (btn_cancelar_generar_acta) {
    btn_cancelar_generar_acta.addEventListener("click", (event) => {
      event.preventDefault();
      cerrar_modales(modal_generar_actas);
    });
  }

  if (btn_cerrar_modal_sin_seleccion) {
    btn_cerrar_modal_sin_seleccion.addEventListener("click", (event) => {
      event.preventDefault();
      const modalSinSeleccion = document.getElementById("modal_sin_seleccion");
      if (modalSinSeleccion) {
        cerrar_modales(modalSinSeleccion);
      }
    });
  }

  if (btn_abrir_accesorios_acta) {
    btn_abrir_accesorios_acta.addEventListener("click", () => {
      renderAccesoriosActa();
      abrir_modales(modal_accesorios_acta);
    });
  }

  if (btn_cerrar_modal_accesorios_acta) {
    btn_cerrar_modal_accesorios_acta.addEventListener("click", (event) => {
      event.preventDefault();
      cerrar_modales(modal_accesorios_acta);
    });
  }

  if (btn_agregar_accesorios_acta) {
    btn_agregar_accesorios_acta.addEventListener("click", (event) => {
      event.preventDefault();
      appendAccesoriosSeleccionados();
    });
  }

  if (btn_realizar_formulario) {
    btn_realizar_formulario.addEventListener("click", () => {
      abrir_modales(modal_registro_elementos);
    });
  }

  if (btn_cancelar_formulario) {
    btn_cancelar_formulario.addEventListener("click", (event) => {
      event.preventDefault();
      cerrar_modales(modal_registro_elementos);
    });
  }
});

// Acta de robo
