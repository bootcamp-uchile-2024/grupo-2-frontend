import React, { useEffect, useState } from 'react';

export const CheckAge: React.FC = () => {
  // Tiempo en milisegundos para cerrar el modal
  const modalCloseTime = 4000; 
  // Estados
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [isValidAge, setIsValidAge] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [headerText, setHeaderText] = useState("Hola!");
  const [contentText, setContentText] = useState("Por favor verifica que eres mayor de 18 años para ingresar a este sitio.");

  // Comprobar si el usuario ya ha verificado su edad (Se deja una cookie que se mantendrá hasta que se cierre el navegador)
  useEffect(() => {
    const ageVerified = getCookie('ageVerified');
    if (ageVerified) {
      setIsAdult(true);
      setShowPopup(false);
    }
  }, []);

  // Función para manejar el click en el botón de "Sí"
  const handleYesClick = () => {
    setIsAdult(true);
    setCookie('ageVerified', 'true');
  };

  // Función para manejar el click en el botón de "No"
  const handleNoClick = () => {
    setHeaderText("Ouch!");
    setContentText("NO TIENES LA EDAD SUFICIENTE PARA VER ESTE CONTENIDO");
  };

  // Función para manejar el cambio de la fecha de nacimiento
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(event.target.value);
    const today = new Date();

    // Verificar si la fecha es válida
    if (isNaN(birthDate.getTime())) {
      setIsValidAge(false);
      setContentText("Por favor ingresa una fecha de nacimiento válida.");
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Verifica si el usuario es mayor de 18 años
    if (age < 18) {
      setIsValidAge(false);
      setContentText("Debes ser mayor de 18 años para ingresar a este sitio.");
    
      // Verifica si el usuario es mayor de 100 años
    } else if (age < 100) {
      setIsValidAge(false);
      setContentText("Por favor ingresa una fecha de nacimiento válida.");
    
      // Cumple con la condición de edad y cierra la ventana modal despues de X tiempo definida en la variable modalCloseTime
    } else {
      setIsValidAge(true);
      setTimeout(() => {
        setShowPopup(false);
      }, modalCloseTime);
    }
  };
  
  // Si no, se muestra la ventana modal
  if (!showPopup) {
    return null;
  }
  
  // Función para dejar una cookie
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/`;
  };
  
  // Función para obtener la cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-max">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center">
            <img src="assets/pattern-check-age.png" />
          </div>

          {!isAdult && (
            <div className="flex items-center justify-center flex-col w-80">
              <img src="assets/logo-footer.svg" alt="" className="w-1/3 mb-4" />
              <h1 className="text-4xl font-bold mb-4">{headerText}</h1>
              <p className="text-sm text-center">{contentText}</p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleYesClick}>Sí, soy mayor de edad</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleNoClick}>No</button>
              </div>
            </div>
          )}

          {isAdult && (
            <div className="flex items-center justify-center flex-col w-80">
              <img src="assets/logo-footer.svg" alt="" className="w-1/3 mb-4" />
              <h1 className="text-4xl font-bold mb-4 text-center">Selecciona tu fecha de nacimiento</h1>
              <input name="age" type="date" min="0" max="120" onChange={handleDateChange} className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'/>
              {isValidAge ? (
                <p className="text-green-500 mt-4 font-semibold text-center">Bienvenido... eres mayor de edad.</p>
              ) : (
                  <p className="mt-4 text-center">{contentText}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};