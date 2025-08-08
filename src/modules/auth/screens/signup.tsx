// app/auth/signin.tsx or app/(auth)/signin.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EyeIcon, ArrowLeft, EyeOff } from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuthAPI } from "@/modules/auth/hooks/useAuth";
import { setData } from "@/lib/utils/storage";
import { type AxiosError } from "axios";
import { NSignUpApiResponseType } from "@/modules/auth/types/index";

export default function SignUpScreen() {
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
      { ...formData, confirmPassword: formData.password, lastActivity: new Date() },
      {
        onSuccess: (data) => {
          const { user, token } = data;
          setData("token", token);
          Toast.show({
            type: "success",
            text1: "Login Successfull",
            visibilityTime: 2000,
            position: "top",
          });
          router.replace("/proteinSearch");
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
        },
      }
    );
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-start">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            className="pb-10 me-auto"
            onPress={() => router.back()}
          >
            <ArrowLeft size={30} color="gray" />
          </TouchableOpacity>

          <View className="flex gap-y-6">
            <View className="pb-10 gap-y-2">
              <Text className="text-4xl font-bold">Sign Up</Text>
              <Text className="text-gray-400 text-lg">Create an Account</Text>
            </View>

            {/* Email Input */}
            <View>
              <Text className="mb-1 text-base font-medium">First Name</Text>
              <TextInput
                placeholder="Enter your First Name"
                keyboardType="default"
                className="border border-gray-300 p-4 rounded-xl text-base bg-gray-50"
                textAlignVertical="center"
                style={{ lineHeight: 18 }}
                value={formData.name.first}
                onChangeText={(first) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: { ...prev.name, first },
                  }))
                }
              />
            </View>

            <View>
              <Text className="mb-1 text-base font-medium">Last Name</Text>
              <TextInput
                placeholder="Enter your Last Name"
                keyboardType="default"
                className="border border-gray-300 p-4 rounded-xl text-base bg-gray-50"
                textAlignVertical="center"
                style={{ lineHeight: 18 }}
                value={formData.name.last}
                onChangeText={(last) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: { ...prev.name, last },
                  }))
                }
              />
            </View>

            <View>
              <Text className="mb-1 text-base font-medium">Email</Text>
              <TextInput
                placeholder="Enter your Email address"
                keyboardType="email-address"
                className="border border-gray-300 p-4 rounded-xl text-base bg-gray-50"
                textAlignVertical="center"
                style={{ lineHeight: 18 }}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, email: text }))
                }
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="mb-1 text-base font-medium">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 bg-gray-50">
                <TextInput
                  placeholder="Enter your Password"
                  secureTextEntry={!showPassword}
                  className="flex-1 py-4 text-base bg-gray-50"
                  textAlignVertical="center"
                  style={{ lineHeight: 18 }}
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, password: text }))
                  }
                />
                <TouchableOpacity
                  className="bg-gray-50"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon size={20} color="gray" />
                  ) : (
                    <EyeOff size={20} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="bg-green-700 py-4 rounded-xl items-center"
            >
              <Text className="text-white text-base font-medium">Register</Text>
            </TouchableOpacity>

            {/* Sign up */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Already have an Account? </Text>
              <TouchableOpacity onPress={() => router.replace("/signin")}>
                <Text className="text-green-700 font-medium">Sign in</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-4 text-gray-400">Other</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
