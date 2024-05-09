import React, { useContext } from 'react';

import './cart.css';
import AppContext from '../../context/AppContext';
import CartItem from '../cartItem/CartItem';

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        { cartItems.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />) }
      </div>
        <button>Ir para compra</button>


    </section>
  );
}

export default Cart;