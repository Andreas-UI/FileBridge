import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { Image } from "./ui/image";
import { View } from "react-native";

export const BrandCard = () => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: 215,
        overflow: "hidden",
        borderRadius: 16,
        borderColor: "#1C2022",
      }}
    >
      <Image
        source={require("../assets/images/sea-bridge-1.jpg")}
        alt="Bridge"
        className="w-full h-full"
      />

      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 160,
          height: 160,
          borderBottomLeftRadius: 160,
          backgroundColor: "black",
          opacity: 0.7,
          zIndex: 40,
        }}
      />
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 185,
          height: 185,
          borderBottomLeftRadius: 185,
          backgroundColor: "white",
          opacity: 0.2,
          zIndex: 30,
        }}
      />
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 260,
          height: 260,
          borderBottomLeftRadius: 260,
          backgroundColor: "black",
          opacity: 0.7,
          zIndex: 20,
        }}
      />
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 335,
          height: 335,
          borderBottomLeftRadius: 335,
          backgroundColor: "white",
          opacity: 0.1,
          zIndex: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          right: 25,
          top: 25,
          zIndex: 1000,
          padding: 16,
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Arial",
            color: "#fff",
            opacity: 0.9,
            textAlign: "right",
            marginBottom: 8,
            lineHeight: 24,
          }}
        >
          "Cross the{" "}
          <Text
            style={{
              fontSize: 21,
              fontFamily: "Arial",
              color: "#fff",
              opacity: 0.9,
              textAlign: "right",
              marginBottom: 8,
              lineHeight: 24,
              fontWeight: "bold",
            }}
          >
            bridge
          </Text>
          {","}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Arial",
            color: "#fff",
            opacity: 0.9,
            textAlign: "right",
            marginBottom: 8,
            lineHeight: 24,
          }}
        >
          "skip the{" "}
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Arial",
              color: "#fff",
              opacity: 0.9,
              textAlign: "right",
              marginBottom: 8,
              lineHeight: 24,
              fontWeight: "bold",
            }}
          >
            hassle
          </Text>
          {""}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Arial",
            color: "#fff",
            fontStyle: "italic",
            opacity: 0.7,
            textAlign: "right",
          }}
        >
          - FileBridge
        </Text>
      </View>
    </Box>
  );
};
