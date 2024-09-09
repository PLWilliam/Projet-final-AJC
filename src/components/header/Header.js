import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from '../component.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [cartLength, setCartLength]     = useState(0);
  const [userToken, setUserToken]       = useState(() => sessionStorage.getItem('token'));
  const { cart, reloadCart }            = useContext(CartContext);
  const dropDownRef                     = useRef(null);
  const navigate                        = useNavigate();


  useEffect(() => {
    const fetchCartFromFirestore = async () => {
      if (userToken) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', userToken));
          const querySnapshot = await getDocs(q);
          console.log(userToken);
          
          if (querySnapshot.docs.length > 0 && querySnapshot.docs[0].data().cart) {
            const userCart = querySnapshot.docs[0].data().cart;
            reloadCart(userCart);
            setCartLength(userCart.length);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du panier:", error);
        }
      } else {
        setCartLength(0);
      }
    };
  
    fetchCartFromFirestore();
  }, [userToken, setCartLength]);

  // Mettre à jour la longueur du panier lorsque le panier change dans le contexte
  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);

  // Mettre à jour le token utilisateur lorsque sessionStorage change
  useEffect(() => {
    setUserToken(sessionStorage.getItem('token'));
  }, [sessionStorage.getItem('token')]);

  // Gérer les clics en dehors du menu déroulant pour le fermer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    if (showDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropDown]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const dropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUserToken(null);
    navigate('/login');
  };

  const handleLinkClick = () => {
    setShowDropDown(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={require('../../assets/Codebook.png')} alt="Logo" />
          <span>Livre de codes</span>
        </Link>
      </div>
      <nav className="nav-icons">
        <div>
          {userToken}

          {userToken && (
            <button className="icon-btn" onClick={handleCartClick}>
              <span className="cart-badge">{cartLength}</span>
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </button>
          )}

          <button className="icon-btn" onClick={() => dropDown()}>
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </button>
        </div>
        {showDropDown && (
          <div className='dropDown' ref={dropDownRef}>
            {!userToken ? (
              <div>
                <ul>
                  <li>
                    <Link to="/products" onClick={handleLinkClick}>
                      <button>Tout les eBooks</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleLinkClick}>
                      <button>Se connecter</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={handleLinkClick}>
                      <button>Créer un compte</button>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <ul>
                  <li>
                    <Link to="/products" onClick={handleLinkClick}>
                      <button>Tout les eBooks</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" onClick={handleLinkClick}>
                      <button>Dashboard</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLinkClick}>
                      <button onClick={handleLogout} className="logout-btn">
                        Déconnexion
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
