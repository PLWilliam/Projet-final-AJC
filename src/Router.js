import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CheckoutConfirm from './components/CheckoutConfirm';
import Dashboard from './components/Dashboard';
import FeaturedProducts  from './components/FeaturedProducts';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/featured_products" element={<FeaturedProducts />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées */}
      <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
      <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
      <Route path="/checkout_confirm" element={<PrivateRoute element={<CheckoutConfirm />} />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

     
    </Routes>
  );
};

export default Router;
