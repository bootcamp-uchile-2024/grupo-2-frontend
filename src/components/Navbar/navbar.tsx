import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      to: "/",
      text: "Inicio",
      className: "nav-link flex",
      icon: "assets/icon-home.svg",
    },
    // { to: "/acerca", text: "Acerca de", className: "nav-link", icon: null },
    {
      to: "/cervezas",
      text: "Cervezas",
      className: "nav-link flex",
      icon: "assets/icon-cervezas.svg",
    },
    {
      to: "/packs",
      text: "Packs",
      className: "nav-link flex",
      icon: "assets/icon-packs.svg",
    },
    {
      to: "/club",
      text: "Club",
      className: "nav-link flex",
      icon: "assets/icon-club.svg",
    },
    {
      to: "/contenido",
      text: "Contenido Educativo",
      className: "nav-link flex",
      icon: "assets/icon-contenido.svg",
    },
    {
      to: "/comunidad",
      text: "Comunidad",
      className: "nav-link flex",
      icon: "assets/icon-comunidad.svg",
    },
    {
      to: "/ofertas",
      text: "Ofertas y Promociones",
      className: "nav-link flex",
      icon: "assets/icon-oferta.svg",
    },
    // { to: "/contacto", text: "Contacto", className: "nav-link", icon: null },
  ];

  return (
    <div className="mt-10 w-full">
      <div className="flex justify-between w-full">
        {links.map((link, index) => {
          const { to, text, className, icon } = link;
          return (
            <div key={index}>
              <Link className={className} to={to}>
                {icon && <img src={icon} alt="" className="me-2" />}
                {text}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
