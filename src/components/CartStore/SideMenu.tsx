import useCartContext from "@/hooks/useCartContext";
import { RootType } from "@/state/store";
import cartMenuStore from "@/store/cartMenuStore";
import clsx from "clsx";
import { useSelector } from "react-redux";

export const SideMenu = () => {
  const { cervezas, total_pagar, costo_envio } = useSelector(
    (state: RootType) => state.carrito
  );
  console.log("carrito", cervezas, total_pagar, costo_envio);

  const cartMenu = cartMenuStore((state) => state.cartMenu);
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);

  const { cart, deleteItemFromCart, clearCart } = useCartContext();

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
          "fixed p-5 right-0 top-0 w-full md:w-[420px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
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
        <div className="flex justify-between border-b-[1px] border-purple-100 py-3 ">
          <div>Producto</div>
          <div>Total</div>
        </div>

        <div className="h-full">
          {cart.length === 0 ? (
            <span className="text-neutral-800 font-xl text-center">
              No hay artículos en el carrito
            </span>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="overflow-scroll max-h-[800px]">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-x-4 my-6">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="max-w-42 max-h-32 h-full w-full object-cover"
                    />
                    <aside className="flex flex-col justify-center w-full">
                      <span className="text-xl font-light">{item.nombre}</span>
                      <span className="text-lg font-medium">
                        ${Number(item.precio).toLocaleString()}
                      </span>
                      <span className="text-xs font-light">
                        Cantidad: {item.stock}
                      </span>
                      <button
                        onClick={() => deleteItemFromCart(item)}
                        className="text-white bg-red-500 rounded-xl py-1 px-3 text-xs mt-2 hover:bg-red-400 duration-300 max-w-[160px]"
                      >
                        Eliminar del carrito
                      </button>
                    </aside>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="text-end text-lg">Total: ${total_pagar}</span>
                <button
                  onClick={clearCart}
                  className="text-white bg-red-500 rounded w-full py-2 px-3 text-md hover:bg-red-400 duration-300"
                >
                  Vaciar el carrito
                </button>
                <a
                  href="#"
                  className="text-white bg-blue-500 rounded w-full py-2 px-3 text-md mb-8 hover:bg-blue-400 duration-300 text-center"
                >
                  Comprar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
