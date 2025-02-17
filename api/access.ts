import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

// Decrypt API
const decrypt = async (enc: string): Promise<string> => {
  const response = await api.post<string>("/folder/files/access/decrypt", {
    enc: enc,
  });
  return response.data;
};

export const useDecrypt = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: decrypt,
  });
};

// Check if this user exist
export const userExist = async (): Promise<string> => {
  const response = await api.get("/auth/user");
  return response.data;
};

// Send magic link
export const sendMagicLink = async (email: string): Promise<void> => {
  await api.post("/auth/magic-link", { email: email });
};

export const logOut = async (): Promise<void> => {
  await api.post("/auth/log-out");
};
