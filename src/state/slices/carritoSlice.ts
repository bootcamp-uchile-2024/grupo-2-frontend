import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPedidoCerveza } from "../../pages/productos/componentes/Listado";
// Se importa la interfaz del carrito
import ICarrito from "../../interfaces/ICarrito";

// Función para guardar el estado en localStorage
const saveToLocalStorage = (state: ICarrito) => {
  // Se guarda el estado en localStorage
  localStorage.setItem("carrito", JSON.stringify(state));
};

// Recuperar el estado desde localStorage
const loadFromLocalStorage = (): ICarrito => {
  // Variable para recuperar el estado desde localStorage
  const savedState = localStorage.getItem("carrito");
  return savedState ? JSON.parse(savedState) : {
    id: 0,
    items: [],
    total_a_pagar: 0,
    documento_de_compra: "",
  };
};
// Se crea el estado inicial del carrito
const initialState: ICarrito = loadFromLocalStorage()

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
      saveToLocalStorage(state);
      return state;
    },
    deleteProducto: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state);
      return state;
    },
    editarProductoPedido: (state, action: PayloadAction<{ id: number; action: string }>) => {
      const index = state.items.findIndex(
        (cerveza) => cerveza.id === action.payload.id);
      const pedido = state.items[index];

      if (action.payload.action === "add") {
        const pedidoNuevo = { ...pedido, cantidad: pedido.cantidad + 1 };
        state.items[index] = pedidoNuevo;

      } else if (action.payload.action === "remove") {
        const pedidoNuevo = { ...pedido, cantidad: pedido.cantidad - 1 };
        state.items[index] = pedidoNuevo;

      } else {
        saveToLocalStorage(state);
        return state;
      }
    },
  },
});

export const { addProducto, deleteProducto, editarProductoPedido } = carritoSlice.actions;
export default carritoSlice.reducer;
