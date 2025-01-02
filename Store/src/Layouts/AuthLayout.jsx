import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductsShop from "../Pages/ProductsShop";
import OrderHistory from "../Pages/OrderHistory";
import { getProfile } from "../libs/axios/auth/getProfile";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }) => {
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);



  return (
    <AuthContext.Provider value={profile}>
      <div className="min-h-screen bg-[#fffffc]">
        <Navbar rol_id={profile?.rol_id} />
        {location.pathname === "/" ? (
          profile?.rol_id === 1 ? <OrderHistory /> : <ProductsShop />
        ) : (
          children
        )}
      </div>

    </AuthContext.Provider>
  )

};

export default AuthLayout;