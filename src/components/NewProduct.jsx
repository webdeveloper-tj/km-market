import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function NewProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState("");
  const [image, setImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleChangeForSrc = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(file);
        setSrc(e.target.result);
        setIsImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      title !== "" &&
      price !== "" &&
      desc !== "" &&
      category !== "" &&
      src !== ""
    ) {
      const storedNewProduct = JSON.parse(localStorage.getItem("add")) || [];
      const product = {
        title: title,
        id: Math.random() * 100,
        price: price,
        description: desc,
        category: category,
        src: src,
      };
      const updateNewProduct = [...storedNewProduct, product];
      localStorage.setItem("add", JSON.stringify(updateNewProduct));
      setTitle("");
      setPrice("");
      setDesc("");
      setPrice("");
      setSrc("");
      setCategory("");
      setIsImageSelected(false);
    } else {
      alert("Please fill out the form correctly");
    }
  };

  return (
    <div className="my-20">
      <form className="max-w-lg mx-auto p-6 bg-gray-800 rounded-md shadow-md text-white">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="mb-4 relative">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title.trimStart()}
            type="text"
            minLength={7}
            placeholder="Title here..."
            className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
          />
        </div>
        <div className="mb-4 relative">
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price.trimStart()}
            minLength={1}
            type="number"
            placeholder="Price here..."
            className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
          />
        </div>
        <div className="mb-4 relative">
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc.trimStart()}
            minLength={20}
            placeholder="Description here..."
            className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
          />
        </div>
        <div className="mb-4 relative">
          <input
            onChange={(e) => setCategory(e.target.value)}
            value={category.trimStart()}
            min={5}
            type="text"
            placeholder="Category here..."
            className="block w-full px-1 text-black rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
          />
        </div>
        <div className="mb-4 relative">
          <input
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
          {isImageSelected && (
            <motion.img
              src={src}
              alt="Selected Image"
              className="mt-2 rounded-md w-20 h-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        <button
          type="submit"
          onClick={(e) => handleAdd(e)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
