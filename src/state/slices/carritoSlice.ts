import { createSlice } from "@reduxjs/toolkit";
import ICarrito from "../../interfaces/ICarrito";

const initialState: ICarrito = {
  id: 0,
  items: [{}, {}],
  total_a_pagar: 0,
  documento_de_compra: "",
};
export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {},
});

export default carritoSlice.reducer;
