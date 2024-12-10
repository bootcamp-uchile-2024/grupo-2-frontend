import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cervezas } from "../types";
import { CERVEZAS_ENDPOINT } from "../config/api.config";

export const ListadoProductosPage = () => {
  const [productos, setProductos] = useState<Cervezas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Funcion para obtener los productos de la base de datos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${CERVEZAS_ENDPOINT}?pagina=${1}&cantproductos`);
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductos();
  }, []);

  // Funcion para actualizar el estado de la cerveza en la base de datos (activa o inactiva)
  const updateCervezaStatus = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`${CERVEZAS_ENDPOINT}/${id}/actualizarestado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: isActive }),
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const updatedProducto = await response.json();
          setProductos((prevProductos) =>
            prevProductos.map((producto) =>
              producto.id === id ? updatedProducto : producto
            )
          );
        } else {
          console.log('La respuesta no es un JSON válido');
        }
      } else {
        const errorText = await response.text();
        console.log('Error al actualizar el estado de la cerveza:', errorText);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Funcion para cambiar el estado de la cerveza (activa o inactiva)
  const handleButtonClick = async (producto: Cervezas) => {
    await updateCervezaStatus(producto.id, !producto.is_active);
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === producto.id ? { ...p, is_active: !producto.is_active } : p
      )
    );
  };

  return (
    <div className="w-full p-8">
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">Listado de cervezas</h1>
        <div className="mt-4">
          <Link to="/dashboard/crea-producto" className="btn-formulario">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr key={producto.id} className={producto.is_active ? '' : 'bg-slate-200'}>
                    <td className="px-6 py-4 whitespace-nowrap"><Link to={`/dashboard/editar-producto/${producto.id}`}>{producto.nombre}</Link></td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.descripcion}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.precio}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{producto.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleButtonClick(producto)} className="btn-formulario w-full">
                        {producto.is_active ? 'Desactivar' : 'Activar'}
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
