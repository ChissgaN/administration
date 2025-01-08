import { useEffect, useState } from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ActionButtons from "../Components/ActionButtons";
import Confirm from "../Components/Confirm";
import CreateProduct from "../Components/ProductsComponents.jsx/CreateProduct";
import EditProduct from "../Components/ProductsComponents.jsx/EditProduct";
import p from "../libs/axios/products";

const base_api_url = import.meta.env.VITE_BASE_API_URL;

export default function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productos, setProductos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategoryStatus, setFilterCategoryStatus] = useState("all");

  const handleEditClick = (producto) => {
    setProductToEdit(producto);
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    p.updateProduct(productToEdit.id, updatedProduct)
      .then((rs) => {
        if (rs.status === 200) {
          getProducts();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsEditDialogOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateProduct = async (newProduct) => {
    const response = await p.createNewProduct(newProduct);
    if (response.status === 201) {
      getProducts();
    }
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
    p.deleteProduct(selectedProduct.id)
      .then((rs) => {
        if (rs.status === 200) {
          getProducts();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsConfirmOpen(false);
  };

  const getProducts = () => {
    p.getAllProducts()
      .then((rs) => {
        setProductos(rs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(getProducts, []);

  const filteredProducts = productos.filter((producto) => {
    const matchesSearch =
      producto.name.toLowerCase().includes(searchText.toLowerCase()) ||
      producto.category.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      filterCategoryStatus === "all" ||
      producto.category.status_id.toString() === filterCategoryStatus;

    return matchesSearch && matchesStatus;
  });

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-[#fffffc]">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold text-[#19535f]">Productos</h1>
        <div className="flex justify-end gap-4 w-[60%]">
          <TextField
            size="small"
            variant="outlined"
            label="Buscar por nombre o categoría"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="mb-4 w-[32%] rounded"
          />
          <FormControl variant="outlined" size="small" className="w-[30%]">
            <InputLabel>Filtrar por estado de categoría</InputLabel>
            <Select
              value={filterCategoryStatus}
              onChange={(e) => setFilterCategoryStatus(e.target.value)}
              label="Filtrar por estado de categoría"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="1">Categorías activas</MenuItem>
              <MenuItem value="2">Categorías inactivas</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            className="bg-[#9381ff] text-white hover:bg-[#7c6bd0]  px-4 py-2 rounded-md flex items-center"
            startIcon={<FaPlus />}
            onClick={handleCreateClick}
          >
            Crear Producto
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-[#9381ff]">
            <TableRow>
              {tableHeader.map((header) => (
                <TableCell key={header} className="text-white font-bold">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((producto) => (
              <TableRow key={producto.id} className="hover:bg-gray-100">
                <TableCell>{producto.id}</TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-[#beb7a4] flex items-center justify-center rounded-md text-sm">
                    {producto.photo ? (
                      <img
                        src={base_api_url + `/${producto.photo}`}
                        alt={producto.photo}
                        className="w-full h-full object-cover object-top"
                        width={40}
                      />
                    ) : (
                      "No image"
                    )}
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
        count={filteredProducts.length}
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

const tableHeader = [
  "ID",
  "Foto",
  "Nombre",
  "Categoría",
  "Marca",
  "Código",
  "Stock",
  "Precio",
  "Acciones",
];
