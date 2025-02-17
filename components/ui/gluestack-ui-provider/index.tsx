import React from "react";
import { config } from "./config";
import { View, ViewProps } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { useTheme } from "../ThemeProvider";

export function GluestackUIProvider({
  ...props
}: {
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        config[theme],
        { flex: 1, height: "100%", width: "100%" },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
