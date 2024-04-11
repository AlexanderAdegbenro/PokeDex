import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import BackButton from "./BackButton";
import { useNavigation } from "@react-navigation/native";
import { fetchPokemonDetails } from "../Service/api";

const PokemonDetails = ({ pokemon }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const pokemonDetails = await fetchPokemonDetails(pokemon);
        setDetails(pokemonDetails);
        setError(null);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        setError("Failed to fetch Pokemon details");
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemonDetails();
  }, [pokemon]);

  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pokemonDetails = await fetchPokemonDetails(pokemon);
      setDetails(pokemonDetails);
      setError(null);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      setError("Failed to fetch Pokemon details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return renderLoading();
  }

  if (error) {
    return renderError(handleRetry);
  }

  if (!details) {
    return null;
  }

  return renderPokemonDetails(details, navigation);
};

PokemonDetails.propTypes = {
  pokemon: PropTypes.string.isRequired,
};

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#E63F34" />
  </View>
);

const renderError = (handleRetry) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Failed to fetch Pokemon details</Text>
    <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

const renderPokemonDetails = (details, navigation) => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Image
        style={styles.image}
        source={{ uri: details.sprites.front_default }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{capitalizeFirstLetter(details.name)}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Base Experience:</Text>
          <Text style={styles.value}>{details.base_experience}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{details.height}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{details.weight}</Text>
        </View>
        <Text style={styles.abilitiesTitle}>Abilities:</Text>
        {details.abilities.map((ability, index) => (
          <Text key={index} style={styles.ability}>
            {ability.ability.name} {ability.is_hidden && "(Hidden)"}
          </Text>
        ))}
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 0,
  },
  image: {
    marginTop: 100,
    width: 250,
    height: 250,
  },
  detailsContainer: {
    marginTop: 60,
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    flex: 0.5,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 2,
    textAlign: "center",
    bottom: 400,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
  },
  abilitiesTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 80,
  },
  ability: {
    fontSize: 22,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E63F34",
    borderRadius: 5,
    marginTop: 20,
  },
  retryButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default PokemonDetails;
