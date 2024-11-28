import { configureStore } from "@reduxjs/toolkit";
import cervezaSlice from "./slices/cervezaSlice";

export const store = configureStore({
  reducer: {
    cerveza: cervezaSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
