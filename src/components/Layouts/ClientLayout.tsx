import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Loader } from "../retroui/Loader";

export const ClientLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading, loadFromSession } = useAuthStore();

  useEffect(() => {
    loadFromSession();
  }, []);

  useEffect(() => {
    if (isLoading && !user) {
      navigate("/sign-in");
    }
  }, [isLoading, user, navigate]);

  if (!isLoading)
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loader />
      </div>
    );

  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default ClientLayout;
