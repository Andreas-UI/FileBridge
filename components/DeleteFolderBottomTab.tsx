import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@/components/ui/text";
import { RootState } from "@/redux/store";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useDeleteFolder } from "@/api/folder";
import { disableMultiSelect } from "@/redux/slice/foldersSlice";

export const DeleteFolderBottomTab = () => {
  console.log("Rendering DeleteFolderBottomTab");

  const dispatch = useDispatch();

  const isMultiSelect = useSelector(
    (state: RootState) => state.folders.isMultiSelect
  );
  const folders = useSelector((state: RootState) => state.folders.folders);

  const selected_folder = Object.entries(folders)
    .filter(([key, value]) => value)
    .map(([key, value]) => Number(key));
  const selected_folders_count = Object.values(folders).filter(
    (folder) => folder
  ).length;

  const { mutate, isLoading } = useDeleteFolder();
  const folder_ids = selected_folder;
  const onSubmit = async () => {
    mutate(folder_ids, {
      onSuccess: () => {
        dispatch(disableMultiSelect());
      },
      onError: (error) => {
        console.error("Failed to create folder:", error);
      },
    });
  };

  // Initial is below the screen by 100px
  const translateY = useSharedValue(100);

  useEffect(() => {
    translateY.value = withTiming(isMultiSelect ? 0 : 100, {
      duration: 300,
    });
  }, [isMultiSelect]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: 1,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "#ddd",
        },
        animatedStyle,
      ]}
    >
      <Text className="text-lg font-light">
        {selected_folders_count > 0
          ? `${selected_folders_count} folders selected`
          : `Select a folder`}
      </Text>
      <Button
        action="negative"
        onPress={onSubmit}
        isDisabled={selected_folders_count === 0 || isLoading}
      >
        {isLoading ? (
          <>
            <ButtonSpinner />
            <ButtonText>Deleting...</ButtonText>
          </>
        ) : (
          <ButtonText>Delete</ButtonText>
        )}
      </Button>
    </Animated.View>
  );
};
