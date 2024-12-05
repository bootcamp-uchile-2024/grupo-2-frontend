import { useEffect, useState } from 'react';
import { Usuario } from "../types";
import { Link } from 'react-router-dom';
import { USERS_ENDPOINT } from '@/config/api.config';
 
export const ListadoUsuarioPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch (USERS_ENDPOINT)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleEliminar = async (rut: string) => {
    try {
      const response = await fetch(`${USERS_ENDPOINT}${rut}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error eliminando el usuario');
      }
      alert('Usuario eliminado exitosamente');
      // Aquí puedes agregar lógica para actualizar la lista de usuarios después de la eliminación
      setUsuarios(usuarios.filter(usuario => usuario.rut !== rut));
    } catch (error) {
      console.error('Error eliminando el usuario:', error);
      alert('Hubo un error al eliminar el usuario');
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">Listado de Usuarios</h1>
      <div className="mt-4">
        <Link to="/admin/crea-usuario" className="btn-formulario">
          Ingresar usuario producto
        </Link>
      </div>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map(usuario => (
              <tr key={usuario.rut}>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.rut}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.correo_comprador}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.telefono_comprador}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="btn-formulario-outline"
                    onClick={() => handleEliminar(usuario.rut)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};