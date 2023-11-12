import React, { useState, useEffect } from 'react';
import { fetchMovies } from '@/services/api';
import MovieItem from '@/components/MovieItem/MovieItem';
import Loading from '@/components/Loading/Loading';
import styles from "../../style/SWFavorits.module.css"

function MovieList({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let defaultMovie;

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await fetchMovies();
        const sortedData = data.sort((a, b) => a.episode_id - b.episode_id);
        setMovies(sortedData);
        defaultMovie = data[0];
        onMovieSelect(defaultMovie)
      } catch (error) {
        console.error("Failed fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, []);

  return (
    <div className={styles.listContainer}>
      {isLoading ? (
        <Loading message="Loading Movies..." />
      ) : (
        movies.map(movie => (
          <MovieItem
            key={movie.episode_id}
            movie={movie}
            onMovieSelect={onMovieSelect} />
        ))
      )}
    </div>
  );
}

export default MovieList;
