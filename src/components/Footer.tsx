import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-body-tertiary border-top ">
      <div className="container-footer">
        {/* //REFACTOR: Agregue estos botones al footer */}
        <div>
          <h2>Contacto</h2>
          <Link to='/contacto'>Contactanos</Link>
        </div>
        <div >
          <h2>Acerca</h2>
          <Link to='/acerca'>Quienes somos</Link>
        </div>
      </div>
      <div className="container">
        <span className="text-body-secondary">©Todos los derechos reservados Cervezario Nacional 2024</span>
      </div>
    </footer>
  );
}
export default Footer;
