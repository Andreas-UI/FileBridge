import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, ThemeVariant } from "./gluestack-ui-provider/config";

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (newTheme: ThemeVariant) => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeVariant>("light");
  const [loading, setLoading] = useState(true);

  // Load saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@theme");
        if (savedTheme && Object.keys(config).includes(savedTheme)) {
          setTheme(savedTheme as ThemeVariant);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Save theme to storage when it changes
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("@theme", theme).catch((error) => {
        console.error("Error saving theme:", error);
      });
    }
  }, [theme, loading]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
