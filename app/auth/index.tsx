import { sendMagicLink, userExist } from "@/api/access";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
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
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AuthScreen() {
  useEffect(() => {
    const checkIsAuth = async () => {
      const user = await userExist();
      if (user) {
        router.replace("/(tabs)"); // If onboarding is done but user is not authenticated, go to auth
      }
    };
    checkIsAuth();
  }, []);

  const router = useRouter();

  const allowOath = false;
  const allowEmailPassword = false;
  const allowMagicLink = true;

  const [email, setEmail] = useState("");
  const [emailIsSending, setEmailIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [timeLeft, setTimeLeft] = useState(5); // Initial countdown time
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      setIsRunning(false);
      setIsTimeout(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, [isRunning, timeLeft]);

  const handleMagicLink = async (email: string) => {
    setEmailIsSending(true);
    await sendMagicLink(email).then(() => {
      setEmailSent(true);
      setEmailIsSending(false);

      setIsRunning(true);
      setIsTimeout(false);
      setTimeLeft(10); // Reset timer when starting
    });
  };

  const handlePostMagicLink = async () => {
    const user = await userExist();
    if (user) {
      router.replace("/(tabs)");
    }
  };

  return (
    <Center style={styles.container}>
      <View className="w-full" style={{ paddingHorizontal: 48 }}>
        <VStack space="lg">
          {/* Form Header */}
          <VStack>
            <Heading size="xl">Login to your account</Heading>
            <HStack>
              <Text className="font-normal" size="sm">
                No password, no credit card
              </Text>
            </HStack>
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
                      <InputField
                        placeholder="abc@mail.com"
                        onChangeText={(text) => setEmail(text)}
                      />
                    </Input>
                  </FormControl>
                </VStack>

                <VStack space="md">
                  <Button
                    action={
                      emailSent || emailIsSending ? "secondary" : "primary"
                    }
                    disabled={emailSent || emailIsSending}
                    size="md"
                    onPress={() => handleMagicLink(email)}
                  >
                    {emailIsSending && <ButtonSpinner />}
                    <ButtonText>
                      {emailSent ? "Please check your email" : "Login"}
                    </ButtonText>
                  </Button>
                  {emailSent && (
                    <Button
                      variant="link"
                      action="secondary"
                      size="md"
                      onPress={() => handlePostMagicLink()}
                    >
                      <ButtonText>I have verify my email</ButtonText>
                    </Button>
                  )}

                  {/* TODO:: Fix Bug */}
                  {/* {emailSent && (
                    <Text className="self-center" size="md">
                      {`No email received? Send again in ${timeLeft}s`}
                    </Text>
                  )} */}
                </VStack>
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
