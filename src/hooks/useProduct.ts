import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      categoryId: string;
      title: string;
      description: string;
      images: string[];
    }) => apiService.products.createProduct({ ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.categories] });
      queryClient.invalidateQueries({ queryKey: [keys.products] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      apiService.products.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.products] });
      queryClient.invalidateQueries({ queryKey: [keys.categories] });
    },
  });
};
