import React, {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { CartContext } from '../component.js'



const CheckoutConfirm = () => {

    const [commandID,setCommandID] = useState('');
    const [error, setError] = useState(null);
    const { cart,resetCart } = useContext(CartContext);

    const navigate = useNavigate();
    const user = sessionStorage.getItem('token')
    
    useEffect(() => {
        setCommandID(sessionStorage.getItem('commandID'))
        // resetCart(user);
       
    }, []);
    



    const returnBtn = (user)=>{
        sessionStorage.removeItem('commandID')
        navigate('/')
    }

  return (
    <div>
        <div>Merci d'avoir commandé</div>
        {error ? (
            <div style={{ color: 'red' }}>{error}</div>
        ) : (
            <div>Votre ID de commande : {commandID}</div>
        )}
        <button onClick={returnBtn}>Retour au site</button>
    </div>
  )
}

export default CheckoutConfirm