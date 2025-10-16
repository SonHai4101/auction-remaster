import { Input } from "./retroui/Input";
import { BiSolidBell, BiSolidFoodMenu } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Button } from "./retroui/Button";
import useAuthStore from "@/stores/useAuthStore";
import { Menu } from "./retroui/Menu";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router";
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
    <div className="flex items-center justify-between">
      <img className="h-20" src="/icon/retro-logo-transparent-bg.png" />
      <Input
        className="max-w-[300px] h-10 rounded-md"
        type="text"
        placeholder="Search something..."
      />
      <div className="flex gap-4">
        <Text className="">Live Auctions</Text>
        <Text className="">Categories</Text>
        <Text className="">Sell</Text>
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
          <Menu.Content className="min-w-38 ">
            {user.role === "ADMIN" && (
              <Menu.Item
                className="text-lg gap-3"
                onClick={() => navigate("/admin-page")}
              >
                <BiSolidFoodMenu />
                Dashboard
              </Menu.Item>
            )}
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
  );
};
