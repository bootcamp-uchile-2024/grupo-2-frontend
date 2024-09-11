# Servicios de Cervezario Nacional

## Propósito del Documento

El propósito de este documento es documentar las interfaces dentro de Cervezario Nacional además de la forma del consumo de estas. Entre las interfaces que encontramos tenemos:
Usuario, Direcciones, Cervezas, Pedidos, Carrito y Suscripcion

## Interfaces y consumo de servicios

### Usuario

- **Ruta:** `src/interfaces/Usuario.ts`
- **Descripción:** Define la estructura de los datos del usuario, incluyendo información personal, historial de pedidos y suscripción.

```typescript
interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  direcciones: Direccion[];
  telefono: string;
  edad: number;
}
```

- **Consumo servicio Usuarios:** El consumo del servicio Usuarios permite la creación de Usuarios y su actualización

  - **Endpoints**

    - POST: {_api_host_}/usuarios
    - GET: {_api_host_}/usuarios
    - GET: {_api_host_}/usuarios/{_id_}
    - PATCH: {_api_host_}/usuarios/{_id_}
    - DELETE: {_api_host_}/usuarios/{_id_}

### Direcciones

- **Ruta:** `src/interfaces/Direccion.ts`
- **Descripción:** Interfaz que define la dirección de un usuario

```typescript
export interface Direccion {
  idUsuario: number;
  calle: string;
  numero: number;
  departamento: string;
  region: string;
  comuna: string;
  codigoPostal: string;
}
```

- **Consumo servicio Direcciones:** El consumo del servicio Direcciones permite la creación de Direcciones y su actualización

  - **Endpoints**

    - POST: {_api_host_}/direcciones
    - GET: {_api_host_}/direcciones
    - GET: {_api_host_}/direcciones/{_id_}
    - PATCH: {_api_host_}/direcciones/{_id_}
    - DELETE: {_api_host_}/direcciones/{_id_}

### Pedido

- **Ruta:** `src/interfaces/Pedido.ts`
- **Descripción:** Define la estructura de los datos de un pedido, incluyendo las cervezas solicitadas, estado del pedido, fechas importantes y detalles de contacto del comprador.

```typescript
interface Pedidos {
  idUsuario: number;
  items: string;
  estado: string;
  fecha_ingreso: Date;
  direccion_entrega: Direccion[];
  correo_comprador: string;
  telefono_comprador: string;
  fecha_entrega: Date;
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
    comuna: string;
    amargor: string;
    graduacion: string;
    formato: string;
    imagen: string;
}
```

- **Consumo servicio Cervezas:** El consumo del servicio Cervezas permite la creación del catalogo y del detalle de cada producto

  - **Endpoints**

    - POST: {_api_host_}/cervezas
    - GET: {_api_host_}/cervezas
    - GET: {_api_host_}/cervezas/{_id_}
    - PATCH: {_api_host_}/cervezas/{_id_}
    - DELETE: {_api_host_}/cervezas/{_id_}

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

- **Consumo servicio Carrito:** El consumo del servicio Carrito permite la creación de Carrito y su actualización

  - **Endpoints**

    - POST: {_api_host_}/carrito
    - GET: {_api_host_}/carrito
    - GET: {_api_host_}/carrito/{_id_}
    - PATCH: {_api_host_}/carrito/{_id_}
    - DELETE: {_api_host_}/carrito/{_id_}

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

- **Consumo servicio Suscripción:** El consumo del servicio Suscripcion permite la creación de Suscripcion y su actualización

  - **Endpoints**

    - POST: {_api_host_}/suscripcion
    - GET: {_api_host_}/suscripcion
    - GET: {_api_host_}/suscripcion/{_id_}
    - PATCH: {_api_host_}/suscripcion/{_id_}
    - DELETE: {_api_host_}/suscripcion/{_id_}

### API_HOST

Para el actual proyecto se utilizo un proxy en vite que evade la validación de orignes cruzados (CORS). El api*host normal para desarrollo deberia ser \_localhost:3000* pero dado el proxy es _localhost:5173_ puerto del frontend.

## Ejemplo de Uso

Para utilizar estos DTO's en tu servicio, puedes importarlos de la siguiente manera:

```typescript
import { Usuario } from "./interfaces/Usuario";
import { Pedido } from "./interfaces/Pedido";
import { Cerveza } from "./interfaces/Cerveza";
import { Carrito } from "./interfaces/Carrito";
import { Suscripcion } from "./interfaces/Suscripcion";
import { Direccion } from "./interfaces/Suscripcion";
```
