import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import BottomNavigation from "./components/BottomNavigation";
import ShuffleScreen from "./screens/ShuffleScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <ShuffleScreen />
      </View>
      <View style={styles.bottomNavigation}>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
  screen: { flexGrow: 1 },
  bottomNavigation: { flexGrow: 0 },
});
