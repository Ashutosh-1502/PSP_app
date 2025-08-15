import TabBar from "@/components/tabBar";
import { Tabs } from "expo-router";
import { Bell, Search, History } from "lucide-react-native";
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function TabLayout() {
  return (
     <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs
      tabBar={props => <TabBar {...props}/>}
      >
        <Tabs.Screen
          name="proteinSearch/index"
          options={{
            title: "Home",
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="searchHistory/index"
          options={{
            title: "History",
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="announcement/index"
          options={{
            title: "Announcement",
            headerShown: false
          }}
        />
        {/* <Tabs.Screen
        name="announcement/index"
        options={{
          title: "Viewer",
          headerShown: false,
        }}
      /> */}
      </Tabs>
    </SafeAreaView>
    // <Tabs
    //   screenOptions={({ route, navigation }) => ({
    //     headerTitleAlign: "center",
    //     headerStyle: {
    //       backgroundColor: "#F7F7F7",
    //     },
    //     headerTintColor: "#000",
    //     headerTitleStyle: {
    //       fontWeight: "bold",
    //     },
    //     tabBarShowLabel: false,
    //     tabBarButton: ({ onPress }) => {
    //       const state = navigation.getState();
    //       const currentRouteIndex = state.index;
    //       const focused = state.routes[currentRouteIndex].name === route.name;
    //       const iconSize = focused ? 26 : 22;
    //       const iconColor = focused ? "green" : "gray";
    //       let IconComponent = Search;
    //       let label = "Protein Search";

    //       if (route.name === "searchHistory/index") {
    //         IconComponent = Clock;
    //         label = "History";
    //       } else if (route.name === "announcement/index") {
    //         IconComponent = Megaphone;
    //         label = "Announcements";
    //       }

    //       return (
    //         <TouchableOpacity
    //           onPress={onPress}
    //           style={{
    //             flex: 1,
    //             alignItems: "center",
    //             justifyContent: "center",
    //             paddingVertical: 8,
    //           }}
    //         >
    //           <IconComponent size={iconSize} color={iconColor} />
    //           <Text
    //             style={{
    //               marginTop: 4,
    //               color: iconColor,
    //               fontSize: 13,
    //               fontWeight: focused ? "700" : "500",
    //             }}
    //           >
    //             {label}
    //           </Text>
    //         </TouchableOpacity>
    //       );
    //     },
    //     tabBarStyle: {
    //       height: 90,
    //       backgroundColor: "#FAF7F3",
    //       borderTopWidth: 0.5,
    //       borderTopColor: "#3D74B6",
    //     },
    //   })}
    // >
    //   <Tabs.Screen
    //     name="proteinSearch/index"
    //     options={{ headerTitle: "Protein Search" }}
    //   />
    //   <Tabs.Screen
    //     name="searchHistory/index"
    //     options={{ headerTitle: "Search History" }}
    //   />
    //   <Tabs.Screen
    //     name="announcement/index"
    //     options={{
    //       headerTitle: () => (
    //         <View className="flex-row items-center justify-center">
    //           <Bell size={24} color="black" />
    //           <Text className={`ml-2 text-black items-center font-bold ${Platform.OS === "android" ?"text-2xl" : "text-xl"}`}>Announcements</Text>
    //         </View>
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}