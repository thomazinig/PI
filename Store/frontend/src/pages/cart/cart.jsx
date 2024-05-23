import React, { useContext, useState } from 'react';

import './cart.css';
import AppContext from '../../context/AppContext';
import CartItem from '../cartItem/CartItem';

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);
  const [cep, setCep] = useState(false)
  const [teste, setTeste] = useState(false)
  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        {cartItems.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />)}
      </div>
      <div>
        <input type="text" id="cep" placeholder='Cep' />
        <button onClick={() => setCep(true)}> lupa</button>
      </div>
      <br />
      {
        cep ?
          <div>
            <select name="select">
              <option value="valor1">Retirada: 0,00R$</option>
              <option value="valor2">Entrega Express 50,00R$</option>
              <option value="valor3" selected>Entrega padrão: 20,00R$</option>
            </select>
          </div>
          :
          <h1></h1>
      }
      <br />
      <button>Ir para compra</button>

    </section >
  );
}

export default Cart;