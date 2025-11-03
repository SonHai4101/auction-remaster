import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllSellRequest = () => {
  return useQuery({
    queryKey: [keys.sellRequest],
    queryFn: () => apiService.sellRequest.getAllSellRequest(),
  });
};

export const useCreateSellRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      productName: string;
      description: string;
      categoryId: string;
      condition: string;
      startPrice: number;
      buyNowPrice: number;
      duration: string;
      images?: string[];
    }) => apiService.sellRequest.createSellRequest({ ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.sellRequest] });
    },
  });
};
