import React, { useEffect ,useState,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs,addDoc,setDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cartLength, setCartLength] = useState(false);
  const navigate = useNavigate();
  const { cart,refreshCart } = useContext(CartContext);
  const dropDownRef = useRef(null);

  useEffect(() => {
    // Vérifier si un 'token' existe dans le sessionStorage
    const token = sessionStorage.getItem('token');
    const fetchCartFromFirestore = async () => {
      if (token) {
        // if (localStorage.getItem('cart')) {
        //   // refreshCart(JSON.parse(localStorage.getItem('cart')))
        // }
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));
       
        console.log(querySnapshot);
        
       
        // if (querySnapshot.docs[0].data().cart) {
        //   const cartLength = querySnapshot.docs[0].data().cart.length
        //   let test;
        //   if(cartLength > 1){
        //     test = querySnapshot.docs.map(doc => ([...doc.data().cart]))[0]
        //   }
        //   else{
        //     test = querySnapshot.docs[0].data().cart;
        //   }
        //   // console.log(test);
        //   refreshCart(test)
        //   setCartLength(cartLength)
          
        // }
        // else{
        //   setCartLength(0)

        // }

        console.log(token)

        
      }
      else{
        setCartLength(0)

      }
    }

    fetchCartFromFirestore()
    
    
  }, [cart,sessionStorage.getItem('token')]);

  useEffect(() => {
    // Fonction pour gérer les clics en dehors du menu déroulant
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    // Ajouter le listener lorsque le menu est affiché
    if (showDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Nettoyer le listener lorsqu'il n'est plus nécessaire
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropDown]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const dropDown = () =>{
    setShowDropDown(!showDropDown)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    // navigate('/login');
  };

  const handleLinkClick = ()=> {
    setShowDropDown(false)
  }




  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={require('../assets/Codebook.png')} alt="Logo" />
          <span>Livre de codes</span>
        </Link>
      </div>
      <nav className="nav-icons">
        <button className="icon-btn" onClick={() => alert('Settings clicked')}>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>
        <button className="icon-btn" onClick={handleCartClick}>
          <span className="cart-badge">{cartLength}</span>
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
        </button>
        <button className="icon-btn" onClick={() => dropDown()}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
        {showDropDown ?(
          <div className='dropDown' ref={dropDownRef}>
          {!sessionStorage.getItem('token') ?(
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
          ):(
          <div>
            <ul>
              <li>
                {sessionStorage.getItem('token')}
              </li>
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
        ):(
          <div></div>
        )}

      </nav>
      {showSearch && (
        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
        </div>
      )}
    </header>
  );
};

export default Header;
