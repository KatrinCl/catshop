import React, { useContext, useState } from 'react';
import './../Styles/CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import minus from '/minus.svg';
import plus from '/plus.svg';
import bin from '/bin.svg';

const CartItems = () => {

  const { cartItems, all_product, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === all_product.filter(product => cartItems[product.id] > 0).length) {
      setSelectedItems([]);
    } else {
      const allSelectedItems = all_product
        .filter(product => cartItems[product.id] > 0)
        .map(product => product.id);
      setSelectedItems(allSelectedItems);
    }
  };

  const areAllItemsSelected = selectedItems.length === all_product.filter(product => cartItems[product.id] > 0).length;

  const getTotalSelectedAmount = () => {
    let totalAmount = 0;
    all_product.forEach(product => {
      if (cartItems[product.id] > 0 && selectedItems.includes(product.id)) {
        totalAmount += product.new_price * cartItems[product.id];
      }
    });
    return totalAmount;
  };

  const getTotalSelectedDiscount = () => {
    let totalDiscount = 0;
    all_product.forEach(product => {
      if (cartItems[product.id] > 0 && selectedItems.includes(product.id)) {
        totalDiscount += (product.old_price - product.new_price) * cartItems[product.id];
      }
    });
    return totalDiscount;
  };

  const totalSelectedAmount = getTotalSelectedAmount();
  const totalSelectedDiscount = getTotalSelectedDiscount();

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <div className='cart-i'>
          <div className="cartitems-header">
            <h2>Корзина</h2>
            <input
              type="checkbox"
              checked={areAllItemsSelected}
              onChange={handleSelectAll}
            />
            <label> Выбрать все</label>
          </div>

          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id} className="cartitems-format-product">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(e.id)}
                    onChange={() => handleSelectItem(e.id)}
                  />

                  <div className='img-right'>
                    {/* Обернем изображение и название в Link, ведущий на страницу продукта */}
                    <Link to={`/product/${e.id}`} className='img-right-link'>
                      <img src={e.image} alt={e.name} className='carticon-product-icon' />
                      <p>{e.name}</p>
                    </Link>
                  </div>

                  <div className='cartitems-left'>

                    <div className='img-counter'>
                      <img className='minus' src={minus} alt='' onClick={() => decreaseQuantity(e.id)} />
                      <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                      <img className='plus' src={plus} alt='' onClick={() => increaseQuantity(e.id)} />
                    </div>

                    <div className='img-left'>
                      <p>{e.new_price * cartItems[e.id]} ₽</p>
                      <img className='cartitems-remove-icon' src={bin} onClick={() => removeFromCart(e.id)} alt="" />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="cartitems-down">
        <div className="cartitems-total">
          <div>
            <div className="cartitems-total-item">
              <p>Товары</p>
              <p>{totalSelectedAmount} ₽</p>
            </div>
            <div className="cartitems-total-item">
              <p>Скидка</p>
              <p>-{totalSelectedDiscount} ₽</p>
            </div>
            <div className='cartitems-total-item'>
              <h3>Итого</h3>
              <h3>{totalSelectedAmount} ₽</h3>
            </div>
          </div>
          <Link to='/order'>
            <button className="desktop-checkout-button" disabled={selectedItems.length === 0}>Заказать</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
