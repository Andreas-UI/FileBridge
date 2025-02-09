import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { FileItem } from "@/components/FileItem";
import { AddFileFAB } from "@/components/AddFileFAB";
import { useFindByIdFolder } from "@/api/folder";
import { FolderSummaryCard } from "@/components/folderSummary/FolderSummaryCard";
import { FolderQrModal } from "@/components/folderSummary/FolderQRModal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { id } = useLocalSearchParams();

  const { data, error, isLoading } = useFindByIdFolder(Number(id));

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-background-0"
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.view} className="bg-background-0">
        <FolderSummaryCard />
        <VStack>
          <Text className="font-light" size="sm">
            Subject
          </Text>
          <VStack>
            <Heading size="lg">{data?.subject}</Heading>
            <Text className="font-normal" size="md">
              {data?.description}
            </Text>
          </VStack>
        </VStack>
        <View className="flex-1">
          <Text className="font-medium" size="sm">
            Files:
          </Text>
          <FlashList
            data={data?.files}
            estimatedItemSize={10}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <FileItem
                id={item.id}
                name={item.name.replace(`${id}/`, "")}
                mime_type={item.mime_type}
                size_kb={item.size_kb}
                created_at={item.created_at}
                key={item.id}
              />
            )}
          />
        </View>
      </View>

      {/* TODO:: FAB not showing */}
      <AddFileFAB />

      <FolderQrModal subject={data?.subject} />
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
