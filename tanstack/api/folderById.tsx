import { foldersDummyData } from "@/dummy_data/folders";
import { Folder } from "@/redux/slice/foldersSlice";

export const fetchFolderById = async (
  id: string
): Promise<Folder> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const folder = foldersDummyData.find((folder) => folder.id === id);
      if (folder === undefined) {
        throw new Error("Folder not Found");
      }
      resolve(folder);
    }, 1000);
  });
};
