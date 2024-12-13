import React, { useState } from "react";
import { USERS_ENDPOINT } from "../../config/api.config";
import { UsuarioPerfil } from "../../types";

export const validarRut = (rut: string): boolean => {
  const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "");

  if (rutLimpio.length < 8) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado;
};

// Función para validar el formato del correo electrónico
const validarCorreo = (correo: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

export const CreaUsuarioPage = () => {
  const [usuario, setUsuario] = useState<UsuarioPerfil>({
    rut: "",
    nombre: "",
    apellido: "",
    contrasenia: "",
    correo_comprador: "",
    telefono_comprador: "",
    edad: 0,
    tipo_suscripcion: "",
    birthday: "",
    rol: "user",
  });

  const [errorRut, setErrorRut] = useState<string | null>(null);
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorApellido, setErrorApellido] = useState<string | null>(null);
  const [errorContrasenia, setErrorContrasenia] = useState<string | null>(null);
  const [errorCorreoComprador, setErrorCorreoComprador] = useState<
    string | null
  >(null);
  const [errorTelefonoComprador, setErrorTelefonoComprador] = useState<
    string | null
  >(null);
  const [errorEdad, setErrorEdad] = useState<string | null>(null);
  const [errorTipoSuscripcion, setErrorTipoSuscripcion] = useState<
    string | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });

    // Limpiar el mensaje de error correspondiente
    switch (name) {
      case "rut":
        if (errorRut) setErrorRut(null);
        break;
      case "nombre":
        if (errorNombre) setErrorNombre(null);
        break;
      case "apellido":
        if (errorApellido) setErrorApellido(null);
        break;
      case "contrasenia":
        if (errorContrasenia) setErrorContrasenia(null);
        break;
      case "correo_comprador":
        if (errorCorreoComprador) setErrorCorreoComprador(null);
        break;
      case "telefono_comprador":
        if (errorTelefonoComprador) setErrorTelefonoComprador(null);
        break;
      case "edad":
        if (errorEdad) setErrorEdad(null);
        break;
      case "tipo_suscripcion":
        if (errorTipoSuscripcion) setErrorTipoSuscripcion(null);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (usuario.rut === "" || !validarRut(usuario.rut.toString())) {
      setErrorRut("El rut es obligatorio");
      hasError = true;
    } else {
      setErrorRut(null);
    }

    if (usuario.nombre === "") {
      setErrorNombre("El nombre es obligatorio");
      hasError = true;
    } else {
      setErrorNombre(null);
    }

    if (usuario.apellido === "") {
      setErrorApellido("El apellido es obligatorio");
      hasError = true;
    } else {
      setErrorApellido(null);
    }

    if (usuario.contrasenia === "") {
      setErrorContrasenia("La contraseña es obligatoria");
      hasError = true;
    } else {
      setErrorContrasenia(null);
    }

    usuario.edad = parseInt(usuario.edad.toString());

    if (usuario.edad < 18) {
      setErrorEdad("La edad debe ser mayor a 18 años");
      hasError = true;
    } else {
      setErrorEdad(null);
    }

    if (usuario.tipo_suscripcion === "") {
      setErrorTipoSuscripcion("El tipo de suscripción es obligatorio");
      hasError = true;
    } else {
      setErrorTipoSuscripcion(null);
    }

    if (usuario.correo_comprador === "") {
      setErrorCorreoComprador("El correo es obligatorio");
      hasError = true;
    } else if (!validarCorreo(usuario.correo_comprador)) {
      setErrorCorreoComprador("El formato del correo es inválido");
      hasError = true;
    } else {
      setErrorCorreoComprador(null);
    }

    if (usuario.telefono_comprador === "") {
      setErrorTelefonoComprador("El teléfono es obligatorio");
      hasError = true;
    } else {
      setErrorTelefonoComprador(null);
    }

    if (!hasError) {
      try {
        const response = await fetch(USERS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        console.log("Usuario creado:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleClear = () => {
    setUsuario({
      rut: "",
      nombre: "",
      apellido: "",
      contrasenia: "",
      correo_comprador: "",
      telefono_comprador: "",
      edad: 0,
      tipo_suscripcion: "",
      birthday: "",
      rol: "user",
    });

    // Limpiar los mensajes de error
    setErrorRut(null);
    setErrorNombre(null);
    setErrorApellido(null);
    setErrorContrasenia(null);
    setErrorCorreoComprador(null);
    setErrorTelefonoComprador(null);
    setErrorEdad(null);
    setErrorTipoSuscripcion(null);
  };

  return (
    <form className="w-full p-8" onSubmit={handleSubmit}>
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">
        Crear usuarios
      </h1>
      <p className="mb-6 text-purple-100 text-custom-2xl">
        Información a mostrar
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rut</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="rut"
            type="text"
            placeholder="Tu rut"
            onChange={handleChange}
            value={usuario.rut}
          />
          {errorRut && <p className="text-red-500 text-sm mt-1">{errorRut}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            onChange={handleChange}
            value={usuario.nombre}
          />
          {errorNombre && (
            <p className="text-red-500 text-sm mt-1">{errorNombre}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Apellido</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="apellido"
            type="text"
            placeholder="Tu apellido"
            onChange={handleChange}
            value={usuario.apellido}
          />
          {errorApellido && (
            <p className="text-red-500 text-sm mt-1">{errorApellido}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Contraseña
          </label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="contrasenia"
            type="password"
            placeholder="Tu contraseña"
            onChange={handleChange}
            value={usuario.contrasenia}
          />
          {errorContrasenia && (
            <p className="text-red-500 text-sm mt-1">{errorContrasenia}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Edad</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="edad"
            type="number"
            min="18"
            max="90"
            onChange={handleChange}
            value={usuario.edad}
          />
          {errorEdad && (
            <p className="text-red-500 text-sm mt-1">{errorEdad}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Tipo de suscripción
          </label>
          <select
            className="form-select mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="tipo_suscripcion"
            onChange={handleChange}
            value={usuario.tipo_suscripcion}
          >
            <option value="BRONZE">BRONZE</option>
            <option value="SILVER">SILVER</option>
            <option value="GOLDEN">GOLDEN</option>
            <option value="PLATINUM">PLATINUM</option>
            <option value="ELITE">ELITE</option>
          </select>
          {errorTipoSuscripcion && (
            <p className="text-red-500 text-sm mt-1">{errorTipoSuscripcion}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="correo_comprador"
            type="text"
            placeholder="Tu correo"
            onChange={handleChange}
            value={usuario.correo_comprador}
          />
          {errorCorreoComprador && (
            <p className="text-red-500 text-sm mt-1">{errorCorreoComprador}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
          <input
            className="form-input mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            name="telefono_comprador"
            type="text"
            placeholder="Tu teléfono"
            onChange={handleChange}
            value={usuario.telefono_comprador}
          />
          {errorTelefonoComprador && (
            <p className="text-red-500 text-sm mt-1">
              {errorTelefonoComprador}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="btn-formulario-outline mr-4"
          type="button"
          onClick={handleClear}
        >
          Borrar
        </button>
        <button className="btn-formulario" type="submit">
          {" "}
          Ingresar usuario{" "}
        </button>
      </div>
    </form>
  );
};
