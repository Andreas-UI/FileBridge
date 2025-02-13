import { Stack } from "expo-router";

export default function ScanLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: "center",
          title: "FileBridge",
        }}
      />
      <Stack.Screen
        name="folder/[id]"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "FileBridge",
        }}
      />
    </Stack>
  );
}
