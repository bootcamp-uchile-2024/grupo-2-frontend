import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rut: "",
  email: "",
  role: "",
  token: "",
  nombre: "",
  apellidos: "",
};
export const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    updateNombres(state, action) {
      state.nombre = action.payload.nombres;
      state.apellidos = action.payload.apellidos;
    },
    setUser(_, action) {
      return action.payload;
    },
    cleanUser() {
      return initialState;
    },
  },
});

export const { setUser, cleanUser, updateNombres } = usuarioSlice.actions;
export default usuarioSlice.reducer;
