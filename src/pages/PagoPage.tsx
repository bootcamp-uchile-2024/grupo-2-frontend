import { CERVEZAS_IMAGENES } from "@/config/api.config";
import { MainLayout } from "@/layout/MainLayout";
import { RootType } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IPedidosDatos {
  rut: string;
  nombre: string;
  apellido: string;
  correo_comprador: string;
}
export const PagoPage = () => {
  const [usuario, setUsuario] = useState<IPedidosDatos>({
    rut: "",
    nombre: "",
    apellido: "",
    correo_comprador: "",
  });
  const inputListPago = [
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      placeholder: "Ingresa tu nombre",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Apellidos",
      name: "apellidos",
      type: "text",
      placeholder: "Ingresa tus apellidos",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "RUT",
      name: "rut",
      type: "text",
      placeholder: "Ingresa tu RUT",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Región",
      name: "region",
      type: "text",
      placeholder: "Ingresa tu región",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Comuna",
      name: "comuna",
      type: "text",
      placeholder: "Ingresa tu comuna",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Código postal (Opcional)",
      name: "codigo_postal",
      type: "text",
      placeholder: "Ingresa tu código postal",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Dirección",
      name: "direccion",
      type: "text",
      placeholder: "Ingresa tu dirección",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Casa, departamento, etc. (Opcional)",
      name: "detalle_direccion",
      type: "text",
      placeholder: "Casa, departamento, etc.",
      handleChange: (e: any) => console.log(e),
    },
    {
      label: "Teléfono",
      name: "telefono",
      type: "text",
      placeholder: "Ingresa tu teléfono",
      handleChange: (e: any) => console.log(e),
    },
  ];
  const { cervezas, total_pagar } = useSelector(
    (state: RootType) => state.carrito
  );
  const articulos = cervezas.reduce((acc, item) => acc + item.cantidad, 0);
  const navigate = useNavigate();
  useEffect(() => {
    if (cervezas.length === 0) {
      navigate("/");
    }
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-wrap m-auto p-5 ">
        <div className="max-w-[640px] p-5">
          <div>
            <h2 className="text-headline-lato-2xl">Contacto</h2>
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">
              Correo
            </label>
            <input
              id={"correo"}
              className="form-input my-2 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
              name={"correo"}
              type={"text"}
              placeholder={"mail@correo.cl"}
              onChange={() => console.log("cambio")}
            />
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
                  <div key={i} className={`${i >= 6 ? "sm:col-span-2" : ""}`}>
                    <label
                      htmlFor={name}
                      className="block text-gray-700 font-bold mb-2"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      onChange={handleChange}
                    />
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
            <h2 className="text-headline-lato-2xl">Dirección de facturación</h2>
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
              type="button"
              onClick={() => console.log("hola")}
              className="flex justify-center gap-[10px] btn-primary min-w-[280px] my-[24px] "
            >
              <img src="/assets/credit-card-black.svg" alt="credit-card" />
              Pagar ahora
            </button>
            <button>Volver al carro</button>
          </div>
        </div>
        <div>
          <h2 className="text-headline-lato-2xl min-w-[440px]">
            Resumen de compra
          </h2>
          <div className="p-5 border-2 rounded-[6px]  max-w-[620px]">
            <div className="mb-10">
              {cervezas.map((e) => {
                const { cerveza, cantidad } = e;
                const { nombre, precio, formato, imagen } = cerveza;
                const path_imagen = imagen
                  ? `${CERVEZAS_IMAGENES}${imagen}`
                  : "/assets/no-imagen.png";
                return (
                  <div className="flex justify-between p-1 border-b-2">
                    <div className="flex items-center p-2">
                      <img
                        src={path_imagen}
                        alt={path_imagen}
                        className="max-h-[94px]  max-w-[160px]"
                        width={94}
                        height={94}
                      />
                    </div>

                    <div className="flex flex-col text-gray-dark text-custom-s font-bold">
                      <span>
                        {nombre} x {cantidad}
                      </span>
                      <div className="text-gray-dark-67 text-custom-xs">
                        {formato.id}
                      </div>
                    </div>
                    <div className="flex justify-end min-w-[80px] text-gray-dark font-bold">
                      ${(precio * cantidad).toLocaleString("es-CL")}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <div>Codigo</div>
              <div>Boton</div>
            </div>
            <div className="flex flex-col h-full justify-between gap-y-2">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-lato-m">
                    Subtotal - {articulos} artículo
                  </span>
                  <span className="text-lato-m">
                    ${total_pagar.toLocaleString("es-CL")}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-lato-xl">Envío</span>
                  <span>
                    {total_pagar > 19990
                      ? "Gratis"
                      : total_pagar
                      ? "Por calcular"
                      : "$2.990"}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className={"text-lato-2xl"}>Total</span>
                  <span className={"text-lato-l"}>
                    CLP $
                    {(total_pagar > 19990 || total_pagar
                      ? total_pagar
                      : total_pagar + 2990
                    ).toLocaleString("es-CL")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div>
                Incluye ${(total_pagar * 0.19).toLocaleString("es-CL")} de
                impuestos
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
