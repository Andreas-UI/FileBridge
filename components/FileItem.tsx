import { Pressable } from "react-native-gesture-handler";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { formatkB } from "@/utils/formatkB";
import { getFileIconByMimeType } from "@/utils/iconExtension";
import { File as FileType, Folder as FolderType } from "@/api/api.types";
import { format } from "date-fns";

import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { openDeleteFileModal } from "@/redux/slice/deleteFileModalSlice";
import { openDocument } from "@/utils/openDocument";

const SwipeableRightAction = (
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  folder_id: FolderType["id"],
  folder_subject: FolderType["subject"],
  file_id: FileType["id"],
  file_name: FileType["name"]
) => {
  const dispatch = useDispatch();

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 70 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, { backgroundColor: "#ef4444" }]}>
      <Pressable
        onPress={() =>
          dispatch(
            openDeleteFileModal({
              folder_id: folder_id,
              folder_subject: folder_subject,
              file_name: file_name,
              file_ids: [file_id],
            })
          )
        }
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 70,
          height: "100%",
          borderRadius: 5,
        }}
      >
        <Trash color={"#FFFFFF"} size={24} />
      </Pressable>
    </Reanimated.View>
  );
};

export const FileItem = ({
  folder,
  folder_subject,
  name,
  url,
  mime_type,
  size_kb,
  created_at,
  id,
  can_delete = true,
}: Omit<FileType, "user"> & {
  folder_subject: FolderType["subject"];
  can_delete?: boolean;
}) => {
  const content = (
    <Pressable onPress={() => openDocument(url, mime_type || "")}>
      <HStack className="flex w-full gap-4 items-center py-2">
        {getFileIconByMimeType(mime_type || "", 26)}
        <VStack className="flex-1">
          <Text size="md" className="font-medium" numberOfLines={2} ellipsizeMode="middle">
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

  if (can_delete) {
    return (
      <ReanimatedSwipeable
        renderRightActions={(progress, drag) =>
          SwipeableRightAction(progress, drag, folder, folder_subject, id, name)
        }
        rightThreshold={40}
        friction={2}
      >
        {content}
      </ReanimatedSwipeable>
    );
  }
  return content;
};
