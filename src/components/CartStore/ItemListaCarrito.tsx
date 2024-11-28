import {
  addCerveza,
  discountCerveza,
  PedidoType,
  removeCerveza,
} from "@/state/slices/carritoSlice";
import { useDispatch } from "react-redux";

export const ItemListaCarrito = (pedido: PedidoType) => {
  const { cerveza, cantidad } = pedido;
  const { nombre, precio, marca, formato } = cerveza;
  const dispatch = useDispatch();
  const idd = Math.ceil((Math.random() * 100) / 25);
  return (
    <div className="flex h-[134px] mb-2 ">
      <div className=" min-h-[96px] min-w-[96px] mr-4">
        <img
          src={`/assets/cerveza-${idd}.png`}
          alt={nombre}
          width={94}
          height={94}
        />
      </div>
      <div className="flex flex-col w-full space-y-1">
        <div className="flex flex-col text-gray-dark text-custom-s font-bold">
          <span>{nombre}</span>
          <span>{marca}</span>
        </div>

        <div className="text-gray-dark-67 text-custom-xs">{formato.id}</div>
        <div className="text-gray-dark-67 text-custom-xs">
          ${precio.toLocaleString()}
        </div>
        <div className="flex">
          <button
            disabled={cantidad === 1}
            className="btn-detalle-carrito"
            onClick={() => dispatch(discountCerveza(cerveza))}
          >
            -
          </button>
          <div className="flex justify-center w-[30px] font-lato text-dark-gray text-custom-s">
            {cantidad}
          </div>
          <button
            className="btn-detalle-carrito"
            onClick={() => dispatch(addCerveza(cerveza))}
          >
            +
          </button>
          <button
            className="flex justify-center items-center h-[24px] ml-3 hover:bg-red-300 rounded-[6px] "
            onClick={() => dispatch(removeCerveza(cerveza))}
          >
            <img
              src={"/assets/Trash_full.svg"}
              alt={"trash"}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className="flex font-lato font-bold text-custom-m text-gray-dark">
        ${(precio * cantidad).toLocaleString()}
      </div>
    </div>
  );
};
