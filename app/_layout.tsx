import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
