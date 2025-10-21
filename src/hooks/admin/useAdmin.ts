import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      title: string;
      description: string;
      startPrice: number;
      buyNowPrice: number;
      startTime: string;
      endTime: string;
      productId: string;
    }) => apiService.admin.createAuction({ ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.auctions] });
    },
  });
};

export const useUpdateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      auctionId: string;
      body: {
        title: string;
        description: string;
        startPrice: number;
        buyNowPrice: number;
        startTime: string;
        endTime: string;
        productId: string;
      };
    }) => apiService.admin.updateAuction(params.auctionId, params.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.auctions] });
    },
  });
};

export const useDeleteAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (auctionId: string) =>
      apiService.admin.deleteAuction(auctionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.auctions] });
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [keys.categories],
    queryFn: () => apiService.admin.getAllCategories(),
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: [keys.category],
    queryFn: () => apiService.admin.getCategoryById({ id }),
  });
};

export const useGetProductsByCategoryId = (id: string) => {
  return useQuery({
    queryKey: [keys.products, id],
    queryFn: () => apiService.admin.getProductsByCategoryId({ id }),
  });
};

export const useGetAuctionsByCategoryId = (id: string) => {
  return useQuery({
    queryKey: [keys.auctions, id],
    queryFn: () => apiService.admin.getAuctionsByCategoryId({ id }),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string; description: string }) =>
      apiService.admin.createCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.categories] });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [keys.users],
    queryFn: () => apiService.admin.getUsers(),
  });
};

export const useChangeAuctionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { auctionId: string; body: { status: string } }) =>
      apiService.admin.changeAuctionStatus(params.auctionId, params.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.auctions] });
    },
  });
};
