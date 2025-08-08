import SignInScreen from "@/modules/auth/screens/signin";
import { View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 justify-start">
      <SignInScreen />
    </View>
  );
}
