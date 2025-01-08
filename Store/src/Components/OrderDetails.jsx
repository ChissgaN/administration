import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { findOrder } from "../libs/axios/orders/findOrder";
import { FaTimes } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function OrderDetails({ open, onClose, order_id }) {

  const [order, setOrder] = useState({});
  const totalOrder = order?.order_details?.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  useEffect(() => {
    findOrder(order_id).then((response) => {
      setOrder(response);
    })
      .catch((error) => {
        console.error(error);
      });

  }, [order_id]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: { backdropFilter: "blur(5px)" },
      }}
    >
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-[#ed217c]">Detalles de la Orden</span>
          <IconButton onClick={onClose}>
            <FaTimes className="text-red-500" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        
        <div className="flex justify-between mb-4 text-[#19535f] text-lg">
          <div>
            <p><strong>ID:</strong> {order?.id}</p>
            <p><strong>Nombre:</strong> {order?.full_name}</p>
            <p><strong>Dirección:</strong> {order?.address}</p>
          </div>
          <div>
            <p><strong>Teléfono:</strong> {order?.phone_number}</p>
            <p><strong>Email:</strong> {order?.email}</p>
            <p><strong>Fecha de Entrega:</strong> {order?.delivery_date}</p>
          </div>
        </div>

        {/* Tabla de productos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold text-[#19535f]">ID</TableCell>
                <TableCell className="font-bold text-[#19535f]">Producto</TableCell>
                <TableCell className="font-bold text-[#19535f]">Cantidad</TableCell>
                <TableCell className="font-bold text-[#19535f]">Precio</TableCell>
                <TableCell className="font-bold text-[#19535f]">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.order_details?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Q{item.price?.toFixed(2)}</TableCell>
                  <TableCell>Q{item.subtotal?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-4 text-right text-lg font-bold text-[#19535f]">
          <p>Total: Q{totalOrder?.toFixed(2)}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ff7f11] text-white rounded hover:bg-[#ff1b1c] transition"
          >
            Cerrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
