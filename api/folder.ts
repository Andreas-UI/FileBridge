import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { CreateFolder, Folder } from "./api.types";

// Create Folder API
const createFolder = async (data: CreateFolder): Promise<Folder> => {
  const response = await api.post<Folder>("/api/folder/create", data);
  return response.data;
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<Folder, Error, CreateFolder>({
    mutationFn: createFolder,
    onSuccess: (newFolder) => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

// Find All Folder API
const findAllFolder = async (): Promise<Folder[]> => {
  const response = await api.get<Folder[]>("/api/folder/findAll");
  return response.data;
};

export const useFindAllFolder = () => {
  return useQuery<Folder[], Error>({
    queryFn: findAllFolder,
    queryKey: ["folders"],
  });
};

// Find Folder By ID API
const findByIdFolder = async (folder_id: Folder["id"]): Promise<Folder> => {
  const response = await api.get<Folder>("/api/folder/findById", {
    params: { id: folder_id },
  });
  return response.data;
};

export const useFindByIdFolder = (folder_id: Folder["id"]) => {
  return useQuery<Folder, Error>({
    queryFn: () => findByIdFolder(folder_id),
    queryKey: ["folder", folder_id],
  });
};

// Delete Folder API
const deleteFolder = async (folder_ids: Folder["id"][]): Promise<void> => {
  await api.post("/api/folder/delete", { folder_ids: folder_ids });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Folder["id"][]>({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] }); // Refresh folder list
    },
  });
};
