import { CERVEZAS_ENDPOINT } from "@/config/api.config";

export async function getCervezas() {
  try {
    const response = await fetch(`${CERVEZAS_ENDPOINT}?pagina=&cantproductos=`);
    if (!response.ok) throw new Error(`Error at fetching ${CERVEZAS_ENDPOINT}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error at fetching ${CERVEZAS_ENDPOINT}`);
  }
}
