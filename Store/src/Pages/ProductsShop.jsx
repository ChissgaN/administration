import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import * as Yup from "yup";
import productAPI from "../libs/axios/products";

const ProductsShop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    productAPI
      .getAllProducts()
      .then((data) => {
        const filteredProducts = data.filter(product => product.category?.status_id === 1);
        setProducts(filteredProducts);
      })
      .catch((error) => {
      });
  }, []);

  const categorizedProducts = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Sin categoría";
    acc[categoryName] = acc[categoryName] || [];
    if (!acc[categoryName].some((p) => p.id === product.id)) {
      acc[categoryName].push(product);
    }
    return acc;
  }, {});

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item.id === product.id);
      const accumulatedQuantity = existingProduct
        ? existingProduct.quantity + quantity
        : quantity;

      if (accumulatedQuantity > product.stock) {
        const allowedQuantity = product.stock - (existingProduct?.quantity || 0);
        setDialogMessage(
          `No puedes agregar más de ${product.stock} unidades de "${product.name}". Solo puedes agregar ${allowedQuantity} más.`
        );
        setDialogOpen(true);
        return prevCartItems;
      }
      return existingProduct
        ? prevCartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
              : item
          )
        : [...prevCartItems, { ...product, quantity, total: product.price * quantity }];
    });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMessage("");
  };

  return (
    <div className="bg-[#fffffc] p-6 overflow-x-hidden">
      <h1 className="text-[#19535f] text-2xl font-bold mb-6">Productos</h1>
      <div className="flex flex-col gap-8">
        {Object.entries(categorizedProducts).map(([categoryName, categoryProducts]) => (
          <CategoryCarousel
            key={categoryName}
            products={categoryProducts}
            categoryName={categoryName}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle className="text-red-500 text-2xl font-bold">Advertencia</DialogTitle>
        <DialogContent>
          <p>{dialogMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const CategoryCarousel = ({ products, categoryName, handleAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    const visibleItems = Math.floor(carouselRef.current.offsetWidth / 220);
    const maxIndex = products.length - visibleItems;
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <div className="relative">
      <h2 className="text-[#ff7f11] text-xl font-semibold mb-4">
        Categoría: {categoryName}
      </h2>
      <div className="relative flex items-center">
        <button
          onClick={handlePrevious}
          className="absolute left-0 z-10 bg-[#cbe896] p-2 rounded-full shadow-lg text-[#19535f] hover:bg-[#beb7a4] transition"
          style={{ marginLeft: "-20px" }}
        >
          <AiOutlineLeft size={20} />
        </button>
        <div ref={carouselRef} className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 220}px)` }}
          >
            {products.map((product) => (
              <Card key={product.id} product={product} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-[#cbe896] p-2 rounded-full shadow-lg text-[#19535f] hover:bg-[#beb7a4] transition"
          style={{ marginRight: "-20px" }}
        >
          <AiOutlineRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Card = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const base_api_url = import.meta.env.VITE_BASE_API_URL;

  const schema = Yup.number()
    .min(1, "Debe pedir al menos 1 unidad.")
    .max(product.stock, `El stock máximo es ${product.stock}.`)
    .required("La cantidad es obligatoria.");

  const handleQuantityChange = async (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    setQuantity(value);

    try {
      await schema.validate(value);
      setError("");
    } catch (validationError) {
      setError(validationError.message);
    }
  };

  const handleAddToCartLocal = () => {
    if (!error && quantity >= 1) {
      handleAddToCart(product, quantity);
    }
  };

  return (
    <div className="flex-shrink-0 w-[220px] h-[340px] mx-8 bg-[#fffffc] border border-[#beb7a4] rounded-lg shadow-lg overflow-hidden group">
      <div className="relative h-[215px] bg-[#cbe896] overflow-hidden group-hover:h-[155px] transition-all duration-700">
        <div className="h-full w-full bg-[#beb7a4] group-hover:translate-y-[-0px] transition-transform duration-700">
          {product.photo ? (
            <img
              src={base_api_url + `/${product.photo}`}
              alt={product.photo}
              className="w-full h-full object-cover object-top"
              width={40}
            />
          ) : (
            "No image"
          )}
        </div>
      </div>
      <div className="p-4 h-[180px] flex flex-col justify-between">
        <div>
          <h3 className="text-[#19535f] font-semibold text-lg">{product.name}</h3>
          <p className="text-[#ed217c] text-sm">{product.brand}</p>
        </div>
        <div className="hidden group-hover:block mt-2">
          <div className="flex justify-between text-md text-[#19535f]">
            <p>Stock: {product.stock}</p>
            <p className="text-[#ff7f11] font-bold text-md">
              Q{product.price.toFixed(2)}
            </p>
          </div>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={`w-full mt-2 p-1 text-center border rounded-lg ${error ? "border-red-500" : "border-gray-300"}`}
            placeholder="Cantidad"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleAddToCartLocal}
            className="mt-2 w-full py-1 text-sm bg-[#19535f] text-white rounded-lg hover:bg-[#ff1b1c] transition"
            disabled={!!error}
          >
            Agregar Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;
