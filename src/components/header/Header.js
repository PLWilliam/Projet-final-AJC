import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from '../component.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [cartLength, setCartLength] = useState(0); // Initialize with 0
  const navigate = useNavigate();
  const { cart, reloadCart } = useContext(CartContext); // Assuming `cart` and `reloadCart` from CartContext
  const dropDownRef = useRef(null);
  const [userToken, setUserToken] = useState(() => sessionStorage.getItem('token'));
  // Load token from sessionStorage on load

  useEffect(() => {
    // Fetch the cart from Firestore when the component mounts or the token changes
    const fetchCartFromFirestore = async () => {
      if (userToken) {
        try {
          // Fetch the user's cart from Firestore based on their email (stored in token)
          const q = query(collection(db, 'users'), where('email', '==', userToken));
          const querySnapshot = await getDocs(q);
          console.log(userToken);
          
          if (querySnapshot.docs.length > 0 && querySnapshot.docs[0].data().cart) {
            const userCart = querySnapshot.docs[0].data().cart;
            reloadCart(userCart); // Update the cart in the context
            setCartLength(userCart.length); // Update the cart length for the header
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du panier:", error);
        }
      } else {
        setCartLength(0); // Set cartLength to 0 if no token is found
      }
    };
  
    fetchCartFromFirestore();
  }, [userToken, setCartLength]); // `userToken` should not be updated in this hook

  useEffect(() => {
    // Update the cart length when the cart changes in the context
    setCartLength(cart.length);
  }, [cart]);

  useEffect(() => {
    // Update the cart length when the cart changes in the context
    setUserToken(sessionStorage.getItem('token'));
  }, [sessionStorage.getItem('token')]);

  useEffect(() => {
    // Handle outside clicks to close the dropdown menu
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
    setUserToken(null); // Clear the token from state
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
        {userToken}
        <button className="icon-btn" onClick={() => alert('Settings clicked')}>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>

        {userToken && (
          <button className="icon-btn" onClick={handleCartClick}>
            <span className="cart-badge">{cartLength}</span>
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
          </button>
        )}

        <button className="icon-btn" onClick={() => dropDown()}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
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
                  <li>{userToken}</li>
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
