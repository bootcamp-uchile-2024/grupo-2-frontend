import { useSelector } from "react-redux";
import { MainLayout } from "../layout/MainLayout";
import { RootType } from "../state/store";
import { format_number_to_currency } from "./CarritoPage";

export const ResumenCompraPage = () => {
  const { items } = useSelector((state: RootType) => state.carrito);

  return (
    <MainLayout>
      <div className="d-flex flex-column m-auto p-5 w-75">
        <h1>Resumen compra</h1>
        <div>
          {items.map((item) => {
            return (
              <>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <span>
                      {item.cantidad} x {item.cerveza.nombre}
                    </span>
                    <span>
                      {format_number_to_currency(item.cerveza.precio)}
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    Subtotal ={" "}
                    {format_number_to_currency(
                      item.cantidad * item.cerveza.precio
                    )}
                  </div>
                </div>
                <hr />
              </>
            );
          })}
          <div className="d-flex justify-content-end">
            <div className="d-flex flex-column">
              <h2>
                Total:{" "}
                {format_number_to_currency(
                  items.reduce(
                    (acc, item) => acc + item.cantidad * item.cerveza.precio,
                    0
                  )
                )}
              </h2>
              <button className="btn btn-primary my-4">Pagar</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
