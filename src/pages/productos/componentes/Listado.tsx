import { Link } from "react-router-dom";
import ICerveza from "../../../interfaces/Cerveza";
import { useState } from "react";
interface PropsCervezas {
  cervezas: ICerveza[];
}
const AgregarAlCarro = (props: { id: number }) => {
  const [cantidad, setCantidad] = useState<number>(0)
  const { id } = props;
  return <div className="d-flex justify-content-between">
    <div onClick={() => setCantidad(cantidad + 1)}>+</div>
    <div>{cantidad}</div>
    <div onClick={() => { if (cantidad > 0) { setCantidad(cantidad - 1) } }}>-</div>
    <button>Agregar al carro</button>
  </div>;
}
const VistaProductoLista = (props: ICerveza) => {
  const { id, imagen, nombre, descripcion, precio, categoria, graduacion } = props;
  return (<div key={id} className="card">
    <Link to={`producto/${id}`}>
      <div
        style={{ backgroundImage: `url(${imagen})` }}
        className="card-image"
      ></div>
    </Link>
    <div className="card-details">
      <Link to={`producto/${id}`}>
        <h3>{nombre}</h3>
      </Link>
      <p>{descripcion}</p>
      <p>Precio: ${precio}</p>
      <p>{categoria}</p>
      <p>{graduacion}</p>

      <AgregarAlCarro id={id} />
    </div>
  </div>)
}
export default function Listado(props: PropsCervezas) {
  const { cervezas } = props;
  if (cervezas.length === 0) {
    return <h2>No hay cervezas</h2>;
  }
  return (
    <div className="grid">
      {cervezas.map((cerveza) => (
        <VistaProductoLista {...cerveza} key={cerveza.id} />
      ))}
    </div>
  );
}
