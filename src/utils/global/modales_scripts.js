 export const cerrar_modales = (modal) =>{
        modal.classList.remove('opacity-100',"scale-100", "opacity-100")
        modal.classList.add('opacity-0',"scale-95", "opacity-0",'pointer-events-none')
}
export const abrir_modales = (modal)=>{
    modal.classList.remove('opacity-0',"scale-95", "opacity-0",'pointer-events-none');
    modal.classList.add()
}


export const deshabilitarCampos = (modal) => {
    const campos = modal.querySelectorAll('input, select, textarea');

    campos.forEach(campo => {
        campo.disabled = true;
    });
};
export const habilitarCampos = (modal) => {
    const campos = modal.querySelectorAll('input, select, textarea');

    campos.forEach(campo => {
        campo.disabled = false;
    });
};