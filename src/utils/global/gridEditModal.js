import { openModal, closeModal } from "./modales_scripts";

const modalRegistry = new Map();

function getInputClasses() {
  return "mt-2 h-11 w-full rounded-sm border border-gray-200 bg-gray-100 px-4 text-sm text-slate-700 focus:bg-blue-100 focus:border-blue-500 focus:outline-none";
}

function getLabelClasses() {
  return "text-sm font-semibold text-slate-700";
}

function normalizeValue(value) {
  return value ?? "";
}

function buildFieldElement(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = field.fullWidth ? "md:col-span-2" : "";

  const label = document.createElement("label");
  label.className = getLabelClasses();
  label.htmlFor = field.name;
  label.textContent = field.label;
  wrapper.append(label);

  let control;

  if (field.type === "textarea") {
    control = document.createElement("textarea");
    control.className = `${getInputClasses()} min-h-28 resize-none py-3`;
    control.value = normalizeValue(value);
  } else if (field.type === "select") {
    control = document.createElement("select");
    control.className = getInputClasses();

    (field.options || []).forEach((option) => {
      const optionElement = document.createElement("option");
      const normalizedOption =
        typeof option === "string"
          ? { value: option, label: option }
          : option;

      optionElement.value = normalizedOption.value;
      optionElement.textContent = normalizedOption.label;
      optionElement.selected = normalizedOption.value === normalizeValue(value);
      control.append(optionElement);
    });
  } else {
    control = document.createElement("input");
    control.type = field.type || "text";
    control.className = getInputClasses();
    control.value = normalizeValue(value);
  }

  control.id = field.name;
  control.name = field.name;

  if (field.placeholder) {
    control.placeholder = field.placeholder;
  }

  if (field.readOnly) {
    control.readOnly = true;
    control.classList.add("cursor-not-allowed", "opacity-70");
  }

  wrapper.append(control);
  return wrapper;
}

function collectValues(form, fields) {
  const formData = new FormData(form);
  const values = {};

  fields.forEach((field) => {
    const rawValue = formData.get(field.name);
    values[field.name] =
      field.type === "number" && rawValue !== "" ? Number(rawValue) : rawValue;
  });

  return values;
}

function ensureModal(modalId = "grid-edit-modal") {
  if (modalRegistry.has(modalId)) {
    return modalRegistry.get(modalId);
  }

  const modal = document.getElementById(modalId);
  if (!modal) return null;

  const state = {
    modal,
    form: document.getElementById(`${modalId}-form`),
    fieldsContainer: document.getElementById(`${modalId}-fields`),
    title: document.getElementById(`${modalId}-title`),
    description: document.getElementById(`${modalId}-description`),
    confirmButton: document.getElementById(`${modalId}-confirm`),
    cancelButton: document.getElementById(`${modalId}-cancel`),
    config: null
  };

  state.cancelButton?.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal(state.modal);
  });

  state.modal.addEventListener("click", (event) => {
    if (event.target === state.modal) {
      closeModal(state.modal);
    }
  });

  state.confirmButton?.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!state.config) return;

    const values = collectValues(state.form, state.config.fields);
    const payload = {
      context: state.config.context,
      values,
      originalRecord: state.config.record,
      rowIndex: state.config.rowIndex
    };

    if (typeof state.config.onConfirm === "function") {
      await state.config.onConfirm(payload);
    }

    window.dispatchEvent(
      new CustomEvent("grid:edit-modal:submit", {
        detail: payload
      })
    );

    closeModal(state.modal);
  });

  modalRegistry.set(modalId, state);
  return state;
}

export function openGridEditModal(config) {
  const state = ensureModal(config.modalId);
  if (!state) return;

  state.config = config;
  state.title.textContent = config.title || "Editar registro";
  state.description.textContent =
    config.description || "Actualiza la información del registro seleccionado.";
  state.confirmButton.textContent = config.confirmText || "Confirmar";
  state.fieldsContainer.innerHTML = "";

  config.fields.forEach((field) => {
    state.fieldsContainer.append(
      buildFieldElement(field, config.record[field.name])
    );
  });

  openModal(state.modal);
}

export function bindGridEditButtons({
  tableId,
  buttonSelector,
  getRecord,
  getModalConfig
}) {
  document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById(tableId);
    if (!table) return;

    ensureModal();

    table.addEventListener("click", (event) => {
      const button = event.target.closest(buttonSelector);
      if (!button) return;

      const rowIndex = Number(button.dataset.rowIndex);
      const record = getRecord(rowIndex, button);

      if (!record) return;

      openGridEditModal(getModalConfig(record, rowIndex, button));
    });
  });
}
