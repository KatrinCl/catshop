import React, { useContext, useState } from 'react';
import './../Styles/Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Item = (props) => {
  const { increaseQuantity } = useContext(ShopContext);
  
  // Локальное состояние для отслеживания, добавлен ли товар в корзину
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    increaseQuantity(props.id); // Увеличиваем количество товара
    setAddedToCart(true); // Меняем состояние на "добавлен в корзину"
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {props.new_price} ₽
        </div>
        <div className="item-price-old">
          {props.old_price} ₽
        </div>
      </div>
      <div className='addCart'>
        {/* Меняем текст кнопки в зависимости от состояния */}
        <button onClick={handleAddToCart}>
          {addedToCart ? (
            <Link to="/cart">
              В корзине
            </Link>
          ) : (
            <>
              <img src='/cart.svg' alt='cart' /> В корзину
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Item;
