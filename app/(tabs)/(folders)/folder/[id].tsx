import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useFolderById } from "@/tanstack/query/useFolderById";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { FolderSummaryCard } from "@/components/folderSummary/folderSummaryCard";
import React from "react";
import { FolderQrModal } from "@/components/folderSummary/folderQRModal";
import { FlashList } from "@shopify/flash-list";
import { FileItem } from "@/components/fileItem";
import { AddFileFAB } from "@/components/addFileFAB";

export default function Index() {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useFolderById(id);

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
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <FileItem
                id={item.id}
                file_name={item.file_name}
                mime_type={item.mime_type}
                size_kb={item.size_kb}
                upload_date={item.upload_date}
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
