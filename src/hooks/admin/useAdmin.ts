import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

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
