import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { ProductCard } from '../component.js'
import Filters from './Filters';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
  
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

    const returnBtn =()=>{
      navigate('/');
    }

  
    return (
      <div className='featured-container'>
        <button onClick={returnBtn}>Retour</button>
        <h1>Livre en vedette</h1>
        <Filters 
          products={featuredProducts}
          onFilteredProductsChange={setFilteredProducts}
        />
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
    );
  };
  
  export default FeaturedProducts;