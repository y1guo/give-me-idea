import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import { IdeaStackParamList } from "../components/types";

type IdeaAlbumScreenProps = NativeStackScreenProps<
  IdeaStackParamList,
  "IdeaAlbum"
>;

export default function IdeaAlbumScreen({
  navigation,
  route,
}: IdeaAlbumScreenProps) {
  return <Text>idea album screen</Text>;
}
