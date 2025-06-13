import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ modalShow, setModalShow, movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (modalShow && movie && movie.id) {
      fetchMovieDetails(movie.id);
      fetchMovieTrailer(movie.id);
    }
  }, [modalShow, movie]);

  const fetchMovieDetails = async (movieId) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieTrailer = async (movieId) => {
    setTrailerKey(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();   
      const trailer = data.results.find(
        video => video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser')
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  if (!modalShow) return null;

  return (
    <div className="modalOverlay" onClick={handleModalClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2>{movie.title}</h2>
          <button className="closeButton" onClick={handleModalClose}>×</button>
        </div>
        <div className="modalBody">
          {movie.poster_path && (
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          )}
          <p>{movie.overview}</p>
          <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)} / 10</p>
          <p><strong>Release date:</strong> {movie.release_date}</p>

          {movieDetails && (
            <>
              {movieDetails.genres && (
                <p>
                  <strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}
                </p>
              )}
              {movieDetails.runtime && (
                <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
              )}
            </>
          )}

          {trailerKey && (
            <div className="trailer-container">
              <h3>Trailer</h3>
              <iframe
                className="youtube-trailer"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movie.title} Trailer`}
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
