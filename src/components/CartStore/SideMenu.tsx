import { RootType } from "@/state/store";
import cartMenuStore from "@/store/cartMenuStore";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ItemListaCarrito } from "./ItemListaCarrito";

export const SideMenu = () => {
  const { cervezas, total_pagar } = useSelector(
    (state: RootType) => state.carrito
  );
  const cartMenu = cartMenuStore((state) => state.cartMenu);
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
  const navigate = useNavigate();
  const articulos = cervezas.reduce((acc, item) => acc + item.cantidad, 0);
  return (
    <div>
      {/* Black background */}
      {cartMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur backgroud */}
      {cartMenu && (
        <div
          onClick={closeCartMenuStore}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      <div
        className={clsx(
          "fixed p-5 right-0 top-0 w-full md:w-[420px]  bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !cartMenu,
            "translate-x-0": cartMenu,
            "opacity-0": !cartMenu,
            "opacity-100": cartMenu,
          }
        )}
      >
        <div className="flex justify-between my-3 ">
          <div className="text-purple font-lato font-medium text-custom-3xl">
            Tu carrito
          </div>
          <button
            onClick={closeCartMenuStore}
            className="text-3xl text-neutral-800 flex justify-end "
          >
            <img src="/assets/Big_close.svg" alt="Big_close.svg" />
          </button>
        </div>
        <div className="flex justify-between border-b-[1px] border-purple-100 py-3 mb-6 ">
          <div className="font-bold text-gray-dark-67 text-custom-s">
            Producto
          </div>
          <div className="font-bold text-gray-dark-67 text-custom-s">Total</div>
        </div>
        <div className="min-h-[420px]">
          {cervezas.length === 0 ? (
            <span className=" text-neutral-800 font-xl text-center">
              No hay artículos en el carrito
            </span>
          ) : (
            cervezas.map((pedido, index) => (
              <ItemListaCarrito {...pedido} key={index} />
            ))
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-lato-m">
                Subtotal - {articulos} artículo
              </span>
              <span className="text-lato-m">
                ${total_pagar.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-lato-xl">Envío</span>
              <span>
                {total_pagar > 19990
                  ? "Gratis"
                  : total_pagar == 0
                  ? "Por calcular"
                  : "$2.990"}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className={"text-lato-2xl"}>Total</span>
              <span className={"text-lato-l"}>
                CLP $
                {(total_pagar > 19990 || total_pagar == 0
                  ? total_pagar
                  : total_pagar + 2990
                ).toLocaleString()}
              </span>
            </div>
          </div>
          <button
            className="flex items-center justify-center min-h-[48px] bg-purple-100 text-white text-custom-m font-bold rounded-[8px]"
            type="button"
            onClick={() => {
              closeCartMenuStore();
              navigate("/resumen-carrito");
            }}
          >
            <img src="/assets/credit-card.svg" alt="" className="mx-2" />
            Finalizar compra
          </button>
          <button
            className="flex items-center justify-center min-h-[48px] rounded-[8px] text-gray-dark text-custom-m font-bold border-[2px] border-purple-100"
            type="button"
            onClick={() => {
              closeCartMenuStore();
              navigate("/cervezas");
            }}
          >
            <img src="/assets/icon-home.svg" alt="" className="mx-2" />
            Elegir más productos
          </button>
        </div>
      </div>
    </div>
  );
};
