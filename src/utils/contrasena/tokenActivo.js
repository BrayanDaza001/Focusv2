const API_URL = import.meta.env.PUBLIC_API_TOKEN
async function verificarToken() {
    try {
        const res = await fetch(`${API_URL}`, {
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
  try {
    const verify = await verificarToken();

    // ❌ Token inválido
    if (!verify || verify.success !== true) {
      window.location.replace('/');
      return;
    }

    // ✅ Debe cambiar clave → SE QUEDA
    if (verify.data?.cambioClavePendiente === true) {
      console.log('Permanece: cambio de clave pendiente');
      return;
    }

    // ❌ No debe estar aquí
    window.location.replace('/');

  } catch (error) {
    console.error(error);
    window.location.replace('/');
  }
}

validarSession();