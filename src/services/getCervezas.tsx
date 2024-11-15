import { PRODUCT_ENDPOINT } from "../config/api.config";

export async function getUsuarios() {
  try {
    const response = await fetch(PRODUCT_ENDPOINT);
    if (!response.ok) throw new Error(`Error at fetching ${PRODUCT_ENDPOINT }`);
    const data = await response.json();
    return data;
  } catch {
    throw new Error(`Error at fetching ${PRODUCT_ENDPOINT }`);
  }
}