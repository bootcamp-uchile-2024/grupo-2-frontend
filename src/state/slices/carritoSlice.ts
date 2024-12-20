import { CervezaInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface PedidoType {
  id_pedido?: number;
  cerveza: CervezaInterface;
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
    cleanCarrito: () => {
      return initialState;
    },
    addCerveza: (state, action) => {
      const { id } = action.payload.cerveza;
      const { cantidad } = action.payload;
      const cervezaExistente = state.cervezas.find(
        (cerveza) => cerveza.cerveza.id === id
      );

      if (cervezaExistente) {
        cervezaExistente.cantidad += cantidad;
      } else {
        state.cervezas.push({
          cerveza: action.payload.cerveza,
          cantidad,
        });
      }

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

export const { addCerveza, removeCerveza, discountCerveza, cleanCarrito } =
  carritoSlice.actions;
export default carritoSlice.reducer;
