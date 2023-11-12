import React, { useState, useEffect } from 'react';
import styles from "../../style/SWFavourites.module.css";
import LikeIcon from "../../photos/Like.png";
import DislikeIcon from "../../photos/Dislike.png";

function MovieDetails({ movie, onFavoriteToggle, favorites }) {
  const [imagePath, setImagePath] = useState('');
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    if (movie) {

      setImageVisible(false);

      let newImagePath;
      try {
        newImagePath = require(`../../photos/${movie.title + " spotlight"}.jpg`);
      } catch (e) {
        newImagePath = require(`../../photos/DefultImg.jpg`);
      }


      const timeoutId = setTimeout(() => {
        setImagePath(newImagePath);
        setImageVisible(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className={styles.MovieDetailsContainer}>
      <div className={styles.MovieDetailsImgContainer}>
        <img
          alt="MovieDetailsImg"
          className={`${styles.MovieDetailsImg} ${styles.fadeImage} ${imageVisible ? styles.visibleImage : styles.hiddenImage}`}
          src={imagePath}
        />

        <div className={styles.MovieDetailsLikeContainer} >
          <img
            alt="MovieLikeIcon"
            className={styles.MovieDetailsLike}
            src={favorites.some(fav => fav.episode_id === movie.episode_id) ? DislikeIcon : LikeIcon}
            onClick={() => onFavoriteToggle(movie)} /> {/* Since the onFavoriteToggle prop was initially empty in the App component, the onFavoriteToggle call could not be executed */}
        </div>

        <h2 className={styles.MovieDetailsHeader}>{movie.title}</h2>
        <h2 className={styles.MovieDetailsEpisodeHeader}>Episode: {movie.episode_id}</h2>
      </div>
    </div>
  );
}

export default MovieDetails;


