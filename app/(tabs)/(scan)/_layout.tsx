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
    </Stack>
  );
}
