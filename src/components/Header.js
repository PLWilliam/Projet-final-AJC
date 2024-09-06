import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };



  return (
    <header className="header">
      <div className="logo">
        <img src={require('../assets/Codebook.png')} alt="Logo" />
        <span>Livre de codes</span>
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
        <button className="icon-btn" onClick={() => alert('Profile clicked')}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
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
