import { Linking, Platform } from "react-native";
import { IntentLauncherResult, startActivityAsync } from "expo-intent-launcher";

export const openFile = async (url: string, mime_type: string) => {
  if (Platform.OS === "android") {
    try {
      await startActivityAsync("android.intent.action.VIEW", {
        data: url,
        type: mime_type,
        flags: 1,
      });
    } catch (error) {
      await startActivityAsync("android.intent.action.VIEW", {
        data: url,
        flags: 1,
      });
    }
  } else {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("No app found to open this document.");
    }
  }
};
