import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();

  const handlePostOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "1")
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <Onboarding
        showDone={false}
        showSkip={false}
        controlStatusBar={true}
        bottomBarColor="white"
        subTitleStyles={{
          paddingHorizontal: 16,
        }}
        onDone={() => router.replace("/(tabs)")}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require("@/assets/images/onboarding-1.json")}
              />
            ),
            title: "Fast, Simple File Sharing",
            subtitle:
              "Upload files, generate a QR code, and share instantly. No accounts, no hassle.",
          },
          {
            backgroundColor: "#fff",

            image: (
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require("@/assets/images/onboarding-4.json")}
              />
            ),
            title: "Create & Share in Seconds",
            subtitle:
              "Add your files, generate a QR code, and send it to anyone, anywhere.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require("@/assets/images/onboarding-5.json")}
              />
            ),
            title: "Scan & Download Instantly",
            subtitle:
              "Just scan the QR code to access files—quick, secure, and easy.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require("@/assets/images/onboarding-3.json")}
              />
            ),
            title: "Ready to Share?",
            subtitle: (
              <View
                style={{
                  width: width - 56,
                  gap: 12,
                }}
              >
                <Text size="lg" className="text-wrap text-center">
                  Create your first QR code and send files in seconds!
                </Text>
                <Button size="md" onPress={handlePostOnboarding}>
                  <ButtonText>Start Now</ButtonText>
                </Button>
              </View>
            ),
          },
        ]}
      />
    </View>
  );
}

// "Create your first QR code and send files in seconds!",

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
