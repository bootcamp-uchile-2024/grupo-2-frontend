import { CERVEZAS_ENDPOINT } from "@/config/api.config";
import { useFetch } from "@/hooks/useFetch";
import { CervezaInterface } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EditarCervezaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<CervezaInterface>(
    `${CERVEZAS_ENDPOINT}/${id}`
  );
  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>Error...</h1>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action_url = data?.imagen ? "actualizarimagen" : "cargarimagen";
    const body = new FormData(e.target as HTMLFormElement);
    const response = await fetch(`${CERVEZAS_ENDPOINT}/${id}/${action_url}`, {
      method: "POST",
      body,
    });
    if (response.ok) {
      toast.success("Imagen cargada correctamente");
      navigate("/dashboard/lista-producto");
    } else {
      console;
      toast.error("Error al cargar la imagen");
    }
  };
  const path_imagen = `/${data?.imagen}`;
  
  return (
    <div className="w-full p-8">
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">
        Editar Cerveza {id}
      </h1>
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
            <img src={path_imagen} alt={path_imagen} className="w-full border-2 border-gray-300"/>
            </div>
          <div className="col-span-3">
            <form className="w-full p-8" onSubmit={handleSubmit}>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="imagen"
              >
                Seleccionar una imagen
              </label>
              <input
                className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="imagen"
                type="file"
                accept="image/jpeg,image/png,image/gif"
              />
              <button type="submit" className="btn-formulario mt-4">
                <i className="far fa-edit"></i> Editar cerveza
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
