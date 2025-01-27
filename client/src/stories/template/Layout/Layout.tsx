import * as React from "react";
import EditIcon from "@/assets/IconComponents/EditIcon";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, Building2 } from "lucide-react";
import Header from "@/stories/molecules/Header/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSidebar from "@/stories/molecules/Sidebar/Sidebar";
import { fetchDashboardData } from "@/redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Checkbox } from "@/components/ui/checkbox";
import test from "node:test";
import { fetchDevelopers } from "@/redux/slices/developerSlice";

const Layout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const menuItems = [
    {
      label: "DashBoard",
      icon: <LayoutDashboard />,
      url: "/",
      active: true,
    },
    {
      label: "Company",
      icon: <Building2 />,
      url: "/companies",
      active: true,
    },
  ];

  React.useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchDevelopers());
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="flex">
        <SidebarProvider>
          <CustomSidebar />
          <div className="w-full">
            <div className="p-4">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="mr-2">|</span>
                <Header />
              </div>
              <hr className="my-4 md:my-2 "></hr>
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
