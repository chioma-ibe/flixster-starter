import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import SearchBar from './components/SearchBar'
import SortSelector from './components/SortSelector'
import GenreFilter from './components/GenreFilter'

function MovieList({ toggleFavorite, toggleWatched, isMovieFavorite, isMovieWatched }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('nowPlaying');
  const [searchResults, setSearchResults] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchMovies = async (pageNum) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`
    );

    const data = await response.json();
    return data.results;
  };

  const fetchGenres = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();
    return data.genres;
  };

  const searchMovies = async (query) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
    );

    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const initialMovies = await fetchMovies(1);
      setMovies(initialMovies);

      const genreList = await fetchGenres();
      setGenres(genreList);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const genreId = parseInt(selectedGenre);
      const currentMovies = viewMode === 'nowPlaying' ? movies : searchResults;

      const filtered = currentMovies.filter(movie =>
        movie.genre_ids && movie.genre_ids.includes(genreId)
      );

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }, [selectedGenre, movies, searchResults, viewMode]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const newMovies = await fetchMovies(nextPage);
    setMovies([...movies, ...newMovies]);
    setPage(nextPage);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setViewMode('search');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (viewMode === 'search') {
      setViewMode('nowPlaying');
    }
    setSearchResults([]);
  };

  const getMoviesToDisplay = () => {
    let moviesToUse;

    if (selectedGenre) {
      moviesToUse = filteredMovies;
    } else {
      moviesToUse = viewMode === 'nowPlaying' ? movies : searchResults;
    }

    return sortMovies(moviesToUse);
  };

  const sortMovies = (moviesToSort) => {
    if (!moviesToSort || moviesToSort.length === 0) return [];

    const sortedMovies = [...moviesToSort];

    const sortFunctions = {
      'title': (a, b) => a.title.localeCompare(b.title),
      'release_date': (a, b) => new Date(b.release_date) - new Date(a.release_date),
      'vote_average': (a, b) => b.vote_average - a.vote_average,
      'default': () => {}
    };

    const sortFunction = sortFunctions[sortOption] || sortFunctions['default'];
    return sortOption === 'default' ? sortedMovies : sortedMovies.sort(sortFunction);
  };


  const showNowPlaying = () => {
    setViewMode('nowPlaying');
  };

  const showSearchResults = () => {
    if (searchResults.length > 0) {
      setViewMode('search');
    }
  };

  const getButtonClass = (mode) => {
    if (viewMode === mode) {
      return 'active';
    }
    return '';
  };

  return (
    <main className="movie-list">
      <div className="view-toggle">
        <button
          onClick={showNowPlaying}
          className={getButtonClass('nowPlaying')}
        >
          Now Playing
        </button>
        <button
          onClick={showSearchResults}
          className={getButtonClass('search')}
          disabled={searchResults.length === 0}
        >
          Search Results
        </button>
      </div>

      <div className="controls-container">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />

        <SortSelector
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>

      <h1>{viewMode === 'nowPlaying' && 'Now Playing Movies'}
          {viewMode === 'search' && 'Search Results'}</h1>

      <div className="movies-container">
        {getMoviesToDisplay().length > 0 ? (
          getMoviesToDisplay().map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              voteAverage={movie.vote_average}
              toggleFavorite={toggleFavorite}
              toggleWatched={toggleWatched}
              isFavorite={isMovieFavorite(movie.id)}
              isWatched={isMovieWatched(movie.id)}
            />
          ))
        ) : (
          <p className="no-results">
            {selectedGenre ?
              "No movies found for the selected genre. Try a different genre." :
              viewMode === 'search' ?
                "No movies found. Try a different search term." :
                "No movies available."
            }
          </p>
        )}
      </div>

      {viewMode === 'nowPlaying' && !selectedGenre && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default MovieList;
