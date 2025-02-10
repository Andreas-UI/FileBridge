import { DeleteFolderBottomTab } from "@/components/DeleteFolderBottomTab";
import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { Files, LayoutDashboard, ScanQrCode, User } from "lucide-react-native";

export default function TabsLayout() {
  console.log("Rendering TabsLayout");
  return (
    <>
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
    </>
  );
}
