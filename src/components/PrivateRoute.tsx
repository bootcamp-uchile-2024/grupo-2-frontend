import { ReactNode } from "react";
import { isAuth, userHasRole } from "../services/LoginService";

interface PrivateRouteProps {
  children: ReactNode;
  roles: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();
  const hasRole = userHasRole(props.roles)
  return (
    <>
      {auth && hasRole ? props.children : <p className="error">Acceso denegado</p>}
    </>
  );
}