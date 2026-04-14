import { abrir_modales,cerrar_modales } from "../global/modales_scripts"

const btn_agregar_accesorios = document.getElementById('btn_modal_crear_accesorios')
const btn_cancelar_crear_accesorio =document.getElementById('cancelar-crear-accesorio')
const btn_cancelar_edit_accesorio =document.getElementById('cancelar-edit-accesorio')
const btn_cancelar_eliminar_accesorio = document.getElementById('cancelar_eliminar_accesorio')
const modal_crear_accesorios =document.getElementById('modal_crear_accesorios')
const modal_editar_accesorio = document.getElementById('modal_edit_accesorios')
const modal_borrar_accesorio = document.getElementById('borrar_accesorio')

const tabla = document.getElementById('tabla-accesorios')

document.addEventListener('DOMContentLoaded',()=>{
btn_agregar_accesorios.addEventListener('click',()=>{
    abrir_modales(modal_crear_accesorios)
})
btn_cancelar_crear_accesorio.addEventListener('click',(e)=>{
    e.preventDefault()
    cerrar_modales(modal_crear_accesorios)
})
btn_cancelar_edit_accesorio.addEventListener('click', (e)=>{
    e.preventDefault()
    cerrar_modales(modal_editar_accesorio)
})
btn_cancelar_eliminar_accesorio.addEventListener('click', (e)=>{
 e.preventDefault()
    cerrar_modales(modal_borrar_accesorio)
})
// llamado a tabla
tabla.addEventListener('click', (e)=>{
const btn_editar_accesorios = e.target.closest('.btn-editar-accesorio');
const btn_eliminar_accesorio = e.target.closest('.btn-eliminar-accesorio')
 if(btn_editar_accesorios){
    abrir_modales(modal_editar_accesorio)
    return;
 }
 if(btn_eliminar_accesorio){
    abrir_modales(modal_borrar_accesorio)
 }
})
})