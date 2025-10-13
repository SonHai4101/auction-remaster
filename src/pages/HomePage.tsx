// import Sidebar from '../components/sidebar/Sidebar';
// import Header from '../components/header/Header';
import { Header } from "@/components/Header";
import useAuthStore from "@/stores/useAuthStore";
import { Outlet } from "react-router";

const HomePage = () => {
  // const user = useAuthStore((state) => state.user);
  const { user } = useAuthStore();

  console.log("user", user);

  return (
    <>
      <div className="max-w-[1202px] m-auto w-full min-h-[100dvh] px-5 pb-20">
        <Header />
        {/* <Sidebar /> */}
        <div className="flex gap-10 ">
          <div className="w-full  flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
