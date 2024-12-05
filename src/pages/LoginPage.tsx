import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";

interface IForm {
  user: string;
  password: string;
}

export const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [validCredential, setValidCredential] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    user: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setError(false);
    setValidCredential(true);
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg ">
          <h1 className="text-2xl font-bold text-center">¡Bienvenido!</h1>
          <p className="text-center text-gray-600">INICIA SESIÓN</p>
          <form className="space-y-6 ">
            <div>
              <label className="block" htmlFor="correo">
                Correo electronico
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                type="text"
                placeholder="Ejemplo: nombre@correo.cl"
                name="correo"
                onChange={handleChange}
                value={form.user}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <div className="flex justify-end ">
              <Link to="/recuperar-password" className="hover:font-bold">
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
            <div className="space-y-6">
              <Link to="/admin">
                <button className="w-full px-4 py-2 font-bold text-grey-dark bg-yellow rounded-md hover:bg-purple-100 hover:text-white">
                  Iniciar sesión
                </button>
              </Link>
              {/* Se comenta provisionalmente hasta tener el email desde backend */}
              {/* <button className="w-full px-4 py-2 font-bold text-grey-dark bg-yellow rounded-md hover:bg-purple-100 hover:text-white" type="submit" onClick={handleSubmit}>
                Iniciar Sesión
              </button> */}
              <button type="button" className="btn-formulario">
                <Link to="/crear-cuenta">Crear cuenta</Link>
              </button>
            </div>

            {error && (
              <div className="text-red-500">Faltan llenar algunos campos</div>
            )}
            {!validCredential && (
              <div className="text-red-500">
                Nombre de usuario o contraseña incorrecta
              </div> /* Button */
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
