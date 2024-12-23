import { cleanUser } from "@/state/slices/usuarioSlice";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { cleanCarrito } from "@/state/slices/carritoSlice";

type AppDispatch = Dispatch<
  ReturnType<typeof cleanUser> | ReturnType<typeof cleanCarrito>
>;

export const logout = (
  dispatch: AppDispatch,
  navigate: NavigateFunction
): void => {
  dispatch(cleanCarrito());
  dispatch(cleanUser());
  localStorage.removeItem("token_jwt");
  navigate("/");
};
