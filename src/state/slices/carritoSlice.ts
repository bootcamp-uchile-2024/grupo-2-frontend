import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import ICarrito from "../../interfaces/ICarrito";
import { IPedidoCerveza } from "../../pages/productos/componentes/Listado";

const initialState: ICarrito = {
  id: 0,
  items: [],
  total_a_pagar: 0,
  documento_de_compra: "",
};
export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    addProducto: (state, action: PayloadAction<IPedidoCerveza>) => {
      const pedido = {
        ...action.payload,
        id: action.payload.cerveza.id,
      };
      state.items.push(pedido);
      return state;
    },
    deleteProducto: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      return state;
    },
    editarProductoPedido: (
      state,
      action: PayloadAction<{ id: number; action: string }>
    ) => {
      const index = state.items.findIndex(
        (cerveza) => cerveza.id === action.payload.id
      );
      const pedido = state.items[index];
      if (action.payload.action === "add") {
        const pedidoNuevo = { ...pedido, cantidad: pedido.cantidad + 1 };
        state.items[index] = pedidoNuevo;
      } else if (action.payload.action === "remove") {
        const pedidoNuevo = { ...pedido, cantidad: pedido.cantidad - 1 };
        state.items[index] = pedidoNuevo;
      } else {
        return state;
      }
    },
  },
});

export const { addProducto, deleteProducto, editarProductoPedido } =
  carritoSlice.actions;
export default carritoSlice.reducer;
