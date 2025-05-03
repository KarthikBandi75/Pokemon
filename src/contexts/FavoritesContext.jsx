import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (stored.length) {
      Promise.all(
        stored.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json())
        )
      ).then(setFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites.map((p) => p.name)));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFavorite = (name) => {
    setFavorites(favorites.filter((p) => p.name !== name));
  };

  const isFavorite = (name) => favorites.some((p) => p.name === name);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};