import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

type CustomSplashScreenProps = {
  onFinish?: () => void;
};

export default function CustomSplashScreen({
  onFinish,
}: CustomSplashScreenProps) {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Protein Structure Prediction";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          onFinish?.();
        }, 2000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "black",
          fontFamily: "Montserrat_700Bold",
        }}
      >
        {displayedText}
      </Text>
    </View>
  );
}
