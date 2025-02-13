import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

// Decrypt API
const decrypt = async (enc: string): Promise<string> => {
  const response = await api.post<string>("/folder/files/access/decrypt", { enc: enc });
  return response.data;
};

export const useDecrypt = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: decrypt,
  });
};
