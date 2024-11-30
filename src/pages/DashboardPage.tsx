import { DashboardLayout } from "@/layout/DashboardLayout";
import { Outlet } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
