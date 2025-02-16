import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { FileItem } from "@/components/FileItem";
import { useFindByIdFolder } from "@/api/folder";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react-native";
import { DownloadAllButton } from "@/components/DownloadAllButton";

export default function Index() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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
        <Button
          style={{ alignSelf: "flex-start", alignItems: "center" }}
          size="xl"
          className="w-fit"
          variant="link"
          onPress={() => router.back()}
        >
          <ButtonIcon as={ChevronLeft} />
          <ButtonText className="font-light text-xl">Back</ButtonText>
        </Button>
        <VStack>
          <Text className="font-light" size="xl">
            Subject
          </Text>
          <VStack>
            <Heading size="xl">{data?.subject}</Heading>
            {data?.description && (
              <Text className="font-normal" size="lg">
                {data?.description}
              </Text>
            )}
          </VStack>
        </VStack>
        <View className="flex-1">
          <Text className="font-light" size="xl">
            Attachments
          </Text>
          <FlashList
            data={data?.files.filter((file) => file.name != `${id}/qrcode.png`)}
            estimatedItemSize={10}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View className="h-10" />}
            renderItem={({ item }) => (
              <FileItem
                id={item.id}
                // TODO:: Data identity to be fixed
                folder={data?.id || 0}
                url={item.url}
                folder_subject={data?.subject || ""}
                name={item.name.replace(`${id}/`, "")}
                mime_type={item.mime_type}
                size_kb={item.size_kb}
                created_at={item.created_at}
                key={item.id}
                can_delete={false}
              />
            )}
          />
        </View>
      </View>
      {data && (
        <View style={styles.bottomView}>
          <DownloadAllButton folder={data} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    paddingTop: 36,
    gap: 16,
  },
  bottomView: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
