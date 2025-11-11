import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllNotifications = (query: {
  page?: number;
  limit?: number;
  isRead?: boolean;
}) => {
  return useQuery({
    queryKey: [keys.notification, { ...query }],
    queryFn: () => apiService.notification.getAllNotifications({ ...query }),
  });
};

export const useRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiService.notification.read(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.notification] });
    },
  });
};

export const useReadAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiService.notification.readAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.notification] });
    },
  });
};
