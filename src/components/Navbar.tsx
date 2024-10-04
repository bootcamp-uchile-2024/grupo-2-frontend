import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../services/LoginService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    //REFACTOR: la sintaxis !!user convierte user en un valor booleano (true o false).
    setIsLoggedIn(!!user);//REFACTOR: Reduje la sintaxis
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
  
  //REFACTOR: Uso de bootstrap para centrar los elementos y darle un mejor aspecto
  return (
    <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link className="navbar-brand" to="/">
            CERVEZARIO NACIONAL
          </Link>
        </div>
        <div className="d-flex">
          {links.map((link, index) => {
            const { to, text, className } = link;
            //REFACTOR: Se mueve el key a la etiqueta padre y evitar el warning de consola: Navbar.tsx:52 Warning: Each child in a list should have a unique "key" prop.
            return <div key={index} className="me-3"><Link className={className} to={to}>{text}</Link></div>
          })}
        <div className="me-3">{isAdmin() && <Link className="nav-link" to="/admin">Administración</Link>}</div>
          <div><LoginButton isLoggedIn={isLoggedIn} /></div>
        </div>
    </div>
  );
};

export default Navbar;