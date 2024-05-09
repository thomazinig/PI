import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import './CartButton.css';
import AppContext from '../context/AppContext';


export function CartButton() {
    const { carrinho, isCartVisible, setIsCartVisible } = useContext(AppContext)



    return (
        <button
            type="button"
            className="cart__button"
            onClick={ () => setIsCartVisible(!isCartVisible) }
        >
            <AiOutlineShoppingCart />
            { carrinho.length > 0 && <span className="cart-status">{carrinho.length}</span> }
        </button>
    );
}
