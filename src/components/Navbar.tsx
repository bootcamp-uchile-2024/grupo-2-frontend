import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate("/login");
  };

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
          {isLoggedIn ? (
            <a className="nav-link" onClick={handleLogout}>
              Logout
            </a>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;