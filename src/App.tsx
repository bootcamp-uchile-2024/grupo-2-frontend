import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CatalogoPage } from "./pages/productos/CatalogoPage";
import { AcercaPage } from "./pages/AcercaPage";
import { ContactoPage } from "./pages/ContactoPage";
import { DetalleProducto } from "./pages/productos/componentes/DetalleProducto";
import { PedidoPage } from "./pages/PedidoPage";
import { PerfilPage } from "./pages/PerfilPage";

// Administación de Usuarios y Productos
import { LoginPage } from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { CreaUsuarioPage } from "./pages/CreaUsuarioPage";
import { CreaProductoPage } from "./pages/CreaProductoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/catalogo/producto/:id" element={<DetalleProducto />} />
          <Route path="/pedidos" element={<PedidoPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/acerca" element={<AcercaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
