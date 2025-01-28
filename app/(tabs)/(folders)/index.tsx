import { CreateFolderFAB } from "@/components/createFolderFAB";
import { CreateFolderModal } from "@/components/createFolderModal";
import { FolderItem } from "@/components/folderItem";
import { TierCard } from "@/components/tierCard";
import { TierCardModal } from "@/components/tierCardModal";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { foldersDummyData } from "@/dummy_data/folders";
import {
  addFolder,
  clearFolders,
  disableMultiSelect,
  selectAllFolder,
} from "@/redux/slice/foldersSlice";
import { RootState } from "@/redux/store";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { ListCheck, X } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();

  const foldersData = useSelector((state: RootState) => state.folders).folders;
  const total_folders = useSelector(
    (state: RootState) => state.folders
  ).total_folders;
  const isMultiSelect = useSelector(
    (state: RootState) => state.folders
  ).isMultiSelect;

  useEffect(() => {
    dispatch(clearFolders());
    foldersDummyData.forEach((folder) => dispatch(addFolder(folder)));
  }, []);

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
        <TierCard />
        <Text className="font-medium" size="md">
          Sort by: Date
        </Text>
        <FlashList
          data={foldersData}
          estimatedItemSize={10}
          ListFooterComponent={
            <Text
              className="font-normal text-center text-typography-500"
              size="sm"
            >
              {`${10 - total_folders} folders left`}
            </Text>
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FolderItem
              id={item.id}
              created_date={item.created_date}
              description={item.description}
              file_count={item.file_count}
              is_selected={item.is_selected}
              last_modified={item.last_modified}
              subject={item.subject}
              key={item.id}
            />
          )}
        />
      </View>

      {/* Create New Folder Components */}
      {!isMultiSelect && total_folders < 10 && (
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
