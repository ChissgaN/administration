import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ActionButtons from "../Components/ActionButtons";

const CustomTablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className="flex items-center">
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        className="text-[#19535f] hover:text-[#cbe896]"
      >
        <MdKeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        className="text-[#19535f] hover:text-[#cbe896]"
      >
        <MdKeyboardArrowRight />
      </IconButton>
    </div>
  );
};

const OrderHistory = () => {
  const orders = [
    { id: 1, full_name: "Juan Pérez", address: "123 Calle Principal", phone_number: "555-1234", email: "juan.perez@example.com", delivery_date: "2024-01-15", total_order: 150.75 },
    { id: 2, full_name: "María López", address: "456 Avenida Secundaria", phone_number: "555-5678", email: "maria.lopez@example.com", delivery_date: "2024-01-18", total_order: 200.0 },
    { id: 3, full_name: "Carlos Gómez", address: "789 Boulevard Norte", phone_number: "555-9876", email: "carlos.gomez@example.com", delivery_date: "2024-01-20", total_order: 320.5 },
    { id: 4, full_name: "Ana Ramírez", address: "1010 Calle Sur", phone_number: "555-2222", email: "ana.ramirez@example.com", delivery_date: "2024-01-22", total_order: 180.25 },
    { id: 5, full_name: "Luis Torres", address: "1212 Avenida Norte", phone_number: "555-3333", email: "luis.torres@example.com", delivery_date: "2024-01-25", total_order: 90.0 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (rowData) => {
    console.log("View:", rowData);
  };

  const handleEdit = (rowData) => {
    console.log("Edit:", rowData);
  };

  return (
    <div className="bg-[#fffffc] p-6">
      <h1 className="text-[#19535f] text-2xl font-bold mb-6">Historial de Pedidos</h1>
      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table>
          <TableHead className="bg-[#9381ff]">
            <TableRow>
              <TableCell className="text-[#19535f] font-bold ">ID</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Nombre Completo</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Dirección</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Teléfono</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Correo</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Fecha de Entrega</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Total del Pedido</TableCell>
              <TableCell className="text-[#19535f] font-bold ">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order.id} className="hover:bg-[#f5f5f5]">
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.full_name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.phone_number}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>Q{order.total_order.toFixed(2)}</TableCell>
                <TableCell>
                  <ActionButtons
                    rowData={order}
                    actions={[
                      {
                        icon: <FaEye />, className: "p-button-info text-green-700", tooltip: "Ver", action: handleView,
                      },
                      {
                        icon: <FaEdit />, className: "p-button-warning text-blue-500", tooltip: "Editar", action: handleEdit,
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={CustomTablePaginationActions}
        />
      </TableContainer>
    </div>
  );
};

export default OrderHistory;
