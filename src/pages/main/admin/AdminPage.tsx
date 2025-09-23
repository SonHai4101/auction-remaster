import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet } from "react-router";

export const AdminPage = () => {
  return (
    <div className="p-5">
      <div className="flex min-h-full border-2 rounded-md">
        <AdminSidebar />
        <div className="w-full overflow-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
