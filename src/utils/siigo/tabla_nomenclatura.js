import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { onOff } from "../../icons/onoff";
import { bindGridEditButtons } from "../global/gridEditModal";
import { getProyectos,updateProyecto } from "../../services/proyectos";

async function cargarProyectos() {
  proyectos = await getProyectos();

  console.log(proyectos);

  renderTablaSiigo();
}
 async function actualizarProyecto(id, data) {
  try {
    await fetch(`http://localhost:3000/proyectos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
  }
}

let proyectos = [];

let gridSiigo = null;

function crearFilasSiigo() {
  return proyectos.map((columna, index) => {
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
  data-proyecto-id="${columna.id}"
  data-glpi="${columna.glpi}"
  data-siigo="${columna.siigo}"
  data-codigo="${columna.codigo}"
  data-estado="${columna.activo}"
  class="btn-toogle group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 ${columna.activo ? "active:bg-red-500/40" : "active:bg-green-500/40"} transition-all duration-200"
>
  <span>${onOff(`w-5 h-5 group-active:text-white ${columna.activo ? "text-green-500" : "text-red-500"}`)}</span>
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

document.addEventListener("DOMContentLoaded", async () => {
  await cargarProyectos();
});

bindGridEditButtons({
  tableId: "tabla-nomenclatura",
  buttonSelector: ".btn-editar-proyecto",
  getRecord: (rowIndex) => proyectos[rowIndex],
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
        label: "GLPI",
        readOnly: true
      },
      {
        name: "siigo",
        label: "Siigo"
      },
      {
        name: "codigo",
        label: "Codigo",
        readOnly: true
      }
    ],
    onConfirm: async ({ values, rowIndex: currentRowIndex }) => {
  const proyecto = proyectos[currentRowIndex];

  await updateProyecto(proyecto.id, values);

  proyectos[currentRowIndex] = {
    ...proyecto,
    ...values
  };

  renderTablaSiigo();
}
  })
});
