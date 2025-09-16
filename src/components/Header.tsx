import React from "react";
import { Input } from "./retroui/Input";
import { BiSolidBell } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Button } from "./retroui/Button";

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <img className="h-20" src="/icon/logo-md.png" />
      <Input
        className="max-w-[300px] h-10 rounded-md"
        type="text"
        placeholder="Search something..."
      />
      <div className="flex gap-3">
        <text className="">Live Auctions</text>
        <text className="">Categories</text>
        <text className="">Sell</text>
      </div>
      <div className="flex gap-3">
        <BiSolidBell />
        <RiHeart2Fill />
        <PiShoppingBagOpenFill />
      </div>
      <div className="flex gap-3">
        <Button variant="default"><a href="/sign-in">Sign In</a></Button>
        <Button variant="outline"><a href="/register">Register</a></Button>
      </div>
    </div>
  );
};
