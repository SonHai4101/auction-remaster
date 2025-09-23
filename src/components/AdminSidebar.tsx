import { FaBoxOpen, FaPowerOff } from "react-icons/fa6";
import { Avatar } from "./retroui/Avatar";
import useAuthStore from "@/stores/useAuthStore";
import { Link } from "react-router";
import { HiUsers } from "react-icons/hi2";
import { BiSolidInbox } from "react-icons/bi";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export const AdminSidebar = () => {
  const sidebarItem1 = [
    {
      id: 1,
      name: "Dashboard",
      icon: <TbLayoutDashboardFilled />,
      src: "/admin-page/",
    },
    { id: 2, name: "Inbox", icon: <BiSolidInbox />, src: "/admin-page/inbox" },
    { id: 3, name: "Users", icon: <HiUsers />, src: "/admin-page/users" },
    {
      id: 4,
      name: "Products",
      icon: <FaBoxOpen />,
      src: "/admin-page/products",
    },
  ];
  const { user } = useAuthStore();
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="top-5 left-5 w-64 min-h-[740px] transition-transform -translate-x-full border-r-2  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="border-b-2 py-1">
          <a href="#" className="flex ms-2 md:me-24">
            <img
              src="/icon/logo-md.png"
              className="h-16 me-3"
              alt="FlowBite Logo"
            />
          </a>
        </div>
        <div className="border-b-2">
          <div className="flex gap-3 items-center p-4">
            <Avatar className="h-10 w-10">
              <Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
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
        <div className="flex flex-col min-h-[596px] justify-between">
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
