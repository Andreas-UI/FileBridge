import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ThemeVariant } from "@/components/ui/gluestack-ui-provider/config";
import { useTheme } from "@/components/ui/ThemeProvider";
import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { theme: currentTheme, setTheme, loading } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || "light");
  const [themeApplied, setThemeApplied] = useState(false);

  const themeColors: {
    id: string;
    color: string;
    value: ThemeVariant;
  }[] = [
    { id: "1", color: "51 51 51", value: "light" },
    { id: "2", color: "249 115 22", value: "orange" },
    { id: "3", color: "14 165 233", value: "blue" },
    { id: "4", color: "16 185 129", value: "green" },
    { id: "5", color: "139 92 246", value: "violet" },
    { id: "6", color: "6 182 212", value: "cyan" },
    { id: "7", color: "244 63 94", value: "rose" },
    { id: "8", color: "100 116 139", value: "bluegray" },
    { id: "9", color: "217 70 239", value: "fuchsia" },
  ];

  useEffect(() => {
    if (!loading && currentTheme) {
      const initialTheme =
        themeColors.find((t) => t.value === currentTheme) || themeColors[0];
      setSelectedTheme(initialTheme.value);
    }
  }, [loading, currentTheme]);

  const handleApplyTheme = () => {
    if (selectedTheme) {
      setTheme(selectedTheme);
      setThemeApplied(true);
    }
  };

  if (loading || !selectedTheme) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.view}>
        <FlatList
          data={themeColors}
          keyExtractor={(item) => item.id}
          numColumns={5}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Button
              className="h-12 w-12 mb-4 rounded-full"
              style={[
                { backgroundColor: `rgb(${item.color})` },
                selectedTheme === item.value && styles.selected,
              ]}
              onPress={() => {
                setSelectedTheme(item.value);
                setThemeApplied(false);
              }}
            >
              {selectedTheme === item.value && <ButtonIcon as={Check} />}
            </Button>
          )}
        />
      </View>
      <View style={styles.bottomView}>
        <Button size="xl" onPress={handleApplyTheme} disabled={themeApplied}>
          <ButtonText>{themeApplied ? "Applied!" : "Apply Theme"}</ButtonText>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
  row: {
    justifyContent: "center",
    gap: 16,
  },
  selected: {
    borderColor: "white",
    borderWidth: 3,
  },
  //   row: {
  //     justifyContent: "flex-start",
  //     gap: 16,
  //   },
});
