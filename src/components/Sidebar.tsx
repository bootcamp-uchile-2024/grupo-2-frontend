export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Categorías</h2>
      <hr />
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Clásicas
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Experimentales
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Especiales
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Temporadas
          </label>
      </div>
      <h2 className="pt-5">Tipo</h2>
      <hr />
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Ale
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Lager
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
            Stout
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
          Bock
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value=""/>
          <label className="form-check-label">
          American Lager
          </label>
      </div>
      <br />
      <button className="btn btn-primary w-100"> Aplicar filtros</button>
    </div>
  );
}