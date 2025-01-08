import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, TextField,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ActionButtons from "../Components/ActionButtons";
import Confirm from "../Components/Confirm";
import CreateUser from "../Components/UsersComponents.jsx/CreateUser";
import EditUser from "../Components/UsersComponents.jsx/EditUser";
import u from "../libs/axios/users";

export default function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateUser = (data) => {
    u.createUser(data)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleEditUser = (data) => {
    u.updateUser(selectedUser.id, data)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSelectedUser(null);
      });
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
    u.deleteUser(selectedUser.id)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSelectedUser(null);
        setIsConfirmOpen(false);
      });
  };

  const paginatedUsers = users
    .filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function getUsers() {
    u.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(getUsers, []);

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Usuarios</h1>
        <div className="flex items-center gap-4">
          <TextField
            label="Buscar por email o rol" 
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            className="bg-[#9381ff] text-white hover:bg-[#7c6bd0] px-4 py-2 rounded-md flex items-center"
            startIcon={<FaPlus />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Crear Usuario
          </Button>
        </div>
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
        onCreate={handleCreateUser}
        existingEmails={users.map((user) => user.email)}
      />
      <EditUser
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onUpdate={handleEditUser}
        user_id={selectedUser?.id}
      />
    </div>
  );
}
