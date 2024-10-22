import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../layout/MainLayout";
import { RootType } from "../state/store";
import ICarrito from "../interfaces/ICarrito";
import { IPedidoCerveza } from "./productos/componentes/Listado";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProducto,
  editarProductoPedido,
} from "../state/slices/carritoSlice";

const EditarPedido = (props: IPedidoCerveza) => {
  const { cantidad, cerveza } = props;
  const [cantidadItems, setCantidadItems] = useState(cantidad);
  const dispatch = useDispatch();
  return (
    <div className="d-flex justify-content-between ">
      <div
        className="carrito-actions"
        onClick={() => {
          if (cantidadItems > 0) {
            setCantidadItems(cantidadItems - 1);
            dispatch(
              editarProductoPedido({ id: cerveza.id, action: "remove" })
            );
          }
        }}
      >
        -
      </div>
      <div className="carrito-cantidad">{cantidadItems}</div>
      <div
        className="carrito-actions"
        onClick={() => {
          setCantidadItems(cantidadItems + 1);
          dispatch(editarProductoPedido({ id: cerveza.id, action: "add" }));
        }}
      >
        +
      </div>
      <div
        className="carrito-actions"
        onClick={() => {
          dispatch(deleteProducto(cerveza.id));
        }}
      >
        <i className="bi bi-trash"></i>
      </div>
    </div>
  );
};
export const format_number_to_currency = (number: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(number);
};
const ResumenPedido = (props: ICarrito) => {
  const { items } = props;
  const subtotal = items.reduce((acc, item) => {
    return acc + item.cerveza.precio * item.cantidad;
  }, 0);
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column border-cajas w-25 p-2 mx-1 ">
      <div className="p-4">
        <div>Subtotal: {format_number_to_currency(subtotal)}</div>
        <div>Envio: $2.990</div>
        <div>Descuentos: {format_number_to_currency(subtotal * 0.12)}</div>
        <div>Total: {format_number_to_currency(subtotal * 0.88)}</div>
      </div>
      <button
        type="button"
        className="btn btn-primary my-4 "
        onClick={() => {
          navigate("/resumen-compra");
        }}
      >
        Pagar Pedido
      </button>
    </div>
  );
};
const ListaPedido = (props: ICarrito) => {
  const { items } = props;

  return (
    <div className="d-flex flex-column border-cajas w-75 p-2 mx-1 justify-content-center align-items-center">
      {items.length === 0 ? (
        <div className="d-flex flex-column align-items-center">
          <h2>No hay productos en el carrito</h2>
        </div>
      ) : (
        items.map((item) => {
          const { cerveza } = item;
          return (
            <div className="w-100">
              <div
                className="d-flex align-items-center justify-content-around m-2 w-100"
                key={cerveza.id}
              >
                <img
                  src={cerveza.imagen}
                  alt={cerveza.nombre}
                  width={"160"}
                  height={"160"}
                />
                <div className="d-flex flex-column">
                  <span>{cerveza.nombre}</span>
                  <span>{format_number_to_currency(cerveza.precio)}</span>
                </div>
                <EditarPedido {...item} />
              </div>
              <div className="d-flex justify-content-end mx-5">
                Subtotal:{" "}
                {format_number_to_currency(cerveza.precio * item.cantidad)}
              </div>
              <hr />
            </div>
          );
        })
      )}
      <Link to="/catalogo">Volver al catalogo</Link>
    </div>
  );
};
export default function CarritoPage() {
  const carrito = useSelector((state: RootType) => state.carrito);
  return (
    <MainLayout>
      <div className="d-flex justify-content-around m-auto  p-3 w-75">
        <ListaPedido {...carrito} />
        <ResumenPedido {...carrito} />
      </div>
    </MainLayout>
  );
}
