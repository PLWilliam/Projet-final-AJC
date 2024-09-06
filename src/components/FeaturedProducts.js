import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'featured_products')));
          const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFeaturedProducts(products);
        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div>
        <h1>Featured Books</h1>
        {featuredProducts.length === 0 ? (
          <p>No featured products available.</p>
        ) : (
          <ul>
            {featuredProducts.map(product => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                </Link>
                <img src={product.poster} alt={product.name} />
                <p>{product.overview}</p>
                <p>Price:{product.price}€ </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default FeaturedProducts;