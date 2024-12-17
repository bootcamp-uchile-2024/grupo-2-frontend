import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ENDPOINT } from "@/config/api.config";
import { NavbarDashboard } from "@/components/Dashboard/NavbarDashboard";
import { useNavigate } from "react-router-dom";

interface IForm {
  rut: string;
  contrasenia: string;
}

export const AdminLoginPage = () => {
  const [form, setForm] = useState<IForm>({
    rut: "",
    contrasenia: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async ({ rut, contrasenia }: IForm) => {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: rut, password: contrasenia }),
    });
    if (response.ok) {
      const valor = await response.text();
      localStorage.setItem("token_jwt", valor);
      navigate("/dashboard");
    } else {
      alert("Usuario o contraseña incorrecta");
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
              <label className="block" htmlFor="rut">
                RUT
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                type="text"
                placeholder="Ejemplo: 12345678-9"
                name="rut"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contrasenia">Contraseña</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Contraseña"
                name="contrasenia"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end ">
              <Link to="/recuperar-password" className="hover:font-bold">
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
            <div className="space-y-6">
              <button
                className="btn-formulario w-full"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(form);
                }}
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
