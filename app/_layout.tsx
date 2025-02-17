import { Stack, useRouter } from "expo-router";

import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { verifyInstallation } from "nativewind";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { userExist } from "@/api/access";

const queryClient = new QueryClient();

export default function RootLayout() {
  console.log("Native Wind Installed: ", verifyInstallation());

  const router = useRouter();

  // TODO:: Fix flicker screen when starting onboard
  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      const user = await userExist();
      if (!hasOnboarded) {
        router.replace("/onboarding"); // Start from onboarding if not completed
      } else if (!user) {
        router.replace("/onboarding"); // If onboarding is done but user is not authenticated, go to auth
      } else {
        router.replace("/(tabs)"); // If authenticated, go to tabs
      }
    };
    checkOnboarding();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GluestackUIProvider>
          <GestureHandlerRootView>
            <Provider store={store}>
              <Stack initialRouteName="onboarding/index">
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
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
