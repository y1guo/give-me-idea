import { HStack, Image, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

type RatingProps = {
  style: { [key: string]: string | number } | undefined;
  onImage: JSX.Element;
  offImage: JSX.Element;
  maxValue: number;
  value: number;
  onPress: (newValue: number) => void;
};

export default function Rating({
  style,
  onImage,
  offImage,
  maxValue,
  value,
  onPress,
}: RatingProps) {
  const iconList = React.useMemo(
    () =>
      [...Array(maxValue).keys()].map((index) => (
        <TouchableOpacity key={index} onPress={() => onPress(index + 1)}>
          {index < value ? onImage : offImage}
        </TouchableOpacity>
      )),
    [value]
  );
  return <HStack {...style}>{iconList}</HStack>;
}
