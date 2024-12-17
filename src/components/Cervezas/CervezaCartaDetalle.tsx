import { CervezaInterface } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgregarCarritoBoton } from "../AgregarCarritoBoton";
import { CERVEZAS_IMAGENES } from "@/config/api.config";

export const CervezaCartaDetalle = (cerveza: CervezaInterface) => {
  const { nombre, marca, precio, stock, id, imagen } = cerveza;
  const [estrellas, setEstrellas] = useState<number>(
    Math.ceil(Math.random() * 5)
  );
  const [fav, setFav] = useState<boolean>(Math.random() > 0.5);
  const estrellasArray = (estrellas: number) =>
    Array(5)
      .fill(false)
      .map((_, i) => i < estrellas);
  const navigate = useNavigate();

  const path_imagen = `${CERVEZAS_IMAGENES}${imagen}`;

  return (
    <div className="flex flex-col space-y-2 max-w-[300px] max-h-[537px]   shadow-custom-card">
      <button
        type="button"
        className="border-2 min-h-[300px]  border-transparent hover:border-purple relative"
      >
        <img src={path_imagen} alt={path_imagen} width={300} height={300} />
        <div className="absolute top-0 left-0 right-0 bottom-6 flex justify-center items-end opacity-0 hover:opacity-100 transition-opacity  ">
          <button
            type="button"
            onClick={() => navigate("/cervezas/" + id)}
            className={`bg-purple-200 text-white flex items-center justify-center min-h-[48px] min-w-[210px] px-5 rounded-[8px] text-gray-dark text-custom-m font-bold  `}
          >
            Ver más
          </button>
        </div>
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setFav(!fav)}
        >
          <img
            src={`/assets/${fav ? "coolicon.svg" : "coolicon_null.svg"}`}
            alt="corazon"
          />
        </div>
      </button>
      <div className="flex flex-col px-6 pb-6 pt-2">
        <button
          type="button"
          className="text-left text-purple font-bold font-lato text-custom-l"
          onClick={() => navigate("/cervezas/" + id)}
        >
          {nombre}
        </button>
        <div className="text-left text-gray-dark font-bold font-lato text-custom-s">
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
        <div className="text-left text-gray-dark font-bold text-custom-l">
          ${precio.toLocaleString("es-CL")}
        </div>
        <div className="text-left italic text-gray-dark-100 font-light text-custom-s">
          Stock: {stock}
        </div>
        <AgregarCarritoBoton cerveza={cerveza} stock={stock} cantidad={1} />
      </div>
    </div>
  );
};
