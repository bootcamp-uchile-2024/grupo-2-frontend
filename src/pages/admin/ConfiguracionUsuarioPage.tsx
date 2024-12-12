import { useNavigate } from "react-router-dom"

export const ConfiguracionUsuarioPage = () => {
  const navigate = useNavigate();
    return (
      <div className="w-full p-8">
        imagen
        <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">
          Hola Usuario
        </h1>
        <div className="mt-4">
          <i className="far fa-user-circle"></i> Mi Perfil
        </div>
        <div className="mt-4">
          <i className="fas fa-sliders-h"></i> Configuración
        </div>
        <div className="mt-4">
          <i className="fas fa-chart-line"></i> Historial de actividades
        </div>
        <div className="mt-4">
          <i className="far fa-question-circle"></i> Ayuda
        </div>
        <div className="mt-8">
          <h2 className="mb-4 font-lato  text-purple-100 text-2xl font-normal">Configuración de perfiles</h2>
        </div>
        <div className="mt-4">
          <button onClick={() => navigate('/dashboard/crea-usuario')}>
            <i className="fas fa-user-plus"></i> Crear usuario
          </button>
        </div>
        <div className="mt-4">
          <button onClick={() => navigate('/dashboard/lista-usuarios')}>
            <i className="far fa-list-alt"></i> Listar usuarios
          </button>
        </div>
      </div>
    )
}