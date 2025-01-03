import { useContext, useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import OrderDetails from "../Components/OrderDetails";
import ActionButtons from "../Components/ActionButtons";
import { FaEye, FaEdit } from "react-icons/fa";
import { allOrders } from "../libs/axios/orders/allOrders";

import { updateOrderStatus } from "../libs/axios/orders/updateOrderStatus";
import { AuthContext } from "../context/AuthContext";

export default function OrderHistory() {
  const { status } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOrderId, setDropdownOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [orders, setOrders] = useState([]);

  const handleView = (order) => {
    setSelectedOrder(order.id);
    setIsModalOpen(true);
  };

  const toggleDropdown = (orderId) => {
    setDropdownOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
      .then(() => {
        getOrders()
        setDropdownOrderId(null);
      })
      .catch((error) => {
        console.error(error);
      });;

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

  // Filtrar datos según la página actual
  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );



  function getOrders() {
    allOrders()
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(getOrders, []);
  return (
    <div className="p-6 bg-[#fffffc]">
      <h1 className="text-2xl font-bold text-[#19535f] mb-4">
        Historial de Órdenes
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
                className={`text-center p-2 ${statusColor[order.status.id] || statusColor.default} rounded-full font-medium`}
              >
                {order.status.name}
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
                      icon: (
                        <FaEdit
                          className={
                            order.status_id === 5
                              ? "text-gray-500"
                              : "text-blue-500"
                          }
                        />
                      ),
                      className: "hover:bg-blue-100",
                      tooltip: "Estado",
                      action: () =>
                        order.status_id === 5 ? null : toggleDropdown(order.id),
                    },
                  ]}
                />
                {dropdownOrderId === order.id && (
                  <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg z-10 w-40 rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {status
                        .filter((s) => s.id !== 1 && s.id !== 2)
                        .map((r) => (
                          <li
                            key={r.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleStatusChange(order.id, r.id)}
                          >
                            {r.name}
                          </li>
                        ))}
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
          order_id={selectedOrder}
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
}