
interface Usuario {
    id: number
    nombre: string
    correo: string
    contraseña: string
    direccion: string
    telefono: number
    region: string // Enum para que sea selector
    edad: number
    historial_pedidos: Pedido[]
    suscripcion: Suscripcion //una sola suscripcion por usuario
  }
  
  interface Pedido {
    id: number
    cervezas: Cerveza[]
    estado: string // aceptado, pagado, enviado, etc. Enum
    fecha_ingreso: Date
    direccion_entrega: string //puede ser local o envio a tercero
    correo_comprador: string //se puede sacar del modelo usuario si esta logeado. Si no se solicita
    telefono_comprador: number //se puede sacar del modelo usuario si esta logeado. Si no se solicita
    fecha_entrega: Date //entrega física o envío
    numero_pedido: number //se puede repetir con ID o dejar uno de los dos
  }
  
  interface Cerveza {
    id: number
    nombre: string
    marca: string
    categoria: string // IPA, ALE, etc. Enum
    stock: number // catidad disponible
    descripcion: string
    precio: number
    proveedor: string //visible sólo para usuario administrador
    region: string // para venta por sector. Enum
  }
  
  interface Carrito {
    id: number
    items: Cerveza[]
    total_a_pagar: number
    documento_de_compra: string //boleta o factura Ver si va en usurios o en carrito. Enum
  }
  
  interface Suscripcion {
    id: number
    nombre: string
    precio: number
    descuento: number
    tipo_envio: string //gratis, rebajado, normal .Enum
    items_promocion: Cerveza[]
  }
  
  export { Usuario, Pedido, Cerveza, Carrito, Suscripcion }