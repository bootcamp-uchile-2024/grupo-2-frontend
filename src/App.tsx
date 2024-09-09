import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import CatalogoPage from "./pages/productos/CatalogoPage";
import AcercaPage from "./pages/AcercaPage";
import ContactoPage from "./pages/ContactoPage";
import DetalleProducto from "./pages/productos/DetalleProducto";
import PedidoPage from "./pages/PedidoPage";
import PerfilPage from "./pages/PerfilPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalogo" element={<CatalogoPage />} />
            <Route path="catalogo/producto/:id" element={<DetalleProducto />} />
            <Route path="pedidos" element={<PedidoPage />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="acerca" element={<AcercaPage />} />
            <Route path="contacto" element={<ContactoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
