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
import Confirm from "../Components/Confirm";
import ActionButtons from "../Components/ActionButtons";
import CreateCategories from "../Components/CategoriesComponents.jsx/CreateCategories";
import EditCategories from "../Components/CategoriesComponents.jsx/EditCategories"; // Importa el componente EditCategories

const categories = [
  {
    id: 1,
    name: "Electrodomesticos",
    status_id: 1,
    user_id: 1,
    user: {
      id: 1,
      role_id: 1,
      status_id: 1,
      email: "jj@mail.com",
      phone_number: "12345678",
      birth_date: "1989-12-31",
    },
    status: {
      id: 1,
      name: "Activo",
    },
  },
  {
    id: 2,
    name: "Ropa",
    status_id: 1,
    user_id: 2,
    user: {
      id: 2,
      role_id: 2,
      status_id: 1,
      email: "user2@mail.com",
      phone_number: "98765432",
      birth_date: "1995-01-10",
    },
    status: {
      id: 1,
      name: "Activo",
    },
  },
];

export default function Categories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Nuevo estado para el formulario de edición

  const handleCreateCategory = (newCategory) => {
    console.log("Nueva Categoría Creada:", newCategory);
    setIsCreateDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category); // Establecer la categoría seleccionada
    setIsEditDialogOpen(true); // Abrir el formulario de edición
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Categoría eliminada:", selectedCategory);
    setIsConfirmOpen(false);
  };

  const paginatedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Categorías</h1>
        <Button
          variant="contained"
          className="bg-[#9381ff] text-white hover:bg-[#7c6bd0] px-4 py-2 rounded-md flex items-center"
          startIcon={<FaPlus />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          Crear Categoría
        </Button>
      </div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-[#9381ff]">
            <TableRow>
              <TableCell className="text-white font-bold">ID</TableCell>
              <TableCell className="text-white font-bold">Nombre</TableCell>
              <TableCell className="text-white font-bold">Usuario</TableCell>
              <TableCell className="text-white font-bold">Estado</TableCell>
              <TableCell className="text-white font-bold">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category.id} className="hover:bg-gray-100">
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      category.status.name === "Activo"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {category.status.name}
                  </span>
                </TableCell>
                <TableCell>
                  <ActionButtons
                    rowData={category}
                    actions={[
                      {
                        icon: <FaEdit className="text-blue-500" />,
                        className: "hover:bg-blue-100",
                        tooltip: "Editar",
                        action: () => handleEditClick(category),
                      },
                      {
                        icon: <FaTrash className="text-red-500" />,
                        className: "hover:bg-red-100",
                        tooltip: "Borrar",
                        action: () => handleDeleteClick(category),
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
        count={categories.length}
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
        itemName={selectedCategory?.name}
        itemType="categoría"
      />

      <CreateCategories
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={(newCategory) => {
          console.log("Nueva Categoría Creada:", newCategory);
          setIsCreateDialogOpen(false);
        }}
      />

      {selectedCategory && (
        <EditCategories
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          category={selectedCategory} 
          onUpdate={(updatedCategory) => {
            console.log("Categoría actualizada:", updatedCategory);
            setIsEditDialogOpen(false);
          }}
        />
      )}
    </div>
  );
}
