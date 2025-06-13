import React from 'react';

function SortSelector({ sortOption, setSortOption }) {
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="sort-container">
      <label htmlFor="sort-select">Sort by: </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="default">Default</option>
        <option value="title">Title (A-Z)</option>
        <option value="release_date">Release Date (newest first)</option>
        <option value="vote_average">Rating (highest first)</option>
      </select>
    </div>
  );
}

export default SortSelector;
