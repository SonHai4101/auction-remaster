import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router";

export const AdminPage = () => {
  return (
    <div className="p-4 h-screen">
      <div className="flex min-h-full border-2 rounded-md">
        <AdminSidebar />
        <div className="w-full border-l-2 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
