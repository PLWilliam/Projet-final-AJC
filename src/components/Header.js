import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
        <span>Livre de codes</span>
      </div>
      <nav className="nav-icons">
        <button className="icon-btn" onClick={() => alert('Settings clicked')}>
          <i className="fa fa-cog"></i>
        </button>
        <button className="icon-btn" onClick={handleSearchToggle}>
          <i className="fa fa-search"></i>
        </button>
        <button className="icon-btn" onClick={handleCartClick}>
          <i className="fa fa-shopping-cart"></i>
          <span className="cart-badge">0</span>
        </button>
        <button className="icon-btn" onClick={() => alert('Profile clicked')}>
          <i className="fa fa-user"></i>
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
