import { RootType } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const BotonMercadoPago: React.FC<{ icono: string; titulo: string }> = ({
  icono,
  titulo,
}) => {
  const navigate = useNavigate();
  const { id_pedido } = useSelector((state: RootType) => state.carrito);
  const pagar = () => {
    navigate(`/compra-exitosa/${id_pedido}`);
  };

  return (
    <div className="flex justify-between items-center px-6 border-2 hover:bg-gray-mercado">
      <img src={icono} alt="Chevron_big_left" />
      <button onClick={pagar} className="w-full text-left pagar">
        {titulo}
      </button>
      <img
        src="/assets/Chevron_big_right.svg"
        alt="Chevron_big_left"
        className="mr-5"
      />
    </div>
  );
};
export const PasarelaPagoPage = () => {
  const { total_pagar } = useSelector((state: RootType) => state.carrito);
  const navigate = useNavigate();
  useEffect(() => {
    if (total_pagar == 0 || total_pagar == undefined) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-w-screen min-h-screen bg-gray-figma p-16 ">
      <div className="flex w-4/6 m-auto ">
        <div className="w-2/3 m-5">
          <h1 className="titulo-pasarela">¿Como quieres pagar?</h1>
          <h1 className="titulo-pasarela">Con tu cuenta de mercado pago</h1>
          <div className="flex flex-col border-2 bg-white">
            <BotonMercadoPago
              titulo="Paga con tu cuenta"
              icono="/assets/mercado-manitos.png"
            />
            <BotonMercadoPago
              titulo="Paga con la app de Mercado Pago"
              icono="/assets/mercado-celular.png"
            />
          </div>
          <div>
            <h1 className="titulo-pasarela">Sin cuenta de mercado Pago</h1>
            <div className="flex flex-col border-2 bg-white">
              <BotonMercadoPago
                titulo="Paga con Tarjeta de credito"
                icono="/assets/mercado-credito.png"
              />
              <BotonMercadoPago
                titulo="Paga con Tarjeta de debito o prepago"
                icono="/assets/mercado-debito.png"
              />
            </div>
          </div>
          <Link
            className="flex py-5 text-[#1d9ddd] text-xl hover:font-bold hover:underline"
            to="/"
          >
            {"< Volver a Cervezario Nacional"}
          </Link>
        </div>
        <div className="flex w-1/3 m-5 flex-col min-w-[360px]  ">
          <div className="my-4">
            <img src="/assets/logo-header.svg" alt="Logo Cervezario" />
          </div>
          <div className="bg-gray-mercado  p-5">
            <div className="my-4 text-lato-m">Detalles del pago</div>
            <div className="flex justify-between my-4 text-lato-m">
              <span className=""> Compra en Cervezario Nacional:</span>
              <span>${total_pagar.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
