export const API_URL = import.meta.env
  .VITE_SERVER_API; /* || 'http://localhost:3000' */

export const CERVEZAS_ENDPOINT = `${API_URL}/cervezas`;
export const USERS_ENDPOINT = `${API_URL}/usuarios`;
export const LOGIN_ENDPOINT = `${API_URL}/usuarios/login`;
export const AMARGOR_ENDPOINT = `${API_URL}/amargor`;
export const TIPO_ENDPOINT = `${API_URL}/Estilo`;

// export const API_URL = `/docker/development/`;
