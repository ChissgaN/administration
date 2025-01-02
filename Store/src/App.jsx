import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthLayout from './Layouts/AuthLayout';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Users from './Pages/Users';
import PurchaseHistory from './Pages/PurchaseHistory';


function App() {

  return (
    <div className='bg-[#fffffc] min-h-screen'>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AuthLayout />} >
            <Route path="/products" Component={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
          </Route >

        </Routes>
      </Router>
    </div>
  );
}

export default App;