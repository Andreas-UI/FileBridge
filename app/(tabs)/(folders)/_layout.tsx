import { Stack } from "expo-router";

export default function FoldersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "FileBridge",
        }}
      />
    </Stack>
  );
}
