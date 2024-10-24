import { useEffect, useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


export const DashboardPage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsUserLoggedIn(true);
    }
  }, [navigate]);

  if (!isUserLoggedIn) {
    return null; // O un spinner de carga si prefieres
  }

  return (
    <MainLayout>
      <div className="contenido">
        <h1>Administración de productos y usuarios</h1>
        <p>En esta sección se administran los usuarios y el productos de la aplicación.</p>
        <div className="wrapper-botones">
          <Link to="crea-usuario">
            <button className={`btn ${pathname == '/admin/crea-usuario' ? "btn-selected" : null}`}>Administrar Usuarios</button>
          </Link>
          <Link to="crea-producto">
            <button className={`btn ${pathname == '/admin/crea-producto' ? "btn-selected" : null}`}>Administrar Productos</button>
          </Link>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
