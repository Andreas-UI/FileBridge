import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";
import { closeCreateFolderModal } from "@/redux/slice/createFolderModalSlice";
import { Heading } from "./ui/heading";
import { CloseIcon, Icon } from "./ui/icon";
import { VStack } from "./ui/vstack";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { Input, InputField } from "./ui/input";
import { Textarea, TextareaInput } from "./ui/textarea";
import { Button, ButtonText } from "./ui/button";

export const CreateFolderModal = () => {
  const dispatch = useDispatch();
  const createFolderModalState = useSelector(
    (state: RootState) => state.createFolderModal
  );
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={createFolderModalState.isOpen}
      onClose={() => {
        dispatch(closeCreateFolderModal());
      }}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Create a Folder
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
          <VStack space="md">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Subject</FormControlLabelText>
              </FormControlLabel>
              <Input variant="outline">
                <InputField placeholder="This is my first folder..." />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  You cannot change the subject in the future.
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>
                  Description (optional)
                </FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput
                  textAlignVertical="top"
                  placeholder="I hope you like our product..."
                />
              </Textarea>
              <FormControlHelper>
                <FormControlHelperText>
                  You cannot change the description in the future
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              dispatch(closeCreateFolderModal());
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={() => {
              dispatch(closeCreateFolderModal());
            }}
          >
            <ButtonText>Create</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
