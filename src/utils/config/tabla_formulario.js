import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { bindGridEditButtons } from "../global/gridEditModal";

let preguntas = [
  {
    id: 1,
    pregunta: "Como te llamas?",
    tipo: "Texto"
  }
];

let grid = null;

function crearFilasFormulario() {
  return preguntas.map((pregunta, index) => [
    pregunta.id,
    pregunta.pregunta,
    pregunta.tipo,
    html(`
      <button
        data-row-index="${index}"
        class="btn-editar-proyecto group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 active:bg-blue-500/40 transition-all duration-200"
      >
        <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
      </button>
    `)
  ]);
}

function renderTabla() {
  const contenedor = document.getElementById("tabla-edit-formulario");
  if (!contenedor) return;

  const data = crearFilasFormulario();

  if (!grid) {
    grid = new Grid({
      columns: [
        "ID",
        "Pregunta",
        "Tipo",
        {
          name: "Acciones",
          width: "120px"
        }
      ],
      data,
      pagination: {
        enabled: true,
        limit: 10
      },
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

    return;
  }

  grid.updateConfig({ data }).forceRender();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabla();

  const btn = document.getElementById("boton-edit-formulario");
  if (!btn) return;

  btn.addEventListener("click", () => {
    preguntas.push({
      id: Date.now(),
      pregunta: "Nueva pregunta",
      tipo: "Texto"
    });

    renderTabla();
  });
});

bindGridEditButtons({
  tableId: "tabla-edit-formulario",
  buttonSelector: ".btn-editar-proyecto",
  getRecord: (rowIndex) => preguntas[rowIndex],
  getModalConfig: (record, rowIndex) => ({
    modalId: "grid-edit-modal",
    context: "config-formulario",
    rowIndex,
    title: "Editar pregunta",
    description: "Ajusta el contenido y el tipo de la pregunta seleccionada.",
    confirmText: "Guardar pregunta",
    record,
    fields: [
      {
        name: "id",
        label: "ID",
        readOnly: true
      },
      {
        name: "pregunta",
        label: "Pregunta",
        fullWidth: true
      },
      {
        name: "tipo",
        label: "Tipo",
        type: "select",
        options: ["Texto", "Numero", "Fecha", "Seleccion"]
      }
    ],
    onConfirm: ({ values, rowIndex: currentRowIndex }) => {
      preguntas[currentRowIndex] = {
        ...preguntas[currentRowIndex],
        ...values,
        id: preguntas[currentRowIndex].id
      };

      renderTabla();
    }
  })
});
