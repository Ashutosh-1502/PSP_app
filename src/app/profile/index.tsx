import { View, Text } from "react-native";
import UserProfile from "@/modules/profile/screens/userProfile";

export default function UserProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <UserProfile />
    </View>
  );
}
