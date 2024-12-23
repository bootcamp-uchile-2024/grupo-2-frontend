import { RootType } from "@/state/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PasarelaPagoPage = () => {
  const { total_pagar } = useSelector((state: RootType) => state.carrito);

  const pagar = () => {
    console.log("pagado");
  };
  return (
    <div className="min-w-screen min-h-screen bg-gray-figma p-16">
      <div className="flex border-2 bg-blue justify-between">
        <div className="w-1/2">
          <h1 className="titulo-pasarela">¿Como quieres pagar?</h1>
          <h1 className="titulo-pasarela">Con tu cuenta de mercado pago</h1>
          <div className="border-2 bg-white">
            <button type="button" className="pagar" onClick={pagar}>
              <Link to="/compra-exitosa">Paga con tu cuenta</Link>
            </button>
            <div className="pagar" onClick={pagar}>
              <Link to="/compra-exitosa">Paga con la app de Mercado Pago</Link>
            </div>
          </div>
          <div>
            <h1 className="titulo-pasarela">Sin cuenta de mercado Pago</h1>
            <div className="border-2 bg-white">
              <button type="button" className="pagar" onClick={pagar}>
                <Link to="/compra-exitosa">Paga con Tarjeta de credito</Link>
              </button>
              <button type="button" className="pagar" onClick={pagar}>
                <Link to="/compra-exitosa">
                  Paga con Tarjeta de debito o prepago
                </Link>
              </button>
            </div>
          </div>
          <Link className="text-lato-m" to="/">
            Volver a Cervezario Nacional
          </Link>
        </div>
        <div className="flex flex-col min-w-[360px]  ">
          <div className="my-4">
            <img src="/assets/logo-header.svg" alt="Logo Cervezario" />
          </div>
          <div className="bg-gray-mercado  p-5">
            <div className="my-4 text-lato-m">Detalles del pago</div>
            <div className="flex justify-between my-4 text-lato-m">
              <span className=""> Compra en cervezario Nacional:</span>
              <span>${total_pagar.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
