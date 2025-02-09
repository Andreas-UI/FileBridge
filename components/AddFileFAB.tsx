import { Fab, FabIcon, FabLabel } from "./ui/fab";
import { AddIcon } from "./ui/icon";

export const AddFileFAB = () => {
  return (
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
    >
      <FabIcon as={AddIcon} />
      <FabLabel>Add File</FabLabel>
    </Fab>
  );
};
