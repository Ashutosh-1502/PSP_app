import { View, Text } from "react-native";
import AnnouncementsList from "@/modules/announcement/screens/announcements";

export default function AnnouncementScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <AnnouncementsList />
    </View>
  );
}
