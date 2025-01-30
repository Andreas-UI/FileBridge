import { File } from "@/redux/slice/foldersSlice";
import { Pressable } from "react-native-gesture-handler";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { formatkB } from "@/utils/formatkB";
import { getFileIconByMimeType } from "@/utils/iconExtension";

export const FileItem = ({
  file_name,
  mime_type,
  size_kb,
  upload_date,
}: File) => {
  return (
    <Pressable>
      <HStack className="flex w-full gap-4 items-center py-2">
        {getFileIconByMimeType(mime_type, 26)}
        <VStack className="flex-1">
          <Text className="font-medium text-black" size="md">
            {file_name}
          </Text>
          <HStack space="sm">
            <Text>{upload_date}</Text>
            <Text>|</Text>
            <Text>{formatkB(size_kb)}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
