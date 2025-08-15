// app/auth/signin.tsx or app/(auth)/signin.tsx
import {
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignIn from "@/modules/auth/components/signin";
import SignUp from "@/modules/auth/components/signup";

export default function AuthScreen() {
    const [currentView, setCurrentView] = useState("signin")
  return (
    <SafeAreaView className="flex-1 bg-white justify-start">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={80}
      >
        <View>
          <LottieView
            source={require("@/assets/gifs/Welcome.json")}
            autoPlay
            loop
            style={{ height: 300 }}
          />
        </View>

        {
            currentView === "signin" ? <SignIn setCurrentView={setCurrentView}/> : <SignUp setCurrentView={setCurrentView}/>
        }

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
