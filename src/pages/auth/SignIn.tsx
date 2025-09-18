import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import useAuthStore from "@/stores/useAuthStore";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiKeyFill } from "react-icons/ri";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });

    try {
      await logIn(username, password).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log("Login failed:", error);
    }
  };
  return (
    <div className="max-w-[500px] mx-auto h-[100vh] place-content-center">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 flex flex-col gap-4 mt-4 p-8 rounded-md"
      >
        <div className="flex flex-col gap-3">
          <Text as="h3" className="text-center">
            Welcome Back
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Sign in to your AuctionHub account
          </Text>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="flex gap-2" htmlFor="text">
            <MdEmail />
            Username
          </Label>
          <Input
            type="text"
            id="text"
            placeholder="Charmander"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mx-auto">
          <Label className="flex gap-2" htmlFor="password">
            <RiKeyFill />
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Charmander"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <Text as="h6">Already have an account?</Text>
          <Text className="text-amber-600 hover:underline cursor-pointer">
            <a href="/sign-in">Sign In</a>
          </Text>
        </div>
        <Button type="submit" className="w-[100px] bg-input hover:bg-ring">
          Sign In
        </Button>
      </form>
    </div>
  );
};
