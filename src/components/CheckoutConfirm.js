import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../firebase';



const CheckoutConfirm = () => {

    const [commandID,setCommandID] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    
    useEffect(()=>{
        setCommandID(sessionStorage.getItem('commandID'))

    },[])

    const returnBtn = ()=>{
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