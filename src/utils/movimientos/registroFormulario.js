function getPreguntasFormulario() {
  const storageKey = "preguntasFormulario";
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    window.localStorage.removeItem(storageKey);
  }

  return window["__PREGUNTAS_FORMULARIO"] || [];
}

function crearCampoPregunta(pregunta) {
  const fieldType =
    pregunta.tipo === "Fecha"
      ? "date"
      : pregunta.tipo === "Numero"
        ? "number"
        : "text";
  const placeholder =
    pregunta.tipo === "Seleccion" ? "Respuesta" : "Escribe tu respuesta";

  return (
    '<div class="flex flex-col gap-1">' +
    '<label for="pregunta-' +
    pregunta.id +
    '" class="text-sm font-medium text-slate-700">' +
    pregunta.pregunta +
    "</label>" +
    "<input " +
    'type="' +
    fieldType +
    '" ' +
    'id="pregunta-' +
    pregunta.id +
    '" ' +
    'name="pregunta-' +
    pregunta.id +
    '" ' +
    'placeholder="' +
    placeholder +
    '" ' +
    'class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" ' +
    "/>" +
    "</div>"
  );
}

function renderPreguntasRegistro() {
  const container = document.getElementById("registro-preguntas");
  if (!container) return;

  const preguntas = getPreguntasFormulario().slice(0, 10);
  container.innerHTML = preguntas.map(crearCampoPregunta).join("");
}

window.addEventListener("DOMContentLoaded", renderPreguntasRegistro);
