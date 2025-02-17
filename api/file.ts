import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { CreateFile, DeleteFiles, File } from "./api.types";
import * as FileSystem from "expo-file-system";

import { File as FileType } from "./api.types";

// Create File API
const createFile = async (data: CreateFile): Promise<FileType[]> => {
  const formData = new FormData();
  formData.append("folder_id", String(data.folder_id));

  for (const file of data.files) {
    const fileInfo = await FileSystem.getInfoAsync(file.uri);

    if (!fileInfo.exists) {
      console.error("File does not exist:", file.uri);
      continue;
    }

    const fileBlob = {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    };

    formData.append("files", fileBlob as any);
  }

  const response = await api.post<FileType[]>("/api/file/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const useCreateFile = () => {
  const queryClient = useQueryClient();

  return useMutation<FileType[], Error, CreateFile>({
    mutationFn: createFile,
    onSuccess: async (newFiles) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["folder", newFiles[0].folder],
        }),
        queryClient.invalidateQueries({ queryKey: ["folders"] }),
      ]);
    },
  });
};

// Delete File API
const deleteFiles = async (data: DeleteFiles): Promise<void> => {
  await api.post("/api/file/delete", { file_ids: data.file_ids });
};

export const useDeleteFiles = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteFiles>({
    mutationFn: deleteFiles,
    onSuccess: async (_, { folder_id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["folder", folder_id],
        }),
        queryClient.invalidateQueries({ queryKey: ["folders"] }), // Refresh folder list
      ]);
    },
  });
};
