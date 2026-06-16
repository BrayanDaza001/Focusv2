import { saveSignature } from "./firmaService";

interface SignaturePadInstance {
  clear(): void;
  isEmpty(): boolean;
  toDataURL(type?: string): string;
  on(): void;
  off(): void;
}

declare const SignaturePad:
  | (new (canvas: HTMLCanvasElement) => SignaturePadInstance)
  | undefined;

const STORAGE_KEY = "perfil_firma_actual";

const canvas = document.getElementById("firmaCanvas") as HTMLCanvasElement | null;
const inputFirma = document.getElementById("input_firma") as HTMLInputElement | null;
const inputFirmaLabel = document.getElementById("label_input_firma") as HTMLLabelElement | null;
const imgPreview = document.getElementById("img_firma") as HTMLImageElement | null;
const imgPrincipal = document.getElementById("firma_actual_principal") as HTMLImageElement | null;
const limpiarFirmaButton = document.getElementById("limpiar_firma") as HTMLButtonElement | null;
const guardarFirmaButton = document.getElementById("guardar_firma") as HTMLButtonElement | null;
const statusContainer = document.getElementById("firma-status") as HTMLDivElement | null;
const helperText = document.getElementById("firma-helper") as HTMLParagraphElement | null;

if (
  canvas &&
  inputFirma &&
  inputFirmaLabel &&
  imgPreview &&
  imgPrincipal &&
  limpiarFirmaButton &&
  guardarFirmaButton &&
  statusContainer &&
  helperText &&
  typeof SignaturePad !== "undefined"
) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const signaturePad = new SignaturePad(canvas);
  let uploadedSignatureBase64 = "";
  let currentSignature = localStorage.getItem(STORAGE_KEY) ?? "";
  let editMode = currentSignature.length === 0;

  const setStatus = (type: "success" | "error" | "info", message: string) => {
    const variants = {
      success: "border-emerald-200 bg-emerald-50 text-emerald-700",
      error: "border-rose-200 bg-rose-50 text-rose-700",
      info: "border-sky-200 bg-sky-50 text-sky-700",
    };

    statusContainer.className = `w-23/24 rounded-xl border px-4 py-3 text-sm font-medium ${variants[type]}`;
    statusContainer.textContent = message;
  };

  const clearStatus = () => {
    statusContainer.className =
      "w-23/24 hidden rounded-xl border px-4 py-3 text-sm font-medium";
    statusContainer.textContent = "";
  };

  const setUploadEnabled = (enabled: boolean) => {
    inputFirma.disabled = !enabled;
    inputFirmaLabel.classList.toggle("opacity-40", !enabled);
    inputFirmaLabel.classList.toggle("pointer-events-none", !enabled);
    inputFirmaLabel.classList.toggle("cursor-not-allowed", !enabled);
    inputFirmaLabel.classList.toggle("cursor-pointer", enabled);
  };

  const renderCurrentSignature = () => {
    if (currentSignature) {
      imgPreview.src = currentSignature;
      imgPreview.alt = "Vista previa actual de la firma";
      imgPrincipal.src = currentSignature;
      imgPrincipal.alt = "Firma actual";
      imgPrincipal.classList.remove("hidden");
    } else {
      imgPreview.src = "";
      imgPreview.alt = "";
      imgPrincipal.src = "";
      imgPrincipal.alt = "";
      imgPrincipal.classList.add("hidden");
    }
  };

  const applyMode = () => {
    if (editMode) {
      canvas.classList.remove("hidden");
      imgPrincipal.classList.add("hidden");
      setUploadEnabled(true);
      guardarFirmaButton.disabled = false;
      guardarFirmaButton.classList.remove("opacity-70", "cursor-not-allowed");
      signaturePad.on();
      helperText.textContent =
        "Dibuja una nueva firma o sube una imagen y luego guarda los cambios.";
      return;
    }

    canvas.classList.add("hidden");
    setUploadEnabled(false);
    guardarFirmaButton.disabled = true;
    guardarFirmaButton.classList.add("opacity-70", "cursor-not-allowed");
    signaturePad.off();
    renderCurrentSignature();
    helperText.textContent =
      currentSignature
        ? 'Se muestra la firma actual. Usa "Limpiar firma" para reemplazarla.'
        : 'Aun no hay una firma guardada. Usa "Limpiar firma" para crearla.';
  };

  const getEditableSignature = () => {
    if (!signaturePad.isEmpty()) {
      return signaturePad.toDataURL("image/png");
    }

    if (uploadedSignatureBase64) {
      return uploadedSignatureBase64;
    }

    return "";
  };

  inputFirma.addEventListener("change", (event) => {
    if (!editMode) return;

    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("error", "Solo se permiten archivos de imagen.");
      inputFirma.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result !== "string") {
        setStatus("error", "No fue posible procesar la imagen seleccionada.");
        return;
      }

      uploadedSignatureBase64 = result;
      signaturePad.clear();
      imgPreview.src = result;
      imgPreview.alt = "Vista previa de la nueva firma";
      clearStatus();
      setStatus("info", "Imagen cargada. Ya puedes guardar el cambio.");
    };

    reader.onerror = () => {
      setStatus("error", "Ocurrio un error al leer la imagen.");
    };

    reader.readAsDataURL(file);
  });

  limpiarFirmaButton.addEventListener("click", () => {
    editMode = true;
    uploadedSignatureBase64 = "";
    signaturePad.clear();
    inputFirma.value = "";
    imgPreview.src = currentSignature;
    imgPreview.alt = currentSignature ? "Vista previa actual de la firma" : "";
    clearStatus();
    setStatus("info", "Modo edicion habilitado. Reemplaza la firma y luego guarda.");
    applyMode();
  });

  guardarFirmaButton.addEventListener("click", async () => {
    if (!editMode) {
      setStatus("info", 'Usa "Limpiar firma" para habilitar la edicion.');
      return;
    }

    const firma = getEditableSignature();

    if (!firma) {
      setStatus("error", "Debes dibujar o subir una firma antes de guardar.");
      return;
    }

    guardarFirmaButton.disabled = true;
    guardarFirmaButton.classList.add("opacity-70", "cursor-not-allowed");
    setStatus("info", "Guardando firma...");

    imgPreview.src = firma;
    imgPreview.alt = "Vista previa de la nueva firma";

    const response = await saveSignature({ firma });

    if (!response.success) {
      guardarFirmaButton.disabled = false;
      guardarFirmaButton.classList.remove("opacity-70", "cursor-not-allowed");
      setStatus("error", response.message);
      return;
    }

    currentSignature = firma;
    localStorage.setItem(STORAGE_KEY, firma);
    uploadedSignatureBase64 = "";
    inputFirma.value = "";
    signaturePad.clear();
    editMode = false;
    renderCurrentSignature();
    applyMode();
    setStatus("success", response.message);
  });

  renderCurrentSignature();
  applyMode();

  if (!currentSignature) {
    guardarFirmaButton.disabled = false;
    guardarFirmaButton.classList.remove("opacity-70", "cursor-not-allowed");
    helperText.textContent =
      'No hay una firma actual guardada. Dibuja o sube una y luego pulsa "Guardar cambios".';
  }
}

export {};
