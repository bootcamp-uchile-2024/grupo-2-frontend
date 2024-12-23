import { useSelector } from "react-redux";
import { API_URL } from "@/config/api.config";
import { RootType } from "@/state/store";

export const ResumenCompra = () => {
  const { cervezas, total_pagar } = useSelector(
    (state: RootType) => state.carrito
  );
  const articulos = cervezas.reduce((acc, item) => acc + item.cantidad, 0);
  return (
    <div>
      <h2 className="text-headline-lato-2xl min-w-[440px]">
        Resumen de compra
      </h2>
      <div className="p-5 border-2 rounded-[6px]  max-w-[620px]">
        <div className="mb-10">
          {cervezas.map((e, index) => {
            const { cerveza, cantidad } = e;
            const { nombre, precio, formato, imagen } = cerveza;
            const path_imagen = imagen
              ? `${API_URL}${imagen}`.replace("./", "/")
              : "/assets/no-imagen.png";
            return (
              <div className="flex justify-between p-1 border-b-2" key={index}>
                <div className="flex items-center p-2">
                  <img
                    src={path_imagen}
                    alt={path_imagen}
                    className="max-h-[94px]  max-w-[160px]"
                    width={94}
                    height={94}
                  />
                </div>

                <div className="flex flex-col text-gray-dark text-custom-s font-bold">
                  <span>
                    {nombre} x {cantidad}
                  </span>
                  <div className="text-gray-dark-67 text-custom-xs">
                    {formato.id}
                  </div>
                </div>
                <div className="flex justify-end min-w-[80px] text-gray-dark font-bold">
                  ${(precio * cantidad).toLocaleString("es-CL")}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <div>Codigo</div>
          <div>Boton</div>
        </div>
        <div className="flex flex-col h-full justify-between gap-y-2">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-lato-m">
                Subtotal - {articulos} artículo
              </span>
              <span className="text-lato-m">
                ${total_pagar.toLocaleString("es-CL")}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-lato-xl">Envío</span>
              <span>
                {total_pagar > 19990
                  ? "Gratis"
                  : total_pagar
                  ? "Por calcular"
                  : "$2.990"}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className={"text-lato-2xl"}>Total</span>
              <span className={"text-lato-l"}>
                CLP $
                {(total_pagar > 19990 || total_pagar
                  ? total_pagar
                  : total_pagar + 2990
                ).toLocaleString("es-CL")}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div>
            Incluye ${(total_pagar * 0.19).toLocaleString("es-CL")} de impuestos
          </div>
        </div>
      </div>
    </div>
  );
};
