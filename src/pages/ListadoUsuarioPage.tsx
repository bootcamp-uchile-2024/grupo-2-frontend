import { useEffect, useState } from 'react';
import { Usuario } from "../types";
import { Link } from 'react-router-dom';

export const ListadoUsuarioPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4500/usuarios')
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
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full p-8">
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">Listado de cervezas</h1>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map(usuario => (
              <tr key={usuario.rut}>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.rut}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.birthday}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="btn-formulario-outline">
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