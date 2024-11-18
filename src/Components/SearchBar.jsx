import React, { useState } from 'react';
import './../Styles/SearchBar.css';
import { useNavigate } from 'react-router-dom'; // Для навигации

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Используем useNavigate для навигации

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Навигация с параметром поиска
      setQuery(''); // Очищаем поле ввода после поиска
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Найти на Kat Shop"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Поиск</button>
    </form>
  );
};

export default SearchBar;
