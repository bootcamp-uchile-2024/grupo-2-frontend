
interface Usuario {
  id: number
  nombre: string
  correo: string
  contraseña: string
  direccion: string
  telefono: number
  region: string
  historial_pedidos: Pedido[]
  suscripcion: Suscripcion
}

interface Pedido {
  id: number
  cervezas: Cerveza[]
  estado: string
  fecha_ingreso: Date
  direccion_entrega: string 
  correo_comprador: string 
  telefono_comprador: number 
  fecha_entrega: Date 
  numero_pedido: number
}

interface Cerveza {
  id: number
  nombre: string
  marca: string
  categoria: string
  stock: number
  descripcion: string
  precio: number
  proveedor: string
  region: string
}

interface Carrito {
  id: number
  items: Cerveza[]
  total_a_pagar: number
  documento_de_compra: string
}

interface Suscripcion {
  id: number
  nombre: string
  precio: number
  descuento: number
  tipo_envio: string
  items_promocion: Cerveza[]
}

export type { Usuario, Pedido, Cerveza, Carrito, Suscripcion }