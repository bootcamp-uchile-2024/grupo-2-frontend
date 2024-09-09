import { Link } from "react-router-dom";
import Cerveza from "../interfaces/Cerveza";
interface PropsCervezas {
  cervezas: Cerveza[];
}

export default function Listado(props: PropsCervezas) {
  const { cervezas } = props;
  console.log("cervezas", cervezas);

  return (
    <div className="container py-5">
      <h1>Listado de Cervezas</h1>
      {cervezas.map((cerveza) => (
        <Link to={`producto/${cerveza.id}`}>
          <div key={cerveza.id} className="card">
            <div className="card-details">
              <img src={cerveza.imagen} alt={cerveza.nombre} width={100} />
              {cerveza.nombre}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
