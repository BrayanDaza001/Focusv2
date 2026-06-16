import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const proveedores = [
  {
    nombre: "Proveedor 1",
    cumplimiento: [true, true, false, true, true, false, true, false, true, true, true, false],
    observacion:
      "Pendiente validar soportes de marzo y diciembre con el equipo de facturacion."
  },
  {
    nombre: "Proveedor 2",
    cumplimiento: [true, false, false, true, true, true, false, true, true, false, true, true],
    observacion:
      "Se solicito ajustar las fechas de radicacion de febrero y octubre."
  },
  {
    nombre: "Proveedor 3",
    cumplimiento: [false, true, true, true, false, true, true, true, false, true, false, true],
    observacion:
      "Tiene novedades parciales en enero, mayo y noviembre."
  }
];

let tablaProveedores = null;

function renderProveedor(proveedor, index) {
  const completados = proveedor.cumplimiento.filter(Boolean).length;

  return html(`
    <div class="flex min-w-[140px] flex-col py-0.5">
      <span class="text-xs font-semibold text-slate-800">
        ${proveedor.nombre}
      </span>
      <span class="text-[10px] text-slate-400">${completados}/12</span>
    </div>
  `);
}

function renderMes(validado, mes, provIndex, mesIndex) {
  const clases = validado
    ? "text-emerald-600 hover:text-emerald-700"
    : "text-slate-300 hover:text-slate-400";
  const icono = validado ? "check_circle" : "radio_button_unchecked";

  return html(`
    <div class="flex items-center justify-center">
      <button
        type="button"
        class="btn-check material-symbols-outlined text-2xl ${clases} cursor-pointer transition-colors"
        data-prov="${provIndex}"
        data-mes="${mesIndex}"
        title="${mes}: ${validado ? "validado" : "no validado"} (click para cambiar)"
        aria-label="${mes}: ${validado ? "validado" : "no validado"}"
        style="background: none; border: none; padding: 0; margin: 0;"
      >${icono}</button>
    </div>
  `);
}

function renderResumen(proveedor) {
  const completados = proveedor.cumplimiento.filter(Boolean).length;

  return html(`
    <div class="flex items-center justify-center">
      <span class="text-xs font-semibold text-slate-700">${completados}/12</span>
    </div>
  `);
}

function renderObservacionButton(proveedor, index) {
  const tieneObservacion = proveedor.observacion.trim().length > 0;
  const clases = tieneObservacion
    ? "bg-slate-900 text-white hover:bg-slate-800"
    : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  const texto = tieneObservacion ? "Ver nota" : "Agregar";

  return html(`
    <div class="flex items-center justify-center">
      <button
        type="button"
        class="btn-observacion inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${clases}"
        data-row-index="${index}"
        aria-label="Gestionar observaciones de ${proveedor.nombre}"
      >
        <span class="material-symbols-outlined text-[18px] leading-none">rate_review</span>
        ${texto}
      </button>
    </div>
  `);
}

function mapData() {
  return proveedores.map((proveedor, index) => [
    renderProveedor(proveedor, index),
    ...meses.map((mes, mesIndex) => renderMes(proveedor.cumplimiento[mesIndex], mes, index, mesIndex)),
    renderResumen(proveedor),
    renderObservacionButton(proveedor, index)
  ]);
}

function decorarBuscador() {
  const buscador = document.querySelector("#tabla-proveedores .gridjs-search");
  if (!buscador || buscador.dataset.decorado === "true") return;

  const label = document.createElement("label");
  label.textContent = "Buscar proveedor";
  label.className = "font-semibold text-slate-700";
  buscador.prepend(label);

  const titulo = document.createElement("h2");
  titulo.textContent = "Control mensual de cumplimiento";
  titulo.className = "titulo-tabla text-slate-900";
  buscador.append(titulo);

  buscador.dataset.decorado = "true";
}

function renderTabla() {
  const contenedor = document.getElementById("tabla-proveedores");
  if (!contenedor) return;

  const columns = [
    { name: "Proveedor", width: "140px" },
    ...meses.map((mes) => ({ name: mes, width: "52px" })),
    { name: "Total", width: "60px" },
    { name: "Nota", width: "110px" }
  ];

  const config = {
    columns,
    data: mapData(),
    search: {
      placeholder: "Filtrar proveedor"
    },
    sort: true,
    pagination: {
      enabled: false
    },
    className: {
      table: "min-w-full",
      td: "align-middle",
      th: "align-middle"
    },
    style: {
      table: {
        width: "100%",
        "min-width": "100%"
      },
      th: {
        "background-color": "#0B3356",
        color: "white",
        "font-size": "10px",
        "font-weight": "700",
        "text-align": "center",
        padding: "6px 2px",
        "border-bottom": "1px solid #dbe4ee"
      },
      td: {
        "font-size": "12px",
        color: "rgb(51,65,85)",
        padding: "4px 2px",
        "background-color": "#ffffff",
        "border-bottom": "1px solid #e2e8f0"
      }
    }
  };

  if (!tablaProveedores) {
    tablaProveedores = new Grid(config).render(contenedor);
  } else {
    tablaProveedores.updateConfig(config).forceRender();
  }

  decorarBuscador();

  const input = document.querySelector("#tabla-proveedores .gridjs-input");
  if (input) {
    input.setAttribute("aria-label", "Buscar proveedor");
  }
}

function abrirModal(index) {
  const modal = document.getElementById("modal-change");
  const titulo = document.getElementById("modal-change-title");
  const descripcion = document.getElementById("modal-change-text");
  const textarea = document.getElementById("input-update-observacion");
  const aviso = document.getElementById("aviso");
  const proveedor = proveedores[index];

  if (!modal || !titulo || !descripcion || !textarea || !proveedor) return;

  titulo.textContent = `Observaciones de ${proveedor.nombre}`;
  descripcion.textContent =
    "Agrega o ajusta la novedad de este proveedor. El cambio se refleja de inmediato en la tabla.";
  textarea.value = proveedor.observacion;
  modal.dataset.rowIndex = String(index);

  if (aviso) {
    aviso.textContent = "";
    aviso.classList.remove("opacity-100", "translate-y-0", "h-5");
    aviso.classList.add("opacity-0", "translate-y-3", "h-0");
  }

  modal.classList.remove("opacity-0", "pointer-events-none", "scale-95");
  modal.classList.add("opacity-100", "scale-100");
}

function cerrarModal() {
  const modal = document.getElementById("modal-change");
  const textarea = document.getElementById("input-update-observacion");
  const aviso = document.getElementById("aviso");

  if (!modal) return;

  modal.classList.remove("opacity-100", "scale-100");
  modal.classList.add("opacity-0", "pointer-events-none", "scale-95");
  modal.dataset.rowIndex = "";

  if (textarea) {
    textarea.value = "";
  }

  if (aviso) {
    aviso.textContent = "";
    aviso.classList.remove("opacity-100", "translate-y-0", "h-5");
    aviso.classList.add("opacity-0", "translate-y-3", "h-0");
  }
}

function guardarObservacion() {
  const modal = document.getElementById("modal-change");
  const textarea = document.getElementById("input-update-observacion");
  const aviso = document.getElementById("aviso");
  const rowIndexRaw = modal?.dataset.rowIndex ?? "";
  const rowIndex = Number(rowIndexRaw);
  const valor = textarea?.value.trim() ?? "";

  if (rowIndexRaw === "" || !Number.isInteger(rowIndex) || !proveedores[rowIndex]) return;

  if (!valor) {
    if (!aviso) return;

    aviso.textContent = "La observacion no puede estar vacia.";
    aviso.classList.remove("opacity-0", "translate-y-3", "h-0");
    aviso.classList.add("opacity-100", "translate-y-0", "h-5");
    return;
  }

  proveedores[rowIndex].observacion = valor;
  cerrarModal();
  renderTabla();
}

function bindEventos() {
  const contenedor = document.getElementById("tabla-proveedores");
  const btnGuardar = document.getElementById("btn-modal-observacion");
  const btnCancelar = document.getElementById("btn-cancelar");
  const modal = document.getElementById("modal-change");

  contenedor?.addEventListener("click", (event) => {
    // Click en check
    const btnCheck = event.target.closest(".btn-check");
    if (btnCheck) {
      const provIndex = Number(btnCheck.dataset.prov);
      const mesIndex = Number(btnCheck.dataset.mes);
      if (proveedores[provIndex]) {
        proveedores[provIndex].cumplimiento[mesIndex] = !proveedores[provIndex].cumplimiento[mesIndex];
        renderTabla();
      }
      return;
    }

    // Click en observacion
    const boton = event.target.closest(".btn-observacion");
    if (!boton) return;

    const index = Number(boton.dataset.rowIndex);
    abrirModal(index);
  });

  btnGuardar?.addEventListener("click", guardarObservacion);
  btnCancelar?.addEventListener("click", cerrarModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      cerrarModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabla();
  bindEventos();
});
