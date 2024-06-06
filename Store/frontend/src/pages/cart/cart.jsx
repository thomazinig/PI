import React, { useContext, useEffect, useState } from 'react';

import './cart.css';
import AppContext from '../../context/AppContext';
import CartItem from '../cartItem/CartItem';
import axios from 'axios';

function Cart() {
  const { isCartVisible } = useContext(AppContext);
  const [carrinho, setCartItem] = useState(null)
  const [cep, setCep] = useState(false)


  const listarPedidos = () => {
    axios.get("http://localhost:3001/pedido").then((res) => setCartItem(res.data))
  }

  useEffect(() => {
    listarPedidos()
  }, [])

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      {carrinho === null ?
        <h1>carrregando</h1>
        :
        <div>

          <div className="cart-items">
            {carrinho.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />)}
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
        </div>
      }

      <br />
      { localStorage.token?
        <button ><a href="/checkoutEndereco"> ir para comprar </a></button>
        :
        <button ><a href="/login"> ir para comprar </a></button>
      }

    </section >
  );
}

export default Cart;