import { cleanUser } from "@/state/slices/usuarioSlice";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

type AppDispatch = Dispatch<ReturnType<typeof cleanUser>>;

export const logout = (
  dispatch: AppDispatch,
  navigate: NavigateFunction
): void => {
  dispatch(cleanUser());
  localStorage.removeItem("token_jwt");
  navigate("/");
};
