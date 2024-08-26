import React, { ReactNode } from "react";
import "./layout.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="main">
      <Navbar />
      <div className="content">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
