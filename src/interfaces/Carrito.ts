import Cerveza from "./Cerveza";
interface Carrito {
  id: number;
  items: Cerveza[];
  total_a_pagar: number;
  documento_de_compra: string; //boleta o factura Ver si va en usurios o en carrito.
}

export default Carrito;
