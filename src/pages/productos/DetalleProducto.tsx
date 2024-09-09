import { useEffect, useState } from "react";
import Cerveza from "../../interfaces/Cerveza";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetalleProducto() {
  const { id } = useParams();
  const [cerveza, setCerveza] = useState<Cerveza>();
  useEffect(() => {
    fetch(`http://localhost:5173/cervezas/${id}`)
      .then((result) => result.json())
      .then((data) => setCerveza(data));
  }, []);
  return (
    <div className="contenido">
      <button>
        <Link to="/catalogo">Volver al catalogo</Link>
      </button>
      <h1>{cerveza?.nombre}</h1>
      <p>{cerveza?.descripcion}</p>
      <img src={cerveza?.imagen} alt={cerveza?.nombre} width={200} />
    </div>
  );
}
