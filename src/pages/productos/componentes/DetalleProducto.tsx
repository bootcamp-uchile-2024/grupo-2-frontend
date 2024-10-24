import { useEffect, useState } from "react";
import ICerveza from "../../../interfaces/ICerveza";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainLayout } from "../../../layout/MainLayout";
import { AgregarAlCarro } from "./Listado";

export const DetalleProducto = () => {
  const { id } = useParams();
  const [cerveza, setCerveza] = useState<ICerveza>();
  
  // Se importa la variable de entorno de la API
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/cervezas/${id}`)
      .then((result) => result.json())
      .then((data) => setCerveza(data));
  }, [apiUrl, id]);

  return (
    <MainLayout>
      <div className="contenido">
        <h1>Detalle de Cerveza</h1>
        <div className="wrapper-detalle-cerveza">
          {cerveza ? (
            <div className="detalle-cerveza">
              <div className="detalle-cerveza-imagen">
                <img src={cerveza.imagen} alt={cerveza.nombre} />
              </div>
              <div className="detalle-cerveza-descripcion">
                <h1>{cerveza.nombre}</h1>
                <ul>
                  <li>{cerveza.descripcion}</li>
                  <li>Precio: ${cerveza.precio}</li>
                  <AgregarAlCarro {...cerveza} />
                  <li>{cerveza.categoria}</li>
                  <li>{cerveza.amargor}</li>
                  <li>{cerveza.graduacion}</li>
                  <li>{cerveza.formato}</li>
                </ul>
              </div>
            </div>
          ) : null}

          <Link to="/catalogo">
            <button className="btn">Volver al catálogo</button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
