// import Sidebar from '../components/sidebar/Sidebar';
// import Header from '../components/header/Header';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router";

const HomePage = () => {
  // const user = useAuthStore((state) => state.user);
  // const { user } = useAuthStore();

  // console.log("user", user);

  return (
    <>
      <div className="mx-auto w-full min-h-[100dvh]">
        <Header />
        {/* <Sidebar /> */}
        <div className="max-w-[1202px] mx-auto flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
