import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home,Login,Register,Products,ProductDetail,Cart,
  Checkout,CheckoutConfirm,Dashboard,FeaturedProducts } from './components/component'

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
