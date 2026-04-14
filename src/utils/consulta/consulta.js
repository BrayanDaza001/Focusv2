import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import {cloud} from "../../icons/cloud"
import { eye } from "../../icons/eye";

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
 <div class="flex flex-row justify-center items-center gap-2 w-full">

  <button 
  class="btn-subir group p-1 rounded flex justify-center items-center cursor-pointer bg-emerald-200/30
  hover:scale-110 hover:bg-emerald-400 transition-all duration-200 focus:scale-95"
  data-index="${index}"
>
  <span>
    ${cloud("w-6 h-6 text-emerald-400 group-hover:text-white")}
  </span>
</button>

  <button 
    class="btn-ver group p-1 rounded flex justify-center items-center cursor-pointer bg-blue-200/50 hover:scale-110 transition-all duration-200 focus:scale-95 hover:bg-blue-400"
    data-index="${index}"
  >
    <span>${eye("w-6 h-6 text-blue-700/30 group-hover:text-white")}</span>
  </button>

</div>
`);
        let nombre = html(`
            <div class="font-semibold text-[rgb(51,65,85)]">
        ${columna.nombre} </div>
            `)

        return [
           
            nombre,
            botones
        ]
    })
   

 const tabla =  new Grid({ 
  columns: ['Nombre',{name:'Acciones', width: "120px"}],
  data:datos,
  pagination: {
      enabled: true,
      limit: 10
    },
    search: {
    placeholder: "Buscar accesorio..."
    },
    sort: true,
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

}).render(document.getElementById('tabla-consulta'));        
const buscador = document.querySelector("#tabla-consulta .gridjs-search");

const label = document.createElement("label");
label.textContent = "Buscar Acta";
label.className = "font-semibold";

buscador.prepend(label);

const titulotabla = document.createElement("h2")
titulotabla.textContent= "Historial de Actas"
titulotabla.className="titulo-tabla"

buscador.append(titulotabla)

const input = document.querySelector("#tabla-consulta .gridjs-input");

if (input) {
  input.placeholder = "Número de Acta";
}
})

