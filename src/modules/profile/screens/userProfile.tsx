// App.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function UserProfile() {
  const firstName = "John";
  const lastName = "Doe";
  const email = "johndoe@gmail.com";
  const mobile = "+91-123456789";

  return (
    <SafeAreaView className="flex-1 w-full bg-white px-6">
      {/* Back Button */}
      <View className="flex-row items-center gap-x-4">
        <TouchableOpacity className="mt-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-lg font-semibold text-center mt-2">
          User Profile
        </Text>
      </View>

      {/* Profile Picture */}
      <View className="items-center my-8">
        {/* <View className="relative"> */}
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            className="w-36 h-36 rounded-full"
          />
          {/* <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200">
            <Ionicons name="camera" size={18} color="black" />
          </TouchableOpacity> */}
        {/* </View> */}
      </View>

      {/* Profile Info */}
      <View className="flex-col gap-y-4">
        {/* First Name */}
        <View>
          <Text className="text-gray-400 mb-2">First Name</Text>
          <View className="border border-gray-300 rounded-md p-4">
            <Text>{firstName}</Text>
          </View>
        </View>

        {/* Last Name */}
        <View>
          <Text className="text-gray-400 mb-2">Last Name</Text>
          <View className="border border-gray-300 rounded-md p-4">
            <Text>{lastName}</Text>
          </View>
        </View>

        {/* Email */}
        <View>
          <Text className="text-gray-400 mb-2">E-Mail</Text>
          <View className="border border-gray-300 rounded-md p-4">
            <Text>{email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
