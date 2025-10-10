import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      auctionId: string;
      body: {
        amount: number;
        isAutoBid: boolean;
        maxAmount: number;
      };
    }) => apiService.bid.createBid(params.auctionId, params.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.bids] });
    },
  });
};

export const useGetBidByAuctionId = (
  auctionId: string,
  query: {
    page: number;
    limit: number;
  }
) => {
  return useQuery({
    queryKey: [keys.bids],
    queryFn: () => apiService.bid.getBidByAuctionId(auctionId, query),
  });
};
