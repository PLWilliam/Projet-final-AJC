import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../firebase';



const CheckoutConfirm = () => {

    const [commandID,setCommandID] = useState('')

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
        <div>Votre ID de commande : {commandID}</div>
        <div></div>
        <button onClick={()=> returnBtn()}>Retour aux site</button>
    </div>
  )
}

export default CheckoutConfirm