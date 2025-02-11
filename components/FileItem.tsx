import { Pressable } from "react-native-gesture-handler";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { formatkB } from "@/utils/formatkB";
import { getFileIconByMimeType } from "@/utils/iconExtension";
import { File } from "@/api/api.types";
import { format } from "date-fns";

export const FileItem = ({
  name,
  mime_type,
  size_kb,
  created_at,
}: Omit<File, "folder" | "user" | "url">) => {
  return (
    <Pressable>
      <HStack className="flex w-full gap-4 items-center py-2">
        {getFileIconByMimeType(mime_type || "", 26)}
        <VStack className="flex-1">
          <Text
            className="font-medium text-black"
            size="md"
            numberOfLines={2}
            ellipsizeMode="middle"
          >
            {name}
          </Text>
          <HStack space="sm">
            <Text>{format(new Date(created_at), "dd/MM/yyyy")}</Text>
            <Text>|</Text>
            <Text>{formatkB(size_kb || 0)}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
