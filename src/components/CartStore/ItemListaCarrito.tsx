import { PedidoType } from "@/state/slices/carritoSlice";

import { AddRemoveCerveza } from "../AddRemoveBoton";
import { CERVEZAS_IMAGENES } from "@/config/api.config";

export const ItemListaCarrito = (pedido: PedidoType) => {
  const { cerveza, cantidad } = pedido;
  const { nombre, precio, marca, formato, imagen } = cerveza;
  const path_imagen = imagen
    ? `${CERVEZAS_IMAGENES}${imagen}`
    : "/assets/no-imagen.png";

  return (
    <div className="flex h-[134px] mb-2 ">
      <div className=" min-h-[96px] min-w-[96px] mr-4">
        <img src={path_imagen} alt={path_imagen} width={94} height={94} />
      </div>
      <div className="flex flex-col w-full space-y-1">
        <div className="flex flex-col text-gray-dark text-custom-s font-bold">
          <span>{nombre}</span>
          <span>{marca}</span>
        </div>

        <div className="text-gray-dark-67 text-custom-xs">{formato.id}</div>
        <div className="text-gray-dark-67 text-custom-xs">
          ${precio.toLocaleString("es-CL")}
        </div>

        <AddRemoveCerveza cerveza={cerveza} cantidad={cantidad} />
      </div>
      <div className="flex font-lato font-bold text-custom-m text-gray-dark">
        ${(precio * cantidad).toLocaleString("es-CL")}
      </div>
    </div>
  );
};
