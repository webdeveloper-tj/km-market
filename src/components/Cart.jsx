import { useState, useEffect } from "react";
import { Delete } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Cart({}) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsWithQuantity = storedCartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cartItemsWithQuantity);
  }, []);

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const showDeleteConfirmation = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleRemoveConfirmed = () => {
    const removedItem = cartItems.find((item) => item.id === itemToDelete);
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== itemToDelete
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setIsModalOpen(false);
  };

  const handleRemoveCancelled = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCheckout = () => {
    setCheckoutMessage("Proceeding to checkout. Please review your order.");
    setTimeout(() => {
      setCheckoutMessage("");
    }, 5000); // Clear message after 5 seconds
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalSum = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-xl">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-contain"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600">{item.description}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 rounded"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    className="bg-green-700 hover:bg-green-800 text-white font-bold px-3 rounded"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="ml-auto bg-red-700 hover:bg-red-800 text-white font-bold px-2 rounded"
                    onClick={() => showDeleteConfirmation(item.id)}
                  >
                    <Delete />
                  </button>
                </div>
                <p className="mt-2 text-lg text-gray-800">
                  ${item.price * item.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-lg sticky top-6 self-start">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2">
          <span className="text-lg text-gray-800">Total Quantity:</span>
          <span className="text-lg text-gray-800">
            {calculateTotalQuantity()}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-800">Total Sum:</span>
          <span className="text-lg text-gray-800">${calculateTotalSum()}</span>
        </div>
        <button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 rounded"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        {checkoutMessage && (
          <div className="text-green-500 mt-2">{checkoutMessage}</div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleRemoveCancelled}
              >
                No
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                onClick={handleRemoveConfirmed}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
