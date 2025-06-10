import React, { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );

      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <main className="movie-list">
      <h1>Now Playing Movies</h1>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterImg={movie.poster_path}
            voteAverage={movie.vote_average}
          />
        ))}
      </div>
    </main>
  );
}

export default MovieList;
