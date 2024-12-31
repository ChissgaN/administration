import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductsShop from "../Pages/ProductsShop";
import OrderHistory from "../Pages/OrderHistory";

const AuthLayout = ({ children }) => {
  const rol_id = 1;
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#fffffc]">
      <Navbar rol_id={rol_id} />
      {location.pathname === "/inicio" ? (
        rol_id === 1 ? <OrderHistory /> : <ProductsShop />
      ) : (
        children
      )}
    </div>
  );
};

export default AuthLayout;