import { useEffect, useState } from "react";
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
    return null; 
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Administración de productos y usuarios</h1>
          <p className="text-center text-gray-600 mb-8">En esta sección se administran los usuarios y el productos de la aplicación.</p>
          <div className="flex justify-center space-x-4 mb-8">
            <Link to="crea-usuario">
              <button className={`px-4 py-2 font-bold text-white rounded-md ${pathname === "/admin/crea-usuario" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                Administrar Usuarios
              </button>
            </Link>
            <Link to="crea-producto">
              <button className={`px-4 py-2 font-bold text-white rounded-md ${pathname === "/admin/crea-producto" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                Administrar Productos
              </button>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
