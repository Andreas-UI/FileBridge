import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { Files, LayoutDashboard, ScanQrCode, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        title: "FileBridge",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={LayoutDashboard} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(folders)"
        options={{
          tabBarIcon: ({ color }) => <Icon as={Files} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(scan)"
        options={{
          tabBarIcon: ({ color }) => <Icon as={ScanQrCode} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
        }}
      />
    </Tabs>
  );
}
