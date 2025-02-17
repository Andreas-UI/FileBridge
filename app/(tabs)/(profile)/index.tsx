import { logOut } from "@/api/access";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  CircleUser,
  Info,
  Languages,
  LogOut,
  MessageCircleQuestion,
  Palette,
  ScrollText,
} from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export default function Index() {
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut().then(() => router.replace("/onboarding"));
  };

  return (
    <View style={styles.view} className="bg-background-0">
      <VStack space="sm">
        <Text className="font-semibold" size="md">
          My precious account
        </Text>
        <HStack className="justify-between items-center">
          <HStack className="items-center" space="md">
            <CircleUser color="#535252" size={24} />
            <Text size="lg">Account</Text>
          </HStack>
          <Button variant="link" size="lg">
            <ChevronRight size={20} color={"#404040"} />
          </Button>
        </HStack>
      </VStack>
      <Divider />
      <VStack space="sm">
        <Text className="font-semibold" size="md">
          General settings
        </Text>
        <Pressable onPress={() => router.push("/theme")}>
          <HStack className="justify-between items-center">
            <HStack className="items-center" space="md">
              <Palette color="#535252" size={24} />
              <Text size="lg">Theme</Text>
            </HStack>
            <Button disabled variant="link" size="lg" className="items-center">
              <Box className="h-6 w-6 rounded-full bg-primary-500" />
              <ChevronRight size={20} color={"#404040"} />
            </Button>
          </HStack>
        </Pressable>
        <HStack className="justify-between items-center">
          <HStack className="items-center" space="md">
            <Languages color="#535252" size={24} />
            <Text size="lg">Language</Text>
          </HStack>
          <Button variant="link" size="lg">
            <ButtonText className="font-extralight text-typography-black">
              English
            </ButtonText>
            <ChevronRight size={20} color={"#404040"} />
          </Button>
        </HStack>
      </VStack>
      <Divider />
      <VStack space="sm">
        <Text className="font-semibold" size="md">
          Stuck or Errors?
        </Text>
        <HStack className="justify-between items-center">
          <HStack className="items-center" space="md">
            <MessageCircleQuestion color="#535252" size={24} />
            <Text size="lg">Help</Text>
          </HStack>
          <Button variant="link" size="lg">
            <ChevronRight size={20} color={"#404040"} />
          </Button>
        </HStack>
      </VStack>
      <Divider />
      <VStack space="sm">
        <Text className="font-semibold" size="md">
          Want to know more?
        </Text>
        <HStack className="justify-between items-center">
          <HStack className="items-center" space="md">
            <Info color="#535252" size={24} />
            <Text size="lg">About</Text>
          </HStack>
          <Button variant="link" size="lg">
            <ChevronRight size={20} color={"#404040"} />
          </Button>
        </HStack>
        <HStack className="justify-between items-center">
          <HStack className="items-center" space="md">
            <ScrollText color="#535252" size={24} />
            <Text size="lg">Logs</Text>
          </HStack>
          <Button variant="link" size="lg">
            <ChevronRight size={20} color={"#404040"} />
          </Button>
        </HStack>
      </VStack>
      <Divider />
      <VStack space="sm">
        <Pressable onPress={handleLogOut}>
          <HStack className="justify-between items-center">
            <HStack className="items-center" space="md">
              <LogOut color="#535252" size={24} />
              <Text size="lg">Log out</Text>
            </HStack>
          </HStack>
        </Pressable>
      </VStack>
    </View>
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
