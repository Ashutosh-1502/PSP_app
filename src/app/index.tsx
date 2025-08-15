import 'buffer';
import 'node-libs-react-native/globals';
import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getData } from "@/lib/utils/storage";
import clearPdbFilesFromCache from '@/lib/utils/clearFromCache';
import "../../global.css";

export default function Index() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await getData('token');
      console.log(token)
      const timer = setTimeout(() => {
        if (token) {
          router.replace("/proteinSearch");
        } else {
          router.replace("/welcome");
        }
      }, 100);

      return () => clearTimeout(timer);
    };

    clearPdbFilesFromCache()
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "whiter" }}>
      <ActivityIndicator size={30} />
    </View>
  );
}
