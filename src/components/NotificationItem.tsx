import { PiMailboxDuotone } from "react-icons/pi";
import { Text } from "./retroui/Text";
import type { Notification } from "@/constants/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

export const NotificationItem = ({ notification, onRead }: NotificationItemProps) => {
  return (
    <div className="w-full flex gap-4 items-center" onClick={() => onRead()}>
      <div className="w-5 h-5">
        <PiMailboxDuotone className="w-6 h-6" />
      </div>

      <div className="w-full flex justify-between">
        <div className="flex flex-col relative">
          <Text>{notification.message}</Text>
          <p className="text-sm font-light text-gray-700">
            {dayjs(notification.createdAt).fromNow()}
          </p>
        </div>
        {!notification.isRead && (
          <div className=" text-blue-500 text-4xl">•</div>
        )}
      </div>
    </div>
  );
};
