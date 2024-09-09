import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const CheckoutConfirm = () => {

    const [commandID,setCommandID] = useState('');
    const [error, setError]        = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem('commandID')) {
            setCommandID(sessionStorage.getItem('commandID'))
        }
        else{
            setError("Une erreur est survenu")
        }
       
    }, []);
    

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