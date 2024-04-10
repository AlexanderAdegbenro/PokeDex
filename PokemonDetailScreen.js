import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "./Components/BackButton";
import PokemonDetails from "./Components/PokemonDetails";

export const PokemonDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <PokemonDetails pokemon={pokemon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default PokemonDetailScreen;
