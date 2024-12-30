import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const ShopCar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Función para cancelar el carrito
  const cancelCart = () => {
    setCartItems([]);
    setTotal(0);
    toggleModal();
  };

  return (
    <>
      {/* Icono de carrito */}
      <button
        onClick={toggleModal}
        className="text-[#19535f] hover:text-[#ff7f11] transition text-2xl"
      >
        <AiOutlineShoppingCart />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-[#fffffc] p-6 rounded-lg shadow-lg w-11/12 sm:w-3/5 lg:w-2/5">
            {/* Botón de cerrar */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-[#ff1b1c] hover:text-[#ff7f11] transition text-2xl"
            >
              <AiOutlineClose />
            </button>

            {/* Contenido del carrito */}
            <h2 className="text-xl font-semibold text-[#19535f] mb-4">Carrito de Compras</h2>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-[#19535f] border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <span>Q{item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[#beb7a4]">Tu carrito está vacío</p>
            )}

            {/* Total y botones */}
            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-[#19535f] font-semibold">Total: Q{total}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={cancelCart}
                  className="bg-[#ff1b1c] text-white px-4 py-2 rounded hover:bg-[#ff7f11] transition"
                >
                  Cancelar
                </button>
                <button
                  className="bg-[#19535f] text-white px-4 py-2 rounded hover:bg-[#ff7f11] transition"
                >
                  Realizar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopCar;
