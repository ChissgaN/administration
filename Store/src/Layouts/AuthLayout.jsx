import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductsShop from "../Pages/ProductsShop";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const rol_id = 2; // Suponiendo que obtienes el rol del usuario de alguna fuente (ajusta esto según tu lógica).

  /* const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]); */

  return (
    <div className="min-h-screen bg-[#fffffc]">
      {/* Navbar */}
      <Navbar rol_id={rol_id} />

      {/* Contenido renderizado en el layout */}
      <div className="container mx-auto p-4">
        {/* Renderizar contenido basado en el rol */}
        {rol_id === 2 ? <ProductsShop /> : children}
      </div>
    </div>
  );
};

export default AuthLayout;
