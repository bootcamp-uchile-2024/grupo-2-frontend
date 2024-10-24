import Cerveza from "./Cerveza";
interface Suscripcion {
  id: number;
  nombre: string;
  precio: number;
  descuento: number;
  tipo_envio: string; //gratis, rebajado, normal
  items_promocion: Cerveza[];
}
export default Suscripcion;
