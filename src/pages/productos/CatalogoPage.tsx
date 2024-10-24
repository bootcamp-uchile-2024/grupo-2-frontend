import { useEffect, useState } from "react";
import Listado from "./componentes/Listado";
import Sidebar from "../../components/Sidebar";
import Cerveza from "../../interfaces/ICerveza";
import { Link } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";

/* 
REFACTOR: Interface con filtros de catalogo
 */
export interface FiltrosCatalogo {
  categorias: string[];
  estilos: string[];
  graduaciones: string[];
}
export const CatalogoPage = () => {
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [filtros, setFiltros] = useState<FiltrosCatalogo>({
    categorias: [],
    estilos: [],
    graduaciones: [],
  });
  
  // Se importa la variable de entorno de la API
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    /* REFACTOR: se pueden filtrar realmente desde el lado del cliente, faltan más filtros pero a definir con UX */
    fetch(`${apiUrl}/cervezas/`)
      .then((result) => result.json())
      .then((data) => {
        const { categorias, graduaciones } = filtros;
        const filterCervezas = data.filter((e: Cerveza) => {
          if (categorias.length > 0 && !categorias.includes(e.categoria)) {
            return false;
          }
          if (graduaciones.length > 0 && !graduaciones.includes(e.graduacion)) {
            return false;
          }
          return true;
        });
        setCervezas(filterCervezas);
      });
  }, [apiUrl, filtros]);
  
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
