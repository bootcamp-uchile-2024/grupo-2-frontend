export interface CervezaType {
  id: number;
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

export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  birthday: string;
  password: string;
  rut: string;
  re_password?: string;
}
export interface UsuarioPerfil extends Usuario {
  edad: number;
  tipo_suscripcion: string;
}
