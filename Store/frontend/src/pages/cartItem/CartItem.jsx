import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { BsCartDashFill } from 'react-icons/bs';

import './CartItem.css';
import AppContext from '../../context/AppContext';
import axios from 'axios';

function CartItem({ data }) {

  console.log(data);
  const { cartItems, setCartItems, cartItemsComprar, setCartItemsComprar } = useContext(AppContext);
  const { id, thumbnail, nomeProdutoPedido, precoProdutoPedido } = data;
  const [qtoItens, setQtoItens] = useState(1)

  var localProduto = { id: id, quantidade: qtoItens }
  localStorage.setItem(`${nomeProdutoPedido}`, id)
  localStorage.setItem(`${nomeProdutoPedido}Qtd`, qtoItens)
  localStorage.setItem(`${nomeProdutoPedido}Valor`, precoProdutoPedido)

  const handleRemoveItem = () => {
    axios.delete(`http://localhost:3001/deletarPedido/${id}`).then(
      window.location.reload()
    )
  };
  return (
    <section className="cart-item">
      <img
        src={thumbnail}
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{nomeProdutoPedido}</h3>
        <h3 className="cart-item-price">{precoProdutoPedido}</h3>
        <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
          <button className='btn' onClick={
            () => {
              if (qtoItens >= 2) {
                setQtoItens(qtoItens - 1)
              }

            }
          }>-</button>
          <h3 className="cart-item-title">{qtoItens}</h3>
          <button className='btn' onClick={() => 
            setQtoItens(qtoItens + 1)
            }>+</button>
        </div>

        <button
          type="button"
          className="button__remove-item"
          onClick={handleRemoveItem}
        >
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

export default CartItem;

CartItem.propTypes = {
  data: propTypes.object
}.isRequired;