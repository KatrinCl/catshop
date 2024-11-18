import React, { useState, useEffect } from 'react';
import all_product from '../assets/all_product';
import './../Styles/Products.css';
import Item from './Item';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(all_product);


  return (
    <div className='products'>
      <h2>Рекомендуем для вас</h2>
      <div className='products-cont'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          ))
        ) : (
          <p>Продукты не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
