import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { download } from "../../icons/download";
import { pdf } from "../../icons/pdf";
import { lapiz } from "../../icons/lapiz";
import {onOff} from "../../icons/onoff"

const productos = [  {
    imagen: "mouse",
    nombre: "Mouse Óptico",
    categoria: "Periféricos",
    stock: 42,
    activado: true
  },
  {
    imagen: "keyboard",
    nombre: "Teclado Mecánico",
    categoria: "Periféricos",
    stock: 15,
    activado: false
  },
  {
    imagen: "plug",
    nombre: "Cargador Laptop Universal",
    categoria: "Energía",
    stock: 5,
    activado: true
  },
  {
    imagen: "monitor",
    nombre: "Monitor 24\" UltraWide",
    categoria: "Pantallas",
    stock: 2,
    activado: true
  }];


document.addEventListener('DOMContentLoaded', async () =>{

    try{
        let datos = productos.map( (columna,index) =>{
        let botones = html(`
        <div class="flex flex-row  justify-center items-center  gap-2 w-full" id="${index}">

        <button 
        data-id="eliminar-${index}" 
        class="btn-editar-proyecto group p-1 rounded flex justify-center items-center cursor-pointer 
        hover:scale-110 active:scale-90
        active:bg-blue-500/40 transition-all duration-200"
        >
        <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
        </button>
        <button 
        data-id="toogle-${index}"
        data-estado="${columna.activado}"
        
        class="btn-toogle group p-1 rounded flex justify-center items-center cursor-pointer 
         hover:scale-110 active:scale-90 ${columna.activado ?  "active:bg-red-500/40" :"active:bg-green-500/40"}
         transition-all duration-200"
        >
        <span  >${onOff(`w-5 h-5  group-active:text-white  ${columna.activado ? "text-green-500": "text-red-500"}`)}</span>
        </button>
        </div>
        `)
        let nombre = html(`
        
            <div class="font-semibold text-[rgb(51,65,85)] flex gap-1">
            ${columna.nombre}
        </div>`)

        let categoria = html(`<div class="font-semibold text-[rgb(51,65,85)]">
            ${columna.categoria}
        </div>`)

    return [
        
        nombre,
        categoria,
        categoria,
        botones
    ]})
   

 const tabla =  new Grid({ 
  columns: ['GLPI','SIIGO','CODIGO',{name:'Acciones', width: "120px"}],
  data:datos,
  pagination: {
      enabled: true,
      limit: 10
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

}).render(document.getElementById('tabla-nomenclatura'));        
const buscador = document.querySelector("#tabla-nomenclatura .gridjs-search");

const label = document.createElement("label");
label.textContent = "Buscar nomenclatura y salvo";
label.className = "font-semibold";

buscador.prepend(label);

const titulotabla = document.createElement("h2")
titulotabla.textContent= "Historial de Actas"
titulotabla.className="titulo-tabla"

buscador.append(titulotabla)

const input = document.querySelector("#tabla-nomenclatura .gridjs-input");

    }catch(error){
        console.log(error)
    }

});
