import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { Files, LayoutDashboard, ScanQrCode, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon as={LayoutDashboard} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(folders)"
        options={{
          title: "Folders",
          tabBarIcon: ({ color }) => <Icon as={Files} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(scan)"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => <Icon as={ScanQrCode} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
        }}
      />
    </Tabs>
  );
}
