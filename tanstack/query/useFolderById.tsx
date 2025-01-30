import { useQuery } from "@tanstack/react-query";
import { fetchFolderById } from "../api/folderById";

export const useFolderById = (id: string | string[]) => {
  const folderId = Array.isArray(id) ? id[0] : id;
  return useQuery({
    queryKey: ["folder", id],
    queryFn: () => fetchFolderById(folderId),
    staleTime: 5 * 60 * 1000,
  });
};
