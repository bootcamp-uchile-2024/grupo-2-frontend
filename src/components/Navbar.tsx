import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../services/LoginService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);//REFACTOR: Reduje la sintaxis
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };


  /*
  //REFACTOR: Hice una componente funcional
  Componente funcional que muestre login o logout dependiendo del estado de isLoggedIn
  */
  function LoginButton({ isLoggedIn }: { isLoggedIn: boolean }) {
    return isLoggedIn ? (
      <Link className="nav-link" onClick={handleLogout} to="/login">
        Logout
      </Link>
    ) : (
      <Link className="nav-link" to="/login">
        Login
      </Link>
    );
  }
  //REFACTOR: hice una lista que se renderizara con un map
  const links = [
    { to: "/catalogo", text: "Catálogo", className: 'nav-link' },
    { to: "/pedidos", text: "Sigue tu pedidos", className: 'nav-link' },
    { to: "/perfil", text: "Perfil", className: 'nav-link' }]

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <Link className="navbar-brand" to="/">
          CERVEZARIO NACIONAL
        </Link>
        <div className="navbar-menu">
          {links.map((link, index) => {
            const { to, text, className } = link;
            return <Link key={index} className={className} to={to}>{text}</Link>
          })}

          {isAdmin() && <Link className="nav-link" to="/admin">Administración</Link>}{/* //REFACTOR: Se muestra el boton segun sea el rol del usuario */}
          <LoginButton isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
