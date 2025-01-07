import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
} from "@mui/material";

const ShopCar = ({ cartItems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(2);

  const handleCreateOrder = () => {
    console.log("Orden creada");
  };

  const handleCancelOrder = () => {
    localStorage.removeItem("cart"); 
    window.location.reload(); 
  };

  const base_api_url = import.meta.env.VITE_BASE_API_URL;

  const totalOrder = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedItems = cartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="bg-[#fffffc] p-6 rounded-lg">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No hay productos en tu carrito.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-[#19535f] mb-4">Productos en tu carrito</h1>
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

          {/* Total y botones */}
          <div className="flex justify-between items-center mt-4">
            <Typography variant="h6" color="primary">
              Total: ${totalOrder.toFixed(2)}
            </Typography>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelOrder}
                className=" hover:bg-[#]"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateOrder}
                className=" hover:bg-[#19535f]"
              >
                Crear orden
              </Button>
            </div>
          </div>

          {/* Paginación */}
          <TablePagination
            rowsPerPageOptions={[2]} 
            component="div"
            count={cartItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage=""
          />
        </div>
      )}
    </div>
  );
};

export default ShopCar;
