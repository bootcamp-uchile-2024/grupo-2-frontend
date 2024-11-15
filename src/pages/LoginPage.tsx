import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin, login } from "../services/getLogin";

interface IForm {
  user: string;
  password: string;
}

export const LoginPage = () => {

  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);
  const [validCredential, setValidCredential] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    user: '',
    password: '',
  });


  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //validacion de formulario
    if (form.user === '' || form.password === '') {
      setError(true);
      return;
    }

    //validacion de credenciales
    if (login(form)) {
      if (isAdmin()) {
        navigate("/admin")
      } else {
        navigate("/catalogo");
      }
    } else {
      setValidCredential(false);
    }

    //termino de validaciones
    console.log("enviar formulario");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setError(false);
    setValidCredential(true);
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg">
          <h1 className="text-2xl font-bold text-center">Login Page</h1>
          <p className="text-center text-gray-600">Esta es la pagina de login</p>
          <form className="space-y-6">
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Usuario"
                name="user"
                onChange={handleChange}
                value={form.user}
              />
            </div>
            <div>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <div>
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                onClick={handleSubmit}
              >
                Iniciar Sesión
              </button>
            </div>
            {error && <div className="text-red-500">Faltan llenar algunos campos</div>}
            {!validCredential && <div className="text-red-500">Nombre de usuario o contraseña incorrecta</div>}
          </form>
        </div>
      </div>
    </>
  )
}