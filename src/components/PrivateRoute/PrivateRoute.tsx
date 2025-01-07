import { ReactNode } from "react";
import { isAuth } from "@/utils/auth";
import { MainLayout } from "@/layout/MainLayout";

interface PrivateRouteProps {
  children: ReactNode;
  // rol: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();
  if (auth) {
    return <MainLayout>{props.children}</MainLayout>;
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
