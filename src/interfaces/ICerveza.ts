interface ICerveza {
  nombre: string;
  marca: string;
  tipo_cerveza: string;
  stock: number;
  descripcion: string;
  precio: number;
  proveedor: {
    nombre: string;
    id_comuna: string;
    contacto: string;
    telefono: string;
    correo_electronico: string;
  };
  amargor: string;
  graduacion: number;
  formato: string;
  imagen: string;
}

export default ICerveza;
