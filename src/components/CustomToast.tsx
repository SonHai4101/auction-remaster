import { toast } from "react-toastify";
import { Alert } from "./retroui/Alert";
import { IoClose, IoInformationCircleOutline, IoWarningOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const BaseToast = ({
  status,
  icon: Icon,
  message,
}: {
  status: "error" | "success" | "warning" | "info" | undefined;
  icon: React.ElementType;
  message: string;
}) => {
  return (
    <Alert status={status} className="flex items-center">
      <Icon className="h-5 w-5 mr-4" />
      <Alert.Title>{message}</Alert.Title>
    </Alert>
  );
};

export const notifySuccess = (message: string) =>
  toast(<BaseToast status="success" icon={IoMdCheckmarkCircleOutline} message={message} />);

export const notifyError = (message: string) =>
  toast(<BaseToast status="error" icon={IoClose} message={message} />);

export const notifyWarning = (message: string) =>
  toast(<BaseToast status="warning" icon={IoWarningOutline} message={message} />);

export const notifyInfo = (message: string) =>
  toast(<BaseToast status="info" icon={IoInformationCircleOutline} message={message} />);
