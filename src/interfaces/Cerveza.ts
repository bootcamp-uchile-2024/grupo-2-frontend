interface Cerveza {
  id: number;
  nombre: string;
  marca: string;
  categoria: string; // IPA, ALE, etc
  stock: number; // catidad disponible
  imagen: string;
  descripcion: string;
  precio: number;
  proveedor: string; //visible sólo para usuario administrador
  region: string; // para venta por sector.
}
export default Cerveza;
