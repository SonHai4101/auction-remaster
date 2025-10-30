import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useBuyerDashboard = () =>
  useQuery({
    queryKey: ["buyer-dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me/dashboard/buyer");
      return res.data; // { activeBids, wonAuctions }
    },
  });

export const useBuyerActiveBids = () => {
  const { data, ...rest } = useBuyerDashboard();
  return { data: data?.activeBids || [], ...rest };
};

export const useBuyerWins = () => {
  const { data, ...rest } = useBuyerDashboard();
  return { data: data?.wonAuctions || [], ...rest };
};


