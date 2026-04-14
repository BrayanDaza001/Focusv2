// import { set } from "astro:schema";

document.getElementById('btn-login').addEventListener('click', async () => {

    const userInput = document.getElementById('date-user');
    const user = userInput.value.trim();
    const contraInput = document.getElementById('input-password');
    const contra = contraInput.value.trim();
    const spanError = document.getElementById('span-error-clave');

    // VALIDACIÓN ANTES DEL FETCH
    if (!user || !contra) {


        spanError.textContent = "Por favor ingresa todos los campos"
        spanError.classList.remove('opacity-0', 'pointer-events-none');
        spanError.classList.add('opacity-100'); 
        setTimeout(()=>{
        spanError.textContent = ""
        spanError.classList.remove('opacity-100');
        spanError.classList.add('opacity-100', 'pointer-events-none');
        },3000)
        return; 
    }

    let response;
    let data;

    try {
        response = await fetch('/api/api/Auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ usuario: user, contrasena: contra })
        });

        data = await response.json();
    } catch (err) {
       
        setTimeout(()=>{
             console.log("Error de conexión:", err);
        },30000)
        return;
    }

    // SI EL SERVIDOR RESPONDIÓ CON ERROR (400, 401, 500...)
    if (!response.ok) {
        spanError.textContent =(data?.message || "Error en las credenciales")
        spanError.classList.remove('opacity-0',"pointer-events-none");
        spanError.classList.add('opacity-100');
        setTimeout(()=>{
            spanError.textContent ="";
            spanError.classList.remove('opacity-100')
            spanError.classList.add('opacity-0',"pointer-events-none")
        },10000)
        
        setTimeout(() => {
            userInput.value = "";
            contraInput.value = "";
        }, 1000000);
        return;
    }

    // SI LA RESPUESTA ES OK PERO SUCCESS ES FALSE
    if (!data.success) {
        spanError.textContent =(data?.message || "Credenciales incorrectas")
        spanError.classList.remove('opacity-0',"pointer-events-none");
        spanError.classList.add('opacity-100');
        setTimeout(()=>{
            spanError.textContent ="";
            spanError.classList.remove('opacity-100')
            spanError.classList.add('opacity-0',"pointer-events-none")
        },3000000)
        // console.log(data?.message || "Credenciales incorrectas");
        setTimeout(() => {
            userInput.value = "";
            contraInput.value = "";
        }, 100000);
        return;
    }

    // SI SUCCESS = TRUE:
    if (data.data.estado === true) {
        window.location.href = "/pantallaMain";
         setTimeout(() => {
            console.log('hola')
        }, 100000);
        return;
    }

    if (data.data.estado === false) {
        window.location.href = "/cambioContrasena";
        setTimeout(() => {
            console.log('hola')
        }, 100000);
        return;
    }

    // SI LLEGA AQUÍ, HAY ALGO RARO
   
    setTimeout(() => {
             console.log("Respuesta inesperada del servidor:", data);
        }, 100000);
});


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Llamada automática al endpoint de logout
//         const response = await fetch('api/api/Auth/logout', {
//             method: 'POST',
//             credentials: 'include', // importante para enviar cookies
//         });

//         if (response.ok) {
//             console.log("Sesión anterior cerrada automáticamente ✅");
//         } else {
//             console.log("No se pudo cerrar la sesión anterior", response.status);
//         }

//         // Opcional: también borrar cookies accesibles desde JS
//         document.cookie.split(";").forEach((c) => {
//             document.cookie = c
//                 .replace(/^ +/, "")
//                 .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
//         });

//     } catch (error) {
//         console.log("Error al limpiar sesión anterior:", error);
//     }
// });