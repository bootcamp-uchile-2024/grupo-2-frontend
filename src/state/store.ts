import { configureStore } from "@reduxjs/toolkit";
import cervezaSlice from "./slices/cervezaSlice";
import carritoSlice from "./slices/carritoSlice";
import usuarioSlice from "./slices/usuarioSlice";

export const store = configureStore({
  reducer: {
    cerveza: cervezaSlice,
    carrito: carritoSlice,
    usuario: usuarioSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
