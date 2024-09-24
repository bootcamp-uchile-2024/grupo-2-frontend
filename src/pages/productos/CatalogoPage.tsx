import { useEffect, useState } from "react";
import Listado from "./componentes/Listado";
import Sidebar from "../../components/Sidebar";
import Cerveza from "../../interfaces/Cerveza";
import { Link } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";


export const CatalogoPage = () => {
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  useEffect(() => {
    fetch("http://localhost:5173/cervezas/")
      .then((result) => result.json())
      .then((data) => setCervezas(data));
  }, []);

  return (
    <MainLayout>
      <div className="wrapper">
        <div className="left-column">
          <Sidebar />
        </div>
        <div className="right-column">
          <Listado cervezas={cervezas} />
          <div className="wrapper-detalle-cerveza mt-5">
            <Link to="/">
              <button className="btn">Volver al home</button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
