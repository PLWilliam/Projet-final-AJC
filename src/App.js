import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import { CartProvider } from './components/dashboard/CartContext';
import { Header } from './components/component'
import './style.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

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

library.add(fab, fas, far)
