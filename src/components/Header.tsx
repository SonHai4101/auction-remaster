import React from "react";
import { Input } from "./retroui/Input";
import { BiSolidBell, BiSolidFoodMenu } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Button } from "./retroui/Button";
import useAuthStore from "@/stores/useAuthStore";
import { Popover } from "./retroui/Popover";
import { Label } from "./retroui/Label";
import { Select } from "./retroui/Select";
import { Menu } from "./retroui/Menu";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router";

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
      <img className="h-20" src="/icon/logo-md.png" />
      <Input
        className="max-w-[300px] h-10 rounded-md"
        type="text"
        placeholder="Search something..."
      />
      <div className="flex gap-4">
        <text className="">Live Auctions</text>
        <text className="">Categories</text>
        <text className="">Sell</text>
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
                onClick={() => navigate("/dashboard")}
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
