import { API_URL } from "@/config/api.config";
import { useState, ChangeEvent } from "react";

export const AdminUploadImage = () => {
  // Estado para mostrar la imagen de fondo en el componente
  const [imageSrc, setImageSrc] = useState("/assets/pattern.png");
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const selectedFile = null;
  const id = "123";

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const getImageEndpoint = (id: string) => `${API_URL}/${id}/cargarimagen`;

  const uploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("imagen", selectedFile);

    try {
      const response = await fetch(
        getImageEndpoint(`${API_URL}/${id}/cargarimagen`),
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar la imagen");
      }

      const data = await response.json();
      console.log("Imagen cargada exitosamente:", data);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="imagen">
        Seleccionar una imagen
      </label>
      <img src={imageSrc} alt="Uploaded" className="w-full" />
      <div className="relative">
        <input
          className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 opacity-0 absolute inset-0 z-50"
          name="imagen"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          onClick={uploadImage}
        >
          <i className="far fa-images"></i> Seleccionar imagen
        </button>
      </div>
    </div>
  );
};
