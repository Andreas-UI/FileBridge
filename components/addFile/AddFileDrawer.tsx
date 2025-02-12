import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "../ui/drawer";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "../ui/button";
import { closeAddFileDrawer } from "@/redux/slice/addFileDrawerSlice";
import { Card } from "../ui/card";
import { FileStack, X } from "lucide-react-native";
import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";
import { FlashList } from "@shopify/flash-list";
import { Pressable, View } from "react-native";
import { HStack } from "../ui/hstack";
import { getFileIconByMimeType } from "@/utils/iconExtension";
import { formatkB } from "@/utils/formatkB";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { useCreateFile } from "@/api/file";

export const AddFileDrawer = () => {
  const dispatch = useDispatch();
  const addFileDrawerState = useSelector(
    (state: RootState) => state.addFileDrawer
  );

  const [selectedFiles, setSelectedFiles] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });

      if (result.canceled) return;

      setSelectedFiles((prevFiles) => [...prevFiles, ...result.assets]);
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const { mutate, isLoading } = useCreateFile();
  const onSubmit = () => {
    mutate(
      { folder_id: addFileDrawerState.folder_id, files: selectedFiles },
      {
        onSuccess: () => {
          dispatch(closeAddFileDrawer());
          setSelectedFiles([]);
        },
        onError: (error) => {
          console.error("Failed to create file:", error.message);
        },
      }
    );
  };

  return (
    <Drawer
      closeOnOverlayClick={false}
      isOpen={addFileDrawerState.isOpen}
      onClose={() => {
        dispatch(closeAddFileDrawer());
      }}
      size={selectedFiles.length > 0 ? "lg" : "md"}
      anchor="bottom"
    >
      <DrawerBackdrop />
      <DrawerContent className="flex-1" style={{ gap: 0 }}>
        <DrawerHeader>
          <Heading>Upload Files</Heading>
        </DrawerHeader>
        <View style={{ paddingTop: 12 }}>
          <VStack>
            <Pressable onPress={pickDocuments}>
              <Card
                variant="filled"
                style={{
                  paddingVertical: 36,
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderColor: "#a3a3a3",
                }}
                className="rounded-lg"
              >
                <Center className="gap-3">
                  <FileStack color={"#a3a3a3"} size={48} />
                  <Text className="text-md text-typography-400">
                    Press to browse files...
                  </Text>
                </Center>
              </Card>
            </Pressable>

            <Text
              style={{ alignSelf: "flex-end", paddingBottom: 0 }}
              className="text-right text-typography-400"
            >
              Maximum size: 50 MB
            </Text>
          </VStack>
        </View>
        <View className="flex-1" style={{ paddingVertical: 12 }}>
          <Text className="font-bold text-lg text-typography-950">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} Selected Files`
              : `Selected Files`}
          </Text>
          <FlashList
            ListEmptyComponent={() => (
              <View className="flex-1">
                <Text className="text-typography-400">
                  No files selected, browse files to get started.
                </Text>
              </View>
            )}
            data={selectedFiles}
            estimatedItemSize={10}
            keyExtractor={(item) => String(item.uri)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <HStack className="flex w-full gap-4 items-center py-2">
                {getFileIconByMimeType(item.mimeType || "", 26)}
                <VStack className="flex-1">
                  <Text
                    className="font-medium text-black"
                    size="md"
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {item.name}
                  </Text>
                  <Text>{formatkB(item.size || 0)}</Text>
                </VStack>
                <Button
                  variant="link"
                  onPress={() =>
                    setSelectedFiles(
                      selectedFiles.filter(
                        (selectedFile) => selectedFile.uri != item.uri
                      )
                    )
                  }
                >
                  <ButtonIcon as={X} />
                </Button>
              </HStack>
            )}
          />
        </View>
        <DrawerFooter className="gap-6">
          <Button
            isDisabled={isLoading}
            variant="outline"
            onPress={() => {
              dispatch(closeAddFileDrawer());
              setSelectedFiles([]);
            }}
            className="flex-1"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            isDisabled={selectedFiles.length === 0 || isLoading}
            onPress={onSubmit}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <ButtonSpinner />
                <ButtonText>Uploading...</ButtonText>
              </>
            ) : (
              <ButtonText>Upload</ButtonText>
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
