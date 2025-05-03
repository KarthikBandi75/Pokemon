
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PokemonComparison from '../components/PokemonComparision';

const ComparePage = () => {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return false;
    if (/^\d+$/.test(trimmedInput)) {
      const id = parseInt(trimmedInput, 10);
      return id >= 1 && id <= 150;
    }
    return /^[a-zA-Z0-9-]+$/.test(trimmedInput); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedId1 = id1.trim();
    const trimmedId2 = id2.trim();

    if (!trimmedId1 || !trimmedId2) {
      toast.info('Please enter both Pokémon IDs or names');
      return;
    }

    if (!validateInput(trimmedId1) || !validateInput(trimmedId2)) {
      toast.error('Please enter valid Pokémon IDs or names');
      return;
    }

    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedId1.toLowerCase()}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedId2.toLowerCase()}`),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error('Invalid Pokémon data');
      }

      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      setPokemonData({ pokemon1: data1, pokemon2: data2 });
    } catch (err) {
      toast.error('Failed to fetch Pokémon data. Please check the IDs or names.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[#0A66C2] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Compare Pokémon
      </h2>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          value={id1}
          onChange={(e) => setId1(e.target.value)}
          placeholder="Pokémon ID or Name (e.g., Pikachu)"
          className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />
        <input
          type="text"
          value={id2}
          onChange={(e) => setId2(e.target.value)}
          placeholder="Pokémon ID or Name (e.g., Bulbasaur)"
          className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />
        <div className="sm:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#0A66C2]/90 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span className="spinner inline-block"></span> : 'Compare'}
          </button>
        </div>
      </form>
      {pokemonData && <PokemonComparison pokemon1={pokemonData.pokemon1} pokemon2={pokemonData.pokemon2} />}
    </motion.div>
  );
};

export default ComparePage;
