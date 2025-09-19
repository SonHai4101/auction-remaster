import type { Auction, User } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

export const apiService = {
  user: {
    getUser: (): Promise<User> => axiosInstance.get("/auth/me"),
  },
//   auction: {
//     getAllAuctions: () 
//   }


  admin: {
    createAuction: (query: {
        title: string,
        description: string,
        startPrice: number,
        buyNowPrice: number,
        startTime: string,
        endTime: string,
        productId: string
    }): Promise<Auction> => axiosInstance.post("auctions/", {params: query})
  }
};
