const API_URL = import.meta.env.PUBLIC_API_URL_PROYECTO
const select = document.getElementById('project-filter')

async function proyectos() {
  const res = await fetch(`${API_URL}Proyecto`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudieron obtener los proyectos`);
  }

  return await res.json();
}

async function filtroProyectos() {
  try {
    const projects = await proyectos();

    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Seleccione un proyecto';
    optionDefault.selected = true;
    optionDefault.disabled = true;
     select.appendChild(optionDefault);
    const optionAll = document.createElement('option');
    optionAll.value = 0;
    optionAll.textContent = 'Todos';
    optionAll.dataset.IdProyecto= 0
     select.appendChild(optionAll);
    
   
    projects.data.forEach(proyecto => {
    const option = document.createElement('option')
    option.dataset.IdProyecto = proyecto.idProyecto
    option.value = proyecto.idProyecto;
    option.textContent = proyecto.nombre
    select.appendChild(option)
    });
    
  } catch (error) {
    console.error(error.message);
  }
}
async function main() {
  await filtroProyectos();
}

main();
