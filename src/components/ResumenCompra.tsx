import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { cleanCarrito } from "@/state/slices/carritoSlice";
import { RootType } from "@/state/store";
import cartMenuStore from "@/store/cartMenuStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButonElegirProductos } from "./ButtonElegirProductos";

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
        <ButonElegirProductos outlined={true} />
      </div>
    </div>
  );
};
