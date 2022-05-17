import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs"

export type AppStackParamList = {
  Main: undefined;
};

export type MainScreenProps = NativeStackScreenProps<AppStackParamList, "Main">;

export type BottomTabParamList = {
  Cards: undefined;
  Shuffle: undefined;
  Ideas: undefined;
};

export type CardStackRootProps = BottomTabScreenProps<
  BottomTabParamList,
  "Cards"
>;

export type ShuffleScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Shuffle"
>;

export type CardStackParamList = {
  CardAlbum: undefined;
  CardCollection: {
    cardCollectionData: CardCollectionData,
  };
  Shuffle: undefined;
}

export type CardAlbumScreenProps = NativeStackScreenProps<
  CardStackParamList,
  "CardAlbum"
>;

export type CardCollectionScreenProps = NativeStackScreenProps<
CardStackParamList,
"CardCollection"
>;

export type IdeaStackParamList = {
  IdeaAlbum: undefined;
}


export type CardData = {
  title: string;
  description: string;
  illustration: string;
  category: string;
}

export type CardCollectionData = {
  title: string;
  description: string;
  illustration: string;
  data: {
    [key:string]: CardData;
  };
}

export type CardAlbumData = {
  [key:string]: CardCollectionData
}