
import React from "react";
import { useRoutes } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import ClientLayout from "@/components/Layouts/ClientLayout";
import MainLayout from "@/components/Layouts/MainLayout";
import NotFound from "@/components/NotFound";

type ReactRoute = {
  path: string;
  element: React.ReactElement;
  children?: ReactRoute[];
};

function mapRouteDef(routeDef: any): ReactRoute {
  const { path, component: Component, children } = routeDef;
  const mapped: ReactRoute = {
    path: path.replace(/^\//, ""),
    element: <Component />,
  };
  if (children && children.length > 0) {
    mapped.children = children.map(mapRouteDef);
  }
  return mapped;
}

const RenderRouter = () => {
  const routes = [
    {
      path: "/",
      element: <ClientLayout />,
      children: Object.values(privateRoutes).map(mapRouteDef),
    },
    {
      path: "/",
      element: <MainLayout />,
      children: Object.values(publicRoutes).map(({ path, component: Component }) => ({
        path: path.replace("/", ""),
        element: <Component />,
      })),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  return useRoutes(routes);
};

export default RenderRouter;
