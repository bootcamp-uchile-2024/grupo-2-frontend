export const API_URL = import.meta.env
  .VITE_SERVER_API; /* || 'http://localhost:3000' */

export const CERVEZAS_ENDPOINT = `${API_URL}/cervezas`;
export const USERS_ENDPOINT = `${API_URL}/usuarios/`;
