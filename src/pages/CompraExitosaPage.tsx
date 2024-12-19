import { useNavigate } from "react-router-dom";

export const CompraExitosaPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Compra exitosa</h1>
      <button type="button" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};
