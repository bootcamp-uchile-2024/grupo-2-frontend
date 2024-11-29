import { CervezaInterface } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { registros: number; cervezas: CervezaInterface[] } = {
  registros: 0,
  cervezas: [],
};
export const cervezaSlice = createSlice({
  name: "cerveza",
  initialState,
  reducers: {
    getCervezas: (state, action: PayloadAction<CervezaInterface[]>) => {
      state.cervezas = action.payload;
      state.registros = action.payload.length;
      return state;
    },
  },
});

export const { getCervezas } = cervezaSlice.actions;
export default cervezaSlice.reducer;
