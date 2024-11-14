import { useState } from "react";
// import { regiones } from "../../services/RegionesComunasService";
import { PRODUCT_ENDPOINT } from '../../config/api.config';
import ICerveza from "../../interfaces/ICerveza";

export const CreaProductoPage = () => {
  const [producto, setProducto] = useState<ICerveza>({
    nombre: '',
    marca: '',
    tipo_cerveza: '',
    stock: 0,
    descripcion: '',
    precio: 0,
    proveedor: {
      nombre: '',
      id_comuna: '',
      contacto: '',
      telefono: '',
      correo_electronico: ''
    },
    amargor: '',
    graduacion: 0,
    formato: '',
    imagen: ''
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
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    producto.stock = parseInt(producto.stock.toString());
    producto.precio = parseInt(producto.stock.toString());

    if (producto.nombre === '') {
      setErrorNombre('Debe ingresar un nombre de cerveza');
      hasError = true;
    } else {
      setErrorNombre(null);
    }

    if (producto.marca === '') {
      setErrorMarca('Debe ingresar una marca de cerveza');
      hasError = true;
    }
    
    if (producto.tipo_cerveza === '') {
      setErrorTipoCerveza('Debe ingresar un tipo de cerveza');
      hasError = true;
    }

    if (producto.stock === 0) {
      setErrorStock('Debe al menos agregar una cerveza');
      hasError = true;
    }

    if (producto.descripcion === '') {
      setErrorDescripcion('Debe ingresar una descripción');
      hasError = true;
    }

    if (producto.precio === 0) {
      setErrorPrecio('Debe ingresar un precio');
      hasError = true;
    }

    if (producto.amargor === '') {
      setErrorAmargor('Debe ingresar un tipo de amargor');
      hasError = true;
    }
    
    if (producto.formato === '') {
      setErrorFormato('Debe ingresar un tipo de amargor');
      hasError = true;
    }

    if (producto.imagen === '') {
      setErrorImagen('Debe ingresar una imagen');
      hasError = true;
    }

    if (producto.proveedor.nombre === '') {
      setErrorProveedor('Debe ingresar el nombre del proveedor');
      hasError = true;
    }

    if (producto.proveedor.contacto === '') {
      setErrorContacto('Debe ingresar el contacto del proveedor');
      hasError = true;
    }

    if (producto.proveedor.telefono === '') {
      setErrorTelefono('Debe ingresar el teléfono del proveedor');
      hasError = true;
    }

    if (producto.proveedor.correo_electronico === '') {
      setErrorCorreoElectronico('Debe ingresar el correo electrónico del proveedor');
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await fetch(PRODUCT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto),
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log('Producto creado:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <form className="mt-5 w-50 m-auto">
      <h1>Ingresar producto</h1>
      <p>A través de este formulario usted podrá crear un producto a nuestro catálogo</p>
      <div className="mb-3">
        <label className="form-label">Nombre de cerveza</label>
        <input className="form-control" name="nombre" type="text" placeholder="Nombre de la cerveza" onChange={handleChange} value={producto.nombre} />
        {errorNombre && <p className="error">{errorNombre}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Marca</label>
        <input className="form-control" name="marca" type="text" placeholder="Marca" onChange={handleChange} value={producto.marca} />
        {errorMarca && <p className="error">{errorMarca}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Cerveza</label>
        <select className="form-select" name="tipo_cerveza" onChange={handleChange} value={producto.tipo_cerveza}>
          <option value="American Pale Ale"> American Pale Ale</option>
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
        {errorTipoCerveza && <p className="error">{errorTipoCerveza}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input className="form-control" name="stock" type="number" placeholder="Stock" min="0" onChange={handleChange} value={producto.stock} />
        {errorStock && <p className="error">{errorStock}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" name="descripcion" rows={4} placeholder="Descripción" onChange={handleChange} value={producto.descripcion} />
        {errorDescripcion && <p className="error">{errorDescripcion}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input className="form-control" name="precio" type="number" placeholder="Graduación" onChange={handleChange} value={producto.precio} />
        {errorPrecio && <p className="error">{errorPrecio}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Amargor</label>
        <select className="form-select" name="amargor" onChange={handleChange} value={producto.amargor}>
            <option value="Alto">Alto</option>
            <option value="Bajo">Bajo</option>
            <option value="Moderado">Moderado</option>
            <option value="Notable">Notable</option>
        </select>
        {errorAmargor && <p className="error">{errorAmargor}</p>}
      </div>
      
      <div className="mb-3">
        <label className="form-label">Formato</label>
        <select className="form-select" name="formato" onChange={handleChange} value={producto.formato}>
          <option value="Barril">Barril</option>
          <option value="Botella">Botella</option>
          <option value="Growler">Growler</option>
          <option value="Lata">Lata</option>
          <option value="SixPack">SixPack</option>
        </select>
        {errorformato && <p className="error">{errorformato}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="imagen">Seleccionar una imagen</label>
        <input className="form-control" name="imagen" type="file" accept="image/jpeg,image/png,image/gif" onChange={handleChange} value={producto.imagen} />
        {errorImagen && <p className="error">{errorImagen}</p>}
      </div>

      <div className="border p-3 rounded bg-body-tertiary mb-3">
        <div className="mb-3">
          <label className="form-label">Proveedor</label>
          <input className="form-control" name="proveedor" type="text" placeholder="Nombre del proveedor" onChange={handleChange} value={producto.proveedor.nombre} />
          {errorProveedor && <p className="error">{errorProveedor}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Contacto</label>
          <input className="form-control" name="contacto" type="text" placeholder="Contacto" onChange={handleChange} value={producto.proveedor.contacto} />
          {errorContacto && <p className="error">{errorContacto}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input className="form-control" name="telefono" type="text" placeholder="Teléfono" onChange={handleChange} value={producto.proveedor.telefono} />
          {errorTelefono && <p className="error">{errorTelefono}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input className="form-control" name="correo_electronico" type="email" placeholder="Correo electrónico" onChange={handleChange} value={producto.proveedor.correo_electronico} />
          {errorCorreoElectronico && <p className="error">{errorCorreoElectronico}</p>}
        </div>

      </div>

      {/*

      <div className="mb-3">
        <label className="form-label" htmlFor="precio">Precio</label>
        <input className="form-control" name="precio" type="number" placeholder="Precio" onChange={handleChange} value={producto.precio} />
        {errorPrecio && <p className="error">{errorPrecio}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="proveedor">Proveedor</label>
        <input className="form-control" name="proveedor" type="text" placeholder="Proveedor" onChange={handleChange} value={producto.proveedor} />
        {errorProveedor && <p className="error">{errorProveedor}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
        <input className="form-control" name="proveedor" type="text" placeholder="Proveedor" onChange={handleChange} value={producto.proveedor} />
        {errorProveedor && <p className="error">{errorProveedor}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label">Región</label>
        <select className="form-control" name="region" value={formValues.region} onChange={handleRegionChange}>
          <option value=""></option>
          {regiones.map(region => (
            <option key={region.NombreRegion} value={region.NombreRegion}>{region.NombreRegion}</option>
          ))}
        </select>
        {errorRegion && <p className="error">{errorRegion}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" >Comuna</label>
        <select className="form-control" name="comuna" value={formValues.comuna} onChange={handleComunaChange}>
          {formValues.region && regiones.find(region => region.NombreRegion === formValues.region)?.comunas.map((comuna, index) => (
            <option key={index} value={comuna}>{comuna}</option>
          ))}
        </select>
        {errorComuna && <p className="error">{errorComuna}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="amargor">Amargor</label>
        <input className="form-control" name="amargor" type="text" placeholder="Amargor" onChange={handleChange} value={formValues.amargor} />
        {errorAmargor && <p className="error">{errorAmargor}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="graduacion">Graduación</label>
        <input className="form-control" name="graduacion" type="text" placeholder="ej. 4,5°" onChange={handleChange} value={formValues.graduacion} />
        {errorGraduacion && <p className="error">{errorGraduacion}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="formato">Formato</label>
        <input className="form-control" name="formato" type="text" placeholder="ej. Lata" onChange={handleChange} value={formValues.formato} />
        {errorFormato && <p className="error">{errorFormato}</p>}
      </div>

      */}
      <button className="btn btn-dark" type="submit" onClick={handleSubmit}>Ingresar producto</button>
    </form>
  );
}