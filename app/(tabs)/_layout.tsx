import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { Files, LayoutDashboard, ScanQrCode, User } from "lucide-react-native";
import { Easing } from "react-native-reanimated";

export default function TabsLayout() {
  return (
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
          headerTransparent: true,
          headerTintColor: "white",
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
  );
}
