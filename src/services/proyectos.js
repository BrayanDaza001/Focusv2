export async function getProyectos() {
  const response = await fetch(import.meta.env.PUBLIC_API_URL_PROYECTOS);

  console.log("URL:", import.meta.env.PUBLIC_API_URL_PROYECTOS);
  console.log("STATUS:", response.status);

  if (!response.ok) {
    throw new Error("Error al obtener los proyectos");
  }

  return await response.json();
}

export async function updateProyecto(id, data) {
  const response = await fetch( `${import.meta.env.PUBLIC_API_URL_PROYECTOS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el proyecto");
  }

  return await response.json();
}

export async function getCustodios(cedula) {
  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL_PROYECTOS_BASE}/custodios`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los custodios");
  }

  const custodios = await response.json();

  return custodios.filter(
  custodio => custodio.cedula === String(cedula)
);
}