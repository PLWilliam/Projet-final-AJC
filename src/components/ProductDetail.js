import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { cart,addToCart } = useContext(CartContext);

  useEffect(() => {

      const fetchProduct = async () => {
        console.log(id);
        
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

  const addCart = ()=>{
    if (product.in_stock) {
      if (cart) {
        if(!cart.includes(product)){
          addToCart(product)
          let data;
          if (localStorage.getItem('cart')) {
            data = JSON.parse(localStorage.getItem('cart'));
            data.push(product);
          }
          else{
            data = [product]
          }
          localStorage.setItem('cart',JSON.stringify(data))
        }
      }
    }
    else{
      //message pas en stock
    }
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.poster} alt={product.name} style={{ width: '200px', height: 'auto' }} />
      <p>{product.long_description}</p>
      <p>Price: {product.price} $</p>
      <p>Rating: {product.rating} / 5</p>
      <p>In Stock: {product.in_stock ? 'Yes' : 'No'}</p>
      <p>Size: {product.size} MB</p>
      <p>Best Seller: {product.best_seller ? 'Yes' : 'No'}</p>
      <button onClick={()=>addCart()}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
