// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, SafeAreaView, View } from "react-native";
// import BottomNavigation from "./components/BottomNavigation";
// import ShuffleScreen from "./screens/ShuffleScreen";
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box>Hello World!</Box>
    </NativeBaseProvider>
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.screen}>
    //     <ShuffleScreen />
    //   </View>
    //   <View style={styles.bottomNavigation}>
    //     <BottomNavigation />
    //   </View>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: { flexGrow: 1 },
//   screen: { flexGrow: 1 },
//   bottomNavigation: { flexGrow: 0 },
// });
