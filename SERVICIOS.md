# Servicio de Gestión de Pedidos de Cerveza

## Propósito del Servicio

El propósito de este servicio es gestionar los pedidos de cervezas, incluyendo la creación, actualización y seguimiento del estado de los pedidos. Además, permite la gestión de usuarios, suscripciones y carritos de compra.

## Rutas de los Ficheros DTO's

### Usuario

- **Ruta:** `src/dtos/Usuario.ts`
- **Descripción:** Define la estructura de los datos del usuario, incluyendo información personal, historial de pedidos y suscripción.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  direccion: string;
  telefono: number;
  region: string;
  edad: number;
  historial_pedidos: Pedido[];
  suscripcion: Suscripcion;
}
```

### Pedido

- **Ruta:** `src/interfaces/Pedido.ts`
- **Descripción:** Define la estructura de los datos de un pedido, incluyendo las cervezas solicitadas, estado del pedido, fechas importantes y detalles de contacto del comprador.

```typescript
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
```

### Cerveza

- **Ruta:** `src/interfaces/Cerveza.ts`
- **Descripción:** Define la estructura de los datos de una cerveza, incluyendo nombre, marca, categoría, stock, descripción, precio, proveedor y región.

```Typescript
interface Cerveza {
    id: number
    nombre: string
    marca: string
    categoria: string // IPA, ALE, etc
    stock: number // catidad disponible
    descripcion: string
    precio: number
    proveedor: string //visible sólo para usuario administrador
    region: string // para venta por sector.
}
```

### Carrito

- **Ruta:** `src/interfaces/Carrito.ts`
- **Descripción:** Define la estructura de los datos de un carrito de compra, incluyendo los ítems agregados, total a pagar y tipo de documento de compra.

```Typescript
interface Carrito {
    id: number
    items: Cerveza[]
    total_a_pagar: number
    documento_de_compra: string //boleta o factura Ver si va en usurios o en carrito.
}
```

### Suscripción

- **Ruta:** `src/interfaces/Suscripcion.ts`
- **Descripción:** Define la estructura de los datos de una suscripción, incluyendo nombre, precio, descuento, tipo de envío y items en promoción.

```Typescript
interface Suscripcion {
    id: number
    nombre: string
    precio: number
    descuento: number
    tipo_envio: string //gratis, rebajado, normal
    items_promocion: Cerveza[]
}
```

## Ejemplo de Uso

Para utilizar estos DTO's en tu servicio, puedes importarlos de la siguiente manera:

```typescript
import { Usuario } from "./interfaces/Usuario";
import { Pedido } from "./interfaces/Pedido";
import { Cerveza } from "./interfaces/Cerveza";
import { Carrito } from "./interfaces/Carrito";
import { Suscripcion } from "./interfaces/Suscripcion";
```
