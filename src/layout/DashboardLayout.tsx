import { NavbarDashboard } from "@/components/Dashboard/NavbarDashboard";
import { SidebarDashboard } from "@/components/Dashboard/SidebarDashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
        <NavbarDashboard />
        <SidebarDashboard />
        <div className="w-full ml-64 mt-16">
        <div className="flex justify-center items-start h-full">
            {props.children}
            </div>
        </div>
    </div>
  );
};
