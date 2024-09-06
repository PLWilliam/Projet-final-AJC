import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart,resetCart } = useContext(CartContext);
  

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <Link to="/checkout">
          <button onClick={() => resetCart()}>Vider cart</button>
          <button>Proceed to Checkout</button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
