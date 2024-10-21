import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../services/LoginService";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";
import { RootType } from "../state/store";

const CarritoButton = () => {
  const carrito = useSelector((state: RootType) => state.carrito);
  const { items } = carrito;
  return (
    <Link className="d-flex nav-link padding" to="/carrito">
      <div className="px-2">
        <i className="bi bi-cart"></i>
      </div>
      <div className="px-2">Carrito</div>
      <div className="px-1 bg-dark-subtle text-black rounded">
        {items.length}
      </div>
    </Link>
  );
};
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    //REFACTOR: la sintaxis !!user convierte user en un valor booleano (true o false).
    setIsLoggedIn(!!user); //REFACTOR: Reduje la sintaxis
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
    { to: "/catalogo", text: "Catálogo", className: "nav-link", icon: null },
    {
      to: "/pedidos",
      text: "Sigue tu pedidos",
      className: "nav-link",
      icon: null,
    },
    { to: "/perfil", text: "Perfil", className: "nav-link", icon: null },
  ];

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
          return (
            <div key={index} className="d-flex me-3">
              <Link className={className} to={to}>
                {text}
              </Link>
            </div>
          );
        })}

        <CarritoButton />

        <div className="me-3">
          {isAdmin() && (
            <Link className="nav-link" to="/admin">
              Administración
            </Link>
          )}
        </div>
        <div>
          <LoginButton isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
