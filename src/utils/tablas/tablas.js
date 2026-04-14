import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
const API_URL = import.meta.env.PUBLIC_API_URL

document.addEventListener('DOMContentLoaded', async () => {

  // 1️⃣ Fetch a tu API
  const res = await fetch(`${API_URL}ActivosPendientes`,{
    method: 'GET',
    credentials: 'include'
  });
  const json = await res.json();
  const lista = json.data;
  let dataFinal;

  dataFinal = lista.map((cobro, index) => {

    let estadoItem;
    let botones =  html(`
            <div class="flex flex-row gap-2">
            <button class="btn-precie flex items-center justify-center w-7 h-7 bg-amber-400 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id-price='${cobro.id_Cobro}'
                data-id-activo-price='${cobro.activo}'>
                <span class="material-symbols-outlined">attach_money</span>
              </button>                
                <button class="btn-observacion flex items-center justify-center w-7 h-7 bg-slate-700 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id='${cobro.id_Cobro}'>
                <span class="material-symbols-outlined">error_outline</span>
              </button>
              <button class="btn-actualizar flex items-center justify-center w-7 h-7 bg-teal-500 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id-update='${cobro.id_Cobro}' data-id-activo='${cobro.activo}'
                >
                <span class="material-symbols-outlined">update</span>
              </button>
              <button class="btn-observacion-factura flex items-center justify-center w-7 h-7 bg-sky-600 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id-update-factura='${cobro.id_Cobro}'
                data-id-activo-factura ='${cobro.activo}'>
                <span class="material-symbols-outlined">work_alert</span>
              </button>
            </div>`)
            let botonesDos = html(`
            <div class="flex flex-row gap-2">
            <button class="btn-precie flex items-center justify-center w-7 h-7 bg-amber-400 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id-price='${cobro.id_Cobro}'
                data-id-activo-price='${cobro.activo}'>
                <span class="material-symbols-outlined">attach_money</span>
              </button>                
                <button class="btn-observacion flex items-center justify-center w-7 h-7 bg-slate-700 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id='${cobro.id_Cobro}'>
                <span class="material-symbols-outlined">error_outline</span>
              </button>
              <button class="btn-actualizar flex items-center justify-center w-7 h-7 bg-teal-500 text-white text-xl hover:scale-125 transition-transform rounded cursor-pointer"
                data-id-update='${cobro.id_Cobro}' data-id-activo='${cobro.activo}'
                >
                <span class="material-symbols-outlined">update</span>
              </button>
            </div>`)

    const esLinea = cobro.tipo_Activo === 'Linea_Telefonica';
    switch(cobro.id_Estado){

      case "2":
        estadoItem =html(`
          <div class="flex gap-2 items-center">
          <div>🔴</div>
          <p class=" text-black ">${cobro.estado}</p>
          </div>`);
          botones = cobro.tipo_Activo  === 'Linea_Telefonica'
          ? botonesDos
          :botones
            break;

      case "3":
        estadoItem =html(`
          <div class="flex gap-2 items-center">
          <div>🔵</div>
          <p class=" text-black ">${cobro.estado}</p>
          </div>`);
          botones = cobro.tipo_Activo  === 'Linea_Telefonica'
          ? botonesDos
          :botones
            break;

      case "5":
        estadoItem =html(`
          <div class="flex gap-2 items-center">
          <div>🔶</div>
          <p class=" text-black ">${cobro.estado}</p>
          </div>`);
          botones = cobro.tipo_Activo  === 'Linea_Telefonica'
          ? botonesDos
          :botones
            break;
      case "6":
        estadoItem =html(`
          <div class="flex gap-2 items-center">
          <div>🔴</div>
          <p class=" text-black ">${cobro.estado}</p>
          </div>`);
          botones = cobro.tipo_Activo  === 'Linea_Telefonica'
          ? botonesDos
          :botones
            break;
      case "7":
        
        estadoItem =html(`
          <div class="flex gap-2 items-center">
          <div>🔴</div>
          <p class=" text-black ">${cobro.estado}</p>
          </div>`);
          botones = cobro.tipo_Activo  === 'Linea_Telefonica'
          ? botonesDos
          :botones
            break;
      default:

            estadoItem=html(`
              <p class="bg-blue-600 text-amber-50 border rounded-md text-c">${cobro.id_Estado}</p>`);
            botones=html(`<div class="flex flex-row gap-2">Valida las observaciones</div>`)
            
    }
    return[
      cobro.mes,                   // Número
      cobro.proveedor,              // Proveedor
      cobro.factura,
      cobro.orden_Compra,                // Factura
      cobro.activo || "Sin activo",
      cobro.tipo_Activo,
      cobro.valor_Unitario,// Activo
      cobro.subtotal,
      estadoItem,
      cobro.observacion,
      botones
    ]
  });

  // 3️⃣ Renderizar Grid.js
  new Grid({
    columns: [
      "Mes",
      "Proveedor",
      "Factura",
      "O. Compra",
      "Activo",
      "T. Activo",
      "V. Unitario",
      "Subtotal",
      "Estado",
      "Observacion",
      {
        name: "Acción",
        html: true
      }
    ],
    data: dataFinal,
    pagination: {
      enabled: true,
      limit: 10
    },
    search: true,
    sort: true,
    style: {
      th: {
        "background-color": "#0B3356",
        color: "white",
        
      },
      td:{
        "font-size":" 12px"
      }
    }
  }).render(document.getElementById("table-alert"));
  
});
