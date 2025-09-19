import { SignIn } from "@/pages/auth/SignIn";
import { Register } from "@/pages/auth/Register";
import HomePage from "@/pages/HomePage";
import { index } from "@/pages/main";
import type { ComponentType } from "react";
import { Dashboard } from "@/pages/main/admin/Dashboard";

type RouteComponent = ComponentType<any>;

type RouteDefinition = {
  path: string;
  component: RouteComponent;
  requireRedirect?: boolean;
  children?: RouteDefinition[];
};

type PrivateRoutes = {
  [key: string]: RouteDefinition;
};

export const privateRoutes: PrivateRoutes = {
  home: {
    path: "/",
    component: HomePage,
    requireRedirect: false,
    children: [
      {
        path: "",
        component: index,
        requireRedirect: true,
      },
      // {
      //   path: "/dashboard",
      //   component: Dashboard,
      //   requireRedirect: true,
      // },
    ],
  },
  admin: {
    path: "/dashboard",
    component: Dashboard,
    requireRedirect: false,
  }
  //   session: {
  //     path: "/session",
  //     component: Session,
  //   },requireRedirect
  //   vipSession: {
  //     path: "/vip-session",
  //     component: Session,
  //   }
};

export const publicRoutes = {
  login: {
    path: "/sign-in",
    component: SignIn,
    requireRedirect: false,
  },
  register: {
    path: "/register",
    component: Register,
    requireRedirect: false,
  },
};
