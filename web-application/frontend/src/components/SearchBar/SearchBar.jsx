import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="icon">
      <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        type="text"
        placeholder="Quick search..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
