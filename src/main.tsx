import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// REFACTORIZACION: Se importa bootstrap desde el index
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// REFACTORIZACION: Se importa el archivo de estilos global
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
