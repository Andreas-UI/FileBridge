import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { useDecrypt } from "@/api/access";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Focus, RepeatIcon, SwitchCamera } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

export default function Index() {
  const router = useRouter();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const { mutate, isLoading } = useDecrypt();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Center className="h-full">
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button variant="solid" onPress={requestPermission}>
          <ButtonText>Allow Camera Permission</ButtonText>
        </Button>
      </Center>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const onBarcodeScanned = (result: BarcodeScanningResult) => {
    const url = result.data;
    const regex = /^http:\/\/localhost:3000\/folder\/files\/access\/([^\/]+)/;
    const match = url.match(regex);

    if (match) {
      console.log(match[1]);

      mutate(match[1], {
        onSuccess: (text) => {
          console.log(text);
          router.push({
            pathname: "/folder/[id]",
            params: { id: text },
          });
        },
        onError: (error) => {
          console.error("Failed to decrypt:", error);
        },
      });
    } else {
      console.log("No match found");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "white",
        }}
      />
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(result) => {
            if (isLoading) return;
            onBarcodeScanned(result);
          }}
        >
          {isLoading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.overlayText}>Loading...</Text>
            </View>
          )}

          {/* TODO:: To be updated */}
          {/* <View style={styles.buttonContainer}>
            <Button style={styles.button}>
              <ButtonText>Upload QR</ButtonText>
            </Button>
          </View> */}
        </CameraView>
        <Alert
          action="info"
          className="gap-4 w-full flex-row flex py-4 items-start self-center"
        >
          <AlertIcon as={Focus} className="mt-1" size="xl" />
          <HStack className="justify-between flex-1 items-center gap-1 sm:gap-8">
            <VStack className="flex-1">
              <Text className="font-semibold text-typography-900">
                How to access a FileBridge Folder?
              </Text>
              <AlertText className="text-typography-900" size="sm">
                Simply scan a FileBridge QR code to securely access the files
              </AlertText>
            </VStack>
            <Button size="md" onPress={toggleCameraFacing}>
              <ButtonIcon as={SwitchCamera} />
            </Button>
          </HStack>
        </Alert>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayText: {
    color: "white",
    marginTop: 10,
  },
});
