import React, { useState } from 'react';
import { USERS_ENDPOINT } from '../../config/api.config';
import Usuario from '../../interfaces/IUsuario';

const validarRut = (rut: string): boolean => {

  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');

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
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
};

export const CreaUsuarioPage = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    rut: 0,
    nombre: '',
    apellido: '',
    contrasenia: '',
    edad: 0,
    tipo_suscripcion: '',
  });

  const [errorRut, setErrorRut] = useState<string | null>(null);
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorApellido, setErrorApellido] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorEdad, setErrorEdad] = useState<string | null>(null);
  const [errorTipoSuscripcion, setErrorTipoSuscripcion] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (usuario.rut === 0 || !validarRut(usuario.rut.toString())) {
      setErrorRut('El rut es obligatorio');
      hasError = true;
    } else {
      setErrorRut(null);
    }
    
    if (usuario.nombre === '') {
      setErrorNombre('El nombre es obligatorio');
      hasError = true;
    } else {
      setErrorNombre(null);
    }

    if (usuario.apellido === '') {
      setErrorApellido('El apellido es obligatorio');
      hasError = true;
    } else {
      setErrorApellido(null);
    }

    if (usuario.contrasenia === '') {
      setErrorPassword('La contraseña es obligatoria');
      hasError = true;
    } else {
      setErrorPassword(null);
    }
    // Se asegura que el valor de edad sea un número entero
    usuario.edad = parseInt(usuario.edad.toString());

    if (usuario.edad < 18) {
      setErrorEdad('La edad debe ser mayor a 18 años');
      hasError = true;
    } else {
      setErrorEdad(null);
    }

    if (usuario.tipo_suscripcion === '') {
      setErrorTipoSuscripcion('El tipo de suscripción es obligatorio');
      hasError = true;
    } else {
      setErrorTipoSuscripcion(null);
    }

    if (!hasError) {
      try {
        const response = await fetch( USERS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Usuario creado:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  };

  return (
    <form className="mt-5 w-50 m-auto" onSubmit={handleSubmit}>
      <h1>Crear usuario</h1>
      <p>A través de este formulario usted podrá crear un usuario</p>
      <div className="mb-3">
        <label className="form-label">Rut</label>
        <input className="form-control" name="rut" type="text" placeholder="Tu rut" onChange={handleChange} value={usuario.rut} />
        {errorRut && <p className="error">{errorRut}</p>}
      </div>
      
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input className="form-control" name="nombre" type="text" placeholder="Tu nombre" onChange={handleChange} value={usuario.nombre} />
        {errorNombre && <p className="error">{errorNombre}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido</label>
        <input className="form-control" name="apellido" type="text" placeholder="Tu apellido" onChange={handleChange} value={usuario.apellido} />
        {errorApellido && <p className="error">{errorApellido}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input className="form-control" name="contrasenia" type="password" placeholder="Tu contraseña" onChange={handleChange} value={usuario.contrasenia} />
        {errorPassword && <p className="error">{errorPassword}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Edad</label>
        <input className="form-control" name="edad" type="number" min="18" max="90" onChange={handleChange} value={usuario.edad} />
        {errorEdad && <p className="error">{errorEdad}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de suscripción</label>
        <select className="form-select" name="tipo_suscripcion" onChange={handleChange} value={usuario.tipo_suscripcion}>
          <option value="BRONZE">BRONZE</option>
          <option value="SILVER">SILVER</option>
          <option value="GOLDEN">GOLDEN</option>
          <option value="PLATINUM">PLATINUM</option>
          <option value="ELITE">ELITE</option>
        </select>
        {errorTipoSuscripcion && <p className="error">{errorTipoSuscripcion}</p>}
      </div>

      <button className="btn btn-dark" type="submit">Registrar</button>
    </form>
  );
};

export default CreaUsuarioPage;