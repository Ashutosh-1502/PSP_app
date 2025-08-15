import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { EyeIcon, EyeOff } from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuthAPI } from "@/modules/auth/hooks/useAuth";
import { setData } from "@/lib/utils/storage";
import { type AxiosError } from "axios";
import { NSignUpApiResponseType } from "@/modules/auth/types/index";
import CustomText from "@/components/customText/text";
import { fontFamily } from "@/components/fonts";

type SignInProps = {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

export default function SignIn({ setCurrentView }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { useLoginMutation } = useAuthAPI();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
        visibilityTime: 2000,
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    useLoginMutation.mutate(
      { email, password, lastActivity: new Date() },
      {
        onSuccess: (data) => {
          const { user, token } = data;
          setData({
            token,
            user,
          });
          Toast.show({
            type: "success",
            text1: "Login Successfull",
            visibilityTime: 2000,
            position: "top",
          });
          router.replace("/proteinSearch");
          setIsLoading(false);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<NSignUpApiResponseType>;
          if (
            axiosError.response &&
            axiosError.response?.data &&
            axiosError.response.data.message
          ) {
            Toast.show({
              type: "success",
              text1: `${axiosError.response.data.message}`,
              visibilityTime: 2000,
              position: "top",
            });
          } else {
            console.log(error);
            Toast.show({
              type: "success",
              text1: "Something went wrong!",
              visibilityTime: 2000,
              position: "top",
            });
          }
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <>
      <View className="flex-1 px-5 pt-3">
        <CustomText weight="bold" className="text-4xl tracking-wide">
          Let's Sign you in
        </CustomText>
        <CustomText weight="semibold" className="text-xl text-gray-800 my-4 leading-normal tracking-wide">
          Welcome Back, {"\n"}You have been missed
        </CustomText>

        <View className="flex-col gap-y-3">
          <TextInput
            placeholder="Enter your Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg p-4 mt-3"
            style={{fontFamily: fontFamily.montserratRegular}}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <View className="relative">
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-lg p-4 pr-12"
              style={{fontFamily: fontFamily.montserratRegular}}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-4"
            >
              {!showPassword ? <EyeOff size={22} /> : <EyeIcon size={22} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => handleLogin()}
          className={`py-4 rounded-lg mt-6 ${!isLoading ? "bg-indigo-500" : "bg-indigo-300 opacity-50"}`}
        >
          <CustomText weight="medium" className="text-center text-white text-lg">
            {isLoading ? (
              <ActivityIndicator size={22} color="black" />
            ) : (
              <CustomText weight="medium" className="text-center text-white text-lg">
                Sign In
              </CustomText>
            )}
          </CustomText>
        </TouchableOpacity>

        <CustomText weight="semibold" className="text-center text-md text-gray-600 mt-5">
          Don't have an account?
          <CustomText weight="semibold"
            className="text-indigo-500 font-bold text-md"
            onPress={() => setCurrentView("signup")}
          >
            {" "}
            Register Now
          </CustomText>
        </CustomText>
      </View>
    </>
  );
}
