import React from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import {
  CardAlbumScreenProps,
  CardAlbumData,
  CardData,
  CardCollectionData,
} from "../components/types";
import { useWindowDimensions } from "react-native";
import { useCardAlbumData } from "../components/data";

export default function CardAlbumScreen({
  navigation,
  route,
}: CardAlbumScreenProps) {
  const cardAlbumData = useCardAlbumData();

  const { height, width } = useWindowDimensions();

  return (
    <Box flexGrow={1} alignItems="center">
      <ScrollView>
        <VStack mt={6} space={6} alignItems="center">
          {Object.entries(cardAlbumData).map(([id, collection]) => {
            return (
              <Pressable
                key={id}
                onPress={() => {
                  navigation.push("CardCollection", {
                    cardCollectionData: collection,
                  });
                }}
                bg="white"
                rounded="3xl"
                overflow="hidden"
              >
                <HStack w={(width / 12) * 10} h={((width / 12) * 10) / 3}>
                  <Image
                    source={{ uri: collection.illustration }}
                    alt="illustration"
                    w={(width / 12) * 6}
                  />
                  <VStack
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    flexShrink={1}
                  >
                    <Heading fontSize="lg" textAlign="right">
                      {collection.title}
                    </Heading>
                    <Text fontSize="xs" color="muted.400" textAlign="right">
                      {collection.description}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            );
          })}
          <Pressable onPress={() => console.log("I'm Pressed")}>
            <Image
              source={require("../assets/new-collection.png")}
              alt="new collection"
              width="96"
            />
            <Text mx="auto">↑这玩意儿png没居中</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
}
