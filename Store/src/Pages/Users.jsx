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
  Button,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ActionButtons from "../Components/ActionButtons";
import Confirm from "../Components/Confirm";
import CreateUser from "../Components/UsersComponents.jsx/CreateUser";
import EditUser from "../Components/UsersComponents.jsx/EditUser";

const users = [
  {
    id: 1,
    role_id: 1,
    status_id: 1,
    email: "jj@mail.com",
    phone_number: "12345678",
    birth_date: "1989-12-31",
    role: {
      id: 1,
      name: "Administrador",
    },
    status: {
      id: 1,
      name: "Activo",
    },
  },
  {
    id: 2,
    role_id: 2,
    status_id: 2,
    email: "user2@mail.com",
    phone_number: "98765432",
    birth_date: "1995-01-10",
    role: {
      id: 2,
      name: "Usuario",
    },
    status: {
      id: 2,
      name: "Inactivo",
    },
  },
];

export default function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateUser = (data) => {
    console.log("Usuario creado:", data);
  };

  const handleEditUser = (data) => {
    console.log("Usuario editado:", data);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Usuario eliminado:", selectedUser);
    setIsConfirmOpen(false);
  };

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Usuarios</h1>
        <Button
          variant="contained"
          className="bg-[#9381ff] text-white hover:bg-[#7c6bd0] px-4 py-2 rounded-md flex items-center"
          startIcon={<FaPlus />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Crear Usuario
        </Button>
      </div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-[#9381ff]">
            <TableRow>
              <TableCell className="text-white font-bold">ID</TableCell>
              <TableCell className="text-white font-bold">Correo</TableCell>
              <TableCell className="text-white font-bold">Teléfono</TableCell>
              <TableCell className="text-white font-bold">Fecha de Nacimiento</TableCell>
              <TableCell className="text-white font-bold">Rol</TableCell>
              <TableCell className="text-white font-bold">Estado</TableCell>
              <TableCell className="text-white font-bold">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.birth_date}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.status.name === "Activo"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status.name}
                  </span>
                </TableCell>
                <TableCell>
                  <ActionButtons
                    rowData={user}
                    actions={[
                      {
                        icon: <FaEdit className="text-blue-500" />,
                        className: "hover:bg-blue-100",
                        tooltip: "Editar",
                        action: () => handleEditClick(user),
                      },
                      {
                        icon: <FaTrash className="text-red-500" />,
                        className: "hover:bg-red-100",
                        tooltip: "Borrar",
                        action: () => handleDeleteClick(user),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[3, 5, 10]}
        className="mt-4"
      />
      <Confirm
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedUser?.email}
        itemType="user"
      />
      <CreateUser
        open={isCreateDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateUser}
      />
      <EditUser
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
}
