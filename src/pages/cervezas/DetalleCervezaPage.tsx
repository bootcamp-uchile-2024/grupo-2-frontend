import { AgregarCarritoBoton } from "@/components/AgregarCarritoBoton";
import { CERVEZAS_ENDPOINT, CERVEZAS_IMAGENES } from "@/config/api.config";
import { useFetch } from "@/hooks/useFetch";
import { MainLayout } from "@/layout/MainLayout";
import { DescubreSection } from "@/sections/DescubreSection";

import { CervezaInterface } from "@/types";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const DetalleCervezaPage = () => {
  const { id } = useParams();
  const [cantidadAgregar, setAgregarCantidad] = useState(1);

  const {
    data: cerveza,
    loading,
    error,
  } = useFetch<CervezaInterface>(`${CERVEZAS_ENDPOINT}/${id}`);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error</div>;

  if (cerveza === null) {
    return (
      <MainLayout>
        <DescubreSection imageUrl="/assets/baner-descubre-top.png" />
        <h2>No hay cerveza con ese id</h2>{" "}
        <DescubreSection imageUrl="/assets/48ae585a9e6a88eb0f00b865f7cb480f.png" />
      </MainLayout>
    );
  }
  const { stock, marca, nombre, tipo, precio, formato, descripcion, imagen } =
    cerveza;
  const path_imagen = `${CERVEZAS_IMAGENES}${imagen}`;
  const recomendaciones = [
    {
      titulo: "Tipo de vaso",
      logo: "/assets/tipo-vaso.svg",
      descripcion: "Beber idealmente en vaso de Pilsner",
    },
    {
      titulo: "Temperatura",
      logo: "/assets/temperatura.svg",
      descripcion: "Se recomienda beber entre 10° a 13° grados",
    },
    {
      titulo: "Maridaje",
      logo: "/assets/maridaje.svg",
      descripcion: "Marida bien con postres, carne asada o quesos azules.",
    },
  ];
  return (
    <MainLayout>
      <DescubreSection imageUrl="/assets/baner-descubre-top.png" />
      <div className="flex flex-col m-auto p-10 w-3/4   max-w-[1150px] min-h-[700px] ">
        <div className="flex justify-between  h-full  mb-10">
          <div className="flex items-end flex-col w-full ">
            <img src={path_imagen} alt={path_imagen} width={520} height={520} />
            <div className="flex justify-between flex-wrap w-full max-w-[520px]">
              <img src="/assets/ABV.svg" alt="/assets/ABV.svg" />
              <img src="/assets/IBU.svg" alt="/assets/IBU.svg" />
              <img src="/assets/SMR.svg" alt="/assets/SMR.svg" />
            </div>
          </div>
          <div className="w-full ml-8 pl-4 space-y-2">
            <div className="text-lato-4xl">
              {marca}, {nombre}
            </div>

            <div className="text-lato-2xl">{tipo.nombre}</div>
            <div className="text-lato-3xl">
              ${precio.toLocaleString("es-CL")}
            </div>
            <div className="text-lato-2xl">{formato.id}</div>
            <div className="italic text-gray-dark-100 font-light text-custom-s">
              Stock: {stock == 0 ? "Agotado" : stock}
            </div>
            <div className="flex">
              <button
                disabled={cantidadAgregar === 1}
                className="btn-detalle-carrito"
                onClick={() => setAgregarCantidad(cantidadAgregar - 1)}
              >
                -
              </button>
              <div className="flex justify-center w-[30px] font-lato text-dark-gray text-custom-s">
                {cantidadAgregar}
              </div>
              <button
                className="btn-detalle-carrito"
                onClick={() => {
                  setAgregarCantidad(cantidadAgregar + 1);
                  if (cantidadAgregar >= stock) {
                    toast.error("No hay suficiente stock");
                  }
                }}
              >
                +
              </button>
            </div>
            <AgregarCarritoBoton
              cerveza={cerveza}
              stock={stock}
              cantidad={cantidadAgregar}
            />

            <div className="my-4 text-lato-l">{descripcion}</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between shadow-recomendaciones p-5 mt-10 border-2">
          {recomendaciones.map((recomendacion, index) => {
            const { titulo, descripcion, logo } = recomendacion;
            return (
              <div className="max-w-[217px] p-2" key={index}>
                <div className="flex flex-row justify-center">
                  <img src={logo} alt={logo} />
                  <span className="text-riffic-2xl mx-2">{titulo}</span>
                </div>
                <div className="text-center text-lato-l">{descripcion}</div>
              </div>
            );
          })}
        </div>
      </div>

      <DescubreSection imageUrl="/assets/48ae585a9e6a88eb0f00b865f7cb480f.png" />
    </MainLayout>
  );
};
