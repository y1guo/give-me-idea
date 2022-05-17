import React from "react";
import { Image } from "native-base";
import { CardAlbumData, CardData } from "./types";

// generate some test data
const testKeywords =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const testCollectionData: { [key: string]: CardData } = {};
testKeywords
  .split(" ")
  .filter((s) => s !== "")
  .forEach((s, i) => {
    testCollectionData[i.toString()] = {
      title: s,
      description: "description",
      illustration: "https://picsum.photos/512/512?random=" + i,
      category:
        s[0] in { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0 }
          ? "A-I"
          : s[0] in { j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0 }
          ? "J-R"
          : "S-Z(*)",
    };
  });

const testCardAlbumData: CardAlbumData = {
  testCollection: {
    title: "Industrial Design",
    description: "Inspiration for product design",
    illustration: "https://picsum.photos/512/512",
    data: testCollectionData,
  },
};

export function useCardAlbumData() {
  return React.useMemo(() => testCardAlbumData, [testCardAlbumData]);
}
