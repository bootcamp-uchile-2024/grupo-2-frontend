import { RootType } from "@/state/store";
import cartMenuStore from "@/store/cartMenuStore";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ItemListaCarrito } from "./ItemListaCarrito";
import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { cleanCarrito } from "@/state/slices/carritoSlice";

export const SideMenu = () => {
  const { cervezas, total_pagar } = useSelector(
    (state: RootType) => state.carrito
  );
  const cartMenu = cartMenuStore((state) => state.cartMenu);
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
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
        {cervezas.length == 0 ? (
          <CarritoVacio />
        ) : (
          <>
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
              <div className="font-bold text-gray-dark-67 text-custom-s">
                Total
              </div>
            </div>
            <div className="min-h-[160px]">
              {cervezas.map((pedido, index) => (
                <ItemListaCarrito {...pedido} key={index} />
              ))}
            </div>
            <ResumenCompra articulos={articulos} total_pagar={total_pagar} />
          </>
        )}
      </div>
    </div>
  );
};
export const ResumenCompra = ({
  articulos,
  total_pagar,
  finalizar = false,
}: {
  articulos: number;
  total_pagar: number;
  finalizar?: boolean;
}) => {
  const { cervezas } = useSelector((state: RootType) => state.carrito);
  const navigate = useNavigate();
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-full justify-between gap-y-2">
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-lato-m">Subtotal - {articulos} artículo</span>
          <span className="text-lato-m">
            ${total_pagar.toLocaleString("es-CL")}
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
            ).toLocaleString("es-CL")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2   ">
        <button
          className="flex items-center justify-center min-h-[48px] bg-purple-100 text-white text-custom-m font-bold rounded-[8px]"
          type="button"
          onClick={async () => {
            if (finalizar) {
              {
                cervezas.map((pedido) => {
                  const { cantidad, cerveza } = pedido;

                  fetch(`${CERVEZAS_ENDPOINT}/${1}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...cerveza,
                      amargor: cerveza.amargor.nivel,
                      formato: cerveza.formato.id,
                      stock: cerveza.stock - cantidad,
                    }),
                  });
                });
              }
              dispatch(cleanCarrito());
            }
            closeCartMenuStore();
            navigate("/resumen-carrito");
          }}
        >
          <img src="/assets/credit-card.svg" alt="" className="mx-2" />
          Finalizar compra
        </button>
        <ButonElegirProductos />
      </div>
    </div>
  );
};
const ButonElegirProductos = ({
  title = "Elegir más productos",
  outlined = false,
}) => {
  const navigate = useNavigate();
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
  return (
    <button
      className={`flex items-center justify-center min-h-[48px] min-w-[132px] px-5 rounded-[8px] text-gray-dark text-custom-m font-bold border-[2px] border-purple-100 ${
        outlined ? "bg-purple text-white" : null
      }`}
      type="button"
      onClick={() => {
        closeCartMenuStore();
        navigate("/cervezas");
      }}
    >
      <img src="/assets/icon-home.svg" alt="" className="mx-2" />
      {title}
    </button>
  );
};

const CarritoVacio = () => {
  const closeCartMenuStore = cartMenuStore((state) => state.closeCartMenuStore);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-2">
      <button
        onClick={closeCartMenuStore}
        className="text-3xl text-neutral-800 flex justify-end "
      >
        <img src="/assets/Big_close.svg" alt="Big_close.svg" />
      </button>
      <div className="flex flex-col items-center  space-y-6">
        <div className="text-lato-3xl ">
          <span className="text-purple">Tu carrito esta vacio</span>
        </div>
        <ButonElegirProductos title={"Elegir productos"} outlined={true} />
        <div className="text-lato-2xl ">
          {" "}
          <span className="text-purple">¿Tienes una cuenta?</span>
        </div>
        <div className="text-lato-m  text-center">
          <span className="text-purple">
            Inicia sesión para finalizar tus compras con mayor rapidez
          </span>
        </div>
        <button
          className="flex boton-iniciar-carrito"
          onClick={() => {
            closeCartMenuStore();
            navigate("/login");
          }}
        >
          <img src={"/assets/User.svg"} />
          Iniciar sesión
        </button>
        <div
          className="w-[370px] h-[300px] bg-cover bg-center bg-no-repeat flex items-end justify-center "
          style={{
            backgroundImage: `url(/assets/banner-carrito-vacio.png)`,
          }}
        >
          <button className="flex boton-descubre-carrito mb-8">
            Descubre tu personaje cervezero <img src="/assets/User_heart.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};
