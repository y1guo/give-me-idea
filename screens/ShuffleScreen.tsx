import React from "react";
import { StyleSheet, Text, View } from "react-native";

function shuffle(array: Array<String>) {
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

export default function ShuffleScreen() {
  const [keywords, setKeywords] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const onInputKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };
  const [numShuffle, setNumShuffle] = React.useState(2);
  // const onChangeNumShuffle = (event, newValue) => {
  //   console.log(newValue)
  // }
  const [shuffledKeywords, setShuffledKeywords] = React.useState<String[]>([]);
  const onClickShuffle = () => {
    setShuffledKeywords(
      shuffle(keywords.split(" ").filter((word) => word !== ""))
    );
  };

  const onClickReplace = (index: number) => () => {
    if (shuffledKeywords.length > numShuffle) {
      const newShuffledKeywords = [...shuffledKeywords];
      newShuffledKeywords[index] = newShuffledKeywords.pop() || "";
      setShuffledKeywords(newShuffledKeywords);
    } else {
      alert("Not enough keywords!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <Text>top navigation</Text>
      </View>
      <View style={styles.content}>
        <Text>shuffle keywords page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "black", flexGrow: 1 },
  topNavigation: {
    backgroundColor: "#ffeeff",
    flexGrow: 0,
  },
  content: {
    backgroundColor: "#ffffee",
    flexGrow: 1,
  },
});
