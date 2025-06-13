import React, { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Sidebar from './components/Sidebar'
import MovieCard from './MovieCard'

const App = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [activePage, setActivePage] = useState('home');

  const toggleFavorite = (movie) => {
    setFavoriteMovies(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(m => m.id === movie.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter(m => m.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const toggleWatched = (movie) => {
    setWatchedMovies(prevWatched => {
      const isAlreadyWatched = prevWatched.some(m => m.id === movie.id);

      if (isAlreadyWatched) {
        return prevWatched.filter(m => m.id !== movie.id);
      } else {
        return [...prevWatched, movie];
      }
    });
  };

  const isMovieFavorite = (movieId) => {
    return favoriteMovies.some(movie => movie.id === movieId);
  };

  const isMovieWatched = (movieId) => {
    return watchedMovies.some(movie => movie.id === movieId);
  };

  const FavoritesPage = () => {
    return (
      <div className="page-container">
        <h1>Favorite Movies</h1>
        {favoriteMovies.length > 0 ? (
          <div className="movies-container">
            {favoriteMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                voteAverage={movie.vote_average}
                toggleFavorite={toggleFavorite}
                toggleWatched={toggleWatched}
                isFavorite={isMovieFavorite(movie.id)}
                isWatched={isMovieWatched(movie.id)}
              />
            ))}
          </div>
        ) : (
          <p className="no-results">No favorite movies yet.</p>
        )}
      </div>
    );
  };

 
  const WatchedPage = () => {
    return (
      <div className="page-container">
        <h1>Watched Movies</h1>
        {watchedMovies.length > 0 ? (
          <div className="movies-container">
            {watchedMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                voteAverage={movie.vote_average}
                toggleFavorite={toggleFavorite}
                toggleWatched={toggleWatched}
                isFavorite={isMovieFavorite(movie.id)}
                isWatched={isMovieWatched(movie.id)}
              />
            ))}
          </div>
        ) : (
          <p className="no-results">No watched movies yet.</p>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <MovieList
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
            isMovieFavorite={isMovieFavorite}
            isMovieWatched={isMovieWatched}
          />
        );
      case 'favorites':
        return <FavoritesPage />;
      case 'watched':
        return <WatchedPage />;
      default:
        return (
          <MovieList
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched}
            isMovieFavorite={isMovieFavorite}
            isMovieWatched={isMovieWatched}
          />
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
      </header>
      <div className="app-content">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {renderContent()}
      </div>
      <footer className='App-footer'>
        <h3> © 2025 Flixter inc</h3>
      </footer>
    </div>
  )
}

export default App
