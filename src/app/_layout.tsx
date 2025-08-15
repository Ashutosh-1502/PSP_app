import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ReactQueryProvider } from "@/components/provider/query-client-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { useFonts } from "@expo-google-fonts/montserrat";
import * as Splashscreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { fontFamily } from "@/components/fonts";

Splashscreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    [fontFamily.montserratRegular]: require("@/assets/fonts/Montserrat-Regular.ttf"),
    [fontFamily.montserratMedium]: require("@/assets/fonts/Montserrat-Medium.ttf"),
    [fontFamily.montserratSemibold]: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    [fontFamily.montserratBold]: require("@/assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded){
      Splashscreen.hideAsync()
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
      <PortalProvider>
        <ThemeProvider value={DefaultTheme}>
            <ReactQueryProvider>
              <SafeAreaView
                className={colorScheme === "dark" ? "dark flex-1" : "flex-1"}
                edges={[]}
              >
                <Slot />
                <Toast />
                <StatusBar style="dark" translucent={false} />
              </SafeAreaView>
            </ReactQueryProvider>
        </ThemeProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
