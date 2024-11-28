import { useState } from "react";
// import { regiones } from "../../services/RegionesComunasService";
import { CERVEZAS_ENDPOINT } from "../config/api.config";
import { CervezaInterface } from "../types";

export const CreaProductoPage = () => {
  const [producto, setProducto] = useState<CervezaInterface>({
    id: 0,
    nombre: "",
    marca: "",
    tipo_cerveza: {
      id: 0,
      nombre: "",
      descripcion: "",
      categoria: "",
      color: "",
    },
    stock: 0,
    descripcion: "",
    precio: 0,
    proveedor: {
      nombre: "",
      id_comuna: "",
      contacto: "",
      telefono: "",
      correo_electronico: "",
    },
    amargor: "",
    graduacion: 0,
    formato: { id: "", descripcion: "" },
    imagen: "",
  });

  // Estados para manejar los errores
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorMarca, setErrorMarca] = useState<string | null>(null);
  const [errorTipoCerveza, setErrorTipoCerveza] = useState<string | null>(null);
  const [errorStock, setErrorStock] = useState<string | null>(null);
  const [errorDescripcion, setErrorDescripcion] = useState<string | null>(null);
  const [errorPrecio, setErrorPrecio] = useState<string | null>(null);
  const [errorAmargor, setErrorAmargor] = useState<string | null>(null);
  const [errorformato, setErrorFormato] = useState<string | null>(null);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);

  const [errorProveedor, setErrorProveedor] = useState<string | null>(null);
  const [errorContacto, setErrorContacto] = useState<string | null>(null);
  const [errorTelefono, setErrorTelefono] = useState<string | null>(null);
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState<
    string | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
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

    if (producto.tipo_cerveza?.id === 0) {
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

    if (producto.formato.id === "") {
      setErrorFormato("Debe ingresar un tipo de amargor");
      hasError = true;
    }

    if (producto.imagen === "") {
      setErrorImagen("Debe ingresar una imagen");
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
      setErrorCorreoElectronico(
        "Debe ingresar el correo electrónico del proveedor"
      );
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
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form className="mt-5 w-3/2 mx-auto p-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Ingresar producto</h1>
      <p className="mb-6 text-gray-600">
        A través de este formulario usted podrá crear un producto a nuestro
        catálogo
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Nombre de cerveza
        </label>
        <input
          className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="nombre"
          type="text"
          placeholder="Nombre de la cerveza"
          onChange={handleChange}
          value={producto.nombre}
        />
        {errorNombre && (
          <p className="text-red-500 text-sm mt-1">{errorNombre}</p>
        )}
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
        {errorMarca && (
          <p className="text-red-500 text-sm mt-1">{errorMarca}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Tipo de Cerveza
        </label>
        <select
          className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="tipo_cerveza"
          onChange={handleChange}
          value={producto.tipo_cerveza.id}
        >
          <option value="American Pale Ale">American Pale Ale</option>
          <option value="India Pale Ale">India Pale Ale</option>
          <option value="Amber Ale">Amber Ale</option>
          <option value="Brown Ale">Brown Ale</option>
          <option value="Porter">Porter</option>
          <option value="Stout">Stout</option>
          <option value="Dry Stout">Dry Stout</option>
          <option value="Imperial Stout">Imperial Stout</option>
          <option value="Pilsner">Pilsner</option>
          <option value="Amber Lager">Amber Lager</option>
          <option value="Dark Lager">Dark Lager</option>
          <option value="Bock">Bock</option>
          <option value="Hefeweizen">Hefeweizen</option>
          <option value="Witbier">Witbier</option>
          <option value="Berliner Weisse">Berliner Weisse</option>
          <option value="Lambic">Lambic</option>
          <option value="Gueuze">Gueuze</option>
          <option value="Kriek">Kriek</option>
          <option value="Saison">Saison</option>
          <option value="Pumpkin Ale">Pumpkin Ale</option>
          <option value="Christmas Ale">Christmas Ale</option>
          <option value="Gose">Gose</option>
          <option value="Flanders Red Ale">Flanders Red Ale</option>
          <option value="Barleywine">Barleywine</option>
          <option value="Rye Beer">Rye Beer</option>
        </select>
        {errorTipoCerveza && (
          <p className="text-red-500 text-sm mt-1">{errorTipoCerveza}</p>
        )}
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
        {errorStock && (
          <p className="text-red-500 text-sm mt-1">{errorStock}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Descripción
        </label>
        <textarea
          className="form-textarea mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="descripcion"
          rows={4}
          placeholder="Descripción"
          onChange={handleChange}
          value={producto.descripcion}
        />
        {errorDescripcion && (
          <p className="text-red-500 text-sm mt-1">{errorDescripcion}</p>
        )}
      </div>

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
        {errorPrecio && (
          <p className="text-red-500 text-sm mt-1">{errorPrecio}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amargor</label>
        <select
          className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="amargor"
          onChange={handleChange}
          value={producto.amargor}
        >
          <option value="Alto">Alto</option>
          <option value="Bajo">Bajo</option>
          <option value="Moderado">Moderado</option>
          <option value="Notable">Notable</option>
        </select>
        {errorAmargor && (
          <p className="text-red-500 text-sm mt-1">{errorAmargor}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Formato</label>
        <select
          className="form-select mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="formato"
          onChange={handleChange}
          value={producto.formato.id}
        >
          <option value="Barril">Barril</option>
          <option value="Botella">Botella</option>
          <option value="Growler">Growler</option>
          <option value="Lata">Lata</option>
          <option value="SixPack">SixPack</option>
        </select>
        {errorformato && (
          <p className="text-red-500 text-sm mt-1">{errorformato}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="imagen">
          Seleccionar una imagen
        </label>
        <input
          className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          name="imagen"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleChange}
        />
        {errorImagen && (
          <p className="text-red-500 text-sm mt-1">{errorImagen}</p>
        )}
      </div>

      <div className="border p-4 rounded-lg bg-gray-100 mb-4">
        <h2 className="text-xl font-bold mb-4">Proveedor</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="proveedor"
            type="text"
            placeholder="Nombre del proveedor"
            onChange={handleChange}
            value={producto.proveedor?.nombre}
          />
          {errorProveedor && (
            <p className="text-red-500 text-sm mt-1">{errorProveedor}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Contacto</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="contacto"
            type="text"
            placeholder="Contacto"
            onChange={handleChange}
            value={producto.proveedor?.contacto}
          />
          {errorContacto && (
            <p className="text-red-500 text-sm mt-1">{errorContacto}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="telefono"
            type="text"
            placeholder="Teléfono"
            onChange={handleChange}
            value={producto.proveedor?.telefono}
          />
          {errorTelefono && (
            <p className="text-red-500 text-sm mt-1">{errorTelefono}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Correo electrónico
          </label>
          <input
            className="form-input mt-1 block w-full border p-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="correo_electronico"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={producto.proveedor?.correo_electronico}
          />
          {errorCorreoElectronico && (
            <p className="text-red-500 text-sm mt-1">
              {errorCorreoElectronico}
            </p>
          )}
        </div>
      </div>

      <button
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        type="submit"
      >
        Ingresar producto
      </button>
    </form>
  );
};
