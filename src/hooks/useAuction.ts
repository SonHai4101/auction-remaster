import { keys } from "@/constants/keys";
import type { Auction } from "@/constants/types";
import { apiService } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetAllAuctions = (query: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  status?: string;
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

export const useEndingSoonAuctions = (
  auctions: Auction[] | undefined,
  thresholdHours = 1
) => {
  const endingSoon = useMemo(() => {
    if (!auctions) return[];
    const now = Date.now();
    const thresholdMs = thresholdHours * 60 * 60 * 1000;

    return auctions.filter((auction) => {
      const endTime = new Date(auction.endTime).getTime();
      return endTime > now && endTime - now <= thresholdMs;
    })
  }, [auctions, thresholdHours])

  return endingSoon;
}
