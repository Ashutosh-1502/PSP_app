import apiClient from "@/lib/api";
import type { GetAllNotificationType } from "@/modules/announcement/types/index";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_USER_URL = "/announcements";

export const useAnnouncementAPI = () => {
  const useGetAllNotificationQuery = (options = {}) => {
    return useQuery({
      queryKey: ["notifications"],
      queryFn: async () => {
        const res = await apiClient.get<GetAllNotificationType>(
          `${API_USER_URL}`
        );
        console.log(res);
        return res.data.data;
      },
      ...options,
    });
  };

  const useUserManageNotificationAPI = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      try {
        const res = await apiClient.post(
          `${API_USER_URL}/manage-announcements/${id}/${userId}`
        );
        return res;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return {
    useUserManageNotificationAPI,
    useGetAllNotificationQuery,
  };
};
