import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products')));
      const productsMap = querySnapshot.docs.map(doc => ({ firebaseID: doc.id,...doc.data()}));
      setProducts(productsMap);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for eBooks"
      />
      <div>
        {filteredProducts.map((product) => (
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
