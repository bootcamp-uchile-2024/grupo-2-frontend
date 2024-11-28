import { configureStore } from "@reduxjs/toolkit";
import cervezaSlice from "./slices/cervezaSlice";
import carritoSlice from "./slices/carritoSlice";

export const store = configureStore({
  reducer: {
    cerveza: cervezaSlice,
    carrito: carritoSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
