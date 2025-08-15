import { View, Text, TouchableOpacity } from "react-native";
import { clearData } from "@/lib/utils/storage";
import { router } from "expo-router";

export default function SearchHistoryScreen() {
  const logout = () => {
    clearData("token");
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 justify-center">
      <Text className="text-lg">Announcement Screen</Text>
      <TouchableOpacity
        className="bg-green-700 py-4 rounded-xl items-center"
        onPress={() => logout()}
      >
        <Text className="text-white text-base font-medium">Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-700 py-4 rounded-xl items-center"
        onPress={() => router.push("/profile")}
      >
        <Text className="text-white text-base font-medium">User Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
