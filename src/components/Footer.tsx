import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-body-tertiary border-top ">
      <div className="container">
        {/* //REFACTOR: Agregue estos botones al footer */}
        {/* //REFACTOR: Se agregan clases de Bootstrap */}
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <span className="text-body-secondary">©Todos los derechos reservados Cervezario Nacional 2024</span>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end">
                <div>
                  <Link to='/contacto'>Contactanos</Link>
                </div>
                <div className="ms-3">
                  <Link to='/acerca'>Quienes somos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
