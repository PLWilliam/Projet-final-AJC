import React, { useState } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// hash library
import bcrypt from 'bcryptjs';

const Register = () => {
  const [email, setEmail]       = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const db = getFirestore();

    try {

        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email)));

        if (!querySnapshot.empty) {
            setError('Cet email est déjà utilisé.');
            setSuccess(false);
            return;
        }

        const salt           = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await addDoc(collection(db, 'users'), {
            email: email,
            username: username,
            password: hashedPassword,
        });

        setSuccess(true);
        setError(null); 
        setEmail('');
        setUsername('');
        setPassword('');

    } catch (error) {
        setError('Erreur lors de l\'enregistrement. Veuillez réessayer.');
        setSuccess(false);
    }
  };

  return (
    <div className='login-container'>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className='label-input'>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='john'
            required
          />
        </div>
        <div className='label-input'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='john@mail.com'
            required
          />
        </div>
        <div className='label-input'>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='mot de passe'
            required
          />
        </div>
        {error && <p>{error}</p>}
        {success && <p>Inscription réussie !</p>}
        <button type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
