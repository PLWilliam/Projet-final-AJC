import React, { useState,useContext,useEffect } from 'react';
import { CartContext } from '../component.js'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Checkout.css'

const Checkout = () => {
  const { cart,resetCart } = useContext(CartContext);
  
  const [name,setName]             = useState('')
  const [mail,setMail]             = useState('')
  const [cardNbr,setCardNbr]       = useState('12756')
  const [expDate,setExpDate]       = useState('12/3')
  const [secureCode,setSecureCode] = useState('456')
  const [totalPrice,setTotalPrice] = useState('')
  
  const navigate = useNavigate();
  const user     = sessionStorage.getItem('token')
  
  useEffect(() =>{
    
    const fetchUser = async()=>{
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));
      
      setName(querySnapshot.docs[0].data().username)
      setMail(querySnapshot.docs[0].data().email)
    }
    fetchUser()


    if (cart.length == 1) {
      setTotalPrice(cart[0].price)
    }
    else if (cart.length > 1){
      
      setTotalPrice(cart.reduce((accumulator, calc)=> accumulator + calc.price, 0))
    }
    else{
      navigate('/');
    }
    
    
  },[])

  const handleCheckout = async(e)=>{
    e.preventDefault();
    try {
      const refDocs = await addDoc(collection(db, "orders"), {mail,cart,createdAt : new Date()});
      sessionStorage.setItem('commandID',refDocs.id)
      resetCart(user);
    } catch (error) {
      console.log("erreur : "+error);
    }
    navigate('/checkout_confirm');
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <label>Nom : </label>
        <input
          type='text' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled/>

        <label>Mail :</label>
        <input
          type='text' 
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          disabled/>

        <label>Numéro de carte :</label>
        <input
          type='text' 
          value={cardNbr}
          onChange={(e) => setCardNbr(e.target.value)}
          disabled/>

        <label>Date expiration : </label>
        <input
          type='text' 
          value={expDate}
          onChange={(e) => setExpDate(e.target.value)}
          disabled/>

        <label>Code de sécurité : </label>
        <input
          type='text' 
          value={secureCode}
          onChange={(e) => setSecureCode(e.target.value)}
          disabled/>

          Total : {totalPrice} $
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  );
};

export default Checkout;
