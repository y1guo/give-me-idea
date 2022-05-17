import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Fab,
  HStack,
  IconButton,
  Image,
  Pressable,
} from "native-base";
import CardAlbumScreen from "./CardAlbumScreen";
import IdeaAlbumScreen from "./IdeaAlbumScreen";
import {
  BottomTabParamList,
  CardStackParamList,
  IdeaStackParamList,
  CardStackRootProps,
  MainScreenProps,
} from "../components/types";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import CardCollectionScreen from "./CardCollectionScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShuffleScreen from "./ShuffleScreen";

const CardStack = createNativeStackNavigator<CardStackParamList>();

function CardStackRoot({ navigation, route }: CardStackRootProps) {
  return (
    <CardStack.Navigator>
      <CardStack.Screen
        name="CardAlbum"
        component={CardAlbumScreen}
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Image
                source={require("../assets/user.png")}
                alt="user"
                size="12"
                mt="-1"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Image
                source={require("../assets/more.png")}
                alt="more"
                size="12"
                mt="-1"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <CardStack.Screen
        name="CardCollection"
        component={CardCollectionScreen}
        options={{
          title: "",
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
              <Image
                source={require("../assets/add.png")}
                alt="new"
                size="10"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </CardStack.Navigator>
  );
}

const IdeaStack = createNativeStackNavigator<IdeaStackParamList>();

function IdeaStackRoot() {
  return (
    <IdeaStack.Navigator>
      <IdeaStack.Screen
        name="IdeaAlbum"
        component={IdeaAlbumScreen}
        options={{
          title: "",
          headerLeft: () => (
            <Pressable onPress={() => alert("This is a button!")}>
              <Image
                source={require("../assets/user.png")}
                alt="user"
                size="12"
                mt="-1"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => alert("This is a button!")}>
              <Image
                source={require("../assets/more.png")}
                alt="more"
                size="12"
                mt="-1"
              />
            </Pressable>
          ),
        }}
      />
    </IdeaStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function MainScreen({ navigation, route }: MainScreenProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();

  return (
    <Box flexGrow={1}>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconImage;

            if (route.name === "Cards") {
              iconImage = focused
                ? require("../assets/cards-filled.png")
                : require("../assets/cards.png");
            } else if (route.name === "Ideas") {
              iconImage = focused
                ? require("../assets/light-bulb-filled.png")
                : require("../assets/light-bulb.png");
            } else if (route.name === "Shuffle") {
              iconImage = require("../assets/shuffle.png");
              return (
                <Image source={iconImage} alt={"icon"} size="32" mb="10" />
              );
            }

            // You can return any component that you like here!
            return <Image source={iconImage} alt={"icon"} size="12" mt="4" />;
          },
        })}
      >
        <BottomTab.Screen name="Cards" component={CardStackRoot} />
        <BottomTab.Screen name="Shuffle" component={ShuffleScreen} />
        <BottomTab.Screen name="Ideas" component={IdeaStackRoot} />
      </BottomTab.Navigator>
    </Box>
  );
}
