import { Link } from "react-router-dom";

export const SidebarDashboard = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-100 text-black top-[60px]">
      <div className="p-4">
        <img src="/assets/logo-header.svg" alt="Logo Cervezario" />
      </div>
      <ul className="mt-4">
        <Link to="crea-producto">
          <li className="p-2 hover:bg-gray-700 hover:text-white cursor-pointer">Cargar cervezas</li>
        </Link>
        <Link to="lista-producto">
          <li className="p-2 hover:bg-gray-700 hover:text-white cursor-pointer">Listado de cervezas</li>
        </Link>
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar packs</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar merchandising</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar contenido educativo</li> */}
        <Link to="crea-usuario">
          <li className="p-2 hover:bg-gray-700 hover:text-white cursor-pointer">Actualizar comunidad</li>
        </Link>
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar eventos</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Seguimientos de pedidos</li> */}
      </ul>
    </div>
  );
}