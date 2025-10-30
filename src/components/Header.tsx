import { Input } from "./retroui/Input";
import { BiSolidBell, BiSolidFoodMenu } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Button } from "./retroui/Button";
import useAuthStore from "@/stores/useAuthStore";
import { Menu } from "./retroui/Menu";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { Text } from "./retroui/Text";

export const Header = () => {
  const user = useAuthStore((state) => state.user);  
  const navigate = useNavigate();
  const { logOut } = useAuthStore();
  const handleLogOut = () => {
    logOut();
    navigate("/sign-in");
  };
  return (
    <div className="sticky top-0 z-50 bg-[#633c1d] border-b-4 text-white">
      <div className="max-w-[1202px] mx-auto flex items-center justify-between ">
        <Link to="/">
          <img className="h-20" src="/icon/retro-logo-transparent-bg.png" />
        </Link>
        <Input
          className="max-w-[300px] h-10 rounded-md bg-white text-black"
          type="text"
          placeholder="Search something..."
        />
        <div className="flex gap-5">
          <Link to="/live-auctions">
            <Text className="cursor-pointer hover:underline">
              Live Auctions
            </Text>
          </Link>
          <Link to="/categories">
            <Text className="cursor-pointer hover:underline">Categories</Text>
          </Link>
          <Link to="/sell-request">
            <Text className="cursor-pointer hover:underline">Sell</Text>
          </Link>
        </div>
        <div className="flex gap-3">
          <BiSolidBell />
          <RiHeart2Fill />
          <PiShoppingBagOpenFill />
        </div>
        {user ? (
          <Menu>
            <Menu.Trigger asChild>
              <Button>{user.username}</Button>
            </Menu.Trigger>
            <Menu.Content className="min-w-38 z-50">
              {user.role === "ADMIN" && (
                <Menu.Item
                  className="text-lg gap-3"
                  onClick={() => navigate("/admin-page")}
                >
                  <BiSolidFoodMenu />
                  Dashboard
                </Menu.Item>
              )}
              <Menu.Item
                className="text-lg gap-3"
                onClick={() => navigate("/dashboard/buyer")}
              >
                <BiSolidFoodMenu />
                Buyer Dashboard
              </Menu.Item>
              <Menu.Item
                className="text-lg gap-3"
                onClick={() => navigate("/dashboard/seller")}
              >
                <BiSolidFoodMenu />
                Seller Dashboard
              </Menu.Item>
              <Menu.Item
                className="text-lg gap-3"
                onClick={() => navigate("/history")}
              >
                <BiSolidFoodMenu />
                History
              </Menu.Item>
              <Menu.Item className="text-lg gap-3" onClick={handleLogOut}>
                <FaPowerOff />
                Sign Out
              </Menu.Item>
            </Menu.Content>
          </Menu>
        ) : (
          <div className="flex gap-3">
            <Button variant="default">
              <a href="/sign-in">Sign In</a>
            </Button>
            <Button variant="outline">
              <a href="/register">Register</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
