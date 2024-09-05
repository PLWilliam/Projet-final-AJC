import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import AppRouter from './Router';
import './style.css';
import Header from './components/Header';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header/>
        <AppRouter />
      </Router>
    </CartProvider>
  );
}

export default App;
