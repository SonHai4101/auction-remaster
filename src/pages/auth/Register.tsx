import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import useAuthStore from "@/stores/useAuthStore";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { PiEyeClosedBold, PiEyesFill } from "react-icons/pi";
import { RiKeyFill, RiUser2Fill } from "react-icons/ri";
import { useNavigate } from "react-router";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const [isVisible, setIsvisible] = useState(false);

  const toggle = () => {
    setIsvisible(!isVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(username, password, email).then(() => {
        navigate("/sign-in");
      });
    } catch (error) {}
  };
  return (
    <div className="max-w-[500px] mx-auto h-[100vh] place-content-center">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 flex flex-col gap-4 mt-4 p-8 rounded-md"
      >
        <div className="flex flex-col gap-3">
          <Text as="h3" className="text-center">
            Create Account
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Join AuctionHub and start bidding today
          </Text>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="flex gap-2" htmlFor="email">
            <MdEmail />
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="flex gap-2" htmlFor="username">
            <RiUser2Fill />
            Username
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mx-auto">
          <Label className="flex gap-2" htmlFor="password">
            <RiKeyFill />
            Password
          </Label>
          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 transform -translate-y-1/2 right-4"
              onClick={toggle}
            >
              {isVisible ? <PiEyesFill /> : <PiEyeClosedBold />}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <Text as="h6">Already have an account?</Text>
          <Text className="text-amber-600 hover:underline cursor-pointer">
            <a href="/sign-in">Sign In</a>
          </Text>
        </div>
        <Button
          type="submit"
          className="w-[110px] text-center bg-input hover:bg-ring"
        >
          Register
        </Button>
      </form>
    </div>
  );
};
