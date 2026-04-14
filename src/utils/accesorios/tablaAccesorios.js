import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { basura } from "../../icons/basura";

const productos = [
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
    nombre: "Monitor 24\" UltraWide",
    categoria: "Pantallas",
    stock: 2
  }
];


document.addEventListener('DOMContentLoaded', async () =>{

     

    let datos = productos.map( (columna,index) =>{
let botones = html(`
 <div class="flex flex-row  justify-center items-center  gap-2 w-full" id="${index}">

  <button data-id="editar-${index}" class="btn-editar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer 
        hover:scale-110 active:scale-90
        active:bg-blue-500/40 transition-all duration-200"
        >
   <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
  </button>


  <button data-id="eliminar-${index}" class="btn-eliminar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer 
        hover:scale-110 active:scale-90
        active:bg-red-500/40 transition-all duration-200">
    <span class="flex items-center justify-center text translate-x-[-2px]" >${basura("w-5 h-5 text-red-400 group-active:text-white")}</span>
  </button>

</div>
`)
        let nombre = html(`
            <div class="font-semibold text-[rgb(51,65,85)]">
        ${columna.nombre} </div>
            `)
        let stock = html(`
<div class="text-center w-full h-6 flex items-center justify-center rounded-full">
  <span class="${
    columna.stock <= 5
      ? 'bg-red-400/40 text-red-700 font-semibold'
      : 'bg-blue-500/40 text-blue-700 font-semibold'
  } px-2 py-1 rounded-full">
    ${columna.stock}
  </span>
</div>
`)
let categoria = html(`
    <p class="text-[rgb(51,65,85)]">${columna.categoria}</p>
    `)
        return [
            columna.imagen,
            nombre,
            columna.categoria,
            stock,
            botones
        ]
    })
   

   new Grid({ 
  columns: ['Imagen', 'Nombre','Categoria','Stock','Acciones'],
  data:datos,
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
       "text-align": "center",
        
      },
      td:{
        "font-size":" 14px",
        color: "rgb(51,65,85)",
        
      }
    }

}).render(document.getElementById('tabla-accesorios')); 
const buscador = document.querySelector("#tabla-accesorios .gridjs-search");
if (buscador) {
        const label = document.createElement("label");
        label.textContent = "Buscar Actas";
        label.className = "font-semibold";

        buscador.prepend(label);

        const titulo = document.createElement("h2");
        titulo.textContent = "Historial de Actas";
        titulo.className = "titulo-tabla";

        buscador.append(titulo);
      }       

})

