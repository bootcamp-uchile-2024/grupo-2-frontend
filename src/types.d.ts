export interface FormatoType {
  id: string;
  descripcion: string;
}
export interface TipoCervezaType {
  id: number;
  nombre: string;
  descripcion: string;
  categoria?: string;
  color?: string;
}
export interface AmargorInterface {
  id: string;
  nivel: string;
  descripcion: string;
}
export interface CervezaInterface {
  id: number;
  nombre: string;
  marca: string;
  tipo: TipoCervezaType;
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
  amargor: AmargorInterface;
  graduacion: number;
  formato: FormatoType;
  imagen: string;
  is_active: boolean;
}

export interface Usuario {
  rut: string;
  nombre: string;
  apellido: string;
  contrasenia: string;
  re_contrasenia?: string;
  correo_comprador: string;
  telefono_comprador?: string;
  birthday: string;
  rol: string;
  is_active: boolean;
}
export interface UsuarioPerfil extends Usuario {
  edad: number;
  tipo_suscripcion: string;
}

// //////////////////// Interfaces actualizadas  ////////////////////

export interface Cervezas {
  id: number;
  nombre: string;
  marca: string;
  id_tipo: number;
  stock: number;
  descripcion: string;
  precio: number;
  id_proveedor: number;
  id_amargor: string;
  graduacion: number;
  id_formato: string;
  imagen?: string;
  is_active: boolean;
  proveedor: Proveedor;
  formato: Formato;
  tipo: Tipo;
  amargor: Amargor;
}

export interface Amargor {
  id: string;
  nivel: string;
  descripcion: string;
}

export interface Formato {
  id: string;
  descripcion: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
  id_comuna: string;
  contacto: string;
  telefono: string;
  correo_electronico: string;
}

export interface Tipo {
  id: number;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  color_id: number;
}
