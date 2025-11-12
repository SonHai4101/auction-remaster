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
import { Popover } from "./retroui/Popover";
import {
  useGetAllNotifications,
  useRead,
  useReadAll,
} from "@/hooks/useNotification";
import { useState } from "react";
import { Loader } from "./retroui/Loader";
import { NotificationItem } from "./NotificationItem";
import Pagination from "./Pagination";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { logOut } = useAuthStore();
  const handleLogOut = () => {
    logOut();
    navigate("/sign-in");
  };
  const limit = 5;
  const [page, setPage] = useState(1);
  const { data: allNotification, isLoading: isLoadingNotification } =
    useGetAllNotifications({ page, limit });
  const { mutate: read } = useRead();
  const { mutate: readAll } = useReadAll();

  const handleRead = (id: string) => {
    read(id);
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
        <div className="flex gap-2">
          <Popover>
            <Popover.Trigger asChild>
              <Button className="px-2">
                <BiSolidBell />
              </Button>
            </Popover.Trigger>
            <Popover.Content className="w-80 font-sans min-w-[420px]">
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium leading-none">Notification</h4>
                  <p
                    className="text-sm text-muted-foreground"
                    onClick={() => readAll()}
                  >
                    Mark all as read
                  </p>
                </div>
                <div className="flex flex-col items-center gap-5">
                  {isLoadingNotification ? (
                    <div className="h-[150px] grid place-content-center">
                      <Loader />
                    </div>
                  ) : allNotification?.data &&
                    allNotification.data.length > 0 ? (
                    allNotification.data.map((item) => (
                      <NotificationItem
                        key={item.id}
                        onRead={() => handleRead(item.id)}
                        notification={item}
                      />
                    ))
                  ) : (
                    <div className="h-[150px] grid place-content-center">
                      No notification
                    </div>
                  )}
                </div>
                {allNotification?.data && allNotification.total > limit && (
                  <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(allNotification?.total / limit)}
                    onPageChange={(p) => setPage(p)}
                    justify="center"
                  />
                )}
              </div>
            </Popover.Content>
          </Popover>

          <Button className="px-2">
            <RiHeart2Fill />
          </Button>
          <Button className="px-2">
            <PiShoppingBagOpenFill />
          </Button>
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
