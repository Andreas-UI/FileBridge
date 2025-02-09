import { enableMultiSelect, selectFolder } from "@/redux/slice/foldersSlice";
import { RootState } from "@/redux/store";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
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
import { useRouter } from "expo-router";
import { Folder as FolderType } from "@/api/api.types";
import { format } from "date-fns";
import React from "react";

const FolderItemCheck = React.memo(({ id }: { id: FolderType["id"] }) => {
  console.log(`Rendering FolderItemCheck ${id}`);
  const is_selected = useSelector(
    (state: RootState) => state.folders.folders[id] || false
  );
  if (is_selected) {
    return <CircleCheck size={26} color={"#535252"} />;
  }
  return <Circle size={26} color={"#535252"} />;
});

export const FolderItem = React.memo(
  ({
    id,
    subject,
    created_at,
    file_count,
  }: Omit<
    FolderType,
    "description" | "created_date" | "user" | "qrcode_url" | "files"
  > & {
    file_count: number;
  }) => {
    console.log(`Rendering FolderItem ${id}`);
    const router = useRouter();

    const dispatch = useDispatch();
    const isMultiSelect = useSelector(
      (state: RootState) => state.folders.isMultiSelect
    );

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
            dispatch(enableMultiSelect());
            dispatch(selectFolder(id));

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
          dispatch(selectFolder(id));
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
          <Pressable
            onPress={() => {
              if (!isMultiSelect) {
                router.push({
                  pathname: "/folder/[id]",
                  params: { id: id },
                });
              }
            }}
          >
            <HStack className="flex w-full gap-4 items-center py-2">
              <Folder size={26} color={"#535252"} />
              <VStack className="flex-1">
                <Text className="font-medium text-black" size="md">
                  {subject}
                </Text>
                <HStack space="sm">
                  <Text>{format(new Date(created_at), "dd/MM/yyyy")}</Text>
                  <Text>|</Text>
                  <Text>{`${file_count} items`}</Text>
                </HStack>
              </VStack>

              {isMultiSelect ? (
                <Animated.View style={[iconScaleAnimatedStyle]}>
                  <FolderItemCheck id={id} />
                </Animated.View>
              ) : (
                <ChevronRight size={26} color={"#535252"} />
              )}
            </HStack>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    );
  }
);
