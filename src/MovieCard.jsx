import React, { useState } from 'react'
import Modal from './Modal';

function MovieCard({ movie, voteAverage, toggleFavorite, toggleWatched, isFavorite, isWatched }) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

  const [modalShow, setModalShow] = useState(false);

  const handleCardClick = () => {
    setModalShow(true);
  };

  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <div className="button-container">
          <button
            className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie);
            }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>

          <button
            className={`watched-button ${isWatched ? 'watched' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWatched(movie);
            }}
          >
            {isWatched ? 'seen' : 'unseen'}
          </button>
        </div>
        <h2>{movie.title}</h2>
        {movie.poster_path && (
          <img
            className="poster"
            src={`${imgBaseUrl}${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        )}
        <p className="vote-average">Rating: {voteAverage.toFixed(1)}</p>
      </div>
      <Modal
        movie={movie}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
    </>
  )
}

export default MovieCard
