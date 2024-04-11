const API_URL = "https://pokeapi.co/api/v2/";
const API_QUERY = "pokemon?limit=20&offset=";
const FETCH_LIMIT = 20;

export const fetchPokemons = async (offset) => {
  try {
    const response = await fetch(`${API_URL}${API_QUERY}${offset}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const fetchedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url);
          if (!res.ok) {
            throw new Error("Failed to fetch Pokemon data");
          }
          const pokemonData = await res.json();
          return {
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
          };
        } catch (error) {
          console.error("Error fetching Pokemon data: ", error);
          throw new Error("Failed to fetch Pokemon data");
        }
      })
    );
    return fetchedPokemons;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const fetchPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(`${API_URL}pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
};
