import { useDispatch } from "react-redux";
import { Fab, FabIcon, FabLabel } from "../ui/fab";
import { AddIcon } from "../ui/icon";
import { openAddFileDrawer } from "@/redux/slice/addFileDrawerSlice";
import { Folder as FolderType } from "@/api/api.types";

export const AddFileFAB = ({ folder_id }: { folder_id: FolderType["id"] }) => {
  const dispatch = useDispatch();
  return (
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
      onPress={() => dispatch(openAddFileDrawer(folder_id))}
    >
      <FabIcon as={AddIcon} />
      <FabLabel>Add File</FabLabel>
    </Fab>
  );
};
