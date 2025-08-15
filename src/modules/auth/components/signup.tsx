// app/auth/signin.tsx or app/(auth)/signin.tsx
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

type SignUpProps = {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

export default function SignUp({ setCurrentView }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
  });

  const { useRegisterMutation } = useAuthAPI();

  const handleSubmit = async () => {
    const {
      name: { first, last },
      email,
      password,
    } = formData;
    if (!email || !password || !first || !last) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
        visibilityTime: 2000,
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    useRegisterMutation.mutate(
      {
        ...formData,
        confirmPassword: formData.password,
        lastActivity: new Date(),
      },
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
      <View className="flex-1 px-5">
        <CustomText weight="bold" className="text-3xl font-bold">
          Let's Register Account
        </CustomText>
        <CustomText className="text-lg text-gray-800 my-3 font-medium leading-normal">
          Hello user, you have a greatful journey
        </CustomText>

        <View className="flex-col">
          <TextInput
            placeholder="Enter your first name"
            placeholderTextColor="#888"
            keyboardType="default"
            className="border border-gray-300 rounded-lg p-4 mt-4"
            style={{fontFamily: fontFamily.montserratRegular}}
            value={formData.name.first}
            onChangeText={(first) =>
              setFormData((prev) => ({
                ...prev,
                name: { ...prev.name, first },
              }))
            }
          />

          <TextInput
            placeholder="Enter your last name"
            placeholderTextColor="#888"
            keyboardType="default"
            className="border border-gray-300 rounded-lg p-4 mt-4"
            value={formData.name.last}
            style={{fontFamily: fontFamily.montserratRegular}}
            onChangeText={(last) =>
              setFormData((prev) => ({
                ...prev,
                name: { ...prev.name, last },
              }))
            }
          />

          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg p-4 mt-4"
            style={{fontFamily: fontFamily.montserratRegular}}
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
          />

          <View className="relative mt-4">
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-lg p-4 pr-12"
              style={{fontFamily: fontFamily.montserratRegular}}
              value={formData.password}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
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
          onPress={() => handleSubmit()}
          className={`py-4 rounded-lg mt-6 ${!isLoading ? "bg-indigo-500" : "bg-indigo-300 opacity-50"}`}
        >
          {isLoading ? (
            <ActivityIndicator size={22} color="black" />
          ) : (
            <CustomText weight="semibold" className="text-center text-white text-lg">
              Sign Up
            </CustomText>
          )}
        </TouchableOpacity>

        <CustomText weight="medium" className="text-center text-md mt-5 text-gray-600">
          Already have an account ?
          <CustomText weight="medium"
            className="text-indigo-500 text-md"
            onPress={() => setCurrentView("signin")}
          >
            {" "}
            Login
          </CustomText>
        </CustomText>
      </View>
    </>
  );
}
