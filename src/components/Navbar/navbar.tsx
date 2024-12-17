import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    {
      to: "/",
      text: "Inicio",
      className: "nav-link flex",
      icon: "/assets/icon-home.svg",
    },
    // { to: "/acerca", text: "Acerca de", className: "nav-link", icon: null },
    {
      to: "/cervezas",
      text: "Cervezas",
      className: "nav-link flex",
      icon: "/assets/icon-cervezas.svg",
    },
    {
      to: "/packs",
      text: "Packs",
      className: "nav-link flex",
      icon: "/assets/icon-packs.svg",
    },
    {
      to: "/club",
      text: "Club",
      className: "nav-link flex",
      icon: "/assets/icon-club.svg",
    },
    {
      to: "/contenido",
      text: "Contenido Educativo",
      className: "nav-link flex",
      icon: "/assets/icon-contenido.svg",
    },
    {
      to: "/comunidad",
      text: "Comunidad",
      className: "nav-link flex",
      icon: "/assets/icon-comunidad.svg",
    },
    {
      to: "/ofertas",
      text: "Ofertas y Promociones",
      className: "nav-link flex",
      icon: "/assets/icon-oferta.svg",
    },
    // { to: "/contacto", text: "Contacto", className: "nav-link", icon: null },
  ];
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center mt-10 w-full">
      <div className="flex justify-center items-center w-full lg:w-auto">
        <button
          className="lg:hidden p-2 absolute top-2 left-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="assets/icon-hamburger.svg" alt="Menu" />
        </button>
        <div
          className={`flex flex-col lg:flex-row lg:flex-wrap w-full ${
            isOpen ? "block" : "hidden"
          } lg:flex`}
        >
          {links.map((link, index) => {
            const { to, text, className, icon } = link;
            return (
              <div
                key={index}
                className={`p-2 px-4 ${
                  to == pathname ? "navbar-button-selected" : ""
                }`}
              >
                <Link className={`${className} text-lato-m`} to={to}>
                  {icon && <img src={icon} alt="" className="me-2" />}
                  {text}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
