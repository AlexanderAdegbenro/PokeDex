import { View, StyleSheet } from "react-native";
import PokemonDetails from "../Components/PokemonDetails";

export const PokemonDetailScreen = ({ route }) => {
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
