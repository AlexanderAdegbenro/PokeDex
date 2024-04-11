import React, { useEffect, useState, useRef, forwardRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchPokemons, FETCH_LIMIT } from "../Service/api";
import { PokemonListItem } from "../Components/ PokemonListItem";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";

const SearchBarWrapper = forwardRef((props, ref) => (
  <SearchBar {...props} forwardedRef={ref} />
));

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const navigation = useNavigation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    loadPokemons();
    setSearchFocus();
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

  const handleLoadMore = () => {
    if (!isLoading) {
      loadPokemons();
    }
  };

  const handleCharacterPress = (item) => {
    navigation.navigate("PokemonDetailScreen", { pokemon: item.name });
  };

  const executeSearch = async () => {
    try {
      setIsLoading(true);
      const filteredPokemons = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredPokemons);
      setSearchError(null);
    } catch (error) {
      console.error("Error searching for Pokémon: ", error);
      setSearchError("Failed to search for Pokémon");
    } finally {
      setIsLoading(false);
    }
  };

  const setSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };

  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{searchError}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Pokédex" />
      <SearchBarWrapper
        ref={searchInputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        executeSearch={executeSearch}
      />
      <FlatList
        data={searchQuery ? searchResults : pokemonList}
        renderItem={({ item }) => (
          <PokemonListItem item={item} onPress={handleCharacterPress} />
        )}
        keyExtractor={(item, index) => item.name + index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={searchError ? renderError : null}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
});

export default HomeScreen;
