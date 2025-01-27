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
    ?.replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    ?.replace(/^./, (str: string) => str.toUpperCase()); // Capitalize the first letter
}

export const getProfileInitials = (
  firstName: string,
  lastName: string
): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

export const monthNameDateFormate = (isoString: string) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

//drop zon

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
  }`;
}

//formdata convertor

export const objectToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
): FormData => {
  Object.entries(obj).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        objectToFormData(item, formData, `${formKey}[${index}]`);
      });
    } else if (typeof value === "object" && value !== null) {
      objectToFormData(value, formData, formKey);
    } else {
      formData.append(formKey, value);
    }
  });

  return formData;
};
