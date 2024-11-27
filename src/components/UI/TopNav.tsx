import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../../services/getLogin";

export const TopNav = () => {
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

  return (
    <div className="flex">
      <div>
        {isAdmin() && (
          <Link className="nav-link" to="/admin">
            Administración
          </Link>
        )}
      </div>
      <div className="ms-4">
        <LoginButton isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}
