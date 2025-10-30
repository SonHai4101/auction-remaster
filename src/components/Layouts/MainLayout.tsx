import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Outlet } from "react-router";

export const MainLayout = () => {
  const { loadFromSession } = useAuthStore();

  useEffect(() => {
    loadFromSession();
  }, []);
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default MainLayout;
