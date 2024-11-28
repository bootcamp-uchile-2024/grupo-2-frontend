import { CervezaType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface PedidoType {
  id_pedido?: number;
  cerveza: CervezaType;
  cantidad: number;
}
export interface CarritoType {
  cervezas: PedidoType[];
  total_pagar: number;
  costo_envio: number;
  id_documento?: number;
  id_pedido?: number;
}
const initialState: CarritoType = {
  cervezas: [],
  total_pagar: 0,
  costo_envio: 0,
};

export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    addCerveza: (state, action) => {
      state.cervezas.push({ cerveza: action.payload, cantidad: 1 });
    },
  },
});

export const { addCerveza } = carritoSlice.actions;
export default carritoSlice.reducer;
