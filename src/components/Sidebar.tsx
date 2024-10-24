import React, { useEffect, useState } from "react";
import { FiltrosCatalogo } from "../pages/productos/CatalogoPage";

/* 
REFACTOR
Refactor casi completo para que los checkbox se rendericen con map
Funciones para setear estados y poder filtrar el catalogo */
interface SidebarProps {
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosCatalogo>>;
}

const handleChange = (select: string, setLista: React.Dispatch<React.SetStateAction<string[]>>) => {
  setLista((prev) => {
    if (prev.includes(select)) {
      return prev.filter((item) => item !== select)
    } else {
      return [...prev, select]
    }
  })
}

export default function Sidebar({ setFiltros }: SidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedEstilos, setSelectedEstilos] = useState<string[]>([])
  const [selectedGraduaciones, setSelectedGraduaciones] = useState<string[]>([])
  useEffect(() => {
    setFiltros({ categorias: selectedCategories, estilos: selectedEstilos, graduaciones: selectedGraduaciones })
  }, [selectedCategories, selectedEstilos, selectedGraduaciones])



  const estilos = [{ id: 1, nombre: 'Clásicas' }, { id: 2, nombre: 'Experimentales' }, { id: 3, nombre: 'Especiales' }, { id: 4, nombre: 'Temporadas' }]
  const graduaciones = [{ id: 1, nombre: '4%' }, { id: 2, nombre: '5%' }, { id: 3, nombre: '6%' }, { id: 4, nombre: '7%' }]
  const categorias = [{ id: 1, nombre: 'Pale Ale' }, { id: 2, nombre: 'Pilsner' }, { id: 3, nombre: 'Stout' }, { id: 4, nombre: 'Porter' }, { id: 5, nombre: 'American Lager' }]
  return (
    <div className="sidebar">
      <h2>Estilos</h2>
      <hr />
      {estilos.map(estilo => (
        <div key={estilo.id} className="form-check">
          <input className="form-check-input" type="checkbox" value="" onChange={() => handleChange(estilo.nombre, setSelectedEstilos)} />
          <label className="form-check-label">
            {estilo.nombre}
          </label>
        </div>))}
      <h2>Categorías</h2>
      <hr />
      {categorias.map(categoria => (
        <div key={categoria.id} className="form-check">
          <input className="form-check-input" type="checkbox" value="" onChange={() => handleChange(categoria.nombre, setSelectedCategories)} />
          <label className="form-check-label">
            {categoria.nombre}
          </label>
        </div>
      ))}

      <h2 className="pt-5">Graduacion</h2>
      <hr />
      {graduaciones.map(graduacion => (
        <div key={graduacion.id} className="form-check">
          <input className="form-check-input" type="checkbox" value="" onChange={() => handleChange(graduacion.nombre, setSelectedGraduaciones)} />
          <label className="form-check-label">
            {graduacion.nombre}
          </label>
        </div>))}
      <br />
      {/* <button className="btn btn-primary w-100" onClick={submit}> Aplicar filtros</button> */}
    </div>
  );
}