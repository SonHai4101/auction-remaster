import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAuctions = (query: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery({
    queryKey: [keys.auctions, { ...query }],
    queryFn: () => apiService.auction.getAllAuctions({ ...query }),
  });
};

export const useGetAuctionById = (id: string) => {
  return useQuery({
    queryKey: [keys.auction, id],
    queryFn: () => apiService.auction.getAuctionById({ id }),
  });
};
