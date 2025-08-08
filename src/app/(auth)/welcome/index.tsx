import { View, Text, Image, Pressable } from "react-native";
import { useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function WelcomeScreen() {
  const { height } = useWindowDimensions();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Top half with background and logo */}
      <View className="flex-1 items-center justify-center relative px-6">
        <LottieView
          source={require("@/assets/gifs/Welcome.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      </View>

      {/* Welcome text section */}
      <View className="px-6 pb-6">
        <Text className="text-3xl font-semibold text-center mb-2 text-black">
          Welcome to PSP!
        </Text>
        <Text className="text-base text-center text-gray-600 text-center">
          This Platform will give access to a widerange of {"\n"} Protein Data
          Bank entries, where you can find matching results for the given
          sequence and Lessar time and with better accuracy
        </Text>
      </View>

      {/* Get Started Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={() => router.push("/signup")}
          className="bg-black py-4 rounded-xl items-center"
        >
          <Text className="text-white text-base font-semibold">
            Get started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
