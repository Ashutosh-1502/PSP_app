// EmailBottomSheet.tsx
import { View, Text, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

type AnnouncementBottomSheetProps = {
  notification: {
    title: string;
    subject: string;
    notificationBody: string;
  };
};

export default function AnnouncementBottomSheet({
  notification,
}: AnnouncementBottomSheetProps) {
  const { width } = useWindowDimensions();
  return (
    <View className="px-4 flex-1 items-start">
      {notification ? (
        <>
          <Text className="text-lg font-bold">{notification.title}</Text>
          <Text className="mt-1 font-semibold">{notification.subject}</Text>
          <RenderHTML
            contentWidth={width}
            source={{ html: notification.notificationBody || "" }}
            baseStyle={{ fontSize: 14, color: "#9CA3AF", marginTop: 6, lineHeight: 18 }}
          />
        </>
      ) : (
        <Text>No Announcement selected</Text>
      )}
    </View>
  );
}
