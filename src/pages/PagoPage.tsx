import { MainLayout } from "@/layout/MainLayout";
import { RootType } from "@/state/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResumenCompra } from "./ResumenCompra";
import { validarRut } from "./admin/CreaUsuarioPage";
import { API_URL } from "@/config/api.config";
import { toast } from "react-toastify";
import { ComunasPorRegion, Region } from "@/comunas";
import { addPedidoCarrito } from "@/state/slices/carritoSlice";

interface IPedidosDatos {
  rut: string;
  nombre: string;
  apellido: string;
  calle: string;
  numero: string;
  region: string;
  comuna: string;
  departamento: string;
  telefono_comprador: string;
  correo_comprador: string;
}
export const PagoPage = () => {
  // REDUX

  const carrito = useSelector((state: RootType) => state.carrito);
  // ESTADOS DE LA COMPONENTE

  const [errores, setErrores] = useState<{ name: string; message: string }[]>(
    []
  );
  const dispatch = useDispatch();
  const [infoPedido, setInfoPedido] = useState<IPedidosDatos>({
    rut: "",
    nombre: "",
    apellido: "",
    calle: "",
    numero: "",
    region: "Región de Arica y Parinacota",
    comuna: "Arica",
    departamento: "",
    telefono_comprador: "",
    correo_comprador: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const erroresArreglados = errores.filter((e) => e.name !== name);
    setErrores(erroresArreglados);
    setInfoPedido({ ...infoPedido, [name]: value });
  };
  const inputListPago = [
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      placeholder: "Ingresa tu nombre",
      handleChange,
      errorMessage: "El nombre es obligatorio",
    },
    {
      label: "Apellidos",
      name: "apellido",
      type: "text",
      placeholder: "Ingresa tus apellidos",
      handleChange,
      errorMessage: "Los apellidos son obligatorios.",
    },
    {
      label: "RUT",
      name: "rut",
      type: "text",
      placeholder: "Ingresa tu RUT",
      handleChange,
      errorMessage: "El RUT es obligatorio",
    },
    {
      label: "Región",
      name: "region",
      type: "text",
      placeholder: "Ingresa tu región",
      handleChange,
      errorMessage: "La región es obligatorio",
    },
    {
      label: "Comuna",
      name: "comuna",
      type: "text",
      placeholder: "Ingresa tu comuna",
      handleChange,
      errorMessage: "La comuna es obligatorio",
    },
    {
      label: "Código postal (Opcional)",
      name: "codigo_postal",
      type: "text",
      placeholder: "Ingresa tu código postal",
      handleChange,
    },
    {
      label: "Dirección",
      name: "calle",
      type: "text",
      placeholder: "Ingresa tu dirección",
      handleChange,
    },
    {
      label: "Numero",
      name: "numero",
      type: "number",
      placeholder: "Numero de la calle",
      handleChange,
    },
    {
      label: "Casa, departamento, etc. (Opcional)",
      name: "departamento",
      type: "text",
      placeholder: "Casa, departamento, etc.",
      handleChange,
    },
    {
      label: "Teléfono",
      name: "telefono_comprador",
      type: "text",
      placeholder: "Ingresa tu teléfono",
      handleChange,
    },
  ];
  const { cervezas } = useSelector((state: RootType) => state.carrito);
  const navigate = useNavigate();
  useEffect(() => {
    if (cervezas.length === 0) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      rut,
      nombre,
      apellido,
      correo_comprador,
      telefono_comprador,
      calle,
      numero,
      comuna,
      departamento,
    } = infoPedido;
    const erroresList: { name: string; message: string }[] = [];
    Object.entries(infoPedido).map((e) => {
      if (e[1] === "" || e[1] === null) {
        erroresList.push({ name: e[0], message: "Este campo es obligatorio" });
      }
    });
    if (!validarRut(rut) && rut != "") {
      erroresList.push({ name: "rut", message: "El rut no es valido" });
    }
    setErrores(erroresList);
    if (errores.length > 0) {
      console.log(errores);
      toast.error("Completa tus datos");
      return;
    }
    const { id_carrito, cervezas } = carrito;
    const body = {
      items: cervezas.map((elemento) => {
        const { cantidad, cerveza } = elemento;
        return {
          id_cerveza: cerveza.id,
          cantidad: cantidad,
          precio_venta: cerveza.precio,
        };
      }),
    };

    const existe_user = await fetch(`${API_URL}/usuarios/${rut}`);
    if (!existe_user.ok) {
      const response_perfil_invitado = await fetch(
        `${API_URL}/usuarios/invitado`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rut,
            nombre,
            apellido,
            edad: 99,
            tipo_suscripcion: "SIN_SUSCRIPCION",
            correo_comprador,
            telefono_comprador,
            rol: "invitado",
          }),
        }
      );
      console.log(response_perfil_invitado);
    }

    const response_direccion = await fetch(`${API_URL}/direcciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calle,
        departamento,
        id_comuna: comuna.replace(" ", ""),
        numero: parseInt(numero),
        rut_usuario: rut,
      }),
    });
    const { id: id_direccion } = await response_direccion.json();
    const response_rut = await fetch(`${API_URL}/carrito/${id_carrito}/Rut`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Rut: rut }),
    });
    console.log(response_rut);

    const response = await fetch(`${API_URL}/carrito/${id_carrito}/cervezas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);

    const response_pedido = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rut_comprador: rut,
        id_carrito,
        estado: "Creado",
        id_direccion,
        fecha_entrega: new Date(),
      }),
    });
    if (response_pedido.ok) {
      const respoonse_pedido = await response_pedido.json();
      const { id } = respoonse_pedido;
      dispatch(addPedidoCarrito({ id_pedido: id }));
      navigate("/pasarela-pago");
      toast.success("Pedido creado correctamente");
    } else {
      toast.error("Error al crear el pedido");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-wrap m-auto p-5 ">
        <div className="max-w-[640px] p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-headline-lato-2xl">Contacto</h2>
              <label
                htmlFor="correo"
                className="block text-gray-700 font-bold mb-2"
              >
                Correo
              </label>
              <input
                id={"correo"}
                className="form-input my-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                name={"correo_comprador"}
                type={"email"}
                placeholder={"mail@correo.cl"}
                onChange={handleChange}
              />
              <p className="text-red-500 text-sm mt-1">
                {errores
                  .filter((e) => e.name === "correo_comprador")
                  .map((e) => e.message)}
              </p>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Enviarme novedades y ofertas por correo electrónico
              </label>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">Entrega</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputListPago.map((e, i) => {
                  const { label, name, type, placeholder, handleChange } = e;
                  return (
                    <div key={i} className={`${i >= 8 ? "sm:col-span-2" : ""}`}>
                      <label
                        htmlFor={name}
                        className="block text-gray-700 font-bold mb-2"
                      >
                        {label}
                      </label>
                      {name === "region" ? (
                        <select
                          className="form-select mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                          name={name}
                          onChange={handleChange}
                        >
                          {Object.keys(Region).map((key, i) => (
                            <option
                              key={i}
                              value={Region[key as keyof typeof Region]}
                            >
                              {Region[key as keyof typeof Region]}
                            </option>
                          ))}
                        </select>
                      ) : name === "comuna" ? (
                        <select
                          className="form-select mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                          name={name}
                          onChange={handleChange}
                        >
                          {ComunasPorRegion[
                            infoPedido.region as keyof typeof ComunasPorRegion
                          ]?.map((comuna, i) => (
                            <option key={i} value={comuna}>
                              {comuna}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <>
                          <input
                            id={name}
                            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            onChange={handleChange}
                          />

                          <p className="text-red-500 text-sm mt-1">
                            {errores
                              .filter((e) => e.name === name)
                              .map((e) => e.message)}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })}
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Guardar información y consultar más rapidamente la próxima vez
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">Métodos de envio</h2>
              <div>Envio normal</div>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">Pago</h2>
              <p>Todas las transacciones son seguras y están encriptadas</p>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">
                Dirección de facturación
              </h2>
              <div className="flex flex-col border-2 rounded-[8px]">
                <label className="flex items-center border-b-2 p-2">
                  <input
                    type="radio"
                    name="opciones"
                    value="opcion1"
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">La misma dirección de envío</span>
                </label>

                <label className="flex items-center  p-2 ">
                  <input
                    type="radio"
                    name="opciones"
                    value="opcion2"
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Ingresar dirección diferente</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="flex justify-center gap-[10px] btn-primary min-w-[280px] my-[24px] "
              >
                <img src="/assets/credit-card-black.svg" alt="credit-card" />
                Pagar ahora
              </button>
              <button type="button">Volver al carro</button>
            </div>
          </form>
        </div>
        <ResumenCompra />
      </div>
    </MainLayout>
  );
};
