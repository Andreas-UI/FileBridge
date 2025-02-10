import { useFindAllFolder } from "@/api/folder";
import { CreateFolderFAB } from "@/components/createFolder/CreateFolderFAB";
import { CreateFolderModal } from "@/components/createFolder/CreateFolderModal";
import { FolderItem } from "@/components/FolderItem";
import { TierCard } from "@/components/tierCard/TierCard";
import { TierCardModal } from "@/components/tierCard/TierCardModal";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  addFolder,
  clearFolders,
  disableMultiSelect,
  selectAllFolder,
} from "@/redux/slice/foldersSlice";
import { RootState } from "@/redux/store";
import { FlashList } from "@shopify/flash-list";
import { Stack, useFocusEffect } from "expo-router";
import { ListCheck, X } from "lucide-react-native";
import React, { useCallback, useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const useMultiSelectBackHandler = (isMultiSelect: boolean) => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isMultiSelect) {
          dispatch(disableMultiSelect());
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isMultiSelect])
  );
};

export default function Index() {
  console.log("Rendering (Folder)");
  const dispatch = useDispatch();

  const { data: foldersData = [], isFetched } = useFindAllFolder();

  useEffect(() => {
    dispatch(clearFolders());
    foldersData?.forEach((folder) => dispatch(addFolder(folder.id)));
    console.log("FETCHED");
  }, [isFetched]);

  const isMultiSelect = useSelector(
    (state: RootState) => state.folders.isMultiSelect
  );

  useMultiSelectBackHandler(isMultiSelect);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: ({}) => {
            if (isMultiSelect) {
              return (
                <Button
                  onPress={() => dispatch(disableMultiSelect())}
                  size="xl"
                  variant="link"
                  className="rounded-full p-3.5"
                >
                  <X color={"black"} />
                </Button>
              );
            }
          },
          headerRight: ({}) => {
            if (isMultiSelect) {
              return (
                <Button
                  onPress={() => dispatch(selectAllFolder())}
                  size="xl"
                  variant="link"
                  className="rounded-full p-3.5"
                >
                  <ListCheck color={"black"} />
                </Button>
              );
            }
          },
        }}
      />
      <View style={styles.view} className="bg-background-0">
        <Text className="font-light" size="3xl">
          Folders
        </Text>
        <TierCard total_folders={foldersData.length} />
        {/* TODO:: Make this workable */}
        <Text className="font-medium" size="md">
          Sort by: Date
        </Text>
        {foldersData.length < 0 ? (
          <Text> No folders created. </Text>
        ) : (
          <FlashList
            data={foldersData}
            estimatedItemSize={10}
            ListFooterComponent={
              <Text
                className="font-normal text-center text-typography-500 mb-10"
                size="sm"
              >
                {`${10 - foldersData.length} folders left`}
              </Text>
            }
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <FolderItem
                id={item.id}
                file_count={item.file_count - 1}
                created_at={item.created_at}
                subject={item.subject}
                key={item.id}
              />
            )}
            extraData={isMultiSelect}
          />
        )}
      </View>

      {/* Create New Folder Components */}
      {!isMultiSelect && foldersData.length < 100 && (
        <>
          <CreateFolderFAB />
          <CreateFolderModal />
        </>
      )}

      {/* Tier Card Components */}
      <TierCardModal />
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    gap: 16,
  },
});
