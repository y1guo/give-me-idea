import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import { AppStackParamList } from "./components/types";

const themeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function App() {
  // comment: can change to use color mode manager in the future
  const theme = extendTheme({ themeConfig });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
