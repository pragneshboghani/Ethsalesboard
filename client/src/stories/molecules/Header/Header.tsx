import * as React from "react";
import { useLocation, useMatches } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header: React.FC = () => {
  const match = useMatches();
  const location = useLocation(); // Get current route
  const arrayOfPaths = location.pathname.split("/").filter((path) => path);

  const breadcrumbList = arrayOfPaths?.map((path) => {
    return {
      pathname: path,
      isRedirectable: match?.some((match) => match.pathname === `/${path}`),
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/`}>{"Dashboard"}</BreadcrumbLink>
        </BreadcrumbItem>
        {arrayOfPaths.length !== 0 && <BreadcrumbSeparator />}
        {breadcrumbList?.map((_pd: any, index) => {
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${_pd.pathname}`}>
                  {_pd.pathname}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbList?.length > index + 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Header;
