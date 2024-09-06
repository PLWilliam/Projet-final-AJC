import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      // Génération token simple 
      const token = user.email;
      sessionStorage.setItem('token', token);

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
