import { Button, ButtonText } from "@/components/ui/button";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import {
  closeCreateFolderModal,
  openCreateFolderModal,
} from "@/redux/slice/createFolderModalSlice";
import { RootState } from "@/redux/store";
import { ChevronRight, Folder } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const FolderItem = () => (
  <HStack className="flex w-full gap-4 items-center py-2">
    <Folder size={26} color={"#000000"} />
    <VStack className="flex-1">
      <Text className="font-medium text-black" size="md">
        Restaurant Launching Brochure
      </Text>
      <HStack space="sm">
        <Text>01/01/2025</Text>
        <Text>|</Text>
        <Text>5 items</Text>
      </HStack>
    </VStack>
    <ChevronRight size={26} color={"#000000"} />
  </HStack>
);

const CreateFolderFAB = () => {
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

const CreateFolderModal = () => {
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

export default function Index() {
  return (
    <>
      <View style={styles.view}>
        <Text className="font-light" size="3xl">
          Folders
        </Text>
        <VStack space="xs">
          <Text className="font-medium" size="sm">
            Sort by: Date
          </Text>
          <VStack>
            <FolderItem />
            <FolderItem />
            <FolderItem />
            <FolderItem />
            <FolderItem />
            <FolderItem />
            <FolderItem />
            <FolderItem />
          </VStack>
          <Text
            className="font-normal text-center text-typography-500"
            size="sm"
          >
            2 folders left
          </Text>
        </VStack>
      </View>
      <CreateFolderFAB />
      <CreateFolderModal />
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    gap: 16,
    backgroundColor: "white",
  },
});
