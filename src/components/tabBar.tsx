import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "@/components/customText/text";

export default function TabBar({ state, descriptors, navigation }: any) {
  const primaryColor = "#0891b2";
  const grayColor = "#737373";
  const icons= [
    (props: any) => <AntDesign name="home" size={24} {...props}/>,
    (props: any) => <AntDesign name="clockcircleo" size={24} {...props}/>,
    (props: any) => <AntDesign name="sound" size={24} {...props}/>
  ]
  return (
    <View style={styles.tabBar} className="bg-gray-200">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {
                icons[index]({
                    color: isFocused ? primaryColor: grayColor
                })
            }
            {/* <CustomText weight={isFocused ? "medium": "regular"} style={{ color: isFocused ? primaryColor : grayColor , fontSize: 11}}>
              {label}
            </CustomText> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20, // instead of marginHorizontal
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    // paddingHorizontal: Platform.OS === "android" ? 20 : 0,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    backgroundColor: "#e5e5e5", // because Android ignores bg from className here
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
