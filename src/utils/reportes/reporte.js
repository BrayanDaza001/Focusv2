import ExcelJs from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = import.meta.env.PUBLIC_API_URL_REPORTE
const btnDownload = document.getElementById('btn-download')

async function datosExcel(Mes, Anio, IdProyecto) {
  try {
    const params = new URLSearchParams({
      mes: Mes,
      Anio: Anio
    });

    // Solo enviamos IdProyecto si NO es "Todos"
    if (Number(IdProyecto) !== 0) {
      params.append('IdProyecto', IdProyecto);
    }

    const res = await fetch(`${API_URL}?${params.toString()}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("Respuesta API hola:", data);
    return data;

  } catch (error) {
    console.error('Error al obtener datos:', error.message);
    return null;
  }
}
async function getBase64Image(url) {
  const res = await fetch('/img/oca.png');       // 1. Trae la imagen desde la URL
  const blob = await res.blob();      // 2. Convierte la respuesta en un "blob" (archivo binario)
  return new Promise((resolve) => {
    const reader = new FileReader();  // 3. Crea un lector de archivos
    reader.onloadend = () => resolve(reader.result); // 4. Cuando termina, devuelve Base64
    reader.readAsDataURL(blob);       // 5. Convierte el blob a Base64
  });
}

async function crearExcel(mouth,year,id) {
    const workbook = new ExcelJs.Workbook();    
    const worksheet = workbook.addWorksheet('Reporte')
    const datosApi = await datosExcel(mouth,year,id)
    if (!datosApi || !datosApi.data || datosApi.data.length === 0) {
    console.error("No hay datos para generar el Excel");
    return;
}

    worksheet.columns= [
        { header: "Serial_GLPI", key: "c1", width: 15 },
        { header: "Nombre_Activo_GLPI", key: "c2", width: 15 },
        { header: "Placa", key: "c3", width: 15 },
        { header: "Estado_Activo_GLPI", key: "c4", width: 25 },
        { header: "Año", key: "c5", width: 15 },
        { header: "Mes", key: "c6", width: 15 },
        { header: "Contracto", key: "c7", width: 15 },
        { header: "Centro de Costo", key: "c8", width: 15 },
        { header: "Fecha Prefactura", key: "c9", width: 40 },
        { header: "Proveedor", key: "c10", width: 15 },
        { header: "Tipo Activo", key: "c11", width: 25 },
        { header: "Numero_Factura", key: "c12", width: 15 },
        { header: "Numero_Orden_Compra", key: "c13", width: 15 },
        { header: "Valor_Por_Di", key: "c14", width: 15 },
        { header: "Valor", key: "c15", width: 15 },
        { header: "Valor total del activo", key: "c16", width: 15 },
        { header: "Observacion", key: "c17", width: 120 },
        { header: "Historial", key: "c18", width: 45 }
    ];
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Calibri', bold: true, color: { argb: 'FFFFFFFF' } }; // letra blanca y negrita
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1A1A48' } // azul oscuro
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

const estados = {
  1: 'ASIGNADO',
  4: 'DEVUELTO',
  5: 'ROBADO',
  6: 'PERDIDO',
  10: 'BACKUP',
  12: 'DAÑADO',
  33: 'PRESTAMO'
};



      // Agregar una fila de ejemplo
datosApi.data.forEach(item => {
  worksheet.addRow({
    c1: item.serial_GLPI,
    c2: item.nombre_Activo_GLPI,
    c3: item.placa,
    c4: estados[item.estado_Activo_GLPI] || 'SIN ESTADO',
    c5: item.anio,
    c6: item.mes,
    c7: item.contrato,
    c8: item.centrO_COS,
    c9:  item.fecha_Prefactura,
    c10:  item.proveedor,
    c11: item.tipoActivo,
    c12: item.numero_Factura,
    c13: item.numero_Orden_Compra,
    c14: item.valor_Por_Dia,
    c15: item.valor,
    c16: item.subtotal,
    c17: item.observacion,
    c18: item.obsercacion_Historial,
  });
});

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reporte.xlsx";
  link.click();

}
async function crearPDF(mouth,year,id) {
  const doc = new jsPDF("landscape");
  const datosApi = await datosExcel(mouth,year,id)

  const pageWidth = doc.internal.pageSize.getWidth(); // ancho de la página

  // 1️⃣ Imagen
  const imgData = await getBase64Image('/img/oca.png'); // PNG o JPG
  doc.addImage(imgData, 'PNG', 212, 6, 80, 20); // x, y, ancho, alto
  // feha de generacion
  const today = new Date();
  const hora = today.toLocaleTimeString('es-CO', {
  hour: '2-digit',
  minute: '2-digit'
});
  const formattedDate = today.toLocaleDateString('es-CO');
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.text(`Reporte Generado el Dia: ${formattedDate} a las ${hora}`, 212, 205);
  
  // 2️⃣ Título centrado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Reporte", pageWidth / 2, 15, { align: "center" });

  // 3️⃣ Subtítulo
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text("Facturacion de Activos OCA GLOBAL", pageWidth / 2, 22, { align: "center" });
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(14, 27, pageWidth - 14, 27);
  // 4️⃣ Encabezados y datos
  const headers = [[
    "Serial_GLPI",
    "Placa",
    "Año",
    "Mes",
    "Valor",
    "Contrato",
    "Centro de Costo",
    "Proveedor",
    "Tipo Activo",
    "N° Factura",
    "N°Compra",
    "Valor Por Día",
    "Subtotal",
    "Observación"
  ]];

  const body = datosApi.data.map(item => [
    item.serial_GLPI,
    item.placa,
    item.anio,
    item.mes.slice(0,4)+'.',
    item.contrato,
    item.centrO_COS,
    item.proveedor,
    item.tipoActivo,
    item.numero_Factura,
    item.numero_Orden_Compra,
    item.valor_Por_Dia,
    item.valor,
    item.subtotal,
    item.observacion
  ]);

  // 5️⃣ Tabla
  autoTable(doc, {
    head: headers,
    body: body,
    startY: 30, // empieza debajo de imagen y título
    styles: {
      fontSize: 8,
      cellPadding: 2,
      fillColor: [255,255,255],
      textColor: [50,50,50],
      lineColor: [200,200,200],
      lineWidth: 0.3,
      halign: 'center', // centrado horizontal
      valign: 'middle', // centrado vertical
    },
    alternateRowStyles: {
  fillColor: [248, 248, 248]
},
    headStyles: {
      fillColor: [230, 235, 240],
      textColor: [40, 40, 40],
      fontStyle: 'bold',
      align: 'center',
      valign: 'middle'
    },
    columnStyles: {
      2: { cellWidth: 12, halign: 'center' },
      10: { cellWidth: 25, halign: 'center' },
      12: { cellWidth: 50, overflow: 'linebreak', halign: 'left' } // Observación
    }
    
  });
  const total = datosApi.data.reduce(
  (sum, item) => sum + Number(item.subtotal || 0),
  0
);
const totalFormateado = total.toLocaleString('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
});
autoTable(doc, {
  body: [[
    'TOTAL', '', '', '', '', '', '', '', '', '', '', 
    totalFormateado, ''
  ]],
  startY: doc.lastAutoTable.finalY + 4,
  styles: {
    fontStyle: 'bold',
    halign: 'right',
    fillColor: [240, 240, 240]
  }
});
const pageCount = doc.internal.getNumberOfPages();

for (let i = 1; i <= pageCount; i++) {
  doc.setPage(i);

  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width || pageSize.getWidth();
  const pageHeight = pageSize.height || pageSize.getHeight();

  doc.setFont("times", "italic");
  doc.setFontSize(9);

  doc.text(
    `Página ${i} de ${pageCount}`,
    15,
    pageHeight - 10,
    { align: "left" }
  );
}

  doc.save("reporte.pdf");
}

btnDownload.addEventListener('click', async () => {
  const project = document.getElementById('project-filter');
  const idProject = project.value;
  const month = document.getElementById('month-filter').value.trim();
  const year = document.getElementById('year-filter').value.trim();
  const archive = document.getElementById('archive-filter').value.trim();
  const ms = document.getElementById('msg-error');

  // 1️⃣ Validaciones (SIN modal)
  if (!month || !idProject || archive === 'Seleccione un archivo') {
    ms.classList.remove('opacity-0','pointer-events-none');
    ms.classList.add('opacity-100');
    ms.textContent = 'Debe llenar todos los campos';
    setTimeout(() => {
      ms.classList.add('opacity-0','pointer-events-none');
      ms.classList.remove('opacity-100');
    }, 3000);
    return;
  }

  // 2️⃣ Consultar datos (SIN modal)
  const datosApi = await datosExcel(month, year, idProject);

  if (!datosApi || !datosApi.data || datosApi.data.length === 0) {
    ms.classList.remove('opacity-0','pointer-events-none');
    ms.classList.add('opacity-100');
    ms.textContent = 'No hay datos para este periodo';
    setTimeout(() => {
      ms.classList.add('opacity-0','pointer-events-none');
      ms.classList.remove('opacity-100');
    }, 3000);
    return;
  }

  // 3️⃣ Mostrar modal SOLO si sí hay trabajo
  mostrarLoading();

  // ⏳ Dejar renderizar el modal
  await new Promise(resolve => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });

  try {
    if (archive === 'Excel') {
      await crearExcel(month, year, idProject);
    }

    if (archive === 'PDF') {
      await crearPDF(month, year, idProject);
    }

  } catch (error) {
    console.error('Error generando archivo:', error);
  } finally {
    ocultarLoading(); // 👈 SIEMPRE se oculta
  }
});

const loading = document.getElementById('loading-screen');

function mostrarLoading() {
  if (!loading) return;
  loading.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
  loading.classList.add('opacity-100');
}

function ocultarLoading() {
  if (!loading) return;
  loading.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
  loading.classList.remove('opacity-100');
}
