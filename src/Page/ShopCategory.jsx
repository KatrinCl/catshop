import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext.jsx';
import Item from '../Components/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState('По популярности');
  const [colorOption, setColorOption] = useState('Цвет');

  // Состояния для диапазона цены, храним временно как строки
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Состояния для применения фильтра после нажатия кнопки "Готово"
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(100000);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false); // Для сортировки
  const [showColorDropdown, setShowColorDropdown] = useState(false); // Для фильтра по цвету

  // Функция для применения фильтра по цене
  const handlePriceFilter = () => {
    // Конвертируем строковые значения в числа
    const minPrice = parseInt(minPriceInput) || 0;
    const maxPrice = parseInt(maxPriceInput) || 100000;

    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setShowPriceDropdown(false);
  };

  // Логика сортировки
  const sortProducts = (products) => {
    switch (sortOption) {
      case 'По возрастанию цены':
        return products.sort((a, b) => a.new_price - b.new_price);
      case 'По убыванию цены':
        return products.sort((a, b) => b.new_price - a.new_price);
      case 'По рейтингу':
        // Здесь должна быть сортировка по рейтингу (если есть соответствующие данные)
        return products;
      case 'По новинкам':
        // Можно сортировать по дате добавления, если есть соответствующее поле
        return products;
      case 'Сначала выгодные':
        // Можно отсортировать по соотношению цены или скидки
        return products;
      default:
        return products;
    }
  };

  // Фильтрация товаров
  const filteredProducts = all_product.filter((item) => {
    // Фильтр по категории
    const matchesCategory = props.category === item.category;

    // Фильтр по цене
    const matchesPrice = item.new_price >= appliedMinPrice && item.new_price <= appliedMaxPrice;

    // Фильтр по цвету (если был выбран цвет)
    const matchesColor = colorOption === 'Цвет' || item.colors.some(color => color.name === colorOption);

    return matchesCategory && matchesPrice && matchesColor;
  });

  // Применение сортировки к отфильтрованным товарам
  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div className='shop-category'>
      <div className="shopcategory-filters-container">
        {/* Сортировка */}
        <div
          className="shopcategory-dropdown"
          onMouseEnter={() => setShowSortDropdown(true)}
          onMouseLeave={() => setShowSortDropdown(false)}
        >
          <span>{sortOption}</span> <img src='/dropdown_icon.png' alt='' />
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
        <div
          className="shopcategory-dropdown"
          onMouseEnter={() => setShowPriceDropdown(true)}
          onMouseLeave={() => setShowPriceDropdown(false)}
        >
          <span>Цена, ₽</span> <img src='/dropdown_icon.png' alt='' />
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
        <div
          className="shopcategory-dropdown"
          onMouseEnter={() => setShowColorDropdown(true)}
          onMouseLeave={() => setShowColorDropdown(false)}
        >
          <span>{colorOption}</span> <img src='/dropdown_icon.png' alt='' />
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
