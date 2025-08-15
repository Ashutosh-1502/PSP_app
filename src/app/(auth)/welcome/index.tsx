import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import CustomText from "@/components/customText/text";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center relative px-6">
        <LottieView
          source={require("@/assets/gifs/atom.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      </View>

      <View className="px-6 pb-6">
        <CustomText weight="semibold" className="text-3xl font-semibold text-center mb-2 text-black">
          Welcome to PSP!
        </CustomText>
        <CustomText className="text-base text-center text-gray-600">
          This Platform will give access to a widerange of {"\n"} Protein Data
          Bank entries, where you can find matching results for the given
          sequence and in Lessar time and with better accuracy.
        </CustomText>
      </View>

      <View className="px-6 pb-10">
        <Pressable
          onPress={() => router.push("/auth")}
          className="bg-black py-4 rounded-xl items-center"
        >
          <CustomText weight="medium" className="text-white text-base">
            Get started
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
}
