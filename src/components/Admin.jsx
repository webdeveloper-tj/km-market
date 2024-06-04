import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { Delete, UploadIcon, Plus } from "lucide-react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [src, setSrc] = useState("");
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    src: src,
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("add")) || [];
    setProducts(storedProducts);
  }, []);

  const handleDelete = (id) => {
    setDeleteConfirmation(true);
    setDeleteProductId(id);
  };

  const confirmDelete = () => {
    const filtered = products.filter((item) => item.id !== deleteProductId);
    setRecentlyDeleted(products.filter((item) => item.id === deleteProductId));
    setProducts(filtered);
    localStorage.setItem("add", JSON.stringify(filtered));
    setDeleteConfirmation(false);
    setDeleteProductId(null);
  };

  const undoDelete = () => {
    setProducts([...products, ...recentlyDeleted]);
    setRecentlyDeleted([]);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteProductId(null);
  };

  const filterProducts = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (product) => {
    setIsUpdateFormVisible(true);
    setUpdateProduct(product);
    setSrc(product.src);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleChangeForSrc = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(file);
        setSrc(e.target.result);
        setIsImageSelected(true);
        setUpdateProduct((prevProduct) => ({
          ...prevProduct,
          src: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((product) =>
      product.id === updateProduct.id ? updateProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("add", JSON.stringify(updatedProducts));
    setIsUpdateFormVisible(false);
  };

  return (
    <>
      <header className="bg-gray-700 p-3">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <Link to="/" title="GO TO HOME">
              km <sup className="text-orange-400">s</sup>
            </Link>
          </h1>
          <input
            type="search"
            className="text-dark border rounded p-1 outline-none w-1/2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => filterProducts(e.target.value)}
          />
          <Link
            to="newproduct"
            className="text-white rounded-sm bg-gray-600 md:p-1 hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-x-2"
          >
            <Plus className="inline" />
            <span className="hidden sm:inline">New Product</span>
          </Link>
        </div>
      </header>

      <div className="container w-full mx-auto grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 md:justify-around gap-3 px-1">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col max-w-80 sm:max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                <p className="text-xl font-bold text-gray-400">
                  {product.category}
                </p>
                <div className="flex justify-between gap-x-2 items-center py-2">
                  <button
                    className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-8 w-24 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => handleDelete(product.id)}
                  >
                    <span className="">
                      <Delete className="inline h-7" />
                    </span>
                  </button>
                  <button
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm h-8 w-24 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                    onClick={() => handleUpdate(product)}
                  >
                    <span className="">
                      <FaEdit className="inline h-7" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {deleteConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Are you sure to delete this product?</p>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md m-2"
              onClick={cancelDelete}
            >
              No, cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
              onClick={confirmDelete}
            >
              Yes, delete
            </button>
          </div>
        </div>
      )}

      {isUpdateFormVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-2/4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Update Product
            </h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <input
                  name="title"
                  onChange={handleUpdateChange}
                  value={updateProduct.title}
                  type="text"
                  placeholder="Title"
                  className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  name="price"
                  onChange={handleUpdateChange}
                  value={updateProduct.price}
                  type="text"
                  placeholder="Price"
                  inputMode="numeric"
                  className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  onChange={handleUpdateChange}
                  value={updateProduct.description}
                  placeholder="Description"
                  rows={8}
                  className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  name="category"
                  onChange={handleUpdateChange}
                  value={updateProduct.category}
                  type="text"
                  placeholder="Category"
                  className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  name="src"
                  onChange={handleChangeForSrc}
                  type="file"
                  className="hidden"
                  id="uploadImage"
                />
                <label
                  htmlFor="uploadImage"
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <UploadIcon className="inline size-4" /> Upload Image
                </label>
                <img
                  src={src}
                  className="w-14 h-10 rounded-lg mt-2 float-right"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 ml-2"
                onClick={() => setIsUpdateFormVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
