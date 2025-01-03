import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductsShop from "../Pages/ProductsShop";
import OrderHistory from "../Pages/OrderHistory";
import { getProfile } from "../libs/axios/auth/getProfile";
import { useEffect, useState } from "react";
import { getAllStatus } from "../libs/axios/status/getAllStatus";
const AuthLayout = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response);
      })
      .catch(() => {
        navigate("/login");
      });

    getAllStatus()
      .then((response) => {
        setStatus(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);




  return (
    <AuthContext.Provider value={{ profile, status }}>
      <div className="min-h-screen bg-[#fffffc]">
        <Navbar rol_id={profile?.role_id} />
        {location.pathname === "/" ? (
          profile?.role_id === 1 ? <OrderHistory /> : <ProductsShop />
        ) : (
          children
        )}
      </div>

    </AuthContext.Provider>
  )

};

export default AuthLayout;