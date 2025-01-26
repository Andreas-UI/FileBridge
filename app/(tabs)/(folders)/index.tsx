import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ChevronRight, Folder } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

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
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Create Folder</FabLabel>
      </Fab>
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
