import { IPedidoCerveza } from "../pages/productos/componentes/Listado.tsx";
import Cerveza from "./ICerveza.ts";
interface ICarrito {
  id: number;
  items: IPedidoCerveza[];
  total_a_pagar: number;
  documento_de_compra: string; //boleta o factura Ver si va en usurios o en carrito.
}

export default ICarrito;
