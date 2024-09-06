import React, { useState,useContext,useEffect } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../firebase';


const Checkout = () => {
  const { cart, setCart,resetCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [totalPrice,setTotalPrice] = useState('')

  const [name,setName] = useState('dzadazd')
  const [mail,setMail] = useState('b@b')
  const [cardNbr,setCardNbr] = useState('12756')
  const [expDate,setExpDate] = useState('12/3')
  const [secureCode,setSecureCode] = useState('456')

  useEffect(() =>{
    console.log(cart.length);

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
      const refDocs = await addDoc(collection(db, "orders"), {mail,cart});
      sessionStorage.setItem('commandID',refDocs.id)
      resetCart();
    } catch (error) {
      console.log("erreur : "+error);
    }
    navigate('/checkout_confirm');
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <label>Name</label>
        <input
          type='text' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled/>

        <label>Email</label>
        <input
          type='text' 
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          disabled/>

        <label>Card Number</label>
        <input
          type='text' 
          value={cardNbr}
          onChange={(e) => setCardNbr(e.target.value)}
          disabled/>

        <label>Date expiration</label>
        <input
          type='text' 
          value={expDate}
          onChange={(e) => setExpDate(e.target.value)}
          disabled/>

        <label>Code de sécurité</label>
        <input
          type='text' 
          value={secureCode}
          onChange={(e) => setSecureCode(e.target.value)}
          disabled/>

        <button type='submit'>Envoyer</button>
      </form>
      Total : {totalPrice} $
    </div>
  );
};

export default Checkout;
