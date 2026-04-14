import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";

let preguntas = [
  {
    id: 1,
    pregunta: "¿Cómo te llamas?",
    tipo: "Texto"
  }
];

let grid;

function renderTabla() {
  const datos = preguntas.map((p) => [
    p.id,
    p.pregunta,
    p.tipo,
    html(`
       <button 
        data-id="eliminar-${p}" 
        class="btn-editar-proyecto group p-1 rounded flex justify-center items-center cursor-pointer 
        hover:scale-110 active:scale-90
        active:bg-blue-500/40 transition-all duration-200"
        >
        <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
        </button>
    `)
  ]);

  document.getElementById("tabla-edit-formulario").innerHTML = "";

  grid = new Grid({
    columns: ["ID", "Pregunta", "Tipo", {
    name: "Acciones",
    width: "120px"
  }],
    data: datos,
    pagination: {
      enabled: true,
      limit: 10
    },
    style: {
      th: {
        "background-color": "#0B3356",
        color: "white",
       "text-align": "start",
        
      },
      td:{
        "font-size":" 14px",
        color: "rgb(51,65,85)",
        
      }
    }
    
  }).render(document.getElementById("tabla-edit-formulario"));
  
}



document.addEventListener("DOMContentLoaded", () => {
  renderTabla();

  const btn = document.getElementById("boton-edit-formulario");

  btn.addEventListener("click", () => {
    preguntas.push({
      id: Date.now(), // 🔥 id único real
      pregunta: "Nueva pregunta",
      tipo: "Texto"
    });

    renderTabla();
  });
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;

  const id = Number(btn.dataset.id);

  preguntas = preguntas.filter(p => p.id !== id);

  renderTabla();
});