import React from 'react';

function GenreFilter({ genres, selectedGenre, setSelectedGenre }) {
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="filter-container">
      <label htmlFor="genre-select">Filter by genre: </label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={handleGenreChange}
        className="filter-select"
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
