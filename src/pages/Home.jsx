import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, ArrowRight, Heart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { getPokemons, getPokemonDetails } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [types] = useState([
    'All',
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy'
  ]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const results = await getPokemons();
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const data = await getPokemonDetails(pokemon.url);
            return data;
          })
        );
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPokemons(term, selectedType);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterPokemons(searchTerm, type);
    setCurrentPage(1);
  };

  const filterPokemons = (term, type) => {
    const filtered = pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(term);
      const matchesType =
        type !== 'All'
          ? pokemon.types.some((typeObj) => typeObj.type.name === type.toLowerCase())
          : true;
      return matchesSearch && matchesType;
    });
    setFilteredPokemons(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setFilteredPokemons(pokemons);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-xl text-gray-700">Failed to load Pokémon.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Pokémon Explorer
      </h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate('/favorites')}
          className="flex items-center gap-2 text-[#0A66C2] hover:underline cursor-pointer"
        >
          <Heart className="w-5 h-5" /> Favorites
        </button>
        <button
          onClick={() => navigate('/compare')}
          className="flex items-center gap-2 text-[#0A66C2] hover:underline cursor-pointer"
        >
          <Users className="w-5 h-5" /> Compare
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] w-full sm:w-64 bg-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <div className="relative">
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] w-full sm:w-48 bg-white appearance-none"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">No Pokémon found.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#0A66C2]/90 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#0A66C2]/90 disabled:opacity-50 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </motion.button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#0A66C2]/90 disabled:opacity-50 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Next <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home;