import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Delete } from "lucide-react";

function ProductList({ productName, setCounter, counter }) {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("add")) || []
  );
  const [_products] = useState(JSON.parse(localStorage.getItem("add")) || []);
  const [showModal, setShowModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const addToCart = (product) => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = storedCartItems.findIndex(
      (item) => item.id === product.id
    );

    if (itemIndex > -1) {
      storedCartItems[itemIndex].quantity += 1;
    } else {
      storedCartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
    setCartItems(storedCartItems);
    setSingleProduct(product);
    setShowModal(true);
  };

  const removeFromCart = (productId) => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = storedCartItems.filter(
      (item) => item.id !== productId
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSingleProduct(null);
  };
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

  const filteredProducts = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
  );
  console.log(filteredProducts);
  useEffect(() => {
    setCounter(calculateTotalQuantity());
  }, [cartItems]);

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <>
      <div className="container w-full mx-auto grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 md:justify-around gap-3 px-1">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="w-full flex flex-col max-w-80 sm:max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="my-1 self-center w-56 h-72 sm:w-52 sm:h-64 rounded-lg"
              src={product.src}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <b>{product.title.substring(0, 19)}...</b>
              </h5>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.price}$
              </span>
              <p className="text-2xl font-bold text-gray-400">
                {product.category}
              </p>
              <br />
              <button
                className="flex justify-center w-full gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="in line-block" />
                <span className="self-end">Add to cart</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {showModal && singleProduct && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="container grid grid-cols-12 items-center p-2 bg-slate-800 w-10/12 h-96 rounded-lg relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="my-1 self-center w-56 h-72 sm:w-52 sm:h-64 rounded-lg col-span-4"
              src={singleProduct.src}
              alt="singleProduct image"
            />
            <div className="px-5 pb-5 col-span-6">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white underline">
                <b>{singleProduct.category.toLocaleUpperCase()}</b>
              </h5>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <b>{singleProduct.title.substring(0, 100)}</b>
              </h5>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {singleProduct.price}$
              </span>
              <p className="text-2xl font-bold text-gray-400">
                {singleProduct.category}
              </p>
              <br />
              <div className="button-group grid grid-cols-4 items-center w-44 gap-x-2">
                <button
                  className="text-slate-100 text-center text-xl border border-slate-500 rounded h-8 "
                  onClick={() => handleDecrement(singleProduct.id)}
                  disabled={
                    (cartItems.find((item) => item.id === singleProduct.id)
                      ?.quantity || 0) === 1
                  }
                >
                  -
                </button>
                <span className="text-slate-100 text-center text-xl border border-slate-500 rounded h-8 ">
                  {cartItems.find((item) => item.id === singleProduct.id)
                    ?.quantity || 0}
                </span>
                <button
                  className="text-slate-100 text-center text-xl border border-slate-500 rounded h-8 "
                  onClick={() => handleIncrement(singleProduct.id)}
                >
                  +
                </button>
                <button
                  className="text-red-300 text-center text-xl border border-slate-500 rounded h-8 "
                  onClick={() => removeFromCart(singleProduct.id)}
                >
                  <Delete className="inline" />
                </button>
              </div>
            </div>
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={closeModal}
            >
              <div className="tham tham-e-squeeze tham-w-6 tham-active">
                <div className="tham-box">
                  <div className="tham-inner text-black" />
                </div>
              </div>
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default ProductList;
