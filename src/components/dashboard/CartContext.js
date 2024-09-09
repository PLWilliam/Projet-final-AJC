import React, { createContext, useState } from 'react';
import { getFirestore, collection, query, where, getDocs,addDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const reloadCart = (data) => {
    setCart(data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    
    setCart(updatedCart);
    // localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const resetCart = (user)=>{
    console.log(user);
    
    clearUserCart(user)
    setCart([]);
    // localStorage.removeItem('cart');
  }

  const clearUserCart = async(user)=>{
    try {
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', user)));
        console.log(querySnapshot.docs[0].id);
        
        await updateDoc(doc(db, 'users', querySnapshot.docs[0].id), { cart: [] });
        console.log('Panier vidé avec succès.');

    } catch (error) {
        // setError('Une erreur est survenue lors du vidage de panier.');
    }
}
 


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,resetCart,reloadCart }}>
      {children}
    </CartContext.Provider>
  );
};
