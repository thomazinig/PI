import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { BsCartDashFill } from 'react-icons/bs';

import './CartItem.css';
import AppContext from '../../context/AppContext';

function CartItem({ data }) {


  const { cartItems, setCartItems,cartItemsComprar, setCartItemsComprar } = useContext(AppContext);
  const { id, thumbnail, nomeProduto, preco } = data;
  const [qtoItens, setQtoItens] = useState(1)
 
  const handleRemoveItem = () => {
    const updatedItems = cartItems.filter((item) => item.id != id);
    setCartItems(updatedItems);
  };

  return (
    <section className="cart-item">
      <img
        src={thumbnail}
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{nomeProduto}</h3>
        <h3 className="cart-item-price">{preco}</h3>
        <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
          <button className='btn' onClick={
            () => {
              if (qtoItens >= 2) {
                setQtoItens(qtoItens - 1)
              }

            }
          }>-</button>
          <h3 className="cart-item-title">{qtoItens}</h3>
          <button className='btn' onClick={()=> setQtoItens(qtoItens+1)}>+</button>
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