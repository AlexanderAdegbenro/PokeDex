import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchQuery, setSearchQuery, executeSearch }) => {
  const clearSearch = () => {
    setSearchQuery(""); 
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      executeSearch();
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search Pokémon"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={handleSearchSubmit}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={clearSearch}>
          <FontAwesomeIcon icon={faTimes} size={25} color="#666" style={styles.clearIcon} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={executeSearch}>
        <View style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={25} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    width: "90%",
    height:"6%",
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    left: 15,
  },
  clearIcon: {
    marginRight: 0,
  },
});

export default SearchBar;
