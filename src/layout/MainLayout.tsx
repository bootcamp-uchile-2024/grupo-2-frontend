import "./layout.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
