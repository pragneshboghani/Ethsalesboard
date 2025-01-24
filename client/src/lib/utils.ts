import { IRoute } from "@/router/RootRouter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface INewRoute {
  path: string;
  pathName: string;
  subPaths?: INewRoute[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const toCamelCase = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const transformRoutes = (
  routes: IRoute[],
  basePath = ""
): INewRoute[] => {
  return routes
    .filter((route) => !route.index) // Skip index:true to avoid duplicates
    .map((route) => {
      const fullPath = `${basePath}/${route.path || ""}`.replace(/\/+/g, "/");
      return {
        path: fullPath,
        pathName: route.label || "Unknown", // Use `label` instead of extracting element name
        // icon: route.icon || "Unknown", // Use `label` instead of extracting element name
        subPaths:
          Array.isArray(route.children) && route.children.length > 0
            ? transformRoutes(route.children, fullPath)
            : undefined,
      };
    });
};
export const serializeQueryMaker = (obj: Record<string, any>): string => {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
};

export function convertToFileNameFormat(input: string) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/^./, (str: string) => str.toUpperCase()); // Capitalize the first letter
}
