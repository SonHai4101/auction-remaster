import { SignIn } from "@/pages/auth/SignIn";
import { Register } from "@/pages/auth/Register";
import HomePage from "@/pages/HomePage";
import { index } from "@/pages/main";
import type { ComponentType } from "react";
import { AdminPage } from "@/pages/main/admin/AdminPage";
import { Dashboard } from "@/pages/main/admin/Dashboard";
import { Categories } from "@/pages/main/admin/Categories";
import { Inbox } from "@/pages/main/admin/Inbox";
import { User } from "@/pages/main/admin/User";
import { Products } from "@/pages/main/admin/products/Products";
import { Cars } from "@/pages/main/admin/products/Cars";
import { Furnitures } from "@/pages/main/admin/products/Furnitures";

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
    path: "/admin-page",
    component: AdminPage,
    requireRedirect: false,
    children: [
      {
        path: "",
        component: Dashboard,
        requireRedirect: true,
      },
      {
        path: "inbox",
        component: Inbox,
      },
      {
        path: "users",
        component: User,
      },
      {
        path: "categories",
        component: Categories,
        children: [
          {
            path: "cars",
            component: Cars,
          },
          {
            path: "furnitures",
            component: Furnitures,
          },
        ],
      },
    ],
  },
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
