import "../layout/layout.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-items">
        <a className="navbar-brand" href="#">CERVEZARIO NACIONAL</a>
        <div className="navbar-menu">
          <a className="nav-link" aria-current="page" href="#">Home</a>
          <a className="nav-link" href="#">Quienes somos</a>
          <a className="nav-link" href="#">Catálogo</a>
          <a className="nav-link" href="#">Sigue tu pedidos</a>
          <a className="nav-link" href="#">Perfil</a>
          <a className="nav-link" href="#">Contacto</a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
