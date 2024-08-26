import React, { ReactNode } from "react";
import './layout.css'
interface LayoutProps {
  children: ReactNode
}
function Footer() {
  return <div className="footer">
    <p>Cervezario Nacional</p>
    <p>Contacto</p>
  </div>
}
function Navbar() {
  return <div className="navbar">
    <li>
      <ul>
        Home
      </ul>
      <ul>
        Catalogo
      </ul>
      <ul>
        Pedidos
      </ul>
      <ul>
        Perfil
      </ul>
      <ul>
        Quienes somos
      </ul>
    </li>
  </div>
}
function Header() {
  return <div className="header">
    <h2>Cervezario Nacional</h2></div>
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="main">
    <Navbar />
    <div className="content">
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  </div>
}

export default Layout