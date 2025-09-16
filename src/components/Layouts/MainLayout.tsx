import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default MainLayout;
