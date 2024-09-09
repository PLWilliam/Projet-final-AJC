import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { ProductCard } from '../component.js';
import Filters from './Filters';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products')));
      const productsMap = querySnapshot.docs.map(doc => ({ firebaseID: doc.id, ...doc.data() }));
      setProducts(productsMap);
      setFilteredProducts(productsMap);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Filters 
        products={products}
        onFilteredProductsChange={setFilteredProducts}
      />
      
      {/* Product list */}
      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <ProductCard key={product.firebaseID} value={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
