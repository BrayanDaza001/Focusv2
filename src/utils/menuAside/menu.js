document.addEventListener("DOMContentLoaded", () => {

    const facturacion = document.getElementById('facturacion')
    const soporte = document.getElementById('soporte')
    const cordinador = document.getElementById('btn_cordinador')
    const menuFacturacion = document.getElementById('menuFacturacion')
    const menuSoporte = document.getElementById('menuSoporte')
    const menuCoordinador = document.getElementById('menuCoordinador')
    const menu_start = document.getElementById('menu_start')
    const btn_atras = document.getElementById('btn-atras')
   
    facturacion.addEventListener('click', () =>{
        menuFacturacion.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute',
            
        )
        btn_atras.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        menu_start.classList.add(
            'opacity-0',
            'pointer-events-none',
            'hidden'
        )
        
    })
    soporte.addEventListener('click',() =>{
        menuSoporte.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
         menu_start.classList.add(
            'opacity-0',
            'pointer-events-none',
            'hidden'
        )
        btn_atras.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
    })
    cordinador.addEventListener('click', () =>{
         menuCoordinador.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        btn_atras.classList.remove(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        menu_start.classList.add(
            'opacity-0',
            'pointer-events-none',
            'hidden'
        )
        
    })
     btn_atras.addEventListener('click', () => {

        // ocultar todos los submenus
        menuFacturacion.classList.add(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        menuSoporte.classList.add(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        menuCoordinador.classList.add(
            'opacity-0',
            'pointer-events-none',
            '-translate-y-5',
            'absolute'
        )
        // mostrar menu inicio
        menu_start.classList.remove(
            'opacity-0',
            'pointer-events-none',
            'absolute',
            'hidden'
        )

        // ocultar botón atrás
        btn_atras.classList.add(
            'opacity-0',
            'pointer-events-none',
            'absolute'
        )

    })
})
