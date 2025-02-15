import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { QrCode } from "lucide-react-native";
import { openFolderQRModal } from "@/redux/slice/folderQrModalSlice";
import { Folder as FolderType } from "@/api/api.types";

export const FolderSummaryCard = ({
  subject,
  qrcode_url,
}: {
  subject: FolderType["subject"];
  qrcode_url: FolderType["qrcode_url"];
}) => {
  const dispatch = useDispatch();
  return (
    <Card size="md" variant="outline" className="bg-primary-500 p-6">
      <VStack>
        <HStack className="items-center">
          <VStack className="flex-1">
            <Text className="font-medium text-typography-50" size="sm">
              Summary
            </Text>
            <VStack>
              <Heading size="xl" className="text-typography-50">
                3 Users Scanned
              </Heading>
              <Text className="font-normal text-typography-50" size="sm">
                Last Accessed: 05 Jan 2025
              </Text>
            </VStack>
          </VStack>
          <Button
            variant="link"
            onPress={() =>
              dispatch(
                openFolderQRModal({
                  subject: subject,
                  qrcode_url: qrcode_url,
                })
              )
            }
          >
            <QrCode color="white" size={48} />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};
