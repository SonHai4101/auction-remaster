import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpload = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { files: File[] }) =>
      apiService.default.upload({ ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.files] });
      queryClient.invalidateQueries({ queryKey: [keys.products] });
    },
  });
};

export const useDelete = (imageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiService.default.delete(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.files]})
      queryClient.invalidateQueries({ queryKey: [keys.products]})
    }
  })
}
