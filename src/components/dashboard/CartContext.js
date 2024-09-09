import React, { createContext, useState } from 'react';
import { collection, query, where, getDocs,doc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fonction qui permet de modifier l'intérieur du cart
  const reloadCart = (data) => {
    setCart(data);
  };

  // Fonction qui permet de rajouter un produit au cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Fonction qui permet de supprimer un produit ciblé du cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    
    setCart(updatedCart);
  };

  // Fonction qui permet de remmetre le cart à 0
  const resetCart = (user)=>{
    clearUserCart(user)
    setCart([]);
  }

  //Suppression du panier de l'utilisateur dansla bdd
  const clearUserCart = async(user)=>{
    try {
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', user)));
        
        await updateDoc(doc(db, 'users', querySnapshot.docs[0].id), { cart: [] });
        console.log('Panier vidé avec succès.');

    } catch (error) {
      console.log("error : " + error);
      
    }
}
 


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,resetCart,reloadCart }}>
      {children}
    </CartContext.Provider>
  );
};
