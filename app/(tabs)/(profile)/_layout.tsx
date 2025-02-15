import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="theme"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          title: "Theme",
        }}
      />
    </Stack>
  );
}
