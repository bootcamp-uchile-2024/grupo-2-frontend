import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CervezasPage } from "./pages/CervezasPage"
import CervezasProvider from "./context/CervezasContext"
import { SideMenu } from "./components/CartStore/SideMenu"
import CartProvider from "./context/CartContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// Importar componentes
import Header from "./components/UI/Header"
import { Footer } from "./components/UI/Footer"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

// Importa las páginas
import { AcercaPage } from './pages/AcercaPage';
import { ContactoPage } from './pages/ContactoPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import CreaUsuarioPage from './pages/CreaUsuarioPage';
import { CreaProductoPage } from './pages/CreaProductoPage';

// Administación de Usuarios y Productos

function App() {

  return (
    <CartProvider>
      <CervezasProvider>
        <Router>
          <SideMenu />
          <main>
            <Header />
            <Routes>
              <Route path="/" element={<CervezasPage />} />
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
            <ToastContainer
              position="bottom-right"
              theme="colored"
              autoClose={1500}
              closeOnClick
              className={'text-xs'}
            />
            <Footer />
          </main>
        </Router>
      </CervezasProvider>
    </CartProvider>
  )
}

export default App;