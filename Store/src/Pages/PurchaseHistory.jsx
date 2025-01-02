import React, { useState } from "react";
import { TablePagination } from "@mui/material";
import OrderDetails from "../Components/OrderDetails";
import ActionButtons from "../Components/ActionButtons";
import { FaEye, FaEdit } from "react-icons/fa";

const orders = [
  {
    id: 1,
    full_name: "Gallo Clovis",
    address: "PO Box 13454",
    phone_number: "215-634-1334",
    email: "cgallo@time.com",
    delivery_date: "2024-09-21",
    total_order: 6505.92,
    status: 2, 
    order_details: [
      {
        id: 33,
        product_id: 8,
        quantity: 9,
        price: 491.65,
        subtotal: 4729.21,
        product: { name: "emin" },
      },
      {
        id: 34,
        product_id: 9,
        quantity: 5,
        price: 355.34,
        subtotal: 1776.71,
        product: { name: "nisi" },
      },
    ],
  },
];

export default function PurchaseHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOrderId, setDropdownOrderId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const toggleDropdown = (orderId) => {
    setDropdownOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);
    setDropdownOrderId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <h1 className="text-2xl font-bold text-[#19535f] mb-4">
        Historial de tus Compras
      </h1>
      <table className="w-full border border-[#beb7a4]">
        <thead>
          <tr className="bg-[#9381ff]">
            <th className="p-2">ID</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Email</th>
            <th className="p-2">Total Orden</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 text-center">{order.id}</td>
              <td
                className={`p-2 text-center
    ${order.status === 1 ? "text-[#ed217c]" : ""}
    ${order.status === 2 ? "text-blue-600" : ""}
    ${order.status === 3 ? "text-green-600" : ""}
    ${![1, 2, 3].includes(order.status) ? "text-gray-600" : ""}
    rounded-full px-4 py-2 font-medium`}
              >
                {{
                  1: "Pendiente",
                  2: "En Proceso",
                  3: "Entregado",
                }[order.status] || "Desconocido"}
              </td>

              <td className="p-2 text-center">{order.full_name}</td>
              <td className="p-2 text-center">{order.phone_number}</td>
              <td className="p-2 text-center">{order.email}</td>
              <td className="p-2 text-center">
                Q{order.total_order.toFixed(2)}
              </td>
              <td className="p-2 flex flex-col items-center relative">
                <ActionButtons
                  rowData={order}
                  actions={[
                    {
                      icon: <FaEye className="text-green-700" />,
                      className: "hover:bg-green-100",
                      tooltip: "Ver",
                      action: handleView,
                    },
                    {
                      icon: <FaEdit className="text-blue-500" />,
                      className: "hover:bg-blue-100",
                      tooltip: "Estado",
                      action: () => toggleDropdown(order.id),
                    },
                  ]}
                />
                {dropdownOrderId === order.id && (
                  <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg z-10 w-40 rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStatusChange(order.id, 1)}
                      >
                        Pendiente
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStatusChange(order.id, 2)}
                      >
                        En proceso
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStatusChange(order.id, 3)}
                      >
                        Entregado
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[3, 5, 10]}
      />

      {selectedOrder && (
        <OrderDetails
          open={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
