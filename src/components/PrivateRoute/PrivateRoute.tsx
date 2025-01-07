import { ReactNode } from "react";
import { isAuth } from "@/utils/auth";
import { MainLayout } from "@/layout/MainLayout";
import { useSelector } from "react-redux";
import { RootType } from "@/state/store";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();
  const { role } = useSelector((state: RootType) => state.usuario);

  if (auth && role == "admin") {
    return <>{props.children}</>;
  } else {
    return (
      <MainLayout>
        <div className="flex justify-center">
          <h1 className="error">Acceso denegado</h1>
        </div>
      </MainLayout>
    );
  }
};
