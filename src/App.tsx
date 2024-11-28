import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CervezasPage } from "./pages/CervezasPage";
import CervezasProvider from "./context/CervezasContext";
import { SideMenu } from "./components/CartStore/SideMenu";
import CartProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importar componentes
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

// Importa las páginas
import { AcercaPage } from "./pages/AcercaPage";
import { ContactoPage } from "./pages/ContactoPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

import { CreaProductoPage } from "./pages/CreaProductoPage";
import { HomePage } from "./pages/HomePage";
import { RecuperarPasswordPage } from "./pages/RecupararPasswordPage";
import CreaUsuarioPage from "./pages/CreaUsuarioPage";
import { CrearCuentaPage } from "./pages/CrearCuentaPage";
import { ConfirmarmacionCorreoPage } from "./pages/registro/ConfirmacionCorreoPage";
import { CarritoPage } from "./pages/CarritoPage";

// Administación de Usuarios y Productos

// Secciones

function App() {
  return (
    <CartProvider>
      <Router>
        <SideMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cervezas"
            element={
              <CervezasProvider>
                <CervezasPage />
              </CervezasProvider>
            }
          />
          <Route path="/acerca" element={<AcercaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resumen-carrito" element={<CarritoPage />} />
          <Route path="/admin" element={<DashboardPage />}>
            <Route
              path="crea-usuario"
              element={
                <PrivateRoute roles={["admin"]}>
                  <CreaUsuarioPage />
                </PrivateRoute>
              }
            />
            <Route
              path="crea-producto"
              element={
                <PrivateRoute roles={["admin"]}>
                  <CreaProductoPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/recuperar-password"
            element={<RecuperarPasswordPage />}
          />
          <Route path="/crear-cuenta" element={<CrearCuentaPage />} />
          <Route
            path="/confirmacion-correo"
            element={<ConfirmarmacionCorreoPage />}
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          theme="colored"
          autoClose={1500}
          closeOnClick
          className={"text-xs"}
        />
      </Router>
    </CartProvider>
  );
}

export default App;
