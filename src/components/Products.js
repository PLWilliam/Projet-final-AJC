import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for eBooks"
      />
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <img src={product.poster} alt={product.name} />
            <p>{product.overview}</p>
            <p>Price: {product.price} €</p>
            {product.rating ? (
              <p>Rating: {product.rating} / 5</p>
            ) : (
              <p>No rating available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
