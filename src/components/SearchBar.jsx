import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, handleSearch, handleClear }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="Search for movies..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {searchQuery && (
        <button onClick={handleClear} className="clear-button">
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
