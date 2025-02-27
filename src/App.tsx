import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
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

import { HomePage } from "./pages/HomePage";
import { RecuperarPasswordPage } from "./pages/RecupararPasswordPage";
import { CrearCuentaPage } from "./pages/CrearCuentaPage";
import { ConfirmarmacionCorreoPage } from "./pages/registro/ConfirmacionCorreoPage";
import { CarritoPage } from "./pages/CarritoPage";
import { PageNoFound } from "./pages/404";
import { DetalleCervezaPage } from "./pages/cervezas/DetalleCervezaPage";

// Administación de Usuarios y Productos
import { CreaProductoPage } from "./pages/admin/CreaProductoPage";
import { CreaUsuarioPage } from "./pages/admin/CreaUsuarioPage";
import { ListadoProductosPage } from "./pages/admin/ListadoProdutosPage";
import { ListadoUsuarioPage } from "./pages/admin/ListadoUsuarioPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { EditarCervezaPage } from "./pages/admin/EditarCervezaPage";
import { ConfiguracionUsuarioPage } from "./pages/admin/ConfiguracionUsuarioPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

import { IStaticMethods } from "flyonui/flyonui";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "./state/slices/usuarioSlice";
import { PagoPage } from "./pages/PagoPage";
import { PasarelaPagoPage } from "./pages/PasarelaPagoPage";
import { CompraExitosaPage } from "./pages/CompraExitosaPage";
import { ClubPage } from "./pages/ClubPage";
import { PacksPage } from "./pages/PacksPage";
import { ContenidoEducativoPage } from "./pages/ContenidoEducativoPage";
import { ComunidadPage } from "./pages/ComunidadPage";
import { OfertasPage } from "./pages/OfertasPage";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const loadFlyonui = async () => {
      await import("flyonui/flyonui");

      window.HSStaticMethods.autoInit();
    };

    loadFlyonui();
  }, [location.pathname]);
  const dispatch = useDispatch();
  const autentificar = () => {
    const raw_token_jwt = localStorage.getItem("token_jwt");
    if (raw_token_jwt) {
      const decode_token_jwt = jwtDecode(raw_token_jwt);
      dispatch(setUser({ ...decode_token_jwt, token: raw_token_jwt }));
    } else {
      console.log("No hay token");
    }
  };
  useEffect(() => {
    autentificar();
  }, []);
  return (
    <CartProvider>
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
        <Route path="/club" element={<ClubPage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="/contenido" element={<ContenidoEducativoPage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="*" element={<PageNoFound />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<CreaProductoPage />} />
          <Route path="editar-producto/:id" element={<EditarCervezaPage />} />
          <Route path="crea-producto" element={<CreaProductoPage />} />
          <Route
            path="lista-producto"
            element={
              <ListadoProductosPage />
              // <PrivateRoute roles={["admin"]}>
              //   <ListadoProductosPage />
              // </PrivateRoute>
            }
          />
          <Route path="crea-usuario" element={<CreaUsuarioPage />} />
          <Route path="lista-usuarios" element={<ListadoUsuarioPage />} />
          <Route
            path="configuracion-usuario"
            element={<ConfiguracionUsuarioPage />}
          />
        </Route>
        <Route path="/recuperar-password" element={<RecuperarPasswordPage />} />
        <Route path="/crear-cuenta" element={<CrearCuentaPage />} />
        <Route
          path="/confirmacion-correo"
          element={<ConfirmarmacionCorreoPage />}
        />
        <Route path="/proceso-pago" element={<PagoPage />} />
        <Route path="/pasarela-pago" element={<PasarelaPagoPage />} />
        <Route
          path="/compra-exitosa/:id_pedido"
          element={<CompraExitosaPage />}
        />
      </Routes>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={1500}
        closeOnClick
        className={"text-xs"}
      />
    </CartProvider>
  );
}

export default App;
