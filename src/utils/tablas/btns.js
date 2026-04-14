const API_URL = import.meta.env.PUBLIC_API_URL;

const contenedor = document.getElementById("table-alert")
const modalObservacion = document.getElementById('modal-change')
const btnOb = document.getElementById('btn-modal-observacion')
const textAre = document.getElementById('input-update-observacion')
const modalvalidacion = document.getElementById('modal-confirmacion')
const btnConfirmacion = document.getElementById('btn-modal-confirmacion')
const idModalPrecio = document.getElementById('modal-change-precio')
const actualizarPS = document.getElementById('btn-modal-actualizar-datos')
const modalError = document.getElementById('modal-error')
const btnModalError = document.getElementById('btn-modal-error')
const btnCancelar = document.getElementById('btn-cancelar')
const btnCancelarObservacion = document.getElementById('btn-cancelar-observacion')
const btnEnviarPrecio = document.getElementById('btn-price-enviar')
const btnCancelarPrice = document.getElementById('btn-price-cancelar')
const priceNew = document.getElementById('input-update-precio')
const modaObExoneracionFactura = document.getElementById('modal-exonerar-factura')
const btnCancelarExoneracionFactura =document.getElementById('btn-cancelar-exonerar')
const btnEnviarExoneracionFactura = document.getElementById('btn-exonerar-observacion')

contenedor.addEventListener('click', (e) => {
    const btnObC = e.target.closest(".btn-observacion")
    const btnUp = e.target.closest(".btn-actualizar")
    const btnCo = e.target.closest(".btn-observacion-factura")
    const btnPrice = e.target.closest(".btn-precie")

    if(btnObC){
        const id = btnObC.dataset.id;
        abrirModalObservacion(id)  
    }
    if(btnUp){
        const activo = btnUp.dataset.idActivo
        const id_co = btnUp.dataset.idUpdate
        console.log(activo,id_co)
        actualizar(activo,id_co)
    }if(btnCo){
        const idActi = btnCo.dataset.idActivoFactura;
        const id_Cobro =btnCo.dataset.idUpdateFactura
        AbrirModalExonerarFactura(id_Cobro)
        console.log('hola',idActi)
    }if(btnPrice){
        const idPrecioActivo =btnPrice.dataset.idActivoPrice
        const idCobro = btnPrice.dataset.idPrice
        const precioNuevo = document.getElementById('input-update-precio')
        precioNuevo.textContent=''
        idModalPrecio.dataset.idModalPrecio = idCobro
        modalPrecio(idCobro) 
    }
})
function abrirModalObservacion(ide){
       
    modalObservacion.classList.remove('opacity-0','pointer-events-none','scale-50')
    modalObservacion.classList.add('opacity-100','scale-100')
    modalObservacion.dataset.idModal = ide
    console.log(modalObservacion)
    
}
function AbrirModalExonerarFactura(id){
    const title = document.getElementById('modal-exonerar-title')
    title.textContent='Ingrese el motivo de la exoneracion'
    modaObExoneracionFactura.classList.remove('opacity-0','pointer-events-none','scale-50')
    modaObExoneracionFactura.classList.add('opacity-100','scale-100')
    modaObExoneracionFactura.dataset.idModalExonerar =id
}
function modalPrecio(idPrecio){
    idModalPrecio.classList.remove('opacity-0', 'pointer-events-none','scale-50')
    idModalPrecio.classList.add('opacity-100','scale-100')
    idModalPrecio.dataset.idModal = idPrecio
}
function abrirmodalessinId(mod, api){

    const modals =document.getElementById(mod);
    const respon = document.getElementById('modal-confirmacion-text')
    modals.classList.remove('opacity-0','pointer-events-none')
    modals.dataset.idModal= mod
    modals.classList.add('opacity-100');
    respon.textContent= api.message
    console.log(modals)
    console.log(api)
}
//cerrar modales
function cerrarModales(idModal){
    const modalClose = document.getElementById(idModal)
    modalClose.classList.remove('opacity-100')
    modalClose.classList.add('opacity-0','pointer-events-none')
    modalClose.dataset.idModal = ''
    if (textAre) {
    textAre.value = '';}
    if(priceNew){
        priceNew.textContent=''
    }
  
    
    console.log(modalClose)
   
}
function ocultar(modal){
    const cerrar = document.getElementById(modal)
    cerrar.classList.remove('opacity-100','scale-100')
    cerrar.classList.add('opacity-0','pointer-events-none','scale-50')
    cerrar.dataset.idModal =''
}
// listener

btnOb.addEventListener('click', async () =>{
    const idModal =modalObservacion.id
    const idModalDataset =modalObservacion.dataset.idModal
    const idModalValidacion =modalvalidacion.id
    const observacion = textAre.value
    
    console.log(`el id es ${idModalDataset} y la observacion es ${observacion}`)
    if(!textAre.value.trim()){
        const aviso =document.getElementById('aviso')
        aviso.textContent='La observacion no se permite vacia '
        aviso.classList.remove('opacity-0','translate-y-3')
        aviso.classList.add('opacity-100','translate-y-0','h-5')
        setTimeout(()=>{
            aviso.classList.remove('opacity-100','translate-y-0','h-5')
            aviso.classList.add('opacity-0','translate-y-3', 'h-0')
        },3000)
        return
    }else{
    const respuestaAPI = await  validar(idModalDataset,observacion)
    cerrarModales(idModal)
    abrirmodalessinId(idModalValidacion, respuestaAPI)
    }
    
    
})

btnConfirmacion.addEventListener('click', () => {
    const idModal = modalvalidacion.id
    cerrarModales(idModal)
    window.location.reload()
})

async function actualizar(activo,id){
const modal = document.getElementById('modal-actualizar-datos');
const loading = document.getElementById('loading-screen')
const ide = modal.dataset.idModal = id
const pModal = document.getElementById('modal-error-p')

    try{
        const abrirModal = () =>{
            
            modal.classList.remove('opacity-0', 'pointer-events-none')
            modal.classList.add('opacity-100')           
            console.log(`${ide} este es el id`)    
        }    
        const abrirModalError = () =>{
            modalError.classList.remove('opacity-0', 'pointer-events-none')
            modalError.classList.add('opacity-100')
        }
        const abrirModalValido = () => {
            modalvalidacion.classList.remove('opacity-0', 'pointer-events-none');
            modalvalidacion.classList.add('opacity-100');
}; 
        if(activo === "null"){
            modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-50');
            modal.classList.add('opacity-100', 'scale-100');
            abrirModal()
            return 
        }
       
    loading.classList.remove('opacity-0','pointer-events-none','translate-y-3')
    loading.classList.add('opacity-100','translate-y-0')

        try{
           const res = await fetch(`${API_URL}validarCobros`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id_Cobro: ide,
        serial: "",
        placa: ""
    }),
    credentials: 'include'
});

const data = await res.json();
console.log(data.message);

// ❌ Error HTTP (400, 401, 500, etc.)
if (!res.ok) {
    const titleModal = document.getElementById('modal-error-h3');

    titleModal.textContent = 'Error';
    pModal.textContent = data.message || 'Error del servidor';

    abrirModalError();
    return {
        ok: false,
        message: data.message || 'Error HTTP'
    };
}

// ❌ Error de lógica / validación (aunque sea 200)
if (!data.success) {
    const titleModal = document.getElementById('modal-error-h3');

    titleModal.textContent = 'Error';
    pModal.textContent = data.message || 'Validación fallida';

    abrirModalError();
    return {
        ok: false,
        message: data.message || 'Validación incorrecta'
    };
}

// ✅ Todo correcto
const respon = document.getElementById('modal-confirmacion-text');
respon.textContent = data.message;

abrirModalValido();

return {
    ok: true,
    message: data.message || 'Validación correcta',
    data: data.data
};



        }catch(error){
          console.log(error)  
        }
    }catch(error){

    }finally {
        // ✅ ocultar loading SIEMPRE
        loading.classList.remove('opacity-100','translate-y-0')
        loading.classList.add('opacity-0','pointer-events-none','translate-y-3')
       
        
    }
    
}
// funcion para exonera por GLPI
async function validar(id,observacion) {
    
   try{
     const res = await fetch(`${API_URL}ExcluirActivo`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body:JSON.stringify({
            id_Cobro:id,
            observacion:observacion
        })
     }      
    )
    const data = await res.json()
    return data
   }catch (error) {
    console.error(error);
  }
}
// funcion para exonera por Factura
async function exoneracionFactura(id, observacion) {
    try{
     const res = await fetch(`${API_URL}ExcluirFactura`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body:JSON.stringify({
            id_Cobro:id,
            observacion:observacion
        }),
        credentials:'include'
     }      
    )
    const data = await res.json()
    return data
   }catch (error) {
    console.log(error);
  }
}

// api
async function enviarDatos (id_Cobro,serial,placa) {
    try{

        const res = await fetch(`${API_URL}validarCobros`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                    id_Cobro:id_Cobro,
                    serial:serial,
                    placa:placa
                })
            })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        return{
            ok:false,
            message: data.message || 'Error al actualizar'
        }
    }
    return {
        ok:true,
        message:data.message || 'Actualizado correctamente'
    }
    }catch(error){
    return {
      ok: false,
      message: 'Error de conexión'
    }
    }
}
async function enviarNuevoPrecio (id_Cobro,valor) {
    try{

        const res = await fetch(`${API_URL}CambioValor`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                    id_Cobro:id_Cobro,
                    valor:valor,
                })
            })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        return{
            ok:false,
            message: data.message || 'Error al actualizar el precio'
        }
    }
    return {
        ok:true,
        message:data.message || 'Precio Actualizado correctamente'
    }
    }catch(error){
    return {
      ok: false,
      message: 'Error de conexión'
    }
    }
}
// addlisteners

actualizarPS.addEventListener('click', async  () =>{
    const placa = document.getElementById('input-placa').value.trim();
    const serial = document.getElementById('input-serial').value.trim();
    const modal = document.getElementById('modal-actualizar-datos')
    const titleModal =document.getElementById('modal-error-h3')
    const pModal = document.getElementById('modal-error-p')
    const idModal = modal.dataset.idModal
    
    const respuestaValidarPlacaSerie = await enviarDatos(idModal,serial,placa)
    modal.classList.remove('opacity-100')
    modal.classList.add('opacity-0','pointer-evenst-none')

    if(!respuestaValidarPlacaSerie.success){
        modalError.classList.remove('opacity-0','pointer-events-none')
        modalError.classList.add('opacity-100')
        titleModal.textContent = 'Error'
        pModal.textContent =respuestaValidarPlacaSerie.message
    }
    if(respuestaValidarPlacaSerie.success){
        modalError.classList.remove('opacity-0','pointer-events-none')
        modalError.classList.add('opacity-100')
        titleModal.textContent = 'Error'
        pModal.textContent =respuestaValidarPlacaSerie.message
    }
})

btnModalError.addEventListener('click', () => {

    modalError.textContent=''
    modalError.classList.remove('opacity-100')
    modalError.classList.add('opacity-0','pointer-events-none')
    window.location.reload()
})

btnCancelar.addEventListener('click', () =>{
    const id =modalObservacion.id
    ocultar(id)
})
btnCancelarObservacion.addEventListener('click', () =>{
    ocultar('modal-actualizar-datos')

    if(!precioNuevo || precioNuevo == 0){
    validarPrecio.classList.remove('opacity-0', 'translate-y-2')
    validarPrecio.classList.add('opacity-100', 'translate-y-0')

    setTimeout(() => {
        validarPrecio.classList.remove('opacity-100', 'translate-y-0')
        validarPrecio.classList.add('opacity-0', 'translate-y-2')
    }, 3000)
    return
    }
})

btnEnviarPrecio.addEventListener('click', async ()=>{

    const precioNuevo = priceNew.value.trim()
    const idPrecioModal = idModalPrecio.dataset.idModalPrecio
    const validarPrecio = document.getElementById('response-price')
    const titleModal =document.getElementById('modal-error-h3')
    const pModal = document.getElementById('modal-error-p')
    const titleok = document.getElementById('modal-confirmacion-title')
    const respon = document.getElementById('modal-confirmacion-text')

    if(!precioNuevo || precioNuevo == 0){
    validarPrecio.classList.remove('opacity-0', 'translate-y-2')
    validarPrecio.classList.add('opacity-100', 'translate-y-0')

    setTimeout(() => {
        validarPrecio.classList.remove('opacity-100', 'translate-y-0')
        validarPrecio.classList.add('opacity-0', 'translate-y-2')
    }, 3000)
    return
    }
    
    const actualizarPrecio = await enviarNuevoPrecio(idPrecioModal,precioNuevo)

    if(actualizarPrecio.success == false){
        modalError.classList.remove('opacity-0','pointer-events-none')
        modalError.classList.add('opacity-100')
        titleModal.textContent = 'Error'
        pModal.textContent = actualizarPrecio.message
        idModalPrecio.classList.remove('opacity-100','scale-50')
        idModalPrecio.classList.add('opacity-0', 'pointer-events-none','scale-100')
        return
    }
    
    modalvalidacion.classList.remove('opacity-0','pointer-events-none','scale-50')
    modalvalidacion.classList.add('opacity-100','scale-100')
    idModalPrecio.classList.remove('opacity-100')
    idModalPrecio.classList.add('opacity-0', 'pointer-events-none')
    
    
});
btnEnviarExoneracionFactura.addEventListener('click', async ()=>{
    const obs = document.getElementById('text-exonerar')
    const respon = document.getElementById('modal-confirmacion-text')
    const observacionText =obs.value.trim()
    const id = modaObExoneracionFactura.dataset.idModalExonerar
    console.log(id)
    console.log(observacionText)
    const respuestaAPIFactura = await  exoneracionFactura(id,observacionText)
    
    if(!obs.value.trim()){   
        const aviso =document.getElementById('aviso-exoneracion')
        aviso.textContent='La observacion no se permite vacia '
        aviso.classList.remove('opacity-0','translate-y-3')
        aviso.classList.add('opacity-100','translate-y-0','h-5')
        setTimeout(()=>{
            aviso.classList.remove('opacity-100','translate-y-0','h-5')
            aviso.classList.add('opacity-0','translate-y-3', 'h-0')
        },3000)
        return
    }
    try{
        if(respuestaAPIFactura.success){
            cerrarModales(modaObExoneracionFactura.id)
            modalvalidacion.classList.remove('opacity-0','pointer-events-none')
            modalvalidacion.classList.add('opacity-100')
            respon .textContent=respuestaAPIFactura.message
            console.log('logrado')
        }
    }catch(error){
        console.log(error)
    }

});
btnCancelarPrice.addEventListener('click', () =>{
    cerrarModales(idModalPrecio.id)
    idModalPrecio.classList.remove('scale-100')
    idModalPrecio.classList.add('scale-50')
})
btnCancelarExoneracionFactura.addEventListener('click', () =>{
    cerrarModales(modaObExoneracionFactura.id)
    modaObExoneracionFactura.classList.remove('scale-100')
    modaObExoneracionFactura.classList.add('scale-50')
})