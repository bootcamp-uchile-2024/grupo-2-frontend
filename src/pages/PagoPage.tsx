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
import { updateNombres } from "@/state/slices/usuarioSlice";

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
interface IErrores {
  name: string;
  message: string;
}
export const PagoPage = () => {
  // REDUX
  const carrito = useSelector((state: RootType) => state.carrito);
  const { rut } = useSelector((state: RootType) => state.usuario);

  // ESTADOS DE LA COMPONENTE
  const [errores, setErrores] = useState<IErrores[]>([]);
  const [direccionEnvio, setDireccionEnvio] = useState("opcion1");
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
      value: infoPedido.nombre,
    },
    {
      label: "Apellidos",
      name: "apellido",
      type: "text",
      placeholder: "Ingresa tus apellidos",
      handleChange,
      errorMessage: "Los apellidos son obligatorios.",
      value: infoPedido.apellido,
    },
    {
      label: "RUT",
      name: "rut",
      type: "text",
      placeholder: "Ingresa tu RUT",
      handleChange,
      errorMessage: "El RUT es obligatorio",
      value: infoPedido.rut,
    },
    {
      label: "Región",
      name: "region",
      type: "text",
      placeholder: "Ingresa tu región",
      handleChange,
      errorMessage: "La región es obligatorio",
      value: infoPedido.region,
    },
    {
      label: "Comuna",
      name: "comuna",
      type: "text",
      placeholder: "Ingresa tu comuna",
      handleChange,
      errorMessage: "La comuna es obligatorio",
      value: infoPedido.comuna,
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
      value: infoPedido.telefono_comprador,
    },
  ];
  const { cervezas } = useSelector((state: RootType) => state.carrito);
  const navigate = useNavigate();
  useEffect(() => {
    if (cervezas.length === 0) {
      navigate("/");
    }
  }, []);

  const fetchUser = async (rut: string) => {
    if (rut === "") return;
    const response = await fetch(`${API_URL}/usuarios/${rut}`);
    if (response.ok) {
      const data = await response.json();
      setInfoPedido({
        ...infoPedido,
        nombre: data.nombre,
        apellido: data.apellido,
        correo_comprador: data.correo_comprador,
        telefono_comprador: data.telefono_comprador,
        rut: data.rut,
      });
    }
  };
  useEffect(() => {
    fetchUser(rut);
  }, []);
  const handleChangeDireccion = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDireccionEnvio(e.target.value);
  };

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
      dispatch(updateNombres({ nombres: nombre, apellidos: apellido }));
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
                value={infoPedido.correo_comprador}
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
                  const {
                    label,
                    name,
                    type,
                    placeholder,
                    handleChange,
                    value,
                  } = e;
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
                            value={value}
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

                <label className="flex items-center  md:w-[480px]">
                  <input type="checkbox" className="mr-2" />
                  Guardar información y consultar más rapidamente la próxima vez
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">Métodos de envio</h2>
              <div className="flex justify-between items-center border-2 rounded-[8px] p-[12px]">
                <div>
                  <span className="text-lato-s">Envio normal</span>
                  <div>2 a 5 días hábiles</div>
                </div>
                <div>Introducir la dirección de envio</div>
              </div>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl ">Pago</h2>
              <p className="mb-4">
                Todas las transacciones son seguras y están encriptadas
              </p>
              <div className="border-2 rounded-[8px]">
                <div className="flex justify-between items-center p-[12px] border-b-2">
                  <span>Mercado Pago</span>
                  <img
                    src="/assets/tarjetas-visa.png"
                    alt="tarjeta-grande-mercado-pago"
                  />
                </div>
                <div className="flex justify-center min-h-[220px]">
                  <img
                    src="/assets/mercado-pago-tarjeta-grande.svg"
                    alt="tarjeta-grande-mercado-pago"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-headline-lato-2xl">
                Dirección de facturación
              </h2>
              <div className="flex flex-col border-2 rounded-[8px]">
                <label className="flex items-center border-b-2 p-4">
                  <input
                    type="radio"
                    name="opciones"
                    value="opcion1"
                    className="form-radio text-blue-500"
                    onChange={handleChangeDireccion}
                    checked={direccionEnvio === "opcion1"}
                  />
                  <span
                    className={`ml-2 ${
                      direccionEnvio === "opcion1"
                        ? "font-bold "
                        : "font-normal"
                    }`}
                  >
                    La misma dirección de envío
                  </span>
                </label>

                <label className="flex items-center  p-4 ">
                  <input
                    type="radio"
                    name="opciones"
                    value={"opcion2"}
                    className="form-radio text-blue-500"
                    onChange={handleChangeDireccion}
                    checked={direccionEnvio === "opcion2"}
                  />
                  <span
                    className={`ml-2 ${
                      direccionEnvio === "opcion2" ? "font-bold" : "font-normal"
                    }`}
                  >
                    Ingresar dirección diferente
                  </span>
                  <span className="ml-2"></span>
                </label>
              </div>
            </div>
            <div className="flex flex-col m-auto items-center max-w-[280px] ">
              <button
                type="submit"
                className="flex justify-center gap-[10px] btn-primary min-w-[280px] my-[24px] mb-3"
              >
                <img src="/assets/credit-card-black.svg" alt="credit-card" />
                Pagar ahora
              </button>
              <button
                type="button"
                className="flex items-center gap-[10px] justify-center btn-tertiary min-w-[280px] w-full"
              >
                <img src="/assets/carrito-yellow.svg" alt="carrito-yellow" />
                Volver al carro
              </button>
            </div>
          </form>
        </div>
        <ResumenCompra />
      </div>
    </MainLayout>
  );
};
