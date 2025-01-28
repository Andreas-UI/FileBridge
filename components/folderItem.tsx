import {
  enableMultiSelect,
  Folder as FolderType,
  selectFolder,
} from "@/redux/slice/foldersSlice";
import { RootState } from "@/redux/store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { HStack } from "./ui/hstack";
import { ChevronRight, Circle, CircleCheck, Folder } from "lucide-react-native";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";

export const FolderItem = ({
  is_selected,
  id,
  subject,
  description,
  created_date,
  last_modified,
  file_count,
}: FolderType) => {
  const dispatch = useDispatch();
  const isMultiSelect = useSelector(
    (state: RootState) => state.folders
  ).isMultiSelect;

  const listContainerScale = useSharedValue(1);
  const iconScale = useSharedValue(1);

  const longPress = Gesture.LongPress()
    .onBegin(() => {
      if (!isMultiSelect) {
        listContainerScale.value = withTiming(0.95, {
          duration: 500,
          easing: Easing.bezier(0.31, 0.04, 0.03, 1.04),
        });
      }
    })
    .onStart((e) => {
      if (!isMultiSelect) {
        try {
          console.log(`Long pressed for ${e.duration} ms on ${id}`);

          dispatch(enableMultiSelect());
          dispatch(selectFolder({ id }));

          listContainerScale.value = withTiming(1, {
            duration: 250,
            easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
          });
        } catch (error) {
          console.error("Error in long press dispatch:", id, error);
        }
      }
    })
    .onFinalize(() => {
      listContainerScale.value = withTiming(1, {
        duration: 250,
        easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
      });
    })
    .runOnJS(true);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onBegin(() => {
      if (isMultiSelect) {
        iconScale.value = withTiming(0.75, {
          duration: 500,
          easing: Easing.bezier(0.31, 0.04, 0.03, 1.04),
        });
      }
    })
    .onStart(() => {
      if (isMultiSelect) {
        console.log(`Single tap on ${id}`);

        dispatch(selectFolder({ id }));

        iconScale.value = withTiming(1, {
          duration: 250,
          easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
        });
      }
    })
    .onFinalize(() => {
      iconScale.value = withTiming(1, {
        duration: 250,
        easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
      });
    })
    .runOnJS(true);

  const listContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: listContainerScale.value }],
  }));

  const iconScaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(singleTap, longPress)}>
      <Animated.View style={[listContainerAnimatedStyle]}>
        <HStack className="flex w-full gap-4 items-center py-2">
          <Folder size={26} color={"#000000"} />
          <VStack className="flex-1">
            <Text className="font-medium text-black" size="md">
              {subject}
            </Text>
            <HStack space="sm">
              <Text>{last_modified}</Text>
              <Text>|</Text>
              <Text>{`${file_count} items`}</Text>
            </HStack>
          </VStack>

          {!isMultiSelect && <ChevronRight size={26} color={"#000000"} />}
          <Animated.View style={[iconScaleAnimatedStyle]}>
            {isMultiSelect &&
              (is_selected ? (
                <CircleCheck size={26} color={"#000000"} />
              ) : (
                <Circle size={26} color={"#000000"} />
              ))}
          </Animated.View>
        </HStack>
      </Animated.View>
    </GestureDetector>
  );
};
