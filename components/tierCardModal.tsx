import { Button, ButtonText } from "./ui/button";
import { CloseIcon, Icon } from "./ui/icon";
import { Text } from "./ui/text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeTierCardModal } from "@/redux/slice/tierCardModalSlice";
import { Heading } from "./ui/heading";

export const TierCardModal = () => {
  const dispatch = useDispatch();
  const tierCardModalState = useSelector(
    (state: RootState) => state.tierCardModal
  );
  return (
    <Modal
      isOpen={tierCardModalState.isOpen}
      onClose={() => {
        dispatch(closeTierCardModal());
      }}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Limited Features on Free Tier
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
            Our platform currently offers features within the free tier only. A
            Pro tier with enhanced capabilities will be available soon. In the
            meantime, enjoy the limited features provided.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => {
              dispatch(closeTierCardModal());
            }}
          >
            <ButtonText>I Understand</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
