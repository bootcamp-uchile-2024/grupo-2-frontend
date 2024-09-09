import { Link } from "react-router-dom";
import Cerveza from "../interfaces/Cerveza";
interface PropsCervezas {
  cervezas: Cerveza[];
}

export default function Listado(props: PropsCervezas) {
  const { cervezas } = props;
  console.log("cervezas", cervezas);

  return (
    <div>
      <h1>Listado de Cervezas</h1>
      <div className="grid">
        {cervezas.map((cerveza) => (
          <div key={cerveza.id} className="card">
            <Link to={`producto/${cerveza.id}`}>
              <img src={cerveza.imagen} alt={cerveza.nombre} width={100} />
            </Link>
            <div className="card-details">
              <Link to={`producto/${cerveza.id}`}>
                <h3>{cerveza.nombre}</h3>
              </Link>
              <p>{cerveza.descripcion}</p>
              <p>Precio: ${cerveza.precio}</p>
              <p>{cerveza.categoria}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
