import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShop,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Menu, MenuItem } from "@mui/material";
import { logout } from "../libs/axios/auth/logout";
import Modal from "@mui/material/Modal";
import ShopCar from "./Shopcar";

const Navbar = ({ rol_id }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCartOpen = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setCartOpen(true);
  };

  const handleLogout = async () => {
    const rs = await logout();
    if (rs.status === 200) {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-[#cbe896] shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-[#19535f] flex items-center text-3xl">
          <AiOutlineShop />
        </Link>
        {/* Opciones del navbar (pantallas grandes) */}
        <ul className="hidden sm:flex gap-8 text-[#19535f] font-medium">
          {rol_id === 1 ? (
            <>
              <li>
                <Link to="/" className="hover:text-[#ff7f11] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#ff7f11] transition"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-[#ff7f11] transition"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/users" className="hover:text-[#ff7f11] transition">
                  Usuarios
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-[#ff7f11] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/purchase-history"
                  className="hover:text-[#ff7f11] transition"
                >
                  Historial de Compras
                </Link>
              </li>
              <li>
                <button
                  onClick={handleCartOpen} // Abrir el modal del carrito y cargar productos
                  className="text-[#19535f] hover:text-[#ff7f11] transition"
                >
                  <AiOutlineShoppingCart size={24} />
                </button>
              </li>
            </>
          )}
        </ul>
        {/* Menú de Opciones a la derecha */}
        <div className="relative">
          <button
            onClick={handleMenuClick}
            className="text-[#19535f] hover:text-[#ff7f11] transition"
          >
            Opciones
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/perfil">Perfil</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </MenuItem>
          </Menu>
        </div>

        {/* Icono hamburguesa (pantallas pequeñas) */}
        <button
          className="sm:hidden text-[#19535f] hover:text-[#ff7f11] transition text-2xl"
          onClick={toggleMobileMenu}
        >
          <AiOutlineMenu />
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="sm:hidden bg-[#fffffc] py-2 shadow-md">
          <ul className="flex flex-col gap-6 text-[#19535f] font-medium px-4">
            {rol_id === 1 ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/users"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Usuarios
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/purchase-history"
                    className="hover:text-[#ff7f11] transition"
                    onClick={toggleMobileMenu}
                  >
                    Historial de Compras
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleCartOpen} // Abrir el modal del carrito
                    className="text-[#19535f] hover:text-[#ff7f11] transition"
                  >
                    <AiOutlineShoppingCart size={24} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Modal del carrito */}
      <Modal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-3/3 mx-auto mt-20"
        >
          <ShopCar cartItems={cartItems} />
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
