import { AddRemoveCerveza } from "@/components/AddRemoveBoton";
import { ResumenCompra } from "@/components/ResumenCompra";
import { CERVEZAS_IMAGENES } from "@/config/api.config";
import { MainLayout } from "@/layout/MainLayout";
import { CervezasDestacadas } from "@/sections/CervezasDestacadas";
import { PedidoType } from "@/state/slices/carritoSlice";
import { RootType } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItemResumenCarrito = (pedido: PedidoType) => {
  const { cerveza, cantidad } = pedido;
  const { nombre, precio, marca, formato, imagen } = cerveza;
  const path_imagen = `${CERVEZAS_IMAGENES}${imagen}`;

  return (
    <div className="flex p-3 border-t-[1px] border-purple ">
      <img
        src={path_imagen}
        alt={path_imagen}
        className="max-w-[192px] max-h-[192px]"
      />
      <div className="flex w-full justify-between px-3 flex-wrap ">
        <div className="flex-1 min-w-[140px] ">
          <div className="text-lato-l">{nombre}</div>
          <div className="text-lato-l">{formato.id}</div>
          <div className="text-lato-m">{marca}</div>
        </div>
        <div className="flex flex-1 justify-end text-lato-m">
          ${precio.toLocaleString("es-CL")}
        </div>
        <div className="flex flex-1 justify-end mx-4">
          <AddRemoveCerveza cerveza={cerveza} cantidad={cantidad} />
        </div>
        <div className="flex flex-1 justify-end text-lato-m">
          ${(cantidad * precio).toLocaleString("es-CL")}
        </div>
      </div>
    </div>
  );
};
export const CarritoPage = () => {
  const { cervezas, total_pagar } = useSelector(
    (state: RootType) => state.carrito
  );
  const articulos = cervezas.reduce((acc, item) => acc + item.cantidad, 0);
  const navigate = useNavigate();
  useEffect(() => {
    if (cervezas.length === 0) {
      navigate("/");
    }
  }, [cervezas]);
  return (
    <MainLayout>
      <div className="flex m-auto justify-center flex-wrap">
        <div className="min-w-[450px] w-[700px]  ">
          <div className="border-b-[1px] border-purple overflow-y-auto max-h-[440px]">
            {cervezas.map((pedido, index) => (
              <ItemResumenCarrito {...pedido} key={index} />
            ))}
          </div>
          <div>Instrucciones especiales</div>
          <div
            className="flex items-center justify-center my-2 min-h-[200px] "
            style={{ backgroundImage: `url(/assets/pattern-carrito.png)` }}
          >
            <h2 className="text-center w-3/4 text-riffic-2xl text-gray-G05">
              ¡Tu pedido está casi listo, pronto disfrutarás de la mejor
              experiencia cervecera!
            </h2>
          </div>
        </div>
        <div className="mx-4 min-w-[300px] max-h-[674px] p-5 border-[1px] bg-white-100">
          <ResumenCompra
            articulos={articulos}
            total_pagar={total_pagar}
            finalizar={true}
          />
        </div>
      </div>
      <CervezasDestacadas title={"OTRA CHELITA, TE LO MERECES..."} />
    </MainLayout>
  );
};
