import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { lapiz } from "../../icons/lapiz";
import { bindGridEditButtons } from "../global/gridEditModal";

const usuarios = [
  {
    nombre: "Valentina",
    apellido: "Soto",
    correo: "valentina.soto@ocaglobal.com",
    rol: "Admin",
    estado: "Activo"
  },
  {
    nombre: "Daniel",
    apellido: "Rojas",
    correo: "daniel.rojas@ocaglobal.com",
    rol: "User",
    estado: "Activo"
  },
  {
    nombre: "Laura",
    apellido: "Mendoza",
    correo: "laura.mendoza@ocaglobal.com",
    rol: "Manager",
    estado: "Inactivo"
  },
  {
    nombre: "Camilo",
    apellido: "Vargas",
    correo: "camilo.vargas@ocaglobal.com",
    rol: "Support",
    estado: "Activo"
  },
  {
    nombre: "Natalia",
    apellido: "Pineda",
    correo: "natalia.pineda@ocaglobal.com",
    rol: "Analyst",
    estado: "Inactivo"
  },
  {
    nombre: "Sebastian",
    apellido: "Gomez",
    correo: "sebastian.gomez@ocaglobal.com",
    rol: "User",
    estado: "Activo"
  }
];

const coloresRol = {
  Admin: "bg-slate-900 text-white",
  Manager: "bg-indigo-100 text-indigo-700",
  Support: "bg-sky-100 text-sky-700",
  Analyst: "bg-amber-100 text-amber-700",
  User: "bg-slate-100 text-slate-700"
};

let gridUsuarios = null;

function crearAvatar(nombreCompleto) {
  const iniciales = nombreCompleto
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((valor) => valor.charAt(0).toUpperCase())
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="88" height="88" rx="44" fill="url(#grad)" />
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="28" font-family="Arial, sans-serif" font-weight="700">
        ${iniciales}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderUsuario(usuario) {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

  return html(`
    <div class="flex min-w-[220px] flex-col">
      <span class="text-sm font-semibold text-slate-800 md:text-[15px]">
        ${nombreCompleto}
      </span>
      <span class="mt-1 text-xs text-slate-400 md:text-sm">
        ${usuario.correo}
      </span>
    </div>
  `);
}

function renderAvatar(usuario) {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
  const avatar = crearAvatar(nombreCompleto);

  return html(`
    <div class="flex items-center justify-center">
      <img
        src="${avatar}"
        alt="Avatar de ${nombreCompleto}"
        class="h-11 w-11 rounded-full border border-slate-200 object-cover shadow-sm"
        loading="lazy"
      />
    </div>
  `);
}

function renderRol(rol) {
  const clases = coloresRol[rol] || "bg-slate-100 text-slate-700";

  return html(`
    <span class="inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${clases}">
      ${rol}
    </span>
  `);
}

function renderEstado(estado) {
  const activo = estado === "Activo";
  const clases = activo
    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
    : "bg-rose-50 text-rose-700 ring-rose-200";
  const punto = activo ? "bg-emerald-500" : "bg-rose-500";

  return html(`
    <span class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${clases}">
      <span class="h-2 w-2 rounded-full ${punto}"></span>
      ${estado}
    </span>
  `);
}

function renderAcciones(usuario, index) {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

  return html(`
    <div class="flex flex-row justify-center items-center gap-2 w-full">
      <button
        type="button"
        class="btn-editar-accesorio group p-1 rounded flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 active:bg-blue-500/40 transition-all duration-200"
        aria-label="Editar a ${nombreCompleto}"
        data-user="${nombreCompleto}"
        data-row-index="${index}"
      >
        <span>${lapiz("w-5 h-5 text-blue-400 group-active:text-white")}</span>
      </button>
    </div>
  `);
}

function decorarBuscadorUsuarios() {
  const buscador = document.querySelector("#tabla-usuarios .gridjs-search");
  if (!buscador || buscador.dataset.decorado === "true") return;

  const label = document.createElement("label");
  label.textContent = "Buscar usuarios";
  label.className = "font-semibold";
  buscador.prepend(label);

  const titulo = document.createElement("h2");
  titulo.textContent = "Directorio de Usuarios";
  titulo.className = "titulo-tabla";
  buscador.append(titulo);

  buscador.dataset.decorado = "true";
}

function renderTablaUsuarios() {
  const contenedor = document.getElementById("tabla-usuarios");
  if (!contenedor) return;

  const data = usuarios.map((usuario, index) => [
    renderUsuario(usuario),
    renderAvatar(usuario),
    renderRol(usuario.rol),
    renderEstado(usuario.estado),
    renderAcciones(usuario, index)
  ]);

  if (!gridUsuarios) {
    gridUsuarios = new Grid({
      columns: [
        { name: "Usuario", width: "32%" },
        { name: "Avatar", width: "120px" },
        { name: "Rol", width: "140px" },
        { name: "Estado", width: "150px" },
        { name: "Acciones", width: "150px" }
      ],
      data,
      search: {
        placeholder: "Buscar usuario, correo o rol"
      },
      sort: true,
      pagination: {
        enabled: true,
        limit: 5
      },
      className: {
        table: "min-w-full",
        td: "align-middle",
        th: "align-middle"
      },
      style: {
        table: {
          width: "100%",
          "min-width": "720px"
        },
        th: {
          "background-color": "#0B3356",
          color: "white",
          "text-align": "center"
        },
        td: {
          "font-size": "14px",
          color: "rgb(51,65,85)"
        }
      }
    }).render(contenedor);
  } else {
    gridUsuarios.updateConfig({ data }).forceRender();
  }

  decorarBuscadorUsuarios();

  const input = document.querySelector("#tabla-usuarios .gridjs-input");
  if (input) {
    input.setAttribute("aria-label", "Buscar usuarios");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTablaUsuarios();
});

bindGridEditButtons({
  tableId: "tabla-usuarios",
  buttonSelector: ".btn-editar-accesorio",
  getRecord: (rowIndex) => usuarios[rowIndex],
  getModalConfig: (record, rowIndex) => ({
    modalId: "grid-edit-modal",
    context: "usuarios",
    rowIndex,
    title: "Editar usuario",
    description: "Modifica la información del usuario seleccionado.",
    confirmText: "Guardar usuario",
    record,
    fields: [
      {
        name: "nombre",
        label: "Nombre"
      },
      {
        name: "apellido",
        label: "Apellido"
      },
      {
        name: "correo",
        label: "Correo corporativo",
        type: "email"
      },
      {
        name: "rol",
        label: "Rol",
        type: "select",
        options: ["Admin", "Manager", "Support", "Analyst", "User"]
      },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        options: ["Activo", "Inactivo"]
      }
    ],
    onConfirm: ({ values, rowIndex: currentRowIndex }) => {
      usuarios[currentRowIndex] = {
        ...usuarios[currentRowIndex],
        ...values
      };

      renderTablaUsuarios();
    }
  })
});
