import { AddRemoveCerveza } from "@/components/AddRemoveBoton";
import { ResumenCompra } from "@/components/CartStore/SideMenu";
import { MainLayout } from "@/layout/MainLayout";
import { CervezasDestacadas } from "@/sections/CervezasDestacadas";
import { PedidoType } from "@/state/slices/carritoSlice";
import { RootType } from "@/state/store";
import { useSelector } from "react-redux";

const ItemResumenCarrito = (pedido: PedidoType) => {
  const { cerveza, cantidad } = pedido;
  const { nombre, precio, marca, formato } = cerveza;
  const id_random = Math.ceil((Math.random() * 100) / 25);
  return (
    <div className="flex p-3 border-t-[1px] border-purple ">
      <img
        src={`/assets/cerveza-${id_random}.png`}
        alt=""
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
  console.log("cervezas", cervezas);
  /* flex m-auto justify-center border-2 max-w-[1280px] */
  return (
    <MainLayout>
      <div className="flex m-auto justify-center flex-wrap">
        <div className="min-w-[700px]  ">
          <div className="border-b-[1px] border-purple">
            {cervezas.map((pedido) => (
              <ItemResumenCarrito {...pedido} />
            ))}
          </div>
          <div>Instrucciones especiales</div>
          <div>Pedido Listo</div>
        </div>
        <div className="mx-4 min-w-[300px] max-h-[450px] p-5 border-[1px] bg-white-100">
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
