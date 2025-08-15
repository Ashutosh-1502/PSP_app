import { Text, TextProps } from "react-native";
import { fontFamily } from "@/components/fonts/index";

type FontWeight = "regular" | "medium" | "semibold" | "bold";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
}

export default function CustomText({ weight = "regular", style, ...props }: CustomTextProps) {
  const fontMap = {
    regular: fontFamily.montserratRegular,
    medium: fontFamily.montserratMedium,
    semibold: fontFamily.montserratSemibold,
    bold: fontFamily.montserratBold,
  };

  return <Text {...props} style={[{ fontFamily: fontMap[weight] }, style]} />;
}
