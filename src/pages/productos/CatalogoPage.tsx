import { useEffect, useState } from "react";
import Listado from "./componentes/Listado";
import Sidebar from "../../components/Sidebar";
import Cerveza from "../../interfaces/Cerveza";
import { Link } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";


/* 
REFACTOR: Interface con filtros de catalogo
 */
export interface FiltrosCatalogo {
  categorias: string[];
  estilos: string[];
  graduaciones: string[]
}
export const CatalogoPage = () => {
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [filtros, setFiltros] = useState<FiltrosCatalogo>({ categorias: [], estilos: [], graduaciones: [] });
  useEffect(() => {
    /* REFACTOR: se pueden filtrar realmente desde el lado del cliente, faltan más filtros pero a definir con UX */
    fetch("http://localhost:5173/cervezas/")
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
        })
        setCervezas(filterCervezas)
      })
  }, [filtros]);
  return (
    <MainLayout>
      <div className="wrapper">
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
}
