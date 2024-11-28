import { createSlice } from "@reduxjs/toolkit";

interface PedidoType {
  id_pedido?: number;
  id_cerveza: number;
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
  reducers: {},
});

export default carritoSlice.reducer;
