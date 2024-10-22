import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <main>{props.children}</main>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};
