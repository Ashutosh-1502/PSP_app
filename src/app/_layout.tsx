import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ReactQueryProvider } from "@/components/provider/query-client-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  console.log("root layout")

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ReactQueryProvider>
        <SafeAreaView
          className={colorScheme === "dark" ? "dark flex-1" : "flex-1"}
          edges={[]}
        >
          <Slot/>
          <Toast />
          <StatusBar style="light" backgroundColor="black" translucent={false} />
        </SafeAreaView>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
