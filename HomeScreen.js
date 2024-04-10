import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchPokemons, FETCH_LIMIT } from "./Service/api";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { PokemonListItem } from "./Components/ PokemonListItem";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    setIsLoading(true);
    try {
      const fetchedPokemons = await fetchPokemons(offset);
      setPokemonList((prevList) => [...prevList, ...fetchedPokemons]);
      setOffset((prevOffset) => prevOffset + FETCH_LIMIT);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    if (!isLoading) {
      loadPokemons();
    }
  };

  const handleCharacterPress = (item) => {
    navigation.navigate("PokemonDetailScreen", { pokemon: item.name });
  };

  const delayedSearch = (text) => {
    setSearchQuery(text);
    clearTimeout(searchTimeoutRef.current);
    if (text.length >= 4) {
      searchTimeoutRef.current = setTimeout(() => {
        console.log("Searching for:", text);
      }, 1000);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            color: "#333",
          }}
        >
          Pokédex
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              flex: 1,
              height: 30,
              borderColor: "gray",
              borderWidth: 0.5,
              marginBottom: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onChangeText={delayedSearch}
            value={searchQuery}
            placeholder="What Pokemon are you looking for?"
          />
          <TouchableOpacity onPress={() => console.log("Search pressed")}>
            <FontAwesomeIcon
              icon={faSearch}
              size={20}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={filteredPokemonList}
        renderItem={({ item }) => (
          <PokemonListItem item={item} onPress={handleCharacterPress} />
        )}
        keyExtractor={(item, index) => item.name + index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    top: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
