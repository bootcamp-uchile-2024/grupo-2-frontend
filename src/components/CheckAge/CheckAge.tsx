import React, { useState } from 'react';

export const CheckAge: React.FC = () => {
  const tiempoCierreModal = 6000; 

  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [isValidAge, setIsValidAge] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [headerText, setHeaderText] = useState("Hola!");
  const [contentText, setContentText] = useState("Por favor verifica que eres mayor de 18 años para ingresar a este sitio.");

  const handleYesClick = () => {
    setIsAdult(true);
  };

  const handleNoClick = () => {
    setHeaderText("Ouch!");
    setContentText("NO TIENES LA EDAD SUFICIENTE PARA VER ESTE CONTENIDO");
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(event.target.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18 && age <= 100) {
      setIsValidAge(true);
      setTimeout(() => {
        setShowPopup(false);
      }, tiempoCierreModal);
    } else {
      setIsValidAge(false);
      setContentText("Por favor ingresa una fecha de nacimiento válida.");
    }
  };

  if (!showPopup) {
    return null;
  }

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
              <input name="age" type="date" min="0" max="120" onChange={handleDateChange} />
              {isValidAge ? (
                <p className="text-green-500 mt-4">Bienvenido... eres mayor de edad.</p>
              ) : (
                  <p className="text-red-500 mt-4">{contentText}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};