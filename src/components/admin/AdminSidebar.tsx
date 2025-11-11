import { FaBoxOpen, FaPowerOff } from "react-icons/fa6";
import { Avatar } from "../retroui/Avatar";
import useAuthStore from "@/stores/useAuthStore";
import { Link } from "react-router";
import { HiUsers } from "react-icons/hi2";
import { BiSolidInbox } from "react-icons/bi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Text } from "../retroui/Text";
import { Badge } from "../retroui/Badge";
import { useGetAllSellRequest } from "@/hooks/useSellRequest";

export const AdminSidebar = () => {
  const sidebarItem1 = [
    {
      id: 1,
      name: "Dashboard",
      icon: <TbLayoutDashboardFilled />,
      src: "/admin-page/",
    },
    {
      id: 2,
      name: "Request",
      icon: <BiSolidInbox />,
      src: "/admin-page/request",
    },
    { id: 3, name: "Users", icon: <HiUsers />, src: "/admin-page/users" },
    {
      id: 4,
      name: "Categories",
      icon: <FaBoxOpen />,
      src: "/admin-page/categories",
    },
  ];
  const { user } = useAuthStore();
  const { data: allSellRequest } = useGetAllSellRequest();
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="top-5 left-5 w-64 transition-transform -translate-x-full  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="border-b-2 py-1">
          <a href="/" className="flex items-center ms-2">
            <img
              src="/icon/retro-logo-transparent-bg.png"
              className="h-16"
              alt="FlowBite Logo"
            />
            <Text as="h5">AUCTION HOUSE</Text>
          </a>
        </div>
        <div className="border-b-2">
          <div className="flex gap-3 items-center p-4">
            <Avatar className="h-10 w-10">
              <Avatar.Image src={user?.avatarUrl ?? "/default_avatar.png"} alt="Arif Logs" />
              <Avatar.Fallback>AH</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-1.5">
              <div>{user?.username}</div>
              <div className="py-q px-2 bg-black rounded-sm w-fit text-white">
                admin
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  justify-between">
          <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                {sidebarItem1.map((item) => (
                  <Link
                    key={item.id}
                    to={item.src}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {item.icon}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {item.name}
                    </span>
                    {item.name === "Request" && allSellRequest?.length !== 0 && (
                      <Badge className="rounded-full bg-red-500 text-white">
                        {allSellRequest?.length ?? 0}
                      </Badge>
                    )}
                  </Link>
                ))}
              </li>
            </ul>
          </div>

          <div className="h-full px-3 py-4 overflow-y-auto border-t-2 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center  p-2 text-destructive rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaPowerOff />
                  <span className="ms-3">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};
