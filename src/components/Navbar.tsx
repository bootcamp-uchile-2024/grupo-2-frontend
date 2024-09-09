import { Link } from "react-router-dom";
import "../layout/layout.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-items">
        <Link className="navbar-brand" to="/">
          CERVEZARIO NACIONAL
        </Link>
        <div className="navbar-menu">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/catalogo">
            Catálogo
          </Link>
          <Link className="nav-link" to="/pedidos">
            Sigue tu pedidos
          </Link>
          <Link className="nav-link" to="/perfil">
            Perfil
          </Link>
          <Link className="nav-link" to="/acerca">
            Quienes somos
          </Link>
          <Link className="nav-link" to="/contacto">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
