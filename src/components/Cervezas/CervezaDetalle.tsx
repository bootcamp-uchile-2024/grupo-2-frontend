import { addCerveza } from "@/state/slices/carritoSlice";
import { CervezaType } from "@/types";
import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";

export const CervezaDetalle = (cerveza: CervezaType) => {
  const { nombre, marca, precio } = cerveza;
  const [estrellas, setEstrellas] = useState<number>(
    Math.ceil(Math.random() * 5)
  );
  const estrellasArray = (estrellas: number) =>
    Array(5)
      .fill(false)
      .map((_, i) => i < estrellas);
  const id = Math.ceil((Math.random() * 100) / 25);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col border-2 space-y-2 max-w-[300px] ">
      <img
        src={`/assets/cerveza-${id}.png`}
        alt={`/assets/cerveza-${id}.png`}
      />
      <div className="px-6 pb-6 pt-2">
        <div className="flex justify-end ">
          <img src="/assets/coolicon.svg" alt="corazon" />
        </div>
        <div className="text-purple font-bold font-lato text-custom-l">
          {nombre}
        </div>
        <div className="text-gray-dark font-bold font-lato text-custom-s">
          {marca}
        </div>
        <div className="flex">
          {estrellasArray(estrellas).map((star, index) => {
            const path = `/assets/${star ? "star-2" : "star-6"}.svg`;
            return (
              <img
                key={index}
                src={path}
                alt={path}
                className="mr-2"
                onClick={() => setEstrellas(index + 1)}
              />
            );
          })}
        </div>
        <div className="text-gray-dark font-bold text-custom-l">
          ${precio.toLocaleString()}
        </div>

        <button
          onClick={() => dispatch(addCerveza(cerveza))}
          className="flex justify-center align-center bg-yellow h-[48px] w-full mt-2 rounded-[8px] hover:bg-yellow-900 hover:text-gray-dark"
        >
          <MdAddShoppingCart className="size-4  h-full w-[20px]" />
          <span className="flex items-center justify-center ">
            Agregar al carrito
          </span>
        </button>
      </div>
    </div>
  );
};
