import React from 'react';
import styles from "../../style/SWFavorits.module.css"


function MovieItem({ movie, onMovieSelect }) {

  const imageName = movie.title;
  let imagePath;
  try {
    imagePath = require(`../../photos/${imageName}.jpg`);
  } catch (e) {
    imagePath = require(`../../photos/DefultImg.jpg`); 
  }



  return (
    <div key={movie.episode_id} 
    className={styles.MovieItemContainer} 
    onClick={() => onMovieSelect(movie)}> {/* The onMovieSelect function was empty and didn't send any argument back to MovieList */}
      <h1 className={styles.MovieItemHeader}>
        {movie.title}
      </h1>
      <img alt="MovieItemImg" className={styles.MovieItemImg} src={imagePath}  />
    </div>
  );
}

export default MovieItem;