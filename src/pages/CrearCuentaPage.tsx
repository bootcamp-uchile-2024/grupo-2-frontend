import { MainLayout } from "@/layout/MainLayout";
import { Usuario } from "@/types";
import { useState } from "react";
import { validarRut } from "./CreaUsuarioPage";
import { USERS_ENDPOINT } from "@/config/api.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CrearCuentaPage = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    rut: "",
    nombre: "",
    apellido: "",
    contrasenia: "",
    birthday: "",
    correo_comprador: "",
    re_contrasenia: "",
  });
  const [errores, setErrores] = useState<(string | undefined)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    rut,
    nombre,
    apellido,
    contrasenia,
    re_contrasenia,
    birthday,
    correo_comprador,
  } = usuario;
  const navigate = useNavigate();
  const formularioRegistro = [
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      placeholder: "Nombres",
      value: nombre,
      error_message: "El nombre es obligatorio",
    },
    {
      label: "Apellidos",
      name: "apellido",
      type: "text",
      placeholder: "Apellidos",
      value: apellido,
      error_message: "El apellido es obligatorio",
    },
    {
      label: "Correo electronico",
      name: "correo_comprador",
      type: "email",
      placeholder: "Ejemplo: nombre@correo.cl",
      value: correo_comprador,
      error_message: "El correo es obligatorio",
    },
    {
      label: "Rut",
      name: "rut",
      type: "text",
      placeholder: "Ejemplo: 11111111-1",
      value: rut,
      error_message: "El rut es obligatorio",
    },
    {
      label: "Fecha nacimiento",
      name: "birthday",
      type: "date",
      placeholder: "Fecha nacimiento",
      value: birthday,
      error_message: "La fecha de nacimiento es obligatoria",
    },
    {
      label: "Contraseña",
      name: "contrasenia",
      type: "password",
      placeholder: "Contraseña",
      value: contrasenia,
      error_message: "La contraseña es obligatoria",
    },
    {
      label: "Confirmar contraseña",
      name: "re_contrasenia",
      type: "password",
      placeholder: "Repetir Contraseña",
      value: re_contrasenia,
      error_message: "La contraseña es obligatoria",
    },
  ];
  const findEmptyStrings = (obj: any) => {
    return Object.entries(obj)
      .filter(([_, value]) => value === "")
      .map(([key]) => key);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(findEmptyStrings(usuario));
    const erroresLista = findEmptyStrings(usuario).map((key) => {
      return formularioRegistro.find((input) => input.name == key)
        ?.error_message;
    });
    const { contrasenia, re_contrasenia, rut } = usuario;
    if (!validarRut(rut) && rut != "") {
      erroresLista.push("El rut no es valido");
    }
    if (contrasenia !== re_contrasenia) {
      erroresLista.push("Las contraseñas no coinciden");
    }
    if (erroresLista.length === 0) {
      setLoading(true);
      const { contrasenia, ...restoUsuario } = usuario;
      const edad = new Date().getFullYear() - new Date(birthday).getFullYear();
      const tipo_suscripcion = "BRONZE";
      try {
        const response = await fetch(USERS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contrasenia,
            edad,
            tipo_suscripcion,
            ...restoUsuario,
          }),
        });
        if (response.ok) {
          toast.success("Cuenta creada correctamente");
          navigate("/confirmacion-correo", { state: { correo_comprador } });
        } else {
          const { error } = await response.json();
          toast.error(`Error al crear la cuenta. ${error}`);
        }
      } catch (error) {
        toast.error(`Error al crear la cuenta. ${error}`);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(erroresLista);
      setErrores(erroresLista);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrores([]);
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };
  return (
    <MainLayout>
      <div className="flex flex-col items-center  m-auto">
        <h1 className="text-purple font-bold text-2xl">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="my-2 mb-6">
          {formularioRegistro.map((input, index) => {
            const { name, type, placeholder, label } = input;
            return (
              <div className="mb-4 min-w-[626px]" key={index}>
                <label className="block text-gray-700 font-bold mb-2">
                  {label}
                </label>
                <input
                  className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <div className="mb-2">
            {errores.length > 0 &&
              errores.map((error, index) => {
                return (
                  <p key={index} className="text-red-500 text-sm mt-1">
                    {error}
                  </p>
                );
              })}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Siguiente
          </button>
        </form>
      </div>
    </MainLayout>
  );
};
