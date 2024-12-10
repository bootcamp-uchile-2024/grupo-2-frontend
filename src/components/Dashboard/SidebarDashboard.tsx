import { Link } from "react-router-dom";

export const SidebarDashboard = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-100 text-black top-[60px] bg-opacity-30">
      <div className="p-4">
      <img src="/assets/logo-header.svg" alt="Logo Cervezario" />
      </div>
      <ul className="mt-4">
        <Link to="crea-producto">
            <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex opacity-75"><img src="/assets/icon-cerveza.png" className="mr-2"/> <span>Cargar cervezas</span></li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <Link to="lista-producto">
          <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-cerveza.png" className="mr-2" /><span>Listar cervezas</span></li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-packs.png" className="mr-2" /><span>Stock packs</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-merch.png" className="mr-2" /><span>Stock merch</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-cargar-packs.png" className="mr-2" /><span>Cargar merchandising</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-educacional.png" className="mr-2" /><span>Cargar contenido educ.</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-eventos.png" className="mr-2" /><span>Cargar eventos</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-seguimientos.png" className="mr-2" /><span>Seguimiento de pedidos</span></li>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <Link to="crea-usuario">
          <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-usuarios.png" className="mr-2"/><span>Crear usuario</span></li>
        </Link>
        <hr className="border-t-2 border-yellow-500 my-2" />
        <Link to="lista-usuarios">
          <li className="p-2 hover:bg-yellow hover:bg-opacity-40 cursor-pointer flex"><img src="/assets/icon-usuarios.png" className="mr-2"/><span>Listar usuarios</span></li>
        </Link>
      </ul>
    </div>
  );
}