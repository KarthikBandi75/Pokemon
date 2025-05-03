import axios from 'axios';

export const getPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};