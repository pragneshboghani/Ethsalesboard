import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/stories/template/Layout/Layout";
import HomePage from "@/pages/Home/HomePage";
import CompaniesPage from "@/pages/Companies/ConpaniesPage";
import { RouteObject } from "react-router-dom";
import { LayoutDashboard, Building2 } from "lucide-react";
import EmployeePage from "@/pages/Developers/DeveloperListPage";
import DeveloperInfo from "@/pages/Developers/DeveloperInfo";

export type IRoute = RouteObject & {
  path?: string;
  children?: IRoute[];
  index?: boolean;
  label: string;
  icon?: React.ReactNode;
  element?: React.ReactNode;
};

export const routeList: IRoute[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    element: <Layout />,
    children: [
      {
        index: true,
        label: "Dashboard",
        icon: <LayoutDashboard />,
        element: <HomePage />,
      },
      {
        path: "companies/:id",
        label: "Companies",
        icon: <Building2 />,
        element: <CompaniesPage />,
      },
      {
        path: "employees",
        label: "Employees",
        icon: <Building2 />,
        element: <EmployeePage />,
      },
      {
        path: "employees/:id",
        label: "Employee",
        icon: <Building2 />,
        element: <DeveloperInfo />,
      },
    ],
  },
];

const router = createBrowserRouter(routeList);

const RootRouters: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RootRouters;
