import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { download } from "../../icons/download";
import { pdf } from "../../icons/pdf";

const productos = [  {
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
  }];


document.addEventListener('DOMContentLoaded', async () =>{
const modalInformativo = document.getElementById('modal-informativo-vacio')
console.log(modalInformativo)
    try{
        if(productos.length !== 0){
let datos = productos.map( (columna,index) =>{
let botones = html(`
 <div class="flex flex-row  justify-center items-center  gap-2 w-full" id="${index}">

<button 
data-id="descargar-${index}" 
class="group p-1 rounded flex justify-center items-center cursor-pointer 
bg-red-300/50 hover:scale-110 active:scale-90
active:text-red-400 transition-all duration-200"
>
<span>${download("w-5 h-5 text-red-400 group-active:text-white")}</span>
</button>

</div>
`)
let nombre = html(`
 
    <div class="font-semibold text-[rgb(51,65,85)] flex gap-1">
     <span>${pdf("w-5 h-5 text-red-600 ")}</span>
    ${columna.nombre}
</div>`)

let categoria = html(`<div class="font-semibold text-[rgb(51,65,85)]">
    ${columna.categoria}
</div>`)

        return [
           
            nombre,
            categoria,
            botones
        ]
    })
   

 const tabla =  new Grid({ 
  columns: ['Documento','Fecha de generacion',{name:'Acciones', width: "120px"}],
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

}).render(document.getElementById('tabla-paz'));        
const buscador = document.querySelector("#tabla-paz .gridjs-search");

const label = document.createElement("label");
label.textContent = "Buscar paz y salvo";
label.className = "font-semibold";

buscador.prepend(label);

const titulotabla = document.createElement("h2")
titulotabla.textContent= "Historial de Actas"
titulotabla.className="titulo-tabla"

buscador.append(titulotabla)

const input = document.querySelector("#tabla-paz .gridjs-input");

if (input) {
  input.placeholder = "Numero de cedula o nombre de la persona";
}
        }else if(productos.length <= 0){
            modalInformativo.classList.remove('hidden')
        }
    }catch(error){
        console.log(error)
    }
    

})

