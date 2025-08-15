import React, { useEffect, useState, useRef } from "react";
import { Animated, Easing, Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  const textToType = "Prrotein structure prediction";
  const [displayedText, setDisplayedText] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  const zoomAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let currentIndex = 0;
    const onTypingComplete = () => {
      setShowSubtitle(true);
      Animated.sequence([
        Animated.delay(500),

        Animated.parallel([
          Animated.timing(zoomAnim, {
            toValue: 2,
            duration: 1300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    };

    const typeCharacter = () => {
      if (currentIndex < textToType.length) {
        setDisplayedText((prev) => prev + textToType.charAt(currentIndex));
        currentIndex++;
        setTimeout(typeCharacter, 60);
      } else {
        onTypingComplete();
      }
    };

    typeCharacter();
  }, []); 

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim, 
          transform: [{ scale: zoomAnim }], 
        }}
      >
        <LottieView
          source={require("@/assets/gifs/DNA.json")}
          autoPlay
          loop
          style={{ width: 250, height: 250 }}
        />
      </Animated.View>

      <View style={{height: 100}}>
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: fadeAnim,
              transform: [{ scale: zoomAnim }],
            },
          ]}
        >
          {displayedText}
        </Animated.Text>

        {showSubtitle && (
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: fadeAnim,
                transform: [{ scale: zoomAnim }],
              },
            ]}
          >
            Fast and Accurate
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SplashScreen;
