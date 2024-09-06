import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase';



const CheckoutConfirm = () => {

    const [commandID,setCommandID] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const user = sessionStorage.getItem('token')
    
    useEffect(() => {
        console.log('Component mounted');
        // Retirer la logique de nettoyage pour le test
        return () => {
            console.log('Component unmounted');
        };
    }, []);
    

    const clearUserCart = async()=>{
        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));
            // const userRef = doc(db, 'users', user); // Utiliser userId comme ID utilisateur
            await updateDoc(doc(db, 'users', querySnapshot.docs[0].id), { cart: [] });
            console.log('Panier vidé avec succès.');
        } catch (error) {
            setError('Une erreur est survenue lors du vidage de panier.');
        }
    }

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