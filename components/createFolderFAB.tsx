import { useDispatch } from "react-redux";
import { Fab, FabIcon, FabLabel } from "./ui/fab";
import { openCreateFolderModal } from "@/redux/slice/createFolderModalSlice";
import { AddIcon } from "./ui/icon";

export const CreateFolderFAB = () => {
  const dispatch = useDispatch();
  return (
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
      onPress={() => dispatch(openCreateFolderModal())}
    >
      <FabIcon as={AddIcon} />
      <FabLabel>Create Folder</FabLabel>
    </Fab>
  );
};
