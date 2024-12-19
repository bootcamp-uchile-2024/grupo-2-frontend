import { useNavigate } from "react-router-dom";

export const PasarelaPagoPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-w-screen min-h-screen bg-gray-figma p-16">
      <div className="flex border-2 bg-blue">
        <div className="w-1/2">
          <h1 className="titulo-pasarela">¿Como quieres pagar?</h1>
          <h1 className="titulo-pasarela">Con tu cuenta de mercado pago</h1>
          <div className="border-2 bg-white">
            <div>Ingresa con tu cuenta</div>
            <div>Usar la app de Mercado Pago</div>
          </div>
          <div>
            <h1 className="titulo-pasarela">Sin cuenta de mercado Pago</h1>
            <div>Tarjeta de credito</div>
            <div>Tarjeta de debito o prepago</div>
          </div>
          Volver a Cervezario Nacional
        </div>
        <div className="w-1/2">
          <div>Logo</div>
          <div>Detalles del pago</div>
          <div>
            <span> Compra en cervezario nacional</span>
            <span>valor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
