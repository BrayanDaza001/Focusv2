import { abrir_modales,cerrar_modales } from "../global/modales_scripts"
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
const btn_cargue_acta =document.getElementById('cargue_acta')
const btn_cancelar_cargue = document.getElementById('btn_cancelar_cargue_acta')
const btn_cargar_cargue_acta = document.getElementById('btn_cargar_cargue_acta')
const modal_base = document.getElementById('base_modal_consulta')
const modal_editar_accesorio =document.getElementById('modal_editar_accesorio')
const tabla = document.getElementById('tabla-consulta');
document.addEventListener('DOMContentLoaded', ()=>{
  
btn_cargue_acta.addEventListener('click', ()=>{
    abrir_modales(modal_base)
})
btn_cancelar_cargue.addEventListener('click', (e)=>{
cerrar_modales(modal_base)
})
console.log(tabla)
tabla.addEventListener('click', (e) => {

    const btnSubir = e.target.closest('.btn-subir');
    const btnVer = e.target.closest('.btn-ver')

    if(btnSubir){
    const index = btnSubir.dataset.index;
    
    abrir_modales(modal_base);
    }
    if(btnVer){
        const index = btnVer.dataset.index;
        const data = productos[index];
        console.log(data);
       console.log('hola', index)
    }
    
});

})


