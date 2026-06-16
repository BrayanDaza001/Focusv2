const SAVE_SIGNATURE_ENDPOINT = "http://localhost:5000/firma";

export interface SaveSignaturePayload {
  firma: string;
}

export interface SaveSignatureResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function saveSignature(
  payload: SaveSignaturePayload | string,
): Promise<SaveSignatureResponse> {
  try {
    const bodyPayload = typeof payload === "string" ? { firma: payload } : payload;
  console.log(bodyPayload.firma);
    const response = await fetch(SAVE_SIGNATURE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyPayload),
    });

    const result = (await response.json().catch(() => null)) as
      | Partial<SaveSignatureResponse>
      | null;

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "No fue posible guardar la firma.",
        data: result?.data,
      };
    }

    return {
      success: true,
      message: result?.message || "Firma guardada correctamente.",
      data: result?.data,
    };
  } catch (error) {
    console.error("Error al guardar la firma", error);

    return {
      success: false,
      message: "Ocurrio un error de conexion al guardar la firma.",
    };
  }
}
