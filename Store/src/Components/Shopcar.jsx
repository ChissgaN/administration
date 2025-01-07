import React, { useState, useEffect } from "react";
import { createOrder } from "../libs/axios/orders/CreateOrders"; 
import { getProfile } from "../libs/axios/auth/getProfile"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const ShopCar = ({ cartItems }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Para la paginación
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    delivery_date: "",
  });

  const itemsPerPage = 2; // Mostrar solo 2 productos por página
  const base_api_url = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        setError("No se pudo obtener la información del usuario.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleCreateOrder = async () => {
    if (!user) {
      setError("Por favor, inicia sesión para crear una orden.");
      return;
    }

    const totalOrder = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 
      0
    ).toFixed(2);

    const order = {
      full_name: formData.full_name || user.name,
      address: formData.address || user.address,
      delivery_date: formData.delivery_date,
      phone_number: user.phone_number,
      email: user.email,
      status_id: 3,
      total_order: totalOrder, 
      order_details: cartItems.map((item) => ({
        products_id: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
    };

    try {
      setLoading(true);
      const { status, data } = await createOrder(order);
      if (status === 200) {
        alert("Orden creada con éxito");
        localStorage.removeItem("cart");
        window.location.reload();
      } else {
        console.error("Detalles del error:", data);
        setError("Hubo un error al crear la orden.");
      }
    } catch (err) {
      console.error("Error del servidor:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Hubo un error al crear la orden.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  const handleChangePage = (_, page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const displayedItems = cartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  ).toFixed(2);

  return (
    <div className="bg-[#fffffc] p-6 rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No hay productos en tu carrito.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-[#19535f] mb-4">Productos en tu carrito</h1>
          <div className="flex justify-between gap-4 mb-6">
            <input
              type="text"
              name="full_name"
              placeholder="Nombre completo"
              value={formData.full_name}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <TableContainer component={Paper} className="rounded-lg shadow-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Imagen</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">
                      {item.photo ? (
                        <img
                          src={`${base_api_url}/${item.photo}`}
                          alt={`Producto ${item.products_id}`}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      ) : (
                        "No image"
                      )}
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(cartItems.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            className="mt-4"
          />
          <div className="flex justify-between items-center mt-4">
            <p>Total: ${totalAmount}</p>
            <div className="flex gap-4">
              <button
                onClick={handleCancelOrder}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateOrder}
                className="py-2 px-4 bg-[#19535f] text-white rounded-lg hover:bg-[#ff1b1c] transition"
                disabled={loading}
              >
                {loading ? "Creando orden..." : "Crear orden"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCar;
