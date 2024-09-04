import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import AppRouter from './Router';

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRouter />
      </Router>
    </CartProvider>
  );
}

export default App;
