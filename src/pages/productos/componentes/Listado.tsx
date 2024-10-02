import { Link } from "react-router-dom";
import Cerveza from "../../../interfaces/Cerveza";
interface PropsCervezas {
  cervezas: Cerveza[];
}

export default function Listado(props: PropsCervezas) {
  const { cervezas } = props;
  if (cervezas.length === 0) {
    return <h2>No hay cervezas</h2>
  }
  return (
    <div className="grid">
      {cervezas.map((cerveza) => (
        <div key={cerveza.id} className="card">
          <Link to={`producto/${cerveza.id}`}>
            <div
              style={{ backgroundImage: `url(${cerveza.imagen})` }}
              className="card-image"
            ></div>
          </Link>
          <div className="card-details">
            <Link to={`producto/${cerveza.id}`}>
              <h3>{cerveza.nombre}</h3>
            </Link>
            <p>{cerveza.descripcion}</p>
            <p>Precio: ${cerveza.precio}</p>
            <p>{cerveza.categoria}</p>
            <p>{cerveza.graduacion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
