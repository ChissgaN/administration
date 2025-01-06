import { AuthContext } from "../context/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductsShop from "../Pages/ProductsShop";
import OrderHistory from "../Pages/OrderHistory";
import { getProfile } from "../libs/axios/auth/getProfile";
import { useEffect, useState } from "react";
import { getAllStatus } from "../libs/axios/status/getAllStatus";
import Loading from "../Components/Loading";

const AuthLayout = () => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();




  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {

        const st = await getAllStatus();
        setStatus(st);

        const me = await getProfile();
        setProfile(me);

      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, []);



  return (
    <AuthContext.Provider value={{ profile, status, loading, setLoading }}>
      {
        loading &&
        <Loading />
      }
      <div className="min-h-screen bg-[#fffffc]">
        <Navbar rol_id={profile?.role_id} />

        {location.pathname === "/" && profile? (
          profile?.role_id === 1 ? <OrderHistory /> : <ProductsShop />
        ) : (
          <Outlet />
        )}
      </div>
      

    </AuthContext.Provider>
  )

};

export default AuthLayout;