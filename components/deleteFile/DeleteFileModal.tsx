import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import { Text } from "../ui/text";
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
import { closeDeleteFileModal } from "@/redux/slice/deleteFileModalSlice";
import { Heading } from "../ui/heading";
import { TriangleAlert } from "lucide-react-native";
import { useDeleteFiles } from "@/api/file";

export const DeleteFileModal = () => {
  const dispatch = useDispatch();
  const deleteFileModalState = useSelector(
    (state: RootState) => state.deleteFileModal
  );

  const { mutate, isLoading } = useDeleteFiles();
  const onSubmit = () => {
    mutate(
      {
        file_ids: deleteFileModalState.file_ids,
        folder_id: deleteFileModalState.folder_id,
      },
      {
        onSuccess: () => {
          dispatch(closeDeleteFileModal());
        },
        onError: (error) => {
          console.error("Failed to delete folder:", error);
        },
      }
    );
  };

  return (
    <Modal
      isOpen={deleteFileModalState.isOpen}
      onClose={() => {
        dispatch(closeDeleteFileModal());
      }}
      size="md"
      closeOnOverlayClick={!isLoading}
    >
      <ModalBackdrop />
      <ModalContent className="items-center justify-center">
        <ModalHeader className="flex-col gap-2">
          <TriangleAlert color={"#ef4444"} size={36} />
          <Heading size="lg">Delete File</Heading>
        </ModalHeader>
        <ModalBody>
          <Text className="text-typography-500 text-center">
            {`You're about to delete `}
            <Text className="font-bold">{`"${deleteFileModalState.file_name}"`}</Text>
            {` from `}
            <Text className="font-bold">{`"${deleteFileModalState.folder_subject}"`}</Text>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            className="flex-1"
            disabled={isLoading}
            onPress={() => {
              dispatch(closeDeleteFileModal());
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button className="flex-1" disabled={isLoading} onPress={onSubmit}>
            {isLoading ? (
              <>
                <ButtonSpinner />
                <ButtonText>Deleting...</ButtonText>
              </>
            ) : (
              <ButtonText>Delete</ButtonText>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
