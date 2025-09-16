import { useRoutes } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";
import ClientLayout from "@/components/Layouts/ClientLayout";
import MainLayout from "@/components/Layouts/MainLayout";
import NotFound from "@/components/NotFound";

const RenderRouter = () => {
  const routes = [
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        ...Object.values(privateRoutes).map(
          ({ path, component: Component, children }) => ({
            path: path.replace("/", ""),
            element: <Component />,
            children: children?.map((child) => ({
              path: child.path,
              element: <child.component />,
            })),
          })
        ),
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        ...Object.values(publicRoutes).map(
          ({ path, component: Component }) => ({
            path: path.replace("/", ""),
            element: <Component />,
          })
        ),
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(routes);
};

export default RenderRouter;
