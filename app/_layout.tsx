import { Stack, useRouter } from "expo-router";

import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { verifyInstallation } from "nativewind";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

export default function RootLayout() {
  console.log("Native Wind Installed: ", verifyInstallation());

  const router = useRouter();

  // TODO:: Fix flicker screen when starting onboard
  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      if (!hasOnboarded) {
        // router.replace("/onboarding");
        router.replace("/(tabs)");
      }
    };

    checkOnboarding();
  }, []);


  return (
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Stack>
              <Stack.Screen
                name="onboarding/index"
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitleAlign: "center",
                  title: "FileBridge",
                }}
              />
              <Stack.Screen
                name="auth/index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
