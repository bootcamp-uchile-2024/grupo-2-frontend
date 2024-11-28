import { CervezaType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { registros: number; cervezas: CervezaType[] } = {
  registros: 0,
  cervezas: [],
};
export const cervezaSlice = createSlice({
  name: "cerveza",
  initialState,
  reducers: {
    getCervezas: (state, action: PayloadAction<CervezaType[]>) => {
      state.cervezas = action.payload;
      state.registros = action.payload.length;
      return state;
    },
  },
});

export const { getCervezas } = cervezaSlice.actions;
export default cervezaSlice.reducer;
