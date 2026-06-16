import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { abrir_modales} from "../global/modales_scripts";
import { getCustodios } from "../../services/proyectos";
import alertIcon from "../../icons/alertIcon.svg";
import asignacion from "../../icons/asignacion.svg";
import devolucion from "../../icons/devolucion.svg";
let custodios = [];

const movimientos = [
  {
    imagen: "mouse",
    nombre: "Mouse Óptico",
    categoria: "Periféricos",
    modelo: "IT",
    tipoActivo: "IT",
    stock: 42,
  },
  {
    imagen: "keyboard",
    nombre: "Teclado Mecánico",
    categoria: "Periféricos",
    modelo: "IT",
    tipoActivo: "IT",
    stock: 15,
  },
  {
    imagen: "plug",
    nombre: "Cargador Laptop Universal",
    categoria: "Energía",
    modelo: "IT",
    tipoActivo: "IT",
    stock: 5,
  },
  {
    imagen: "monitor",
    nombre: "Monitor 24 UltraWide",
    categoria: "Pantallas",
    modelo: "IT",
    tipoActivo: "IT",
    stock: 2,
  },
];
let check = (id, estado) => {
  if (estado === "robado") {
    return html(`
      <div class="flex justify-center items-center w-full h-10">
        <input
          type="checkbox"
          class="w-5 h-5 accent-sky-600 cursor-pointer"
          disabled
          data-id="${id}"
          name="activoSeleccionado"
        />
      </div>
    `);
  }

  return html(`
    <div class="flex justify-center items-center w-full h-10">
      <input
        type="checkbox"
        class="w-5 h-5 accent-sky-600 cursor-pointer"
        data-id="${id}"
        name="activoSeleccionado"
      />
    </div>
  `);
};
let grid = null;


function crearTabla(movimientos) {
  console.log("Movimientos:", movimientos);
  const datos = movimientos.map((columna, index) => [
  check(columna.id_activo,columna.estado),
  columna.activo,
  columna.serial,
  columna.modelo,
  columna.tipo_activo,
  html(`
    <button data-id="${index}">
      <img src="${
        columna.estado === "robado"
          ? alertIcon.src
          : columna.acta
          ? asignacion.src
          : devolucion.src
      }" class="w-6 h-6 active:scale-90 transform duration-200" />
    </button>
  `),
]);

  const contenedor = document.getElementById("tabla-movimientos");

  if (grid) {
    grid.destroy();
  }

  contenedor.innerHTML = "";

  grid = new Grid({
    columns: [
      "Select",
      "Nombre de Activo",
      "Serial",
      "Modelo",
      "Tipo de Activo",
      "Acciones",
    ],
    data: datos,
    pagination: {
      enabled: true,
      limit: 10,
    },
    style: {
      th: {
        "text-align": "center",
        "background-color": "#0B3356",
        color: "white",
      },
      td: {
        "text-align": "center",
      },
    },
    search: false,
    sort: true,
  });

  grid.render(contenedor);
}

function getActivosSeleccionados() {
  return Array.from(
    document.querySelectorAll('input[name="activoSeleccionado"]:checked'),
  )
    .map((check) => {
      const id = Number(check.dataset.id);
      return custodios.find((x) => x.id_activo === id);
    })
    .filter(Boolean);
}

function buildElementoActivo(activo) {
  return `
    <div class="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">
          📦
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-slate-900">${activo.activo}</p>
          <p class="truncate text-[11px] text-slate-500">${activo.nombre} · ${activo.tipo_activo}</p>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-600">
        <span class="truncate">Modelo: ${activo.modelo}</span>
        <span class="font-semibold text-slate-700">#${activo.cantidad}</span>
      </div>
    </div>
  `;
}

function renderElementosSeleccionados(containerId, activos) {
  const contenedor = document.getElementById(containerId);
  if (!contenedor) return;

  contenedor.innerHTML = activos.map(buildElementoActivo).join("");
}

function abrirModalConActivos(modalId, containerId) {
  const activos = getActivosSeleccionados();

  console.log(activos);

 if (activos.length === 0) {
  const texto = document.getElementById("modal_sin_seleccion-p-text");

  if (texto) {
    texto.textContent =
      "Debes seleccionar al menos un activo para continuar.";
  }

  abrir_modales(document.getElementById("modal_sin_seleccion"));
  return;
}
  const actaBase = activos[0].acta;
  const estadoBase = activos[0].estado;

  console.log("actaBase:", actaBase);
  console.log("estadoBase:", estadoBase);

  const sonCompatibles = activos.every(
    (activo) =>
      activo.acta === actaBase &&
      activo.estado === estadoBase
  );

  console.log("sonCompatibles:", sonCompatibles);

 if (!sonCompatibles) {
  const texto = document.getElementById("modal_sin_seleccion-p-text");

  if (texto) {
    texto.textContent =
      "Los activos seleccionados no son compatibles. Todos deben tener el mismo estado y la misma acta.";
  }

  abrir_modales(document.getElementById("modal_sin_seleccion"));
  return;
}

  renderElementosSeleccionados(containerId, activos);
  abrir_modales(document.getElementById(modalId));
}

document.getElementById("btnBuscar").addEventListener("click", async () => {
  const cedula = document.getElementById("txtBuscar").value.trim();

  const resultado = await getCustodios(cedula);
 
  console.log("Resultado de búsqueda:", resultado);
  if (!resultado) {
    const contenedor = document.getElementById("tabla-movimientos");

    if (grid) {
      grid.destroy();
      grid = null;
    }

    contenedor.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-slate-500">
        <div class="text-6xl mb-4">📭</div>
        <h3 class="text-xl font-semibold">
          Ups... no hay nada por aquí
        </h3>
        <p class="mt-2">
          No encontramos resultados para "${cedula}"
        </p>
      </div>
    `;

    return;
  }
  custodios = resultado;
crearTabla(custodios);
});
document.getElementById("btn_generar_acta").addEventListener("click", () => {
  abrirModalConActivos("modal_generar_actas", "elementos-acta");
});

const btnCargarRobo = document.getElementById("cargar_robo");
if (btnCargarRobo) {
  btnCargarRobo.addEventListener("click", () => {
    abrirModalConActivos("modal_acta_robo", "container_acta_robo");
  });
}
