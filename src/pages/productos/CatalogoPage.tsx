import { useEffect, useState } from "react";
import Listado from "./componentes/Listado";
import Sidebar from "../../components/Sidebar";
import Cerveza from "../../interfaces/ICerveza";
import { Link } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";


export const CatalogoPage = () => {
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [filtros, setFiltros] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/cervezas")
      .then((response) => response.json())
      .then((data: Cerveza[]) => {
        setCervezas(data);
      });
  }, []);
  
  
  return (
    <MainLayout>
      <div className="wrapper-catalogo">
        <div className="left-column">
          <Sidebar setFiltros={setFiltros} />
        </div>
        <div className="right-column">
          <div>
            <h1>Listado de Cervezas</h1>
            <Listado cervezas={cervezas} />
          </div>
          <div className="wrapper-detalle-cerveza mt-5">
            <Link to="/">
              <button className="btn">Volver al home</button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
