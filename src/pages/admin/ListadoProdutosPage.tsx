import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cervezas } from "../../types";
import { CERVEZAS_ENDPOINT, API_URL } from "../../config/api.config";

export const ListadoProductosPage = () => {
  const [productos, setProductos] = useState<Cervezas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Funcion para obtener los productos de la base de datos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          `${CERVEZAS_ENDPOINT}?pagina=${1}&cantproductos`
        );
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
      const response = await fetch(
        `${CERVEZAS_ENDPOINT}/${id}/actualizarestado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: isActive }),
        }
      );
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const updatedProducto = await response.json();
          setProductos((prevProductos) =>
            prevProductos.map((producto) =>
              producto.id === id ? updatedProducto : producto
            )
          );
        } else {
          console.log("La respuesta no es un JSON válido");
        }
      } else {
        const errorText = await response.text();
        console.log("Error al actualizar el estado de la cerveza:", errorText);
      }
    } catch (error) {
      console.log("Error:", error);
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
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">
        Listado de cervezas
      </h1>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((producto) => {
                const {
                  imagen,
                  id,
                  nombre,
                  is_active,
                  descripcion,
                  precio,
                  stock,
                } = producto;
                const path_imagen = imagen
                  ? `${API_URL}${imagen}`.replace("./", "/")
                  : "/assets/no-imagen.png";
                return (
                  <tr key={id} className={is_active ? "" : "bg-slate-200"}>
                    <td className="px-6 py-4">
                      <img src={path_imagen} alt={nombre} className="w-100" />
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/dashboard/editar-producto/${id}`}>
                        {nombre}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{descripcion}</td>
                    <td className="px-6 py-4">{precio}</td>
                    <td className="px-6 py-4">{stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleButtonClick(producto)}
                        className="btn-formulario mr-2"
                      >
                        <i className="fas fa-power-off" />
                        {is_active ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = `/dashboard/editar-producto/${id}`)
                        }
                        className="btn-formulario"
                      >
                        <i className="far fa-edit" /> Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
