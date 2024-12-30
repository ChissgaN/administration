import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; 

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  /* const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]); */

  return (
    <div className="min-h-screen bg-[#fffffc]">
      {/* Navbar */}
      <Navbar rol_id={1} /> 
      
      {/* Contenido renderizado en el layout */}
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
};

export default AuthLayout;
