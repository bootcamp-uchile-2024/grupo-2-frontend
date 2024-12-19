import { MainLayout } from "@/layout/MainLayout";
import { useNavigate } from "react-router-dom";

export const CompraExitosaPage = () => {
  const navigate = useNavigate();
  const articulos = 5;
  const total_pagar = 25000;
  return (
    <MainLayout>
      <div className="flex flex-col m-auto p-10 px-20 max-w-[1062px]">
        <div className="flex flex-col items-center mb-16 lg:flex-row lg:justify-center">
          <img src="/assets/beer-icon.svg" alt="beer-icon" className="p-4" />
          <div className="text-center ">
            <div className="mb-3 text-riffic text-xl lg:text-2xl">
              ¡COMPRA EXITOSA!
            </div>
            <p className="text-lato text-lg lg:text-xl">
              Felicidades, ahora eres parte de Club Cervezario. Tu pedido está
              siendo procesado. ¡Pronto lo tendrás en tus manos!
            </p>
            <div className="flex justify-center flex-col gap-4 mt-6 lg:flex-row ">
              <button className="btn-tertiary flex items-center gap-2 justify-center px-4 py-2">
                <img
                  src="/assets/icon-home.svg"
                  alt="icon-home"
                  className="w-5 h-5"
                />
                Volver al inicio
              </button>
              <button className="btn-secondary flex items-center gap-2 justify-center px-4 py-2">
                <img
                  src="/assets/icon-home.svg"
                  alt="icon-home"
                  className="w-5 h-5"
                />
                Seguir mi pedido
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-lato-3xl bg-yellow p-[10px]">
          Resumen de tu compra
        </div>
        <div className="flex justify-center items-center text-lato-2xl min-h-[84px]">
          Orden: #1
        </div>
        <div className="border-2">Dirección</div>
        <div className="border-2">Productos</div>
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
        </div>
        <div
          className="flex items-center justify-center my-2 min-h-[200px] max-w-[1062px]"
          style={{ backgroundImage: `url(/assets/pattern-carrito.png)` }}
        >
          <h2 className="text-center w-3/4 text-riffic-4xl text-gray-dark">
            ¡Salud y gracias por tu compra!
          </h2>
        </div>
      </div>
    </MainLayout>
  );
};
