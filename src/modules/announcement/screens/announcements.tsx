import { View, Text, FlatList, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRef, useState, useMemo, useEffect } from "react";
import AnnouncementBottomSheet from "@/modules/announcement/components/announcementBottomSheet";
import { useAnnouncementAPI } from "@/modules/announcement/hooks/useAnnouncement";
import { getData } from "@/lib/utils/storage";
import { BlurView } from "expo-blur";
import { Portal } from "@gorhom/portal";
import { Notification } from "@/modules/announcement/types/index";
import LottieView from "lottie-react-native";
import { formatDate } from "@/lib/utils/reusableFn";

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

export default function AnnouncementsList() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { useGetAllNotificationQuery, useUserManageNotificationAPI } =
    useAnnouncementAPI();

  useEffect(() => {
    (async () => {
      const storedUser = await getData("user");
      setUser(storedUser);
    })();
  }, []);

  const snapPoints = useMemo(() => [300, 500], []);

  const {
    data: notificationsData,
    isSuccess,
    refetch: refetchNotificationData,
  } = useGetAllNotificationQuery({
    enabled: !!user, 
  });

  const isRead = (notification: Notification): boolean => {
    return notification.notificationSeenStatus.some(
      (data) => data.userRef === user?._id
    );
  };

  const markRead = (data: { id: string; userId: string }) => {
    useUserManageNotificationAPI.mutate(
      { ...data },
      {
        onSuccess: () => {
          void refetchNotificationData();
        },
        onError: () => {
          console.log("failed");
        },
      }
    );
  };

  const openBottomSheet = (item: Notification) => {
    if (!isRead(item)) {
      markRead({ id: String(item._id), userId: user._id });
    }
    setSelectedNotification(item);
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <View className="flex-1 w-full bg-white pt-2 h-full">
      {!isSuccess ? (
        <View className="my-auto mx-auto">
          <LottieView
            source={require("@/assets/gifs/loading.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : notificationsData?.notifications &&
        notificationsData.notifications.length === 0 ? (
        <View className="my-auto mx-auto">
          <LottieView
            source={require("@/assets/gifs/noData.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <FlatList
          data={notificationsData?.notifications || []}
          keyExtractor={(notification) => String(notification._id)}
          renderItem={({ item }) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <TouchableOpacity
                onPress={() => openBottomSheet(item)}
                activeOpacity={0.7}
                className="flex-row items-center px-4 py-3 border-b border-gray-200"
              >
                {/* Avatar */}
                <View
                  className={`w-12 h-12 rounded-full ${randomColor} justify-center items-center mr-3`}
                >
                  <Text className="text-white font-bold text-lg">
                    {item.title.charAt(0).toUpperCase()}
                  </Text>
                </View>
                {/* Content */}
                <View className="flex-1 gap-y-1">
                  <View className="flex-row justify-between items-center">
                    <Text
                      className={`text-black ${!isRead(item) ? "font-bold" : ""}`}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                  <Text className="text-gray-600 mt-0.5" numberOfLines={1}>
                    {item.subject}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: "#F7F7F7",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          backdropComponent={BlurBackdrop}
        >
          <BottomSheetView style={{ flex: 1, padding: 16 }}>
            <AnnouncementBottomSheet notification={selectedNotification} />
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
}

function BlurBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={1}
      disappearsOnIndex={-1}
      opacity={0.2}
    >
      <BlurView
        intensity={50}
        tint="systemUltraThinMaterialLight"
        style={{ flex: 1 }}
      />
    </BottomSheetBackdrop>
  );
}
