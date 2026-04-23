import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { onOff } from "../../icons/onoff";
import { bindGridEditButtons } from "../global/gridEditModal";

const productos = [
  {
    glpi: "Mouse Optico",
    siigo: "Perifericos",
    codigo: "ACC-001",
    activado: true
  },
  {
    glpi: "Teclado Mecanico",
    siigo: "Perifericos",
    codigo: "ACC-002",
    activado: false
  },
  {
    glpi: "Cargador Laptop Universal",
    siigo: "Energia",
    codigo: "ACC-003",
    activado: true
  },
  {
    glpi: "Monitor 24 UltraWide",
    siigo: "Pantallas",
    codigo: "ACC-004",
    activado: true
  }
];

let gridSiigo = null;

function crearFilasSiigo() {
  return productos.map((columna, index) => {
    const botones = html(`
      <div class="flex flex-row justify-center items-center gap-2 w-full" id="${index}">
        <button
          data-id="editar-${index}"
          data-row-index="${index}"
          class="btn-editar-proyecto group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 active:bg-blue-500/40 transition-all duration-200"
        >
          <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
        </button>
        <button
          data-id="toogle-${index}"
          data-estado="${columna.activado}"
          class="btn-toogle group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 ${columna.activado ? "active:bg-red-500/40" : "active:bg-green-500/40"} transition-all duration-200"
        >
          <span>${onOff(`w-5 h-5 group-active:text-white ${columna.activado ? "text-green-500" : "text-red-500"}`)}</span>
        </button>
      </div>
    `);

    const glpi = html(`
      <div class="font-semibold text-[rgb(51,65,85)] flex gap-1">
        ${columna.glpi}
      </div>
    `);

    const siigo = html(`
      <div class="font-semibold text-[rgb(51,65,85)]">
        ${columna.siigo}
      </div>
    `);

    const codigo = html(`
      <div class="font-semibold text-[rgb(51,65,85)]">
        ${columna.codigo}
      </div>
    `);

    return [glpi, siigo, codigo, botones];
  });
}

function decorarBuscadorSiigo() {
  const buscador = document.querySelector("#tabla-nomenclatura .gridjs-search");
  if (!buscador || buscador.dataset.decorado === "true") return;

  const label = document.createElement("label");
  label.textContent = "Buscar nomenclatura y salvo";
  label.className = "font-semibold";
  buscador.prepend(label);

  const titulo = document.createElement("h2");
  titulo.textContent = "Historial de Actas";
  titulo.className = "titulo-tabla";
  buscador.append(titulo);

  buscador.dataset.decorado = "true";
}

function renderTablaSiigo() {
  const contenedor = document.getElementById("tabla-nomenclatura");
  if (!contenedor) return;

  const data = crearFilasSiigo();

  if (!gridSiigo) {
    gridSiigo = new Grid({
      columns: ["GLPI", "SIIGO", "CODIGO", { name: "Acciones", width: "120px" }],
      data,
      pagination: {
        enabled: true,
        limit: 10
      },
      sort: true,
      style: {
        th: {
          "background-color": "#0B3356",
          color: "white",
          "text-align": "start"
        },
        td: {
          "font-size": "14px",
          color: "rgb(51,65,85)"
        }
      }
    }).render(contenedor);
  } else {
    gridSiigo.updateConfig({ data }).forceRender();
  }

  decorarBuscadorSiigo();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTablaSiigo();
});

bindGridEditButtons({
  tableId: "tabla-nomenclatura",
  buttonSelector: ".btn-editar-proyecto",
  getRecord: (rowIndex) => productos[rowIndex],
  getModalConfig: (record, rowIndex) => ({
    modalId: "grid-edit-modal",
    context: "siigo",
    rowIndex,
    title: "Editar nomenclatura Siigo",
    description: "Actualiza la relación entre GLPI, Siigo y el código interno.",
    confirmText: "Guardar nomenclatura",
    record,
    fields: [
      {
        name: "glpi",
        label: "GLPI"
      },
      {
        name: "siigo",
        label: "Siigo"
      },
      {
        name: "codigo",
        label: "Codigo"
      }
    ],
    onConfirm: ({ values, rowIndex: currentRowIndex }) => {
      productos[currentRowIndex] = {
        ...productos[currentRowIndex],
        ...values
      };

      renderTablaSiigo();
    }
  })
});
