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
import React from "react";
import { CardCollectionScreenProps, CardData } from "../components/types";

export default function CardCollectionScreen({
  navigation,
  route,
}: CardCollectionScreenProps) {
  const [collectionData, setCollectionData] = React.useState(
    route.params.cardCollectionData
  );

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "",
  //     headerLeft: () => (
  //       <Pressable onPress={() => navigation.goBack()}>
  //         <Image
  //           source={require("../assets/arrow-left.png")}
  //           alt="back"
  //           size="10"
  //         />
  //       </Pressable>
  //     ),
  //     headerRight: () => (
  //       <Pressable onPress={() => alert("This is a button!")}>
  //         <Image source={require("../assets/add.png")} alt="new" size="10" />
  //       </Pressable>
  //     ),
  //   });
  // });

  // find all categories
  const cardDataByCategory = React.useMemo(() => {
    const res: { [key: string]: { [key: string]: CardData } } = {};
    for (let id in collectionData.data) {
      const cardData = collectionData.data[id];
      if (cardData.category in res) {
        res[cardData.category][id] = cardData;
      } else {
        res[cardData.category] = { id: cardData };
      }
    }
    return res;
  }, [collectionData]);

  return (
    <ScrollView>
      <VStack space={2}>
        <VStack>
          <Text ml="8" mt="3" fontSize="lg" color="muted.400">
            Cards in
          </Text>
          <Heading mx="auto" size="2xl">
            {collectionData.title}
          </Heading>
        </VStack>
        {Object.entries(cardDataByCategory).map(([category, data]) => {
          return (
            <VStack key={category} space={2}>
              <Heading ml="4" fontSize="lg">
                {category}
              </Heading>
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
                {Object.entries(data).map(([id, cardData]) => (
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
                      <Heading size="md">{cardData.title}</Heading>
                      <Image
                        size="40"
                        // resizeMode={"contain"}
                        borderRadius="40"
                        source={{
                          uri: cardData.illustration,
                        }}
                        alt="random picture"
                      />
                      <Text ml="auto" color="muted.400">
                        {cardData.description}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </ScrollView>
            </VStack>
          );
        })}
      </VStack>
    </ScrollView>
  );
}
