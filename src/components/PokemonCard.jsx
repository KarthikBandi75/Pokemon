import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const isFav = isFavorite(pokemon.name);

  const handleFavorite = (e) => {
    e.stopPropagation();
    isFav ? removeFavorite(pokemon.name) : addFavorite(pokemon);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/pokemon/${pokemon.name}`);
  };

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      onClick={handleCardClick}
    >
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 text-[#00A69C] hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 ${isFav ? 'fill-[#00A69C] text-[#00A69C]' : 'text-gray-400'}`}
        />
      </button>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto"
      />
      <h3 className="text-lg font-semibold capitalize text-gray-800 mt-2">
        {pokemon.name}
      </h3>
      <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className="bg-[#0A66C2]/10 text-[#0A66C2] px-2 py-1 rounded-full text-xs font-medium"
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
      <motion.button
        onClick={handleDetailsClick}
        className="mt-3 px-4 py-1 bg-[#00A69C] text-white rounded-full hover:bg-[#0A66C2]/90 transition-colors cursor-pointer text-sm"
        whileHover={{ scale: 1.05 }}
      >
        View Details
      </motion.button>
    </motion.div>
  );
};

export default PokemonCard;