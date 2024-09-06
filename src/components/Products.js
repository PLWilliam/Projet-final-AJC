import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from './ProductCard';

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
          <ProductCard key={product.id} value={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
