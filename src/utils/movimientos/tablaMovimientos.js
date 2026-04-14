import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { basura } from "../../icons/basura";

const movimientos = [
  {
    imagen: "mouse",
    nombre: "Mouse Óptico",
    categoria: "Periféricos",
    stock: 42
  },
  {
    imagen: "keyboard",
    nombre: "Teclado Mecánico",
    categoria: "Periféricos",
    stock: 15
  },
  {
    imagen: "plug",
    nombre: "Cargador Laptop Universal",
    categoria: "Energía",
    stock: 5
  },
  {
    imagen: "monitor",
    nombre: "Monitor 24 UltraWide",
    categoria: "Pantallas",
    stock: 2
  }
];

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (movimientos.length > 0) {

      let datos = movimientos.map((columna, index) => {

        let botones = html(`
          <div class="flex justify-center items-center gap-2 w-full">
           <button data-id="eliminar-${index}" class="btn-eliminar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer 
                  hover:scale-110 active:scale-90
                  active:bg-red-500/40 transition-all duration-200">
              <span class="flex items-center justify-center text translate-x-[-2px]" >${basura("w-5 h-5 text-red-400 group-active:text-white")}</span>
            </button>
          </div>
           

        `);

        let nombre = html(`
          <div class="font-semibold text-[rgb(51,65,85)] flex gap-1">
            📄 ${columna.nombre}
          </div>
        `);

        let categoria = html(`
          <div class="font-semibold text-[rgb(51,65,85)]">
            ${columna.categoria}
          </div>
        `);

        return [nombre, categoria, botones];
      });

      new Grid({
        columns: [
          "Nombre",
          "Tipo movimiento",
          { name: "Acciones", width: "120px" }
        ],
        data: datos,
        pagination: {
          enabled: true,
          limit: 10
        },
        search: {
          placeholder: "Buscar..."
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
      }).render(document.getElementById("tabla-movimientos"));

      // 🔍 Personalizar buscador
      const buscador = document.querySelector("#tabla-movimientos .gridjs-search");

      if (buscador) {
        const label = document.createElement("label");
        label.textContent = "Buscar movimientos";
        label.className = "font-semibold";

        buscador.prepend(label);

        const titulo = document.createElement("h2");
        
        titulo.className = "titulo-tabla";

        buscador.append(titulo);
      }

      const input = document.querySelector("#tabla-movimientos input");

      if (input) {
        input.placeholder = "Número de cédula o nombre";
      }

    } else {
      console.log("No hay datos");
    }

  } catch (error) {
    console.log(error);
  }
});