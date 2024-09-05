import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.poster} alt={product.name} style={{ width: '200px', height: 'auto' }} />
      <p>{product.long_description}</p>
      <p>Price: {product.price} €</p>
      <p>Rating: {product.rating} / 5</p>
      <p>In Stock: {product.in_stock ? 'Yes' : 'No'}</p>
      <p>Size: {product.size} MB</p>
      <p>Best Seller: {product.best_seller ? 'Yes' : 'No'}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
