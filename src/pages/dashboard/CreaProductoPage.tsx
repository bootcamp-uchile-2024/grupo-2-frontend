import { useState } from "react";
import { regiones } from "../../services/RegionesComunasService";

// Interfaces
interface INewProduct {
  nombre: string
  marca: string
  categoria: string // IPA, ALE, etc
  stock: number // catidad disponible
  descripcion: string
  precio: number
  proveedor: string //visible sólo para usuario administrador
  region: string // para venta por sector.
  comuna: string;
  amargor: string;
  graduacion: string;
  formato: string;
  imagen: string;
}

// Función para validar los inputs
function validarCampo(nombre: string): boolean {
  return nombre === '' || nombre.length > 100;
}

// Validar los selects
function validarSelect(valor: string): boolean {
  return valor === '';
}

export const CreaProductoPage = () => {
  const [formValues, setFormValues] = useState<INewProduct>({
    nombre: '',
    marca: '',
    categoria: '',
    stock: 0,
    descripcion: '',
    precio: 0,
    proveedor: '',
    region: '',
    comuna: '',
    amargor: '',
    graduacion: '',
    formato: '',
    imagen: ''
  });

  // Estados para manejar los errores
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorMarca, setErrorMarca] = useState<string | null>(null);
  const [errorCategoria, setErrorCategoria] = useState<string | null>(null);
  const [errorStock, setErrorStock] = useState<string | null>(null);
  const [errorDescripcion, setErrorDescripcion] = useState<string | null>(null);
  const [errorPrecio, setErrorPrecio] = useState<string | null>(null);
  const [errorProveedor, setErrorProveedor] = useState<string | null>(null);
  const [errorRegion, setErrorRegion] = useState<string | null>(null);
  const [errorComuna, setErrorComuna] = useState<string | null>(null);
  const [errorAmargor, setErrorAmargor] = useState<string | null>(null);
  const [errorGraduacion, setErrorGraduacion] = useState<string | null>(null);
  const [errorFormato, setErrorFormato] = useState<string | null>(null);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    const selectedRegionData = regiones.find(region => region.NombreRegion === selectedRegion);
    const comunas = selectedRegionData ? selectedRegionData.comunas : [];
    setFormValues(prevValues => ({
      ...prevValues,
      region: selectedRegion,
      comuna: comunas[0] || ''
    }));
    setErrorRegion(null);
    setErrorComuna(null);
  };

  const handleComunaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedComuna = event.target.value;
    setFormValues(prevValues => ({
      ...prevValues,
      comuna: selectedComuna
    }));
    setErrorComuna(null);
  };

  // Función para manejar los cambios en los inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const newFormValues = {
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
      [name]: type === "radio" ? value : value
    };

    setFormValues(newFormValues);

    if (name === "nombre") setErrorNombre(null);
    if (name === "marca") setErrorMarca(null);
    if (name === "categoria") setErrorCategoria(null);
    if (name === "stock") setErrorStock(null);
    if (name === "descripcion") setErrorDescripcion(null);
    if (name === "precio") setErrorPrecio(null);
    if (name === "proveedor") setErrorProveedor(null);
    if (name === "region") setErrorRegion(null);
    if (name === "comuna") setErrorComuna(null);
    if (name === "amargor") setErrorAmargor(null);
    if (name === "graduacion") setErrorGraduacion(null);
    if (name === "formato") setErrorFormato(null);
    if (name === "imagen") setErrorImagen(null);
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    let hasError = false;

    if (validarCampo(formValues.nombre)) {
      setErrorNombre('El nombre no debe estar vacío');
      hasError = true;
    }

    if (validarCampo(formValues.marca)) {
      setErrorMarca('La marca no debe estar vacía');
      hasError = true;
    }

    if (validarCampo(formValues.categoria)) {
      setErrorCategoria('La categoría no debe estar vacía');
      hasError = true;
    }

    if (validarCampo(formValues.descripcion)) {
      setErrorDescripcion('La descripción no debe estar vacía');
      hasError = true;
    }

    if (validarCampo(formValues.proveedor)) {
      setErrorProveedor('El proveedor no debe estar vacío');
      hasError = true;
    }

    if (validarSelect(formValues.region)) {
      setErrorRegion('Debe seleccionar una región');
      hasError = true;
    }

    if (validarSelect(formValues.comuna)) {
      setErrorComuna('Debe seleccionar una comuna');
      hasError = true;
    }

    if (validarCampo(formValues.amargor)) {
      setErrorAmargor('El amargor no debe estar vacío');
      hasError = true;
    }

    if (validarCampo(formValues.graduacion)) {
      setErrorGraduacion('La graduación no debe estar vacía');
      hasError = true;
    }

    if (validarCampo(formValues.formato)) {
      setErrorFormato('El formato no debe estar vacío');
      hasError = true;
    }

    if (validarCampo(formValues.imagen)) {
      setErrorImagen('La imagen no debe estar vacía');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Se imprimen los valores del formulario en la consola
    console.log('El formulario está correcto');
    console.log(JSON.stringify(formValues, null, 2));
    setFormValues({
      nombre: '',
      marca: '',
      categoria: '',
      stock: 0,
      descripcion: '',
      precio: 0,
      proveedor: '',
      region: '',
      comuna: '',
      amargor: '',
      graduacion: '',
      formato: '',
      imagen: ''
    });
  };

  return (
    <form className="mt-5 w-50 m-auto">
      <h1>Ingresar producto</h1>
      <p>A través de este formulario usted podrá crear un producto a nuestro catálogo</p>
      <div className="mb-3">
        <label className="form-label" htmlFor="username">Nombre de cerveza</label>
        <input className="form-control" name="nombre" type="text" placeholder="Nombre de la cerveza" onChange={handleChange} value={formValues.nombre} />
        {errorNombre && <p className="error">{errorNombre}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="marca">Marca</label>
        <input className="form-control" name="marca" type="text" placeholder="Marca" onChange={handleChange} value={formValues.marca} />
        {errorMarca && <p className="error">{errorMarca}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="categoria">Categoría</label>
        <input className="form-control" name="categoria" type="text" placeholder="Categoría" onChange={handleChange} value={formValues.categoria} />
        {errorCategoria && <p className="error">{errorCategoria}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="stock">Stock</label>
        <input className="form-control" name="stock" type="number" placeholder="Stock" onChange={handleChange} value={formValues.stock} />
        {errorStock && <p className="error">{errorStock}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="descripcion">Descripción</label>
        <textarea className="form-control" name="descripcion" rows={4} placeholder="Descripción" onChange={handleChange} value={formValues.descripcion} />
        {errorDescripcion && <p className="error">{errorDescripcion}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="precio">Precio</label>
        <input className="form-control" name="precio" type="number" placeholder="Precio" onChange={handleChange} value={formValues.precio} />
        {errorPrecio && <p className="error">{errorPrecio}</p>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="proveedor">Proveedor</label>
        <input className="form-control" name="proveedor" type="text" placeholder="Proveedor" onChange={handleChange} value={formValues.proveedor} />
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

      <div className="mb-3">
        <label className="form-label" htmlFor="imagen">Seleccionar una imagen</label>
        <input className="form-control" name="imagen" type="file" accept="image/jpeg,image/png,image/gif" onChange={handleChange} value={formValues.imagen} />
        {errorImagen && <p className="error">{errorImagen}</p>}
      </div>
      <button className="btn btn-dark" type="submit" onClick={handleSubmit}>Ingresar producto</button>
    </form>
  );
}