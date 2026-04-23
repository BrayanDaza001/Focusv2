import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { basura } from "../../icons/basura";
import { mouse } from "../../icons/mouse";
import { keyboard } from "../../icons/keyboard";
import { plug } from "../../icons/plug";
import { monitor } from "../../icons/monitor";
import { bindGridEditButtons } from "../global/gridEditModal";

const productos = [
  {
    imagen: "mouse",
    nombre: "Mouse Optico",
    categoria: "Perifericos",
    stock: 42
  },
  {
    imagen: "keyboard",
    nombre: "Teclado Mecanico",
    categoria: "Perifericos",
    stock: 15
  },
  {
    imagen: "plug",
    nombre: "Cargador Laptop Universal",
    categoria: "Energia",
    stock: 5
  },
  {
    imagen: "monitor",
    nombre: "Monitor 24 UltraWide",
    categoria: "Pantallas",
    stock: 2
  }
];

let gridAccesorios = null;

function crearFilasAccesorios() {
  const iconos = { mouse, keyboard, plug, monitor };

  return productos.map((columna, index) => {
    const imagen = html(`<span class="flex items-center justify-center">${
      iconos[columna.imagen]
        ? iconos[columna.imagen]("w-6 h-6")
        : '<svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
    }</span>`);

    const nombre = html(`
      <div class="font-semibold text-[rgb(51,65,85)]">
        ${columna.nombre}
      </div>
    `);

    const categoria = html(`
      <p class="text-[rgb(51,65,85)]">${columna.categoria}</p>
    `);

    const stock = html(`
      <div class="text-center w-full h-6 flex items-center justify-center rounded-full">
        <span class="${
          columna.stock <= 5
            ? "bg-red-400/40 text-red-700 font-semibold"
            : "bg-blue-500/40 text-blue-700 font-semibold"
        } px-2 py-1 rounded-full">
          ${columna.stock}
        </span>
      </div>
    `);

    const botones = html(`
      <div class="flex flex-row justify-center items-center gap-2 w-full" id="${index}">
        <button
          data-id="editar-${index}"
          data-row-index="${index}"
          class="btn-editar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 active:bg-blue-500/40 transition-all duration-200"
        >
          <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
        </button>
        <button
          data-id="eliminar-${index}"
          class="btn-eliminar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 active:bg-red-500/40 transition-all duration-200"
        >
          <span class="flex items-center justify-center -translate-x-0.5">${basura("w-5 h-5 text-red-400 group-active:text-white")}</span>
        </button>
      </div>
    `);

    return [imagen, nombre, categoria, stock, botones];
  });
}

function decorarBuscador() {
  const buscador = document.querySelector("#tabla-accesorios .gridjs-search");
  if (!buscador || buscador.dataset.decorado === "true") return;

  const label = document.createElement("label");
  label.textContent = "Buscar Actas";
  label.className = "font-semibold";
  buscador.prepend(label);

  const titulo = document.createElement("h2");
  titulo.textContent = "Historial de Actas";
  titulo.className = "titulo-tabla";
  buscador.append(titulo);

  buscador.dataset.decorado = "true";
}

function renderTablaAccesorios() {
  const contenedor = document.getElementById("tabla-accesorios");
  if (!contenedor) return;

  const data = crearFilasAccesorios();

  if (!gridAccesorios) {
    gridAccesorios = new Grid({
      columns: ["Imagen", "Nombre", "Categoria", "Stock", "Acciones"],
      data,
      pagination: {
        enabled: true,
        limit: 10
      },
      search: true,
      sort: true,
      style: {
        th: {
          "background-color": "#0B3356",
          color: "white",
          "text-align": "center"
        },
        td: {
          "font-size": "14px",
          color: "rgb(51,65,85)"
        }
      }
    }).render(contenedor);
  } else {
    gridAccesorios.updateConfig({ data }).forceRender();
  }

  decorarBuscador();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTablaAccesorios();
});

bindGridEditButtons({
  tableId: "tabla-accesorios",
  buttonSelector: ".btn-editar-accesorio",
  getRecord: (rowIndex) => productos[rowIndex],
  getModalConfig: (record, rowIndex) => ({
    modalId: "grid-edit-modal",
    context: "accesorios",
    rowIndex,
    title: "Editar accesorio",
    description: "Actualiza la información base del accesorio seleccionado.",
    confirmText: "Guardar accesorio",
    record,
    fields: [
      {
        name: "imagen",
        label: "Tipo de icono",
        placeholder: "mouse, keyboard, plug o monitor"
      },
      {
        name: "nombre",
        label: "Nombre"
      },
      {
        name: "categoria",
        label: "Categoria"
      },
      {
        name: "stock",
        label: "Stock",
        type: "number"
      }
    ],
    onConfirm: ({ values, rowIndex: currentRowIndex }) => {
      productos[currentRowIndex] = {
        ...productos[currentRowIndex],
        ...values
      };

      renderTablaAccesorios();
    }
  })
});
