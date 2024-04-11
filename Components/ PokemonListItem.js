import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export const PokemonListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.touchable}>
    <View style={styles.pokemonContainer}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.name}>{capitalizeFirstLetter(item.name)}</Text>
    </View>
  </TouchableOpacity>
);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  pokemonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default PokemonListItem;
