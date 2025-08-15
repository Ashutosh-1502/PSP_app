import {
  type UserLoginDataType,
  type UserRegisterDataType,
} from "@/modules/auth/types/index";
import apiClient from "@/lib/api";
import type { NSignUpApiResponseType } from "@/modules/auth/types/index";
import { useMutation } from "@tanstack/react-query";

const API_AUTH_URL = "/auth";

export const useAuthAPI = () => {

  const useLoginMutation = useMutation({
    mutationFn: async (userData: UserLoginDataType) => {
      const response = await apiClient.post<NSignUpApiResponseType>(
        `${API_AUTH_URL}/login`,
        userData
      );
      console.log(response);
      return response.data.data;
    },
  });

  const useRegisterMutation = useMutation({
    mutationFn: async (userData: UserRegisterDataType) => {
      const response = await apiClient.post<NSignUpApiResponseType>(
        `${API_AUTH_URL}/register`,
        userData
      );
      return response.data.data;
    },
  });

  return {
    useLoginMutation,
    useRegisterMutation,
  };
};
