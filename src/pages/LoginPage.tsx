import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { login } from "../services/LoginService";

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
      navigate("/admin");
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
    <MainLayout>
      <div className="contenido">
        <h1>Login Page</h1>
        <p>Esta es la pagina de login</p>
        <form className="login-form">
          <input className="input-form" type="text" placeholder="Usuario" name="user" onChange={handleChange} value={form.user} />
          <input className="input-form" type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={form.password} />
          <button className="btn input-form" type="submit" onClick={handleSubmit}>Iniciar Sesión</button>

          <span className="error">{error && <div>Faltan llegar algunos campos</div>}</span>
          <span className="error">{!validCredential && <div>Nombre de usuario o contraseña incorrecta</div>}</span>
        </form>
      </div>
    </MainLayout>
  )
}