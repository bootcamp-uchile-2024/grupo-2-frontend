import { ReactNode } from "react";
import { isAuth } from "@/utils/auth";

interface PrivateRouteProps {
  children: ReactNode;
  // rol: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();
  console.log("Auth:", auth); // Depuración
  return (
    <>
      {auth ? props.children : <p className="error">Acceso denegado</p>}
    </>
  );
}