import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { ButtonAddDel } from '../component.js'

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id }   = useParams(); 

  useEffect(() => {

      const fetchProduct = async () => {
        
        try {
          const querySnapshot = await getDocs(query(collection(db, 'products'),where('id','==',Number(id))));
          if (querySnapshot.docs.length > 0) {
            setProduct(querySnapshot.docs[0].data());
          }
        } catch (error) {
          console.log('error : '+ error);
        }
      };
      fetchProduct();


  }, [id]);

  const returnBtn =()=>{
    navigate('/');
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container-details'>
      <button onClick={returnBtn}>Retour</button>
      <div className='product'>
        <h2>{product.name}</h2>
        <img src={product.poster} alt={product.name} />
        <p>{product.long_description}</p>
        <p>Price: {product.price} $</p>
        <p>Rating: {product.rating} / 5</p>
        <p>In Stock: {product.in_stock ? 'Yes' : 'No'}</p>
        <p>Size: {product.size} MB</p>
        <p>Best Seller: {product.best_seller ? 'Yes' : 'No'}</p>
        <ButtonAddDel product={product}/>
      </div>
    </div>
  );
};

export default ProductDetail;
