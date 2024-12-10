import { useState } from "react";
import { NavbarDashboard } from "@/components/Dashboard/NavbarDashboard";
import { USERS_ENDPOINT } from "@/config/api.config";
import { Link } from "react-router-dom";

export const AdminLoginPage = () => {
  const [form, setForm] = useState({
    contrasenia: "",
    correo_comprador: "",
  });

  const [validCredential, setValidCredential] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.correo_comprador === "" || form.contrasenia === "") {
      setValidCredential(false);
      setErrorMessage("Por favor, ingrese un correo y contraseña válidos.");
      return;
    }

    try {
      const response = await fetch(USERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setValidCredential(false);
        setErrorMessage(errorData.message || "Error al iniciar sesión.");
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      setValidCredential(false);
      setErrorMessage("Error de conexión. Por favor, intente nuevamente.");
    }
  };

  return (
    <>
      <NavbarDashboard />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <img
            src="assets/logo-footer.svg"
            alt="Logo Cervezario"
            className="mx-auto pb-8"
          />
          <h1 className="text-[50px] font-bold text-center pb-8">
            ¡Bienvenido!
          </h1>
          <p className="text-center text-gray-600 pb-8">INICIA SESIÓN</p>
          <form className="space-y-6">
            <div>
              <label className="block" htmlFor="correo">
                Correo electronico
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                type="email"
                placeholder="Ejemplo: nombre@correo.cl"
                name="correo_comprador"
                onChange={handleChange}
                value={form.correo_comprador}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Contraseña"
                name="contrasenia"
                onChange={handleChange}
                value={form.contrasenia}
              />
            </div>
            <div className="flex justify-end ">
              <Link to="/recuperar-password" className="hover:font-bold">
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
            <div className="space-y-6">
              {!validCredential && (
                <p className="text-red-500">{errorMessage}</p>
              )}
              <button
                className="btn-formulario w-full"
                type="submit"
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
