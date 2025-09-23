import type { Auction, Pagination, User } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

export const apiService = {
  user: {
    getUser: (): Promise<User> => axiosInstance.get("/auth/me"),
  },
  //   auction: {
  //     getAllAuctions: ()
  //   }

  admin: {
    createAuction: (body: {
      title: string;
      description: string;
      startPrice: number;
      buyNowPrice: number;
      startTime: string;
      endTime: string;
      productId: string;
    }) => axiosInstance.post("auctions/", body),
  },

  auction: {
    getAllAuctions: (query: {
      page: number;
      limit: number;
      category?: string;
      search?: string;
      sortBy?: string;
      sortOrder?: string;
    }): Promise<{
      data: Auction;
      pagination: Pagination;
    }> => axiosInstance.get("auctions", { params: query }),

    getAuctionById: (params: { id: string }): Promise<Auction> =>
      axiosInstance.get(`auctions/${params.id}`),
  },
};
