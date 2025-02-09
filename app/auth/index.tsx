import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { GoogleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();

  const allowOath = false;
  const allowEmailPassword = false;
  const allowMagicLink = true;

  const handleMagicLink = () => {
    console.log(process.env.EXPO_PUBLIC_API_ROOT);
    router.replace("/(tabs)");
  };

  return (
    <Center style={styles.container}>
      <View className="w-full" style={{ paddingHorizontal: 48 }}>
        <VStack space="lg">
          {/* Form Header */}
          <VStack>
            <Heading size="xl">Login to your account</Heading>
            {!allowMagicLink && (
              <HStack>
                <Text className="font-normal" size="sm">
                  Don't have an account?
                </Text>
                {/* TODO:: Make this clickable */}
                <Text className="font-medium" size="sm">
                  Sign up
                </Text>
              </HStack>
            )}
          </VStack>

          {/* Form Content */}
          <VStack space="4xl">
            {allowEmailPassword && (
              <>
                {/* Email Password Login Form */}
                <VStack space="md">
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText>Subject</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline">
                      <InputField placeholder="abc@mail.com" />
                    </Input>
                  </FormControl>
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline">
                      <InputField placeholder="Enter password" />
                    </Input>
                  </FormControl>
                </VStack>
              </>
            )}

            {allowMagicLink && (
              <>
                {/* Email Password Login Form */}
                <VStack space="md">
                  <FormControl>
                    <FormControlLabel>
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline">
                      <InputField placeholder="abc@mail.com" />
                    </Input>
                  </FormControl>
                </VStack>

                <Button size="md" onPress={handleMagicLink}>
                  <ButtonText>Login</ButtonText>
                </Button>
              </>
            )}

            {allowOath && (
              <>
                {/* Divider for Social Login */}
                <HStack className="items-center">
                  <Divider orientation="horizontal" className="flex-1" />
                  <Text
                    className="font-normal text-typography-600 flex-1"
                    size="xs"
                  >
                    OR CONTINUE WITH
                  </Text>
                  <Divider orientation="horizontal" className="flex-1" />
                </HStack>

                {/* Social Login */}
                <Button size="md">
                  <ButtonIcon as={GoogleIcon} />
                  <ButtonText>Sign in with Google</ButtonText>
                </Button>
              </>
            )}
          </VStack>
        </VStack>
      </View>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
