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
} from "../ui/modal";
import { closeCreateFolderModal } from "@/redux/slice/createFolderModalSlice";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { VStack } from "../ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Input, InputField } from "../ui/input";
import { Textarea, TextareaInput } from "../ui/textarea";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { CreateFolder } from "@/api/api.types";
import { useCreateFolder } from "@/api/folder";

const SubjectInputField = () => {
  const { control } = useFormContext();
  return (
    <FormControl>
      <FormControlLabel>
        <FormControlLabelText>Subject</FormControlLabelText>
      </FormControlLabel>
      <Input variant="outline">
        <Controller
          rules={{
            required: "Subject is required",
          }}
          control={control}
          name="subject"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <>
              <InputField
                placeholder="This is my first folder..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {fieldState.error && (
                <FormControlError>
                  <FormControlErrorText>
                    {fieldState.error.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </>
          )}
        />
      </Input>
      <FormControlHelper>
        <FormControlHelperText>
          You cannot change the subject in the future.
        </FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
};

const DescriptionInputField = () => {
  const { control } = useFormContext();
  return (
    <FormControl>
      <FormControlLabel>
        <FormControlLabelText>Description (optional)</FormControlLabelText>
      </FormControlLabel>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea>
            <TextareaInput
              textAlignVertical="top"
              placeholder="I hope you like our product..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </Textarea>
        )}
      />
      <FormControlHelper>
        <FormControlHelperText>
          You cannot change the description in the future
        </FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
};

export const CreateFolderModal = () => {
  const dispatch = useDispatch();
  const createFolderModalState = useSelector(
    (state: RootState) => state.createFolderModal
  );

  const { mutate, isLoading } = useCreateFolder();

  const formMethods = useForm<CreateFolder>({
    defaultValues: {
      subject: undefined,
      description: undefined,
    },
  });
  const { handleSubmit, reset } = formMethods;
  const onSubmit: SubmitHandler<CreateFolder> = async (data) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeCreateFolderModal());
        reset();
      },
      onError: (error) => {
        console.error("Failed to create folder:", error);
      },
    });
  };

  const onError: SubmitErrorHandler<CreateFolder> = (errors) =>
    console.log(errors);

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
          <ModalCloseButton disabled={isLoading}>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <FormProvider {...formMethods}>
          <ModalBody>
            <VStack space="md">
              <SubjectInputField />
              <DescriptionInputField />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={isLoading}
              variant="outline"
              action="secondary"
              onPress={() => {
                dispatch(closeCreateFolderModal());
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={handleSubmit(onSubmit, onError)}
              isDisabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ButtonSpinner />
                  <ButtonText>Creating...</ButtonText>
                </>
              ) : (
                <ButtonText>Create</ButtonText>
              )}
            </Button>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};
