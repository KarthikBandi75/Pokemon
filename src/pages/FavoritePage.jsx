import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import PokemonCard from '../components/PokemonCard';
import { ArrowLeft } from 'lucide-react';

const FavoritePage = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-xl text-gray-700 mb-4">No favorite Pokémon yet.</p>
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
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[#0A66C2] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;