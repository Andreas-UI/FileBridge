import { Button, ButtonText } from "../ui/button";
import { CloseIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Heading } from "../ui/heading";
import { closefolderQRModal } from "@/redux/slice/folderQrModalSlice";
import { Folder as FolderType } from "@/redux/slice/foldersSlice";

export const FolderQrModal = ({
  subject,
}: {
  subject?: FolderType["subject"];
}) => {
  const dispatch = useDispatch();
  const folderQrModalState = useSelector(
    (state: RootState) => state.folderQrModal
  );
  return (
    <Modal
      isOpen={folderQrModalState.isOpen}
      onClose={() => {
        dispatch(closefolderQRModal());
      }}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {subject}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" className="text-typography-500">
            QRCode Picture Here
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              dispatch(closefolderQRModal());
            }}
          >
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
