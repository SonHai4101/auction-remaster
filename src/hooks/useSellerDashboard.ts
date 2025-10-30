import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useSellerDashboard = () =>
  useQuery({
    queryKey: ["seller-dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me/dashboard/seller");
      return res.data; // { currentListings, soldCount, totalRevenue, soldTransactions }
    },
  });

export const useSellerListings = () => {
  const { data, ...rest } = useSellerDashboard();
  return { data: data?.currentListings || [], ...rest };
};

export const useSellerSales = () => {
  const { data, ...rest } = useSellerDashboard();
  return { data: data?.soldTransactions || [], ...rest };
};

export const useSellerRevenue = () => {
  const { data, ...rest } = useSellerDashboard();
  return { data: {
    total: data?.totalRevenue || 0,
    last30Days: 0, // No support for this from backend currently
    average: data?.soldCount ? (data.totalRevenue / data.soldCount) : 0
  }, ...rest };
};


