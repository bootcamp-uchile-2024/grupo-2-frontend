import { API_URL } from "@/config/api.config";
import { useFetch } from "@/hooks/useFetch";
import { MainLayout } from "@/layout/MainLayout";
import { cleanCarrito } from "@/state/slices/carritoSlice";
import { CervezaInterface } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface IPedido {
  total_a_pagar: number;
  pedido_cervezas: {
    cantidad: number;
    precio_venta: number;
    id_cerveza: number;
  }[];
  direccion_entrega: { calle: string; numero: number };
  rut_comprador: string;
}
interface IUsuario {
  nombre: string;
  apellido: string;
  telefono_comprador: string;
}

export const CompraExitosaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id_pedido } = useParams();
  useEffect(() => {
    dispatch(cleanCarrito());
  }, []);
  const { data, error, loading } = useFetch<IPedido>(
    `${API_URL}/pedidos/${id_pedido}`
  );

  const { total_a_pagar, pedido_cervezas, direccion_entrega, rut_comprador } =
    data ? data : { total_a_pagar: 0, pedido_cervezas: [] };
  const articulos = pedido_cervezas.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  const { data: usuario } = useFetch<IUsuario>(
    `${API_URL}/usuarios/${rut_comprador}`
  );
  const { nombre, apellido, telefono_comprador } = usuario
    ? usuario
    : { nombre: "", apellido: "", telefono_comprador: "" };

  if (loading)
    return (
      <MainLayout>
        <div className="flex min-h-[255px] items-center justify-center">
          Cargando...
        </div>
      </MainLayout>
    );
  if (error) return <MainLayout>Error: {error}</MainLayout>;
  console.log(rut_comprador);
  return (
    <MainLayout>
      <div className="flex flex-col m-auto p-10 px-20 max-w-[1062px]">
        <div className="flex flex-col items-center mb-16 lg:flex-row lg:justify-center">
          <img src="/assets/beer-icon.svg" alt="beer-icon" className="p-4" />
          <div className="text-center ">
            <div className="mb-3 text-riffic text-xl lg:text-2xl">
              ¡COMPRA EXITOSA!
            </div>
            <p className="text-lato text-lg lg:text-xl">
              Felicidades, ahora eres parte de Club Cervezario. Tu pedido está
              siendo procesado. ¡Pronto lo tendrás en tus manos!
            </p>
            <div className="flex justify-center flex-col gap-4 mt-6 lg:flex-row ">
              <button
                className="btn-tertiary flex items-center gap-2 justify-center px-4 py-2"
                type="button"
                onClick={() => {
                  navigate("/");
                  dispatch(cleanCarrito());
                }}
              >
                <img
                  src="/assets/icon-home.svg"
                  alt="icon-home"
                  className="w-5 h-5"
                />
                Volver al inicio
              </button>
              <button
                className="btn-secondary flex items-center gap-2 justify-center px-4 py-2"
                type="button"
                onClick={() => {
                  navigate("/");
                  dispatch(cleanCarrito());
                }}
              >
                <img
                  src="/assets/icon-home.svg"
                  alt="icon-home"
                  className="w-5 h-5"
                />
                Seguir mi pedido
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-lato-3xl bg-yellow p-[10px]">
          Resumen de tu compra
        </div>
        <div className="flex justify-center items-center text-lato-2xl min-h-[84px]">
          Orden: #{id_pedido}
        </div>
        <div className="flex flex-col border-y-2 my-3 p-2 text-lato-l">
          <span>
            {nombre} {apellido}
          </span>
          <span>
            {direccion_entrega?.calle},{direccion_entrega?.numero}
          </span>
          <span>Telefono: {telefono_comprador}</span>
        </div>
        <div className=" my-3 p-2">
          {pedido_cervezas.map((i) => {
            const { cantidad, precio_venta, id_cerveza } = i;
            return (
              <ResumenFinalCerveza
                key={id_cerveza}
                id_cerveza={id_cerveza}
                cantidad={cantidad}
                precio_venta={precio_venta}
              />
            );
          })}
        </div>
        <div className="flex flex-col h-full justify-between gap-y-2">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-lato-m">
                Subtotal - {articulos} artículo(s)
              </span>
              <span className="text-lato-m">
                ${total_a_pagar.toLocaleString("es-CL")}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-lato-xl">Envío</span>
              <span>{total_a_pagar > 19990 ? "Gratis" : "$2.990"}</span>
            </div>
            <div className="flex justify-between ">
              <span className={"text-lato-2xl"}>Total</span>
              <span className={"text-lato-l"}>
                CLP $
                {(total_a_pagar > 19990
                  ? total_a_pagar
                  : total_a_pagar + 2990
                ).toLocaleString("es-CL")}
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center my-2 min-h-[200px] max-w-[1062px]"
          style={{ backgroundImage: `url(/assets/pattern-carrito.png)` }}
        >
          <h2 className="text-center w-3/4 text-riffic-4xl text-gray-dark">
            ¡Salud y gracias por tu compra!
          </h2>
        </div>
      </div>
    </MainLayout>
  );
};

const ResumenFinalCerveza: React.FC<{
  id_cerveza: number;
  cantidad: number;
  precio_venta: number;
}> = ({ id_cerveza, cantidad, precio_venta }) => {
  const {
    data: cerveza,
    error,
    loading,
  } = useFetch<CervezaInterface>(`${API_URL}/cervezas/${id_cerveza}`);
  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  const { nombre, marca, id_formato, imagen } = cerveza
    ? cerveza
    : { nombre: "", marca: "", imagen: "", id_formato: "" };
  const path_imagen = imagen
    ? `${API_URL}${imagen}`.replace("./", "/")
    : "/assets/no-imagen.png";
  return (
    <div className="flex justify-between border-b-2">
      <div className="py-5">
        <img src={path_imagen} alt={path_imagen} width={520} height={520} />
      </div>
      <div className="flex p-5 w-full flex-col text-lato-l">
        <span>{nombre}</span>
        <span>{marca}</span>
        <span>{id_formato}</span>
      </div>
      <div className="p-5 w-1/10 text-lato-l">
        ${precio_venta.toLocaleString()}
      </div>
      <div className="p-5 w-1/10 text-lato-l">x{cantidad}</div>
      <div className="p-5 w-1/10 text-lato-l">
        ${(cantidad * precio_venta).toLocaleString()}
      </div>
    </div>
  );
};
