import React, { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Confirm from "../Components/Confirm";
import ActionButtons from "../Components/ActionButtons";
import CreateCategories from "../Components/CategoriesComponents.jsx/CreateCategories";
import EditCategories from "../Components/CategoriesComponents.jsx/EditCategories";
import c from "../libs/axios/categories";

export default function Categories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateCategory = (newCategory) => {
    c.createCategory(newCategory)
      .then((response) => {
        if (response.status === 201) {
          getCategories();
        }
      })
      .catch((error) => {
        console.error("Error al crear la categoría:", error);
      });
  };

  const handleUpdateCategory = (id, categoryName) => {
    c.updateCategory(id, { name: categoryName })
      .then((response) => {
        if (response.status === 200) {
          getCategories();
        }
      })
      .catch((error) => {
        console.error("Error al actualizar la categoría:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsConfirmOpen(true);
    
  };

  const handleConfirmDelete = () => {
    c.deleteCategory(selectedCategory.id)
    window.location.reload()
      .then((response) => {
        if (response.status === 204) {
          getCategories();
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
      })
      .finally(() => {
        setIsConfirmOpen(false);
      });
  };

  const getCategories = () => {
    c.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  };

  useEffect(getCategories, []);

  const filteredCategories = categories.filter((category) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(lowerSearchTerm) ||
      category.user.email.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Categorías</h1>
        <div className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            size="small"
            label="Buscar por nombre o usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            className="bg-[#9381ff] text-white hover:bg-[#7c6bd0] px-4 py-2 rounded-md flex items-center"
            startIcon={<FaPlus />}
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Crear Categoría
          </Button>
        </div>
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
        count={filteredCategories.length}
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
        onCreate={handleCreateCategory}
      />
      <EditCategories
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        category={selectedCategory}
        onUpdate={handleUpdateCategory}
      />
    </div>
  );
}
