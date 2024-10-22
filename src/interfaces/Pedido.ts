import Cerveza from "./ICerveza";
interface Pedido {
  id: number;
  cervezas: Cerveza[];
  estado: string; // aceptado, pagado, enviado, etc. Enum
  fecha_ingreso: Date;
  direccion_entrega: string; //puede ser local o envio a tercero
  correo_comprador: string; //se puede sacar del modelo usuario si esta logeado. Si no se solicita
  telefono_comprador: number; //se puede sacar del modelo usuario si esta logeado. Si no se solicita
  fecha_entrega: Date; //entrega física o envío
  numero_pedido: number; //se puede repetir con ID o dejar uno de los dos
}
export default Pedido;
