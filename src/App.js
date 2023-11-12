import React, { useState, useEffect } from 'react';
import MovieList from '@/components/MovieList/MovieList';
import styles from "./style/SWFavourites.module.css"
import stylesLoading from "./style/SWFavourites_loading.module.css"
import MovieDetails from '@/components/MovieDetails/MovieDetails';
import DefaultImg from './photos/DefultImg.jpg';

function App() {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(initialFavorites);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(DefaultImg);
  const [isLoading, setIsLoading] = useState(false);

  let imagePath;
  useEffect(() => {
    try {
      imagePath = require(`./photos/${selectedMovie.title}.jpg`);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(true)
      imagePath = require(`./photos/Loading.gif`);
    }
    setBackgroundImage(imagePath);
  }, [selectedMovie])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (movie) => {
    if (favorites.some(fav => fav.episode_id === movie.episode_id)) {
      setFavorites(favorites.filter(fav => fav.episode_id !== movie.episode_id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
  }

  return (
    <div className="App" >
      {isLoading ?
        <img alt="LoadindBackgroundImg" className={stylesLoading.loadingScreen} src={backgroundImage} /> :
        <img alt="BackgroundImg" className={styles.backgroundImage} src={backgroundImage} />}
      <MovieDetails movie={selectedMovie} favorites={favorites} onFavoriteToggle={handleFavorite} />
      <MovieList onMovieSelect={handleMovieSelect} />
    </div>
  );

}

export default App;