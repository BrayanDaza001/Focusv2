const canvas = document.getElementById("firmaCanvas");

// Ajustar tamaño correctamente
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const signaturePad = new SignaturePad(canvas);
const inputFirma = document.getElementById("input_firma");
const imgPreview = document.getElementById("img_firma");

// Cuando el usuario sube una imagen
inputFirma.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Validar tipo
  if (!file.type.startsWith("image/")) {
    alert("Solo se permiten imágenes");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const base64 = event.target.result;

    // Mostrar preview
    imgPreview.src = base64;

    // 🔥 Opcional: limpiar canvas si sube imagen
    if (window.signaturePad) {
      signaturePad.clear();
    }

    console.log("Imagen cargada:", base64);
  };

  reader.readAsDataURL(file);
});

// LIMPIAR FIRMA
document.getElementById("limpiar_firma").addEventListener("click", () => {
  signaturePad.clear();
});

// GUARDAR FIRMA (como imagen)
document.querySelector("#guardar_firma")?.addEventListener("click", () => {
  if (signaturePad.isEmpty()) {
    alert("Por favor firma primero");
    return;
  }

  const dataURL = signaturePad.toDataURL();

  // Mostrar preview
  document.getElementById("img_firma").src = dataURL;

  console.log(dataURL); // aquí puedes enviarlo al backend

  
});