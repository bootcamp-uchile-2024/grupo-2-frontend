import { logout } from "@/utils/logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { USERS_ENDPOINT } from "@/config/api.config";

export const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const perfilSideBar = [
    {
      texto: "Historial de pedidos",
      icono: "/assets/icon-home.svg",
      action: () => {},
    },
    {
      texto: "Ver direcciones",
      icono: "/assets/location.svg",
      action: () => {},
    },
    {
      texto: "Mis suscripciones",
      icono: "/assets/icon-club.svg",
      action: () => {},
    },
    {
      texto: "Cerrar sesión",
      icono: "/assets/icon-close.svg",
      action: () => {
        logout(dispatch, navigate);
      },
    },
  ];

  interface UserInfo {
    nombre: string;
    apellido: string;
    correo_comprador: string;
  }
  interface Direccion {
    calle: string;
    numero: number;
    departamento: string;
    codigo_Postal: string;
    rut_usuario: string;
    estado: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);

  const token = localStorage.getItem('token_jwt');
  let payload: { [key: string]: any } = {};

  if (token) {
    payload = jwtDecode(token);
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (payload.rut) {
        try {
          const response = await fetch(`${USERS_ENDPOINT}/${payload.rut}`);
          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    const fetchDirecciones = async () => {
      if (payload.rut) {
        try {
          const response = await fetch(`${USERS_ENDPOINT}/${payload.rut}/direcciones`);
          const data = await response.json();
          setDirecciones(data);
        } catch (error) {
          console.error('Error fetching user addresses:', error);
        }
      }
    }

    fetchUserInfo();
    fetchDirecciones();
  }, [payload.rut]);


  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <div>
              {perfilSideBar.map((item) => {
                const { texto, icono, action } = item;
                const uniqueId = `${texto}-${Math.random().toString(36).substr(2, 9)}`;
                return (
                  <div key={uniqueId}>
                    <button type="button" onClick={action} className="flex py-4" key={texto}>
                      <img
                        src={icono}
                        alt={texto}
                        width={24}
                        height={24}
                        className="overflow-hidden m-2"
                      />
                      <span className="text-lato-m m-2">{texto}</span>
                    </button>
                    <hr />
                  </div>
                );
              })}
            </div>
        </div>
        <div className="md:col-span-8 p-4">
              <div>
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full bg-slate-300 mr-4 flex justify-center items-center text-xs">imagen</div>
                    <p className="text-[#675594] text-2xl">Hola, {userInfo ? userInfo.nombre : 'usuario'}!</p>
                </div>
                <div className="py-8">
                {userInfo ? (
                  <div>
                    <div>
                      <span className="mr-1 text-xl font-bold">{userInfo.nombre}</span>
                      <span className="text-xl font-bold">{userInfo.apellido}</span>
                    </div>
                    <div className="text-xl font-bold mt-1">{userInfo.correo_comprador}</div>
                  </div>
                ) : (
                  <p>Cargando información del usuario...</p>
                )}
                </div>
                <p className="text-[#675594] text-2xl mb-4">Direcciones</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border p-4 rounded-md">
                    {direcciones.length > 0 ? (
                      <ul>
                        {direcciones.map((direccion) => (
                          <li key={direccion.rut_usuario}>
                            {direccion.calle} {direccion.numero}, 
                            {direccion.departamento}, 
                            {direccion.codigo_Postal}, 
                            {direccion.estado}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay direcciones disponibles.</p>
                    )}
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};
