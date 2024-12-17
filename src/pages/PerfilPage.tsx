import { logout } from "@/utils/logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      icono: "/assets/close.svg",
      action: () => {
        logout(dispatch, navigate);
      },
    },
  ];
  return (
    <div className="flex m-auto ">
      <div className="min-w-[300px] border-2">
        {perfilSideBar.map((item) => {
          const { texto, icono, action } = item;
          return (
            <button type="button" onClick={action} className="flex" key={texto}>
              <img
                src={icono}
                alt={texto}
                width={24}
                height={24}
                className="overflow-hidden m-2"
              />
              <span className="text-lato-m m-2">{texto}</span>
            </button>
          );
        })}
      </div>
      <div>
        <div className="flex">
          <div>foto</div>
          <div>nombre</div>
        </div>
        <div>nombre</div>
        <div>correo</div>
        <div>Direcciones</div>
        <div className="flex">
          <div>direccion</div>
          <div>direccion</div>
        </div>
      </div>
    </div>
  );
};
