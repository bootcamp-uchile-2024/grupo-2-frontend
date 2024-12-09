import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CervezasPage } from "./pages/CervezasPage";
import CervezasProvider from "./context/CervezasContext";
import { SideMenu } from "./components/CartStore/SideMenu";
import CartProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importa las páginas
import { AcercaPage } from "./pages/AcercaPage";
import { ContactoPage } from "./pages/ContactoPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

import { CreaProductoPage } from "./pages/CreaProductoPage";
import { HomePage } from "./pages/HomePage";
import { RecuperarPasswordPage } from "./pages/RecupararPasswordPage";
import { CreaUsuarioPage } from "./pages/CreaUsuarioPage";
import { CrearCuentaPage } from "./pages/CrearCuentaPage";
import { ConfirmarmacionCorreoPage } from "./pages/registro/ConfirmacionCorreoPage";
import { CarritoPage } from "./pages/CarritoPage";
import { PageNoFound } from "./pages/404";
import { DetalleCervezaPage } from "./pages/cervezas/DetalleCervezaPage";
import { ListadoProductosPage } from "./pages/ListadoProdutosPage";
import { ListadoUsuarioPage } from "./pages/ListadoUsuarioPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";

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
          <Route path="/cervezas/:id" element={<DetalleCervezaPage />} />
          <Route path="/acerca" element={<AcercaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resumen-carrito" element={<CarritoPage />} />
          <Route path="*" element={<PageNoFound />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route
              index
              element={
                <CreaProductoPage />
                // <PrivateRoute roles={["admin"]}>
                //   <CreaProductoPage />
                // </PrivateRoute>
              }
            />
            <Route
              path="crea-usuario"
              element={
                <CreaUsuarioPage />
                // <PrivateRoute roles={["admin"]}>
                //   <CreaUsuarioPage />
                // </PrivateRoute>
              }
            />
            <Route
              path="crea-producto"
              element={
                <CreaProductoPage />
                // <PrivateRoute roles={["admin"]}>
                //   <CreaProductoPage />
                // </PrivateRoute>
              }
            />
            <Route
              path="lista-producto"
              element={
                <ListadoProductosPage />
                // <PrivateRoute roles={["admin"]}>
                //   <ListadoProductosPage />
                // </PrivateRoute>
              }
            />
            <Route
              path="lista-usuarios"
              element={
                <ListadoUsuarioPage />
                // <PrivateRoute roles={["admin"]}>
                //   <ListadoUsuarioPage />
                // </PrivateRoute>
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
