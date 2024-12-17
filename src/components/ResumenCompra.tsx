import { API_URL, CERVEZAS_ENDPOINT } from "@/config/api.config";
import { cleanCarrito, createCarrito } from "@/state/slices/carritoSlice";
import { RootType } from "@/state/store";
import cartMenuStore from "@/store/cartMenuStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButonElegirProductos } from "./ButtonElegirProductos";
import { toast } from "react-toastify";

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
  const { id_carrito: existe_carrito } = useSelector(
    (state: RootType) => state.carrito
  );
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
              const response = await fetch(
                `${API_URL}/carrito/${existe_carrito}/cervezas`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    items: cervezas.map((elemento) => {
                      const { cantidad, cerveza } = elemento;
                      return {
                        id_cerveza: cerveza.id,
                        cantidad: cantidad,
                        precio_venta: cerveza.precio,
                      };
                    }),
                  }),
                }
              );
              if (response.ok) {
                navigate("/proceso-pago");
              } else {
                toast.error("Hubo un error al finalizar la compra");
              }
            } else {
              if (!existe_carrito) {
                const response = await fetch(`${API_URL}/carrito`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                });
                const id_carrito = await response.text();
                dispatch(createCarrito({ id_carrito }));
              }
              closeCartMenuStore();
              navigate("/resumen-carrito");
            }
          }}
        >
          <img src="/assets/credit-card.svg" alt="" className="mx-2" />
          Finalizar compra
        </button>
        <ButonElegirProductos outlined={true} />
      </div>
    </div>
  );
};
