import React, { useContext, useState } from 'react';
import './CSS/Order.css';
import { ShopContext } from '../Context/ShopContext';
import { Link, useLocation } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const { cartItems, all_product } = useContext(ShopContext);

  const [pickupAddress, setPickupAddress] = useState(location.state?.deliveryMethod === 'pickup' ? location.state?.address : 'Иваново, Микрорайон Видный 4');
  const [courierAddress, setCourierAddress] = useState(location.state?.deliveryMethod === 'courier' ? location.state?.address : '');
  const [deliveryMethod, setDeliveryMethod] = useState(location.state?.deliveryMethod || 'pickup');
  const [paymentMethod, setPaymentMethod] = useState('upon_receipt');

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    all_product.forEach(product => {
      if (cartItems[product.id] > 0) {
        totalAmount += product.new_price * cartItems[product.id];
      }
    });
    return totalAmount;
  };

  const getTotalDiscount = () => {
    let totalDiscount = 0;
    all_product.forEach(product => {
      if (cartItems[product.id] > 0) {
        totalDiscount += (product.old_price - product.new_price) * cartItems[product.id];
      }
    });
    return totalDiscount;
  };

  const totalAmount = getTotalCartAmount();
  const totalDiscount = getTotalDiscount();
  const deliveryFee = deliveryMethod === 'courier' ? 150 : 0;

  return (
    <div className='order'>
      <div className='order-form'>
        <div className='order-pickup'>
          <h3>Способ доставки</h3>
          <div className='pickup-methods'>
            <Link
              to={{
                pathname: '/orderaddress',
                state: { setPickupAddress },
              }}
            >
              <button
                className={deliveryMethod === 'pickup' ? 'active' : ''}
                onClick={() => setDeliveryMethod('pickup')}
              >
                Пункт выдачи
              </button>
            </Link>

            <Link
              to={{
                pathname: '/orderaddress',
                state: { setCourierAddress, deliveryMethod: 'courier' },
              }}
            >
              <button
                className={deliveryMethod === 'courier' ? 'active' : ''}
                onClick={() => setDeliveryMethod('courier')}
              >
                Курьер
              </button>
            </Link>
          </div>

          {deliveryMethod === 'pickup' && (
            <div className='pickup-address'>
              <p>{pickupAddress}</p>
              <p className='delivery-free'>Доставка 0 ₽</p>
              <p>Послезавтра</p>
            </div>
          )}

          {deliveryMethod === 'courier' && (
            <div className='pickup-address'>
              <p>{courierAddress}</p>
              <p>Стоимость доставки: 150 ₽</p>
              <p>Послезавтра</p>
            </div>
          )}
        </div>

        <div className='order-payment'>
          <h3>Как оплатить заказ?</h3>
          <div className='payment-options'>
            <button
              className={paymentMethod === 'upon_receipt' ? 'active' : ''}
              onClick={() => setPaymentMethod('upon_receipt')}
            >
              При получении
            </button>
            <button
              className={paymentMethod === 'online' ? 'active' : ''}
              onClick={() => setPaymentMethod('online')}
            >
              Сразу
            </button>
          </div>
        </div>

        <div className='order-summary'>
          <h3>Итого</h3>
          <p>Товары <span>{totalAmount} ₽</span></p>
          <p>Скидка <span>-{totalDiscount} ₽</span></p>
          <p className='fee'>Доставка <span>{deliveryFee} ₽</span></p>
          <p className='fee'>Возврат <span>Бесплатно</span></p>
        </div>

        <div className='order-button'>
          <button>
            Заказать <span>{totalAmount + deliveryFee} ₽</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
