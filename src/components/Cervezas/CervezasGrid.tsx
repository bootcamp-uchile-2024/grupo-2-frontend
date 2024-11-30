import { useState } from "react";
import { useSelector } from "react-redux";
import { RootType } from "@/state/store";
import { useFetch } from "@/hooks/useFetch";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { CervezaInterface } from "@/types";
import { Pagination } from "../Pagination";
import { CervezaCartaDetalle } from "./CervezaCartaDetalle";

export const CervezasGrid = () => {
  const [cantproductos, setCantidadProductos] = useState<number>(10);
  const [pagina, setPagina] = useState<number>(1);
  const { registros } = useSelector((state: RootType) => state.cerveza); //Se obtiene el estado de la cantidad de cervezas para poder paginar bien
  const url_cervezas = `${CERVEZAS_ENDPOINT}?pagina=${pagina}&cantproductos=${cantproductos}`;
  const {
    data: cervezas,
    loading,
    error,
  } = useFetch<CervezaInterface[]>(url_cervezas);

  const cargando = (
    <div className="flex justify-center p-16 min-w-[960px]">
      <h1 className="text-lato-2xl">Cargando...</h1>
    </div>
  );

  if (error) return <div>Error al cargar las cervezas: {error}</div>;
  const cervezasSeccion = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1296px] mx-auto mt-8 gap-8">
      {cervezas?.map((cerveza) => (
        <CervezaCartaDetalle {...cerveza} key={cerveza.id} />
      ))}
    </div>
  );
  return (
    <div>
      <div className="flex align-center justify-end font-lato text-custom-s text-gray-dark italic">
        <span className="flex items-center justify-center mr-2">
          Productos por página:
        </span>
        {[5, 10, 15, 25, 50].map((cant) => (
          <button
            key={cant}
            onClick={() => setCantidadProductos(cant)}
            className={`h-[35px] w-[38px] text-purple ${
              cantproductos == cant ? "font-bold" : ""
            }`}
          >
            {cant}
          </button>
        ))}
      </div>
      {loading ? cargando : cervezasSeccion}

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
