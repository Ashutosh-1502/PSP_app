import 'buffer';
import 'node-libs-react-native/globals';
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getData } from "@/lib/utils/storage";
import clearPdbFilesFromCache from '@/lib/utils/clearFromCache';
import "../../global.css";
import SplashScreen from "@/components/splashScreen/splashScreen";

export default function Index() {
  const [splashScreenLoading, setSplashScreenLoading] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getData('token');
      const timer = setTimeout(() => {
        if (token) {
          router.replace("/proteinSearch");
        } else {
          router.replace("/welcome");
        }
        setSplashScreenLoading(false);
      }, 6000);

      return () => clearTimeout(timer);
    };

    clearPdbFilesFromCache()
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "whiter" }}>
      {splashScreenLoading && <SplashScreen/>}
    </View>
  );
}
