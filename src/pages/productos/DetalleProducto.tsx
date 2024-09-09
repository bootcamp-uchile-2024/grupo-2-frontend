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
  }, [id]);
  return (
    <div className="contenido">
      <h1>Detalle de Cerveza</h1>
      <div className="wrapper-detalle-cerveza">
        <div className="detalle-cerveza">
          <div className="detalle-cerveza-imagen">
            <img src={cerveza?.imagen} alt={cerveza?.nombre}/>
          </div>
          <div className="detalle-cerveza-descripcion">
            <h1>{cerveza?.nombre}</h1>
            <ul>
              <li>{cerveza?.descripcion}</li>
              <li>Precio: ${cerveza?.precio}</li>
              <li>{cerveza?.categoria}</li>
              <li>{cerveza?.amargor}</li>
              <li>{cerveza?.graduacion}</li>
              <li>{cerveza?.formato}</li>
            </ul>
          </div>
        </div>
      </div>
      <button className="btn">
        <Link to="/catalogo">Volver al catálogo</Link>
      </button>
    </div>
  );
}
