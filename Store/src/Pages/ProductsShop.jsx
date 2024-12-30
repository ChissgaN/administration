import React, { useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import * as Yup from "yup";

const products = [
  { id: 1, name: "Producto A", brand: "Marca A", price: 50.5, stock: 10, products_categories_id: 1 },
  { id: 2, name: "Producto B", brand: "Marca B", price: 75.0, stock: 5, products_categories_id: 1 },
  { id: 3, name: "Producto C", brand: "Marca C", price: 20.99, stock: 8, products_categories_id: 1 },
  { id: 4, name: "Producto D", brand: "Marca D", price: 100.0, stock: 2, products_categories_id: 1 },
  { id: 5, name: "Producto E", brand: "Marca E", price: 35.75, stock: 15, products_categories_id: 1 },
  { id: 6, name: "Producto F", brand: "Marca F", price: 10.0, stock: 20, products_categories_id: 1 },
  { id: 7, name: "Producto G", brand: "Marca G", price: 15.0, stock: 10, products_categories_id: 2 },
  { id: 8, name: "Producto H", brand: "Marca H", price: 20.0, stock: 5, products_categories_id: 2 },
  { id: 9, name: "Producto I", brand: "Marca I", price: 25.0, stock: 8, products_categories_id: 2 },
];

const ProductsShop = () => {
  const categorizedProducts = products.reduce((acc, product) => {
    acc[product.products_categories_id] = acc[product.products_categories_id] || [];
    acc[product.products_categories_id].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-[#fffffc] p-6">
      <h1 className="text-[#19535f] text-2xl font-bold mb-6">Productos</h1>
      <div className="flex flex-col gap-8">
        {Object.entries(categorizedProducts).map(([categoryId, categoryProducts]) => (
          <CategoryCarousel key={categoryId} products={categoryProducts} categoryId={categoryId} />
        ))}
      </div>
    </div>
  );
};

const CategoryCarousel = ({ products, categoryId }) => {
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
      <h2 className="text-[#19535f] text-xl font-semibold mb-4">Categoría {categoryId}</h2>
      <div className="relative flex items-center">
        <button
          onClick={handlePrevious}
          className="absolute left-0 z-10 bg-[#cbe896] p-2 rounded-full shadow-lg text-[#19535f] hover:bg-[#beb7a4] transition"
          style={{ marginLeft: "-40px" }}
        >
          <AiOutlineLeft size={20} />
        </button>
        <div ref={carouselRef} className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 220}px)` }}
          >
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-[#cbe896] p-2 rounded-full shadow-lg text-[#19535f] hover:bg-[#beb7a4] transition"
          style={{ marginRight: "-40px" }}
        >
          <AiOutlineRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

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
      setError(validationError.message);r
    }
  };

  const handleAddToCart = () => {
    if (!error && quantity >= 1) {
      alert(`Agregaste ${quantity} de ${product.name} al carrito.`);
    }
  };

  return (
    <div className="flex-shrink-0 w-[220px] h-[340px] mx-2 bg-[#fffffc] border border-[#beb7a4] rounded-lg shadow-lg overflow-hidden group">
      <div className="relative h-[215px] bg-[#cbe896] overflow-hidden group-hover:h-[155px] transition-all duration-700">
        <div className="h-full w-full bg-[#beb7a4] group-hover:translate-y-[-0px] transition-transform duration-700"></div>
      </div>
      <div className="p-4 h-[180px] flex flex-col justify-between">
        <div>
          <h3 className="text-[#19535f] font-semibold text-lg">{product.name}</h3>
          <p className="text-[#ed217c] text-sm">{product.brand}</p>
        </div>
        <div className="hidden group-hover:block mt-2">
          <div className="flex justify-between text-md text-[#19535f]">
            <p>Stock: {product.stock}</p>
            <p className="text-[#ff7f11] font-bold text-md">Q{product.price.toFixed(2)}</p>
          </div>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={`w-full mt-2 p-1 text-center border rounded-lg ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Cantidad"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full py-1 text-sm bg-[#ff7f11] text-white rounded-lg hover:bg-[#ff1b1c] transition"
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
