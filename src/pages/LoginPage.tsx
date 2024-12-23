import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { LOGIN_ENDPOINT } from "@/config/api.config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/state/slices/usuarioSlice";
import { RootType } from "@/state/store";
import { Perfil } from "./PerfilPage";

interface IForm {
  correo_comprador: string;
  contrasenia: string;
}

export const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [validCredential, setValidCredential] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    correo_comprador: "",
    contrasenia: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, token } = useSelector((state: RootType) => state.usuario);

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
  const login = async ({ correo_comprador, contrasenia }: IForm) => {
    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: correo_comprador,
          password: contrasenia,
        }),
      });
      const valor = await response.text();
      if (response.ok) {
        const { rut, email, role } = jwtDecode<{
          rut: string;
          email: string;
          role: string;
        }>(valor);
        if (role == "user") {
          navigate("/cervezas");
        } else if (role == "admin") {
          navigate("/dashboard");
        }
        dispatch(setUser({ rut, email, role, token: valor }));
        localStorage.setItem("token_jwt", valor);
        toast.success("Inicio de sesión exitoso");
      } else {
        toast.error(`Error al iniciar sesión. ${valor}`);
      }
    } catch (e) {
      toast.error(`Error al iniciar sesión. ${e}`);
    }
  };
  useEffect(() => {
    if (role == "admin") {
      navigate("/dashboard");
    }
  }, []);
  if (token) {
    return (
      <MainLayout>
        <Perfil />
      </MainLayout>
    );
  } else {
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
                <button
                  type="button"
                  onClick={() => {
                    login(form);
                  }}
                  className="w-full px-4 py-2 font-bold text-grey-dark bg-yellow rounded-md hover:bg-purple-100 hover:text-white"
                >
                  Iniciar sesión
                </button>

                <button type="button" className="btn-formulario w-full">
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
  }
};
