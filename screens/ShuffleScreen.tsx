import React from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import {
  Box,
  Text,
  Center,
  IconButton,
  Icon,
  Image,
  Button,
  Fab,
  FlatList,
  Heading,
  HStack,
  Modal,
  ScrollView,
  TextArea,
  VStack,
} from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@native-base/icons";
import { BottomTabParamList, ShuffleScreenProps } from "../components/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCardAlbumData } from "../components/data";
import Rating from "../components/Rating";

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function ShuffleScreen({
  navigation,
  route,
}: ShuffleScreenProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/arrow-left.png")}
            alt="back"
            size="10"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("This is a button!")}>
          <Image source={require("../assets/save.png")} alt="save" size="10" />
        </TouchableOpacity>
      ),
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          onPress={(e) => {
            props.onPress && props.onPress(e);
            onClickShuffle();
          }}
        />
      ),
    });
  });

  const [collectionId, setCollectionId] = React.useState("testCollection");
  const cardAlbumData = useCardAlbumData();
  const cardCollectionData = React.useMemo(
    () => cardAlbumData[collectionId],
    [cardAlbumData, collectionId]
  );
  const [numShuffle, setNumShuffle] = React.useState(2);
  const onChangeNumShuffle = (value: number) => {
    setNumShuffle(value);
  };
  const [cardIdToShow, setCardIdToShow] = React.useState<string[]>([]);
  const onClickReplace = (index: number) => () => {
    if (cardIdToShow.length > numShuffle) {
      const newCardIdToShow = [...cardIdToShow];
      newCardIdToShow[index] = newCardIdToShow.pop() || "0";
      setCardIdToShow(newCardIdToShow);
      console.log(cardIdToShow.length);
    } else {
      alert("Not enough cards!");
    }
  };

  const onClickShuffle = () => {
    setCardIdToShow(
      shuffle(
        Object.entries(cardCollectionData.data).map(([id, cardData]) => id)
      )
    );
  };

  const safeAreaInsets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  return (
    <VStack flexGrow={1} alignItems="center">
      <VStack w={"75%"}>
        <Text fontSize="lg" color="muted.400" mt={4}>
          Cards in
        </Text>
        <Heading isTruncated size="2xl" mx="auto">
          Industrial Design
        </Heading>
      </VStack>
      <ScrollView
        flexGrow={1}
        w="100%"
        p="3"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {cardIdToShow.slice(0, numShuffle).map((id, index) => (
          <Box mx={1} key={id}>
            <VStack
              flexShrink={0}
              w="48"
              h="72"
              borderRadius="3xl"
              p="4"
              shadow="9"
              bg="white"
              justifyContent="space-between"
            >
              <Heading size="md">{cardCollectionData.data[id].title}</Heading>
              <Image
                size="40"
                // resizeMode={"contain"}
                borderRadius="40"
                source={{
                  uri: cardCollectionData.data[id].illustration,
                }}
                alt="random picture"
              />
              <Text ml="auto" color="muted.400">
                {cardCollectionData.data[id].description}
              </Text>
            </VStack>
            <HStack alignItems="center" my="2">
              <Text color="muted.400" fontSize="xs" ml="auto">
                replace
              </Text>
              <TouchableOpacity onPress={onClickReplace(index)}>
                <Image
                  source={require("../assets/shuffle.png")}
                  alt="shuffle"
                  size="8"
                />
              </TouchableOpacity>
            </HStack>
          </Box>
        ))}
      </ScrollView>
      {/* <Rating
        type="custom"
        ratingImage={require("../assets/refresh.png")}
        ratingColor="yellow"
        ratingBackgroundColor="transparent"
        ratingCount={9}
        startingValue={numShuffle}
        onFinishRating={onChangeNumShuffle}
        imageSize={30}
        style={{ marginBottom: 64, backgroundColor: "transparent" }}
      /> */}
      <Rating
        style={{ space: 2, mb: 16 }}
        onImage={
          <Image
            source={require("../assets/refresh-filled.png")}
            alt="c"
            size="8"
          />
        }
        offImage={
          <Image source={require("../assets/refresh.png")} alt="c" size="8" />
        }
        maxValue={9}
        value={numShuffle}
        onPress={(newValue) => setNumShuffle(newValue)}
      />
    </VStack>
  );
}
