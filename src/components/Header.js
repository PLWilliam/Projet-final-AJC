import React, { useEffect ,useState,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const dropDownRef = useRef(null);

  useEffect(() => {
    // Vérifier si un 'token' existe dans le sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      // navigate('/login');
    }
  }, [navigate]);

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

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

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
        <Link to="/products">
          <img src={require('../assets/Codebook.png')} alt="Logo" />
          <span>Livre de codes</span>
        </Link>
      </div>
      <nav className="nav-icons">
        <button className="icon-btn" onClick={() => alert('Settings clicked')}>
          <FontAwesomeIcon icon="fa-solid fa-gear" />
        </button>
        <button className="icon-btn" onClick={handleSearchToggle}>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
        <button className="icon-btn" onClick={handleCartClick}>
          <span className="cart-badge">{cart.length}</span>
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
                <Link to="/dasboard" onClick={handleLinkClick}>
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
