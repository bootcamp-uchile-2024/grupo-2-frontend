import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rut: "",
  email: "",
  role: "",
  token: "",
};
export const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUser(_, action) {
      console.log(action.payload);
      return action.payload;
    },
    cleanUser() {
      return initialState;
    },
  },
});

export const { setUser, cleanUser } = usuarioSlice.actions;
export default usuarioSlice.reducer;
