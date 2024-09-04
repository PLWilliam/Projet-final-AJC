import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    }).then(() => {
      setCart([]);
      alert('Order placed successfully!');
      navigate('/products');
    });
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
