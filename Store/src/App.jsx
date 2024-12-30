import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthLayout from './Layouts/AuthLayout';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/inicio"
          element={ <AuthLayout /> }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
