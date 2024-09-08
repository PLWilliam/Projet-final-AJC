import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { CartContext } from '../component.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cart,reloadCart,resetCart} = useContext(CartContext);

  useEffect(() => {
    // Vérifier si un 'token' existe déjà dans le sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/'); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const db = getFirestore();

    try {
      // Vérifier si l'email existe dans Firestore
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      // const querySnapshot2 = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));

      console.log(querySnapshot);
      console.log(querySnapshot.docs[0].data().cart);
      
      if (querySnapshot.empty) {
        setError('Aucun utilisateur trouvé avec cet email.');
        return;
      }

      const user = querySnapshot.docs[0].data();

      // Comparer le mot de passe haché avec celui fourni par l'utilisateur
      const passwordMatches = bcrypt.compareSync(password, user.password);
      if (!passwordMatches) {
        setError('Mot de passe incorrect.');
        return;
      }

      // Génération faux "token" 
      const token = user.email;
      sessionStorage.setItem('token', token);

      if (querySnapshot.docs[0].data().cart) {
        const cartLength = querySnapshot.docs[0].data().cart.length
        let userCart;
        if(cartLength > 1){
          userCart = querySnapshot.docs.map(doc => ([...doc.data().cart]))[0]
        }
        else{
          userCart = querySnapshot.docs[0].data().cart;
        }
        // console.log(test);
        reloadCart(userCart)
        navigate('/');
      }
      else{
        resetCart();
      }

      navigate('/'); 
    } catch (error) {
      setError('Erreur lors de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
