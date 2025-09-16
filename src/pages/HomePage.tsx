// import Sidebar from '../components/sidebar/Sidebar';
// import Header from '../components/header/Header';
import { Header } from "@/components/Header";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <>
      <div className="max-w-[1202px] m-auto w-full min-h-[100dvh]">
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
