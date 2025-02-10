import { Button, ButtonText } from "../ui/button";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Heading } from "../ui/heading";
import { closefolderQRModal } from "@/redux/slice/folderQrModalSlice";
import { Folder as FolderType } from "@/api/api.types";
import { Image } from "../ui/image";
import { Center } from "../ui/center";

export const FolderQrModal = ({
  subject,
  qrcode_url,
}: {
  subject?: FolderType["subject"];
  qrcode_url?: FolderType["qrcode_url"];
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
        <Center>
          <ModalHeader>
            <Heading size="lg" className="text-typography-950">
              {subject}
            </Heading>
          </ModalHeader>
          <ModalBody>
            {qrcode_url && (
              <Image
                size="2xl"
                source={{
                  uri: qrcode_url,
                }}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full"
              onPress={() => {
                dispatch(closefolderQRModal());
              }}
            >
              <ButtonText>Close</ButtonText>
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};
