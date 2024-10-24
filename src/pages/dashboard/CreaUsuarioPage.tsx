import { useState } from "react";

// Interfaces
interface INewUser {
  username: string;
  email: string;
  birthdate: string;
  age: number;
  country: string;
  gender: string;
  terms: boolean;
}

// Función para validar nombre. El campo no debe estar vacío.
function validarNombre(nombre: string): boolean {
  return nombre === '';
}

// El correo electrónico debe tener un correo válido. 
function validarEmail(email: string): boolean {
  // Expresión regular para validar un correo electrónico
  const exp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // Se valida que el correo cumpla con la expresión regular
  return exp.test(email);
}

// Función para validar la fecha de nacimiento. La persona debe ser mayor de 18 años.
function validarFechaNacimiento(fecha: string): boolean {
  const fechaNacimiento = new Date(fecha);
  const fechaActual = new Date();
  let age = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
    age--;
  }
  // Se valida que la edad sea menor a 18 años
  return age < 18;
}

export const CreaUsuarioPage = () => {
  const [formValues, setFormValues] = useState<INewUser>({
    username: '',
    email: '',
    birthdate: '',
    age: 0,
    country: '',
    gender: '',
    terms: false
  });

  // Estados para manejar los errores
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState<string | null>(null);
  const [errorCountry, setErrorCountry] = useState<string | null>(null);
  const [errorGender, setErrorGender] = useState<string | null>(null);
  const [errorTerms, setErrorTerms] = useState<string | null>(null);

  // Función para manejar los cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    let newFormValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
      [name]: type === "radio" ? value : value
    };

    if (name === "birthdate") {
      const fechaNacimiento = new Date(value);
      const fechaActual = new Date();
      let age = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

      if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        age--;
      }

      newFormValues = {
        ...newFormValues,
        age: age
      };
    }

    setErrorNombre(null);
    setErrorEmail(null);
    setErrorFechaNacimiento(null);
    setFormValues(newFormValues);

    if (name === "country") {
      setErrorCountry(null);
    }

    if (name === "gender") {
      setErrorGender(null);
    }

    if (name === "terms") {
      setErrorTerms(null);
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    let hasError = false;

    if (validarNombre(formValues.username)) {
      setErrorNombre('El nombre no debe estar vacío.');
      hasError = true;
    }

    if (!validarEmail(formValues.email)) {
      setErrorEmail('El correo electrónico no es válido.');
      hasError = true;
    }

    if ((!formValues.birthdate) || validarFechaNacimiento(formValues.birthdate)) {
      setErrorFechaNacimiento('Debes ser mayor de 18 años".');
      hasError = true;
    }

    if (!formValues.country) {
      setErrorCountry('Por favor, selecciona un país.');
      hasError = true;
    }

    if (!formValues.gender) {
      setErrorGender('Por favor, selecciona una opción de género.');
      return;
    }

    if (!formValues.terms) {
      setErrorTerms('Debes aceptar los términos y condiciones.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Se imprimen los valores del formulario en la consola
    console.log('El formulario está correcto');
    console.log(JSON.stringify(formValues, null, 2));
    setFormValues({
      username: '',
      email: '',
      birthdate: '',
      age: 0,
      country: '',
      gender: '',
      terms: false
    });
  };

  // REFACTOR: Se agregó grilla responsiva de Bootstrap. 
  // REFACTOR: Se agregaron clases de Bootstrap para darle estilo al formulario.
  return (
    <>
      <form className="mt-5 w-50 m-auto">
        <h1>Crear usuario</h1>
        <p>A través de este formulario usted podrá crear un usuario</p>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">Nombre de usuario</label>
          <input className="form-control" name="username" type="text" placeholder="Tu nombre de usuario" onChange={handleChange} value={formValues.username} />
          {errorNombre && <p className="error">{errorNombre}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Correo Electrónico</label>
          <input className="form-control" name="email" type="email" placeholder="Tu correo electrónico" onChange={handleChange} value={formValues.email} />
          {errorEmail && <p className="error">{errorEmail}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="birthdate">Fecha de Nacimiento</label>
          <input className="form-control" name="birthdate" type="date" onChange={handleChange} value={formValues.birthdate} />
          {errorFechaNacimiento && <p className="error">{errorFechaNacimiento}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="age">Edad</label>
          <input className="form-control" name="age" type="number" min="0" max="120" value={formValues.age} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="country">País</label>
          <select className="form-control" name="country" onChange={handleChange} value={formValues.country}>
            <option value="">Seleccione...</option>
            <option value="Argentina">Argentina</option>
            <option value="Colombia">Colombia</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Brasil">Brasil</option>
            <option value="Perú">Perú</option>
            <option value="Chile">Chile</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Uruguay">Uruguay</option>
          </select>
          {errorCountry && <p className="error">{errorCountry}</p>}
        </div>

        <div className="mb-3">
          <label>Género</label>
          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" name="gender" type="radio" value="male" onChange={handleChange} checked={formValues.gender === 'male'} />
              <label className="form-check-label" htmlFor="male">Masculino</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" name="gender" type="radio" value="female" onChange={handleChange} checked={formValues.gender === 'female'} />
              <label className="form-check-label" htmlFor="female">Femenino</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" name="gender" type="radio" value="other" onChange={handleChange} checked={formValues.gender === 'other'} />
              <label className="form-check-label" htmlFor="other">Otro</label>
            </div>
          </div>
          {errorGender && <p className="error">{errorGender}</p>}
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" name="terms" type="checkbox" onChange={handleChange} checked={formValues.terms} />
            <label className="form-check-label" htmlFor="terms">Acepto los términos y condiciones</label>
          </div>
          {errorTerms && <p className="error">{errorTerms}</p>}
        </div>

        <button className="btn btn-dark" type="submit" onClick={handleSubmit}>Registrar</button>
      </form>
    </>
  );
}