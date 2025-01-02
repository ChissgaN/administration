import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthLayout from './Layouts/AuthLayout';
import Products from './Pages/Products';
import OrderHistory from './Pages/OrderHistory';
import ProductsShop from './Pages/ProductsShop';
import Categories from './Pages/Categories';
import Users from './Pages/Users';
import PurchaseHistory from './Pages/PurchaseHistory';

function App() {
  const rol_id = "";

  return (
    <div className='bg-[#fffffc] min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<AuthLayout>{rol_id === 1 ? <OrderHistory /> : <ProductsShop />}</AuthLayout>} />
          <Route path="/products" element={<AuthLayout><Products /></AuthLayout>} />
          <Route path="/categories" element={<AuthLayout><Categories /></AuthLayout>} />
          <Route path="/users" element={<AuthLayout><Users /></AuthLayout>} />
          <Route path="/purchase-history" element={<AuthLayout><PurchaseHistory /></AuthLayout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;