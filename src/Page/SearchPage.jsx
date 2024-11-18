import React, { useState, useEffect, useContext } from 'react';
import './CSS/SearchPage.css';
import { useLocation } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import allProducts from '../assets/all_product'; // Загружаем товары из JSON
import Item from '../Components/Item'; // Импортируем компонент Item
import { ShopContext } from '../Context/ShopContext'; // Импортируем контекст корзины

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const location = useLocation();
  const query = useQuery().get('query') || ''; // Достаём параметр из URL
  const [searchQuery, setSearchQuery] = useState(query.toLowerCase());
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const { increaseQuantity } = useContext(ShopContext); // Используем контекст корзины

  useEffect(() => {
    setSearchQuery(query.toLowerCase());
  }, [location]); // Обновляем поисковый запрос при изменении URL

  useEffect(() => {
    // Фильтруем продукты на основе поискового запроса
    const filtered = allProducts.filter(item => 
      item.name && item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div>
      <SearchBar />
      <div className="search-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              increaseQuantity={increaseQuantity} // Передаем функцию добавления в корзину
            />
          ))
        ) : (
          <p>Продукты не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
