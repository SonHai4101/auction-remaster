import { Button } from "@/components/retroui/Button";
import { Checkbox } from "@/components/retroui/Checkbox";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { MdEmail } from "react-icons/md";
import { RiKeyFill } from "react-icons/ri";

export const SignIn = () => {
  return (
    <div className="max-w-[500px] mx-auto h-[100vh] place-content-center">
      <form className="bg-blue-200 flex flex-col gap-4 mt-4 p-8 rounded-md">
        <div className="flex flex-col gap-3">
          <Text as="h3" className="text-center">
            Welcome Back
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Sign in to your AuctionHub account
          </Text>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="flex gap-2" htmlFor="email">
            <MdEmail />
            Email Address
          </Label>
          <Input type="email" id="email" placeholder="Charmander" />
        </div>
        <div className="grid w-full items-center gap-1.5 mx-auto">
          <Label className="flex gap-2" htmlFor="password">
            <RiKeyFill />
            Password
          </Label>
          <Input type="password" id="password" placeholder="Charmander" />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Checkbox className="cursor-pointer" />
            <Text as="h6">Remember me</Text>
          </div>
          <Text className="text-amber-600 hover:underline cursor-pointer">
            Forgot password?
          </Text>
        </div>
        <Button className="w-[100px] bg-input hover:bg-ring">Sign In</Button>
      </form>
    </div>
  );
};
