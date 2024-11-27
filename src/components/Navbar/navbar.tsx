import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../../services/getLogin";

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

  const links = [
    { to: "/acerca", text: "Quienes somos", className: "nav-link", icon: null },
    { to: "/cervezas", text: "Cervezas", className: "nav-link", icon: null },
    { to: "/", text: "Packs", className: "nav-link", icon: null },
    { to: "/", text: "Club", className: "nav-link", icon: null },
    {
      to: "/",
      text: "Contenido eduvactivo",
      className: "nav-link",
      icon: null,
    },
    { to: "/", text: "Comunidad", className: "nav-link", icon: null },
    {
      to: "/",
      text: "Ofertas y promociones",
      className: "nav-link",
      icon: null,
    },
  ];

  return (
    <div className="flex">
      <div className="flex">
        {links.map((link, index) => {
          const { to, text, className } = link;
          return (
            <div key={index} className="flex me-3">
              <Link className={className} to={to}>
                {text}
              </Link>
            </div>
          );
        })}

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
