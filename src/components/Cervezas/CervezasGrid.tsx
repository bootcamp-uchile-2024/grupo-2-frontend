import { MdAddShoppingCart } from "react-icons/md";
import InfoMessage from "../Message/InfoMessage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootType } from "@/state/store";
import { useFetch } from "@/hooks/useFetch";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { CervezaType } from "@/types";
import { Pagination } from "../Pagination";

export const CervezasGrid = () => {
  const [cantproductos, setCantidadProductos] = useState<number>(2);
  const [pagina, setPagina] = useState<number>(1);
  const { registros } = useSelector((state: RootType) => state.cerveza); //Se obtiene el estado de la cantidad de cervezas para poder paginar bien
  const url_cervezas = `${CERVEZAS_ENDPOINT}?pagina=${pagina}&cantproductos=${cantproductos}`;
  const {
    data: cervezas,
    loading,
    error,
  } = useFetch<CervezaType[]>(url_cervezas);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las cervezas: {error}</div>;

  return (
    <div>
      <div className="flex align-center justify-end font-lato text-custom-s text-gray-dark italic">
        <span className="flex items-center justify-center mr-2">
          Productos por página:
        </span>
        {[5, 10, 15, 25, 50].map((cant) => (
          <button
            onClick={() => setCantidadProductos(cant)}
            className={`h-[35px] w-[38px] text-purple ${
              cantproductos == cant ? "font-bold" : ""
            }`}
          >
            {cant}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1296px] mx-auto mt-8 gap-8">
        {cervezas?.length === 0 ? (
          <InfoMessage />
        ) : (
          cervezas?.map((cerveza) => (
            <div
              onClick={() => console.log(cerveza)}
              key={cerveza.id}
              className="flex flex-col mt-2 justify-center items-center my-2 border-2 "
            >
              <figure>
                <img
                  src={cerveza.imagen}
                  alt={cerveza.nombre}
                  className="xl:w-[330px] xl:h-[300px] size-64"
                />
              </figure>
              <h3 className="font-light text-center uppercase text-lg max-w-[280px] mt-4">
                {cerveza.nombre}
              </h3>
              <aside className="flex gap-x-4 items-center justify-center mt-2">
                <span className="font-regular text-center uppercase text-lg">
                  ${Number(cerveza.precio).toLocaleString()}
                </span>
                <button>
                  <MdAddShoppingCart className="size-4" />
                </button>
              </aside>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col items-center ">
        <span className="font-lato text-custom-s text-gray-dark">
          Mostrando {cantproductos} artículos{" "}
        </span>
        <Pagination
          pagina={pagina}
          setPagina={setPagina}
          registros={registros}
          cantProductos={cantproductos}
        />
      </div>
    </div>
  );
};
