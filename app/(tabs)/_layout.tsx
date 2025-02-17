import { userExist } from "@/api/access";
import { AddFileDrawer } from "@/components/addFile/AddFileDrawer";
import { DeleteFileModal } from "@/components/deleteFile/DeleteFileModal";
import { DeleteFolderBottomTab } from "@/components/DeleteFolderBottomTab";
import { FolderQrModal } from "@/components/folderSummary/FolderQRModal";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Files, LayoutDashboard, ScanQrCode, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function TabsLayout() {
  console.log("Rendering TabsLayout");

  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  useEffect(() => {
    const checkIsAuth = async () => {
      setIsCheckingAuth(true);
      const user = await userExist();
      setIsCheckingAuth(false);
      if (!user) router.replace("/onboarding");
    };
    checkIsAuth();
  }, []);

  if (isCheckingAuth) {
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
      <StatusBar />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "FileBridge",
          animation: "none",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                as={LayoutDashboard}
                color={focused ? "black" : color}
                size={focused ? "xl" : "lg"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(folders)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                as={Files}
                color={focused ? "black" : color}
                size={focused ? "xl" : "lg"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(scan)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                as={ScanQrCode}
                color={focused ? "black" : color}
                size={focused ? "xl" : "lg"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                as={User}
                color={focused ? "black" : color}
                size={focused ? "xl" : "lg"}
              />
            ),
          }}
        />
      </Tabs>

      <DeleteFolderBottomTab />
      <FolderQrModal />
      <DeleteFileModal />
      <AddFileDrawer />
    </>
  );
}
