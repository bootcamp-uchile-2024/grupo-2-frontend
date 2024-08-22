# Servicio de Gestión de Pedidos de Cerveza

## Propósito del Servicio
El propósito de este servicio es gestionar los pedidos de cervezas, incluyendo la creación, actualización y seguimiento del estado de los pedidos. Además, permite la gestión de usuarios, suscripciones y carritos de compra.

## Rutas de los Ficheros DTO's

### Usuario
- **Ruta:** `src/dtos/Usuario.ts`
- **Descripción:** Define la estructura de los datos del usuario, incluyendo información personal, historial de pedidos y suscripción.

### Pedido
- **Ruta:** `src/dtos/Pedido.ts`
- **Descripción:** Define la estructura de los datos de un pedido, incluyendo las cervezas solicitadas, estado del pedido, fechas importantes y detalles de contacto del comprador.

### Cerveza
- **Ruta:** `src/dtos/Cerveza.ts`
- **Descripción:** Define la estructura de los datos de una cerveza, incluyendo nombre, marca, categoría, stock, descripción, precio, proveedor y región.

### Carrito
- **Ruta:** `src/dtos/Carrito.ts`
- **Descripción:** Define la estructura de los datos de un carrito de compra, incluyendo los ítems agregados, total a pagar y tipo de documento de compra.

### Suscripción
- **Ruta:** `src/dtos/Suscripcion.ts`
- **Descripción:** Define la estructura de los datos de una suscripción, incluyendo nombre, precio, descuento, tipo de envío y items en promoción.

## Ejemplo de Uso
Para utilizar estos DTO's en tu servicio, puedes importarlos de la siguiente manera:

```typescript
import { Usuario } from './dtos/Usuario';
import { Pedido } from './dtos/Pedido';
import { Cerveza } from './dtos/Cerveza';
import { Carrito } from './dtos/Carrito';
import { Suscripcion } from './dtos/Suscripcion';
