import { useFindAllFolder } from "@/api/folder";
import { CreateFolderFAB } from "@/components/createFolder/CreateFolderFAB";
import { CreateFolderModal } from "@/components/createFolder/CreateFolderModal";
import { FolderItem } from "@/components/FolderItem";
import { TierCard } from "@/components/tierCard/TierCard";
import { TierCardModal } from "@/components/tierCard/TierCardModal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectSectionHeaderText,
  SelectTrigger,
} from "@/components/ui/select";
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
import { ChevronDownIcon, ListCheck, X } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
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

  const sort_by_labels = [
    {
      label: "Subject",
      value: "subject",
    },
    {
      label: "Created Date",
      value: "created_at",
    },
  ];
  const [sortBy, setSortBy] = useState<string>(sort_by_labels[0].value);
  const {
    data: foldersData = [],
    isFetched,
    isLoading,
    refetch,
  } = useFindAllFolder(sortBy);

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
        <HStack className="items-center text-center gap-1 justify-between">
          <Text className="font-light" size="xl">
            Sort by
          </Text>
          <Select
            defaultValue={sort_by_labels[0].value}
            initialLabel={sort_by_labels[0].label}
            onValueChange={(value) => {
              setSortBy(value);
              refetch();
            }}
          >
            <SelectTrigger size="md" variant="outline">
              <SelectInput
                placeholder="Select option"
                className="h-20 items-center text-center"
              />
              <SelectIcon className="mx-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {sort_by_labels.map((sort_by, index) => (
                  <SelectItem
                    key={index}
                    label={sort_by.label}
                    value={sort_by.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        {isLoading && <Text>Loading...</Text>}
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
