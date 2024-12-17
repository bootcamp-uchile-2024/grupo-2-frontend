import { ChangeEvent, useEffect, useState} from "react";
import { CERVEZAS_ENDPOINT, AMARGOR_ENDPOINT, TIPO_ENDPOINT } from "../../config/api.config";
import { Amargor, Tipo} from "../../types";
import { toast } from "react-toastify";

export interface Cerveza {
  id: number;
  nombre: string;
  marca: string;
  tipo_cerveza: string;
  stock: number;
  descripcion: string;
  precio: number;
  proveedor: Proveedor;
  amargor: string;
  graduacion: number;
  formato: string;
  imagen: File | null;
  is_active: boolean;
}

export interface Proveedor {
  nombre: string;
  contacto: string;
  telefono: string;
  correo_electronico: string;
}


export const CreaProductoPage = () => {
  const [producto, setProducto] = useState<Cerveza>({
    id: 0,
    nombre: "",
    marca: "",
    tipo_cerveza: "",
    stock: 0,
    descripcion: "",
    precio: 0,
    proveedor: {
      nombre: "",
      contacto: "",
      telefono: "",
      correo_electronico: "",
    },
    amargor: "",
    graduacion: 0,
    formato: "",
    imagen: null,
    is_active: true,
  });

  // Estados para manejar errores de cervezas
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorMarca, setErrorMarca] = useState<string | null>(null);
  const [errorTipoCerveza, setErrorTipoCerveza] = useState<string | null>(null);
  const [errorStock, setErrorStock] = useState<string | null>(null);
  const [errorDescripcion, setErrorDescripcion] = useState<string | null>(null);
  const [errorPrecio, setErrorPrecio] = useState<string | null>(null);
  const [errorAmargor, setErrorAmargor] = useState<string | null>(null);
  const [errorformato, setErrorFormato] = useState<string | null>(null);

  // Estados para manejar errores de proveedores
  const [errorProveedor, setErrorProveedor] = useState<string | null>(null);
  const [errorContacto, setErrorContacto] = useState<string | null>(null);
  const [errorTelefono, setErrorTelefono] = useState<string | null>(null);
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("proveedor_")) {
      const proveedorField = name.replace("proveedor_", "");
      setProducto({ ...producto, proveedor: { ...producto.proveedor, [proveedorField]: value } });
    } else {
      setProducto({ ...producto, [name]: value });
    }

    // Limpiar el error correspondiente cuando el usuario escribe en el campo
    switch (name) {
      case "nombre":
        setErrorNombre(null);
        break;
      case "marca":
        setErrorMarca(null);
        break;
      case "tipo_cerveza":
        setErrorTipoCerveza(null);
        break;
      case "stock":
        setErrorStock(null);
        break;
      case "descripcion":
        setErrorDescripcion(null);
        break;
      case "precio":
        setErrorPrecio(null);
        break;
      case "amargor":
        setErrorAmargor(null);
        break;
      case "formato":
        setErrorFormato(null);
        break;
      case "proveedor_nombre":
        setErrorProveedor(null);
        break;
      case "proveedor_contacto":
        setErrorContacto(null);
        break;
      case "proveedor_telefono":
        setErrorTelefono(null);
        break;
      case "proveedor_correo_electronico":
        setErrorCorreoElectronico(null);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    producto.stock = parseInt(producto.stock.toString());
    producto.precio = parseInt(producto.stock.toString());

    if (producto.nombre === "") {
      setErrorNombre("Debe ingresar un nombre de cerveza");
      hasError = true;
    } else {
      setErrorNombre(null);
    }

    if (producto.marca === "") {
      setErrorMarca("Debe ingresar una marca de cerveza");
      hasError = true;
    }

    if (producto.tipo_cerveza === "") {
      setErrorTipoCerveza("Debe ingresar un tipo de cerveza");
      hasError = true;
    }

    if (producto.stock === 0) {
      setErrorStock("Debe al menos agregar una cerveza");
      hasError = true;
    }

    if (producto.descripcion === "") {
      setErrorDescripcion("Debe ingresar una descripción");
      hasError = true;
    }

    if (producto.precio === 0) {
      setErrorPrecio("Debe ingresar un precio");
      hasError = true;
    }

    if (producto.amargor === "") {
      setErrorAmargor("Debe ingresar un tipo de amargor");
      hasError = true;
    }

    if (producto.formato === "") {
      setErrorFormato("Debe ingresar un tipo de amargor");
      hasError = true;
    }

    if (producto.proveedor?.nombre === "") {
      setErrorProveedor("Debe ingresar el nombre del proveedor");
      hasError = true;
    }

    if (producto.proveedor?.contacto === "") {
      setErrorContacto("Debe ingresar el contacto del proveedor");
      hasError = true;
    }

    if (producto.proveedor?.telefono === "") {
      setErrorTelefono("Debe ingresar el teléfono del proveedor");
      hasError = true;
    }

    if (producto.proveedor?.correo_electronico === "") {
      setErrorCorreoElectronico("Debe ingresar el correo electrónico del proveedor");
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await fetch(CERVEZAS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        console.log("Producto creado:", data);
        uploadImage(data.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [tiposCerveza, setTiposCerveza] = useState<Tipo[]>([]);
  const [nivelesAmargor, setNivelesAmargor] = useState<Amargor[]>([]);
  
  useEffect(() => {
    const fetchNivelesAmargor = async () => {
      try {
        const response = await fetch(AMARGOR_ENDPOINT);
        const data = await response.json();
        setNivelesAmargor(data);
      } catch (error) {
        console.error('Error al traer niveles de amargor:', error);
      }
    };
    fetchNivelesAmargor();
  }, []);
  
  useEffect(() => {
    const fetchTipoCerveza = async () => {
      try {
        const response = await fetch(TIPO_ENDPOINT);
        const data = await response.json();
        setTiposCerveza(data);
      } catch (error) {
        console.error('Error al traer tipos de cerveza:', error);
      }
    };
    fetchTipoCerveza();
  }, []);

  const [imageSrc, setImageSrc] = useState("/assets/pattern.png");

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

    const getImageEndpoint = (id: string) => `${CERVEZAS_ENDPOINT}/${id}/cargarimagen`;

    const uploadImage = async (id:string) => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("imagen", selectedFile);

        try {
          const response = await fetch(getImageEndpoint(`${id}`),
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Error al cargar la imagen");
          }

          const data = await response.text();
          console.log("Imagen cargada:", data);
          toast.success("Producto creado con éxito");
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
        }
    };

  return (
    <form className="w-full p-8" onSubmit={handleSubmit}>
      <h1 className="mb-4 font-lato  text-purple-100 text-custom-lg font-normal">Cargar cervezas</h1>
      <p className="mb-6 text-purple-100 text-custom-2xl">
        Información a mostrar
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="imagen">
              Seleccionar una imagen
            </label>
            <img src={imageSrc} alt="Uploaded" className="w-full"/>
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
              >
                <i className="far fa-images"></i> Seleccionar imagen
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nombre de cerveza</label>
            <input
                className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="nombre"
                type="text"
                placeholder="Nombre de la cerveza"
                onChange={handleChange}
                value={producto.nombre}
            />
            {errorNombre && (<p className="text-red-500 text-sm mt-1">{errorNombre}</p>)}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Marca</label>
            <input
                className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="marca"
                type="text"
                placeholder="Marca"
                onChange={handleChange}
                value={producto.marca}
            />
            {errorMarca && (<p className="text-red-500 text-sm mt-1">{errorMarca}</p>)}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Tipo de Cerveza
            </label>
            <select
              className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              name="tipo_cerveza"
              onChange={handleChange}
              value={producto.tipo_cerveza}
            >
              {tiposCerveza.map((tipo) => (
                <option key={tipo.id} value={tipo.nombre}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {errorTipoCerveza && (<p className="text-red-500 text-sm mt-1">{errorTipoCerveza}</p>)}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Precio</label>
              <input
                className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="precio"
                type="number"
                placeholder="Precio"
                onChange={handleChange}
                value={producto.precio}
              />
              {errorPrecio && (<p className="text-red-500 text-sm mt-1">{errorPrecio}</p>)}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Amargor</label>
              <select
                className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="amargor"
                onChange={handleChange}
                value={producto.amargor}
              >
                <option value="">Selecciona el nivel de amargor</option>
                {nivelesAmargor.map((nivel) => (
                  <option key={nivel.id} value={nivel.nivel}>
                    {nivel.nivel}
                  </option>
                ))}
              </select>
              {errorAmargor && (<p className="text-red-500 text-sm mt-1">{errorAmargor}</p>)}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Formato</label>
              <select
                className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="formato"
                onChange={handleChange}
                value={producto.formato}
              >
                <option value="Barril">Barril</option>
                <option value="Botella">Botella</option>
                <option value="Growler">Growler</option>
                <option value="Lata">Lata</option>
                <option value="SixPack">SixPack</option>
              </select>
              {errorformato && (<p className="text-red-500 text-sm mt-1">{errorformato}</p>)}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Stock</label>
              <input
                className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                name="stock"
                type="number"
                placeholder="Stock"
                min="0"
                onChange={handleChange}
                value={producto.stock}
              />
              {errorStock && (<p className="text-red-500 text-sm mt-1">{errorStock}</p>)}
            </div>
          </div>

        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Descripción</label>
        <textarea
          className="form-textarea mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="descripcion"
          rows={4}
          placeholder="Descripción"
          onChange={handleChange}
          value={producto.descripcion}
        />
        {errorDescripcion && (<p className="text-red-500 text-sm mt-1">{errorDescripcion}</p>)}
      </div>

      <h2 className="mb-4 font-lato text-purple-100 text-custom-2xl font-normal">Proveedor</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="proveedor_nombre"
            type="text"
            placeholder="Nombre del proveedor"
            onChange={handleChange}
            value={producto.proveedor?.nombre}
          />
          {errorProveedor && (<p className="text-red-500 text-sm mt-1">{errorProveedor}</p>)}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Contacto</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="proveedor_contacto"
            type="text"
            placeholder="Contacto"
            onChange={handleChange}
            value={producto.proveedor?.contacto}
          />
          {errorContacto && (<p className="text-red-500 text-sm mt-1">{errorContacto}</p>)}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="proveedor_telefono"
            type="text"
            placeholder="Teléfono"
            onChange={handleChange}
            value={producto.proveedor?.telefono}
          />
          {errorTelefono && (<p className="text-red-500 text-sm mt-1">{errorTelefono}</p>)}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Correo electrónico</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="proveedor_correo_electronico"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={producto.proveedor?.correo_electronico}
          />
          {errorCorreoElectronico && (<p className="text-red-500 text-sm mt-1">{errorCorreoElectronico}</p>)}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn-formulario mr-4" type="submit"><i className="far fa-save"></i> Guardar producto</button>
        {/* <button
      className="btn-formulario"
      type="submit">
      Publicar producto
      </button> */}
      </div>
    </form>
  );
};
