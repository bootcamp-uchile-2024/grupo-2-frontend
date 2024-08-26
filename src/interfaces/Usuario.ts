import Pedido from "./Pedido";
import Suscripcion from "./Suscripcion";
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  direccion: string;
  telefono: number;
  region: string;
  edad: number;
  historial_pedidos?: Pedido[];
  suscripcion?: Suscripcion;
}
export default Usuario;
