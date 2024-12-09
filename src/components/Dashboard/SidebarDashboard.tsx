import { Link } from "react-router-dom";

export const SidebarDashboard = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-100 text-black top-[60px] bg-opacity-30">
      <div className="p-4">
      <img src="/assets/logo-header.svg" alt="Logo Cervezario" />
      </div>
      <ul className="mt-4">
        <Link to="crea-producto">
          <li className="p-2 hover:bg-yellow cursor-pointer">Cargar cervezas</li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <Link to="lista-producto">
          <li className="p-2 hover:bg-yellow cursor-pointer">Listar cervezas</li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar packs</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar merchandising</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar contenido educativo</li> */}
        <Link to="crea-usuario">
          <li className="p-2 hover:bg-yellow cursor-pointer">Crear usuario</li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <Link to="lista-usuarios">
          <li className="p-2 hover:bg-yellow cursor-pointer">Listar usuarios</li>
        </Link>
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Cargar eventos</li> */}
        {/* <li className="p-2 hover:bg-gray-700 cursor-pointer">Seguimientos de pedidos</li> */}
      </ul>
    </div>
  );
}