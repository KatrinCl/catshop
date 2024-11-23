import React, { useEffect } from 'react';
import CartItems from '../Components/CartItems';

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
        <CartItems />
    </div>
  );
};

export default Cart;
