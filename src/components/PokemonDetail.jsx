import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState(200);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setStatus(res.status);
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error('Error fetching Pokémon details', err);
        toast.error('Failed to fetch Pokémon data');
      }
    };
    fetchDetails();
  }, [name]);

  if (status === 404 || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-xl text-gray-700 mb-4">
          {status === 404 ? 'Pokémon not found' : 'Loading...'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-full hover:bg-[#0A66C2]/90 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 my-8 bg-white rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#0A66C2] hover:underline mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <img
          src={pokemon.sprites?.other['official-artwork']?.front_default}
          alt={pokemon.name}
          className="w-32 h-32 sm:w-40 sm:h-40"
        />
        <div>
          <h2 className="text-2xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h2>
          <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {pokemon.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className="bg-[#0A66C2]/10 text-[#0A66C2] px-2 py-1 rounded-full text-xs font-medium"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Stats</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="flex justify-between text-sm">
              <span className="capitalize">{stat.stat.name}</span>
              <span className="font-medium">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Abilities</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {pokemon.abilities.map((ab) => (
            <span
              key={ab.ability.name}
              className="bg-[#00A69C]/10 text-[#00A69C] px-2 py-1 rounded-full text-xs font-medium"
            >
              {ab.ability.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonDetail;