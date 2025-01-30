import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openTierCardModal } from "@/redux/slice/tierCardModalSlice";

export const TierCard = () => {
  const dispatch = useDispatch();
  const total_folders = useSelector(
    (state: RootState) => state.folders.total_folders
  );
  return (
    <Card size="md" variant="outline">
      <HStack className="items-center">
        <VStack className="flex-1">
          <Heading size="md" className="mb-1">
            Free Plan
          </Heading>
          <Text size="sm">{`${
            10 - total_folders
          } Folders Remaining - ${total_folders}/10`}</Text>
        </VStack>
        <Button onPress={() => dispatch(openTierCardModal())}>
          <ButtonText>Upgrade</ButtonText>
        </Button>
      </HStack>
    </Card>
  );
};
