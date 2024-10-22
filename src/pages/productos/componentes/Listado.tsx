import { Link, useNavigate } from "react-router-dom";
import ICerveza from "../../../interfaces/ICerveza";
import { useState } from "react";
import { addProducto } from "../../../state/slices/carritoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootType } from "../../../state/store";
interface PropsCervezas {
  cervezas: ICerveza[];
}
export interface IPedidoCerveza {
  id?: number;
  cantidad: number;
  cerveza: ICerveza;
}
export const AgregarAlCarro = (props: ICerveza) => {
  const [cantidad, setCantidad] = useState<number>(0);
  const dispatch = useDispatch();
  return (
    <div className="d-flex justify-content-between ">
      <div
        className="carrito-actions"
        onClick={() => {
          if (cantidad > 0) {
            setCantidad(cantidad - 1);
          }
        }}
      >
        -
      </div>
      <div className="carrito-cantidad">{cantidad}</div>
      <div
        className="carrito-actions"
        onClick={() => setCantidad(cantidad + 1)}
      >
        +
      </div>

      <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          if (cantidad === 0) {
            toast.error("Debe seleccionar al menos una cerveza");
          } else {
            const pedido: IPedidoCerveza = { cantidad, cerveza: props };
            dispatch(addProducto(pedido));
            setCantidad(0);
            toast.success("Productos agregados al carrito");
          }
        }}
      >
        Agregar al carro
      </button>
    </div>
  );
};
const VistaProductoLista = (props: ICerveza) => {
  const { id, imagen, nombre, descripcion, precio, categoria, graduacion } =
    props;
  return (
    <div key={id} className="card">
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

        <AgregarAlCarro {...props} />
      </div>
    </div>
  );
};
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
