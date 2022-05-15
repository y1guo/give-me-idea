import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <Text>Bottom Navigation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#eeffff", flexGrow: 1 },
});
