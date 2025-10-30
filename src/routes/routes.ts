import { SignIn } from "@/pages/auth/SignIn";
import { Register } from "@/pages/auth/Register";
import HomePage from "@/pages/HomePage";
import { index } from "@/pages/main";
import { AdminPage } from "@/pages/main/admin/AdminPage";
import { Dashboard } from "@/pages/main/admin/Dashboard";
// import { Categories } from "@/pages/main/admin/Categories";
import { Inbox } from "@/pages/main/admin/Inbox";
import { User } from "@/pages/main/admin/User";
import { CategoryDetail } from "@/pages/main/admin/products/CategoryDetail";
import { LiveAuction } from "@/pages/LiveAuction";
import { Categories } from "@/pages/Categories";
import { BuyerDashboard } from "@/pages/user/BuyerDashboard";
import { SellerDashboard } from "@/pages/user/SellerDashboard";
import { History } from "@/pages/user/History";

export const privateRoutes = {
  admin: {
    path: "/",
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
            path: ":categoryId",
            component: CategoryDetail,
          },
        ],
      },
    ],
  },
};

export const publicRoutes = {
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
      {
        path: "/live-auctions",
        component: LiveAuction,
      },
      {
        path: "/dashboard/buyer",
        component: BuyerDashboard,
      },
      {
        path: "/dashboard/seller",
        component: SellerDashboard,
      },
      {
        path: "/history",
        component: History,
      },
      {
        path: "/categories",
        component: Categories,
        children: [
          {
            path: ":categoryId",
            component: CategoryDetail,
          }
        ]
      },
    ],
  },
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
