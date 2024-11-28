import { CervezaType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface PedidoType {
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
      const { id } = action.payload;
      if (state.cervezas.map((cerveza) => cerveza.cerveza.id).includes(id)) {
        state.cervezas.map((cerveza) => {
          if (cerveza.cerveza.id === id) {
            cerveza.cantidad += 1;
          }
        });
        state.total_pagar = state.cervezas.reduce(
          (total, item) => total + item.cerveza.precio * item.cantidad,
          0
        );
        return;
      }
      state.cervezas.push({ cerveza: action.payload, cantidad: 1 });
      state.total_pagar = state.cervezas.reduce(
        (total, item) => total + item.cerveza.precio * item.cantidad,
        0
      );
    },
    removeCerveza: (state, action) => {
      const { id } = action.payload;
      state.cervezas = state.cervezas.filter(
        (cerveza) => cerveza.cerveza.id !== id
      );
      state.total_pagar = state.cervezas.reduce(
        (total, item) => total + item.cerveza.precio * item.cantidad,
        0
      );
    },
    discountCerveza: (state, action) => {
      const { id } = action.payload;
      state.cervezas.map((cerveza) => {
        if (cerveza.cerveza.id === id) {
          cerveza.cantidad -= 1;
        }
      });
      state.total_pagar = state.cervezas.reduce(
        (total, item) => total + item.cerveza.precio * item.cantidad,
        0
      );
    },
  },
});

export const { addCerveza, removeCerveza, discountCerveza } =
  carritoSlice.actions;
export default carritoSlice.reducer;
