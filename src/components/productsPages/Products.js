import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { ProductCard } from '../component.js'
import './Products.css';


const Products = () => {
  const [products, setProducts]       = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products')));
      const productsMap   = querySnapshot.docs.map(doc => ({ firebaseID: doc.id,...doc.data()}));
      setProducts(productsMap);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //Filtre bar de recherche
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='card'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for eBooks"
      />
      <div>
        {filteredProducts.length === 0 ? (
          <p>No featured products available.</p>
        ) : (
          <ul>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} value={product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
