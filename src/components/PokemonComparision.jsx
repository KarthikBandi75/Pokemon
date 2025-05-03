import React from 'react';
import { motion } from 'framer-motion';

const PokemonComparison = ({ pokemon1, pokemon2 }) => {
  const stats = ['HP', 'Attack', 'Defense', 'Speed'];

  const getStatValue = (pokemon, statName) => {
    const statMap = {
      HP: 0,
      Attack: 1,
      Defense: 2,
      Speed: 5
    };
    return pokemon.stats[statMap[statName]].base_stat;
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {[pokemon1, pokemon2].map((pokemon) => (
        <div
          key={pokemon.name}
          className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold capitalize text-[#0A66C2]">
            {pokemon.name}
          </h3>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24 my-4"
          />
          <div className="w-full">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Stats</h4>
            <ul className="space-y-2">
              {stats.map((stat) => (
                <li key={stat} className="flex justify-between text-sm">
                  <span>{stat}</span>
                  <span className="font-medium">{getStatValue(pokemon, stat)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default PokemonComparison;