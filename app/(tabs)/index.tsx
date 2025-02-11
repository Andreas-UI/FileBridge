import { useFindAllFolder } from "@/api/folder";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { openfolderQRModal } from "@/redux/slice/folderQrModalSlice";
import { addFolder, clearFolders } from "@/redux/slice/foldersSlice";
import { RootState } from "@/redux/store";
import { getFileIconByMimeType } from "@/utils/iconExtension";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Equal, QrCode } from "lucide-react-native";
import React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();

  const { data: foldersData = [], isFetched } = useFindAllFolder();
  const selectFoldersData = useSelector(
    (state: RootState) => state.folders
  ).folders;

  useEffect(() => {
    dispatch(clearFolders());
    foldersData?.forEach((folder) => dispatch(addFolder(folder.id)));
  }, [isFetched]);

  return (
    <ParallaxScrollView>
      <View style={styles.view} className="bg-background-0">
        <View className="w-full items-center">
          <Equal color={"#d3d3d3"} />
        </View>
        <Text
          style={{
            marginLeft: 10,
          }}
          className="font-light"
          size="3xl"
        >
          Recent
        </Text>
        <Accordion
          variant="unfilled"
          type="multiple"
          defaultValue={["item-0", "item-1", "item-2"]}
        >
          {foldersData.map((folder, index) => (
            <React.Fragment key={index}>
              <AccordionItem value={`item-${index}`} className="rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <VStack>
                            <AccordionTitleText>
                              {folder.subject}
                            </AccordionTitleText>
                            <AccordionTitleText
                              style={{
                                fontWeight: "light",
                                fontSize: 12,
                              }}
                            >
                              {`${format(
                                new Date(folder.created_at),
                                "dd/MM/yyyy"
                              )} | ${folder.file_count} items`}
                            </AccordionTitleText>
                          </VStack>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUp} />
                          ) : (
                            <AccordionIcon as={ChevronDown} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent style={styles.gridContainer}>
                  <View style={styles.cardContainer}>
                    <Card size="lg" variant="ghost" style={styles.card}>
                      <Pressable
                        onPress={() =>
                          dispatch(
                            openfolderQRModal({
                              subject: folder.subject,
                              qrcode_url: folder.qrcode_url,
                            })
                          )
                        }
                      >
                        <QrCode color={"#535252"} size={26} />
                      </Pressable>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.text}
                      >
                        QR Code
                      </Text>
                    </Card>
                  </View>

                  {folder.files.slice(1).map((file) => (
                    <View key={file.id} style={styles.cardContainer}>
                      <Card size="lg" variant="ghost" style={styles.card}>
                        {getFileIconByMimeType(file.mime_type || "", 26)}
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.text}
                        >
                          {file.name.replace(`${folder.id}/`, "")}
                        </Text>
                      </Card>
                    </View>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <Divider className="my-4" />
            </React.Fragment>
          ))}
        </Accordion>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  cardContainer: {
    width: "25%",
    paddingHorizontal: 4,
  },
  card: {
    padding: 4,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
  },
});
