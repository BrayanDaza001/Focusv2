import { abrir_modales,cerrar_modales } from "../global/modales_scripts"


const btn_cargar_robo = document.getElementById('cargar_robo')
const btn_generar_acta =document.getElementById('btn_generar_acta')

const modal_agregar_accesorios = document.getElementById('modal_agregar_accesorios')
const modal_acta_robo = document.getElementById('modal_acta_robo')
const modal_generar_actas = document.getElementById('modal_generar_actas')
const modal_registro_elementos=document.getElementById('modal_registro_elementos')
const cancelar_agregar_accesorio  = document.getElementById('cancelar-agregar-accesorio')
const btn_cancelar_acta_robo =document.getElementById('cancelar_Robo')
const btn_cancelar_generar_acta = document.getElementById('cancelar_generar_acta')
const btn_cancelar_formulario = document.getElementById('cancelar_formulario')
const container_acta_robo =document.getElementById('container_acta_robo')

document.addEventListener('DOMContentLoaded', ()=>{
    // Modales

btn_cargar_robo.addEventListener('click',()=>{
    abrir_modales(modal_acta_robo)
    })
btn_cancelar_acta_robo.addEventListener('click', (event)=>{
    event.preventDefault()
    cerrar_modales(modal_acta_robo,);
})
btn_generar_acta.addEventListener('click',()=>{
    abrir_modales(modal_generar_actas)
} )
btn_cancelar_generar_acta.addEventListener('click',(event)=>{
    event.preventDefault()
    cerrar_modales(modal_generar_actas)
})
//
btn_realizar_formulario.addEventListener('click',()=>{
    abrir_modales(modal_registro_elementos)
})
btn_cancelar_formulario.addEventListener('click',(event)=>{
    event.preventDefault()
    cerrar_modales(modal_registro_elementos)
})
})





// Acta de robo