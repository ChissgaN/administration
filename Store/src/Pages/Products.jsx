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
import CreateProduct from "../Components/ProductsComponents.jsx/CreateProduct";
import EditProduct from "../Components/ProductsComponents.jsx/EditProduct";

export default function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const productos = [
    {
      id: 8,
      products_categories_id: 1,
      name: "non",
      brand: "non",
      code: "LSZ",
      stock: 86,
      status_id: 1,
      price: 621.13,
      photo: "venenatis",
      category: {
        id: 1,
        name: "Electrodomesticos",
      },
      status: {
        id: 1,
        name: "Activo",
      },
    },
    // ... otros productos
  ];

  const handleEditClick = (producto) => {
    setProductToEdit(producto);
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    console.log("Producto actualizado:", updatedProduct);
    setIsEditDialogOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateProduct = (newProduct) => {
    console.log("Producto creado:", newProduct);
    setIsCreateDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (producto) => {
    setSelectedProduct(producto);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Producto eliminado:", selectedProduct);
    setIsConfirmOpen(false);
  };

  const paginatedProducts = productos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Productos</h1>
        <Button
          variant="contained"
          className="bg-[#9381ff] text-white hover:bg-[#7c6bd0] px-4 py-2 rounded-md flex items-center"
          startIcon={<FaPlus />}
          onClick={handleCreateClick}
        >
          Crear Producto
        </Button>
      </div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-[#9381ff]">
            <TableRow>
              <TableCell className="text-white font-bold">ID</TableCell>
              <TableCell className="text-white font-bold">Foto</TableCell>
              <TableCell className="text-white font-bold">Nombre</TableCell>
              <TableCell className="text-white font-bold">Categoría</TableCell>
              <TableCell className="text-white font-bold">Marca</TableCell>
              <TableCell className="text-white font-bold">Código</TableCell>
              <TableCell className="text-white font-bold">Stock</TableCell>
              <TableCell className="text-white font-bold">Precio</TableCell>
              <TableCell className="text-white font-bold">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((producto) => (
              <TableRow key={producto.id} className="hover:bg-gray-100">
                <TableCell>{producto.id}</TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-[#beb7a4] flex items-center justify-center rounded-md text-sm">
                    Foto
                  </div>
                </TableCell>
                <TableCell>{producto.name}</TableCell>
                <TableCell>{producto.category.name}</TableCell>
                <TableCell>{producto.brand}</TableCell>
                <TableCell>{producto.code}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>Q{producto.price.toFixed(2)}</TableCell>
                <TableCell>
                  <ActionButtons
                    rowData={producto}
                    actions={[
                      {
                        icon: <FaEdit className="text-blue-500" />,
                        className: "hover:bg-blue-100",
                        tooltip: "Editar",
                        action: () => handleEditClick(producto),
                      },
                      {
                        icon: <FaTrash className="text-red-500" />,
                        className: "hover:bg-red-100",
                        tooltip: "Borrar",
                        action: () => handleDeleteClick(producto),
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
        count={productos.length}
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
        itemName={selectedProduct?.name}
        itemType="product"
      />
      <CreateProduct
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateProduct}
      />
      <EditProduct
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveProduct}
        productData={productToEdit}
      />
    </div>
  );
}
