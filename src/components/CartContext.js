import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const refreshCart = (data) => {
    setCart(data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const resetCart = ()=>{
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,resetCart,refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
