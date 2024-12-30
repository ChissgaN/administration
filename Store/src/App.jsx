import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthLayout from './Layouts/AuthLayout';
import { ClassNames } from '@emotion/react';

function App() {

  return (
    <div className='bg-[#fffffc] min-h-screen'>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<AuthLayout />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
