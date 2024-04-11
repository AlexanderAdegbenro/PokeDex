import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import PokemonDetailScreen from "./Screens/PokemonDetailScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#FFF" translucent />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="PokemonDetailScreen"
          component={PokemonDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
