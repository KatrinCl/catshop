import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext.jsx';
import Item from '../Components/Item.jsx';
import dropdown from '/dropdown_icon.png';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState('По популярности');
  const [colorOption, setColorOption] = useState('Цвет');

  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(100000);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  const handlePriceFilter = () => {
    const minPrice = parseInt(minPriceInput) || 0;
    const maxPrice = parseInt(maxPriceInput) || 100000;

    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setShowPriceDropdown(false);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'По возрастанию цены':
        return products.sort((a, b) => a.new_price - b.new_price);
      case 'По убыванию цены':
        return products.sort((a, b) => b.new_price - a.new_price);
      case 'По рейтингу':
        return products; // Здесь должна быть сортировка по рейтингу
      case 'По новинкам':
        return products; // Можно сортировать по дате добавления
      case 'Сначала выгодные':
        return products; // Можно отсортировать по соотношению цены или скидки
      default:
        return products;
    }
  };

  const filteredProducts = all_product.filter((item) => {
    const matchesCategory = props.category === item.category;
    const matchesPrice = item.new_price >= appliedMinPrice && item.new_price <= appliedMaxPrice;
    const matchesColor = colorOption === 'Цвет' || item.colors.some(color => color.name === colorOption);

    return matchesCategory && matchesPrice && matchesColor;
  });

  const sortedProducts = sortProducts(filteredProducts);

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowPriceDropdown(false); // Закрываем другие дропдауны
    setShowColorDropdown(false);
  };

  const togglePriceDropdown = () => {
    setShowPriceDropdown(!showPriceDropdown);
    setShowSortDropdown(false); // Закрываем другие дропдауны
    setShowColorDropdown(false);
  };

  const toggleColorDropdown = () => {
    setShowColorDropdown(!showColorDropdown);
    setShowSortDropdown(false); // Закрываем другие дропдауны
    setShowPriceDropdown(false);
  };

  return (
    <div className='shop-category'>
      <div className="shopcategory-filters-container">
        {/* Сортировка */}
        <div className="shopcategory-dropdown" onClick={toggleSortDropdown}>
          <span>{sortOption}</span> <img src={dropdown} alt='' />
          {showSortDropdown && (
            <ul className="shopcategory-dropdown-menu">
              <li onClick={() => { setSortOption('По популярности'); setShowSortDropdown(false); }}>
                По популярности
              </li>
              <li onClick={() => { setSortOption('По рейтингу'); setShowSortDropdown(false); }}>
                По рейтингу
              </li>
              <li onClick={() => { setSortOption('По возрастанию цены'); setShowSortDropdown(false); }}>
                По возрастанию цены
              </li>
              <li onClick={() => { setSortOption('По убыванию цены'); setShowSortDropdown(false); }}>
                              По убыванию цены
                              </li>
                              <li onClick={() => { setSortOption('По новинкам'); setShowSortDropdown(false); }}>
                                По новинкам
                              </li>
                              <li onClick={() => { setSortOption('Сначала выгодные'); setShowSortDropdown(false); }}>
                                Сначала выгодные
                              </li>
                            </ul>
                          )}
                        </div>
                
                        {/* Фильтр по цене */}
                        <div className="shopcategory-dropdown" onClick={togglePriceDropdown}>
                          <span>Цена, ₽</span> <img src={dropdown} alt='' />
                          {showPriceDropdown && (
                            <div className="shopcategory-price-dropdown">
                              <div className="shopcategory-price-inputs">
                                <div>
                                  <label>От</label>
                                  <input
                                    type="text"
                                    value={minPriceInput}
                                    onChange={(e) => setMinPriceInput(e.target.value)}
                                    placeholder="0"
                                  />
                                </div>
                                <div>
                                  <label>До</label>
                                  <input
                                    type="text"
                                    value={maxPriceInput}
                                    onChange={(e) => setMaxPriceInput(e.target.value)}
                                    placeholder="100000"
                                  />
                                </div>
                              </div>
                              <button onClick={handlePriceFilter}>Готово</button>
                            </div>
                          )}
                        </div>
                
                        {/* Фильтр по цвету */}
                        <div className="shopcategory-dropdown" onClick={toggleColorDropdown}>
                          <span>{colorOption}</span> <img src={dropdown} alt='' />
                          {showColorDropdown && (
                            <ul className="shopcategory-dropdown-menu">
                              <li onClick={() => { setColorOption('Красный'); setShowColorDropdown(false); }}>
                                Красный
                              </li>
                              <li onClick={() => { setColorOption('Синий'); setShowColorDropdown(false); }}>
                                Синий
                              </li>
                              <li onClick={() => { setColorOption('Зеленый'); setShowColorDropdown(false); }}>
                                Зеленый
                              </li>
                              <li onClick={() => { setColorOption('Белый'); setShowColorDropdown(false); }}>
                                Белый
                              </li>
                              <li onClick={() => { setColorOption('Черный'); setShowColorDropdown(false); }}>
                                Черный
                              </li>
                              <li onClick={() => { setColorOption('Розовый'); setShowColorDropdown(false); }}>
                                Розовый
                              </li>
                              <li onClick={() => { setColorOption('Бежевый'); setShowColorDropdown(false); }}>
                                Бежевый
                              </li>
                              <li onClick={() => { setColorOption('Коричневый'); setShowColorDropdown(false); }}>
                                Коричневый
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                
                      {/* Список отфильтрованных и отсортированных продуктов */}
                      <div className="shopcategory-products">
                        {sortedProducts.map((item, i) => (
                          <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                          />
                        ))}
                      </div>
                    </div>
                  );
                };
                
                export default ShopCategory;