import React, { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
import OrderDetails from "../Components/OrderDetails";
import ActionButtons from "../Components/ActionButtons";
import { FaEye } from "react-icons/fa";
import { allOrders } from "../libs/axios/orders/allOrders";
import { findOrder } from "../libs/axios/orders/findOrder"; 

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await allOrders(); 
        setOrders(ordersData);
      } catch (error) {
        console.error("Error al obtener órdenes:", error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleView = (order) => {
    setSelectedOrderId(order.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
            <th className="p-2">Fecha de Entrega</th>
            <th className="p-2">Total Orden</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 text-center">{order.id}</td>
              <td
                className={`text-center p-2 ${statusColor[order.status.id] || statusColor.default} rounded-full font-medium`}
              >
                {order.status.name}
              </td>
              <td className="p-2 text-center">{order.delivery_date}</td>
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
                      action: () => handleView(order),
                    },
                  ]}
                />
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

      {selectedOrderId && (
        <OrderDetails
          open={isModalOpen}
          onClose={handleCloseModal}
          order_id={selectedOrderId}
        />
      )}
    </div>
  );
}

const statusColor = {
  "5": "text-[#ed217c]",
  "3": "text-blue-600",
  "4": "text-green-600",
  "default": "text-gray-600",
};
