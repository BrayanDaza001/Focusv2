async function verificarToken() {
    try {
        const res = await fetch('/api/api/Auth/verificarToken', {
            method: 'GET',
            credentials: 'include',
        });

        // Si está autorizado (200–299)
        if (res.ok) {
            return await res.json();
        }

        // Si devuelve 401 o cualquier error de autorización
        if (res.status === 401) {
            return { success: false, authorized: false };
        }

        return { success: false };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

async function validarSession() {
    const verify = await verificarToken();

    try {
        // 👉 Si no está autorizado → volver al login
        if (!verify || verify.success === false || verify.authorized === false) {
            window.location.href = '/';
            return;
        }

        // 👉 Si debe cambiar clave
         if (verify.data.estado === false && currentPath !== '/cambioContrasena') {
            window.location.href = '/cambioContrasena';
            return;
        }

    } catch (error) {
        console.log(error);
        window.location.href = '/'; // fallback
    }
}

validarSession();
