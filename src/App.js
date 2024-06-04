import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Contact from "./components/Contact";
import About from "./components/About";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFoud";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Admin from "./components/Admin";
import NewProduct from "./components/NewProduct";
function App() {
  const [productName, setProductName] = useState("");
  const [counter, setCounter] = useState(0);
  const filterProduct = (text) => {
    setProductName(text);
  };
  return (
    <div className="grid gap-y-2">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            index
            element={
              <>
                <Header filterProduct={filterProduct} counter={counter} />
                <ProductList
                  productName={productName}
                  setCounter={setCounter}
                  counter={counter}
                />
              </>
            }
          />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />

          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/newproduct" element={<NewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
