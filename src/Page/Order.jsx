import React, { useContext, useState, useEffect } from 'react';
import './CSS/Order.css';
import { ShopContext } from '../Context/ShopContext';
import { Link, useLocation } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const { cartItems, all_product } = useContext(ShopContext);

  const [pickupAddress, setPickupAddress] = useState('');
  const [courierAddress, setCourierAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('upon_receipt');

  useEffect(() => {
    if (location.state) {
      const { address, deliveryMethod } = location.state;
      if (deliveryMethod === 'pickup') {
        setPickupAddress(address);
      } else if (deliveryMethod === 'courier') {
        setCourierAddress(address);
      }
      setDeliveryMethod(deliveryMethod);
    }
  }, [location.state]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    all_product.forEach((product) => {
      if (cartItems[product.id] > 0) {
        totalAmount += product.new_price * cartItems[product.id];
      }
    });
    return totalAmount;
  };

  const getTotalDiscount = () => {
    let totalDiscount = 0;
    all_product.forEach((product) => {
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
                state: { deliveryMethod: 'pickup' },
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
                state: { deliveryMethod: 'courier' },
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
              <p>{pickupAddress || 'Не выбран'}</p>
              <p className='delivery-free'>Доставка 0 ₽</p>
              <p>Послезавтра</p>
            </div>
          )}

          {deliveryMethod === 'courier' && (
            <div className='pickup-address'>
              <p>{courierAddress || 'Не выбран'}</p>
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
