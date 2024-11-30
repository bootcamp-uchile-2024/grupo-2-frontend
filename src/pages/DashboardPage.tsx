import { DashboardLayout } from "@/layout/DashboardLayout";
import { SidebarDashboard } from "@/components/Dashboard/SidebarDashboard";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     navigate("/login");
  //   } else {
  //     setIsUserLoggedIn(true);
  //   }
  // }, [navigate]);

  // if (!isUserLoggedIn) {
  //   return null; 
  // }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
