import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a search term.');
    } else {
      setError('');
      onSearch(query);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default SearchBar;
