import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CervezaInterface } from "../types";

export const ListadoProductosPage = () => {
  const [productos, setProductos] = useState<CervezaInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:4500/cervezas");
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4500/cervezas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error eliminando el producto');
      }

      // Redirigir o actualizar la lista de productos después de eliminar
      navigate('/productos');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">Listado de cervezas</h1>
        <div className="mt-4">
          <Link to="/admin/crea-producto" className="btn-formulario">
            Crear producto
          </Link>
        </div>
        <div className="mt-4">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.precio}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      
                      <button className="btn-formulario-outline" onClick={() => handleDelete(producto.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
  );
}