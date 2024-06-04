import { ContactRound, LogIn, LucideShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ filterProduct, counter }) => {
  const [opened, setOpened] = useState(true);
  const [countProductCart, setCountProductCart] = useState();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems" || []))
  );
  const handleOpened = () => {
    setOpened((prevOpened) => !prevOpened);
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);
  return (
    <header className="bg-gray-700 p-3">
      <div className="container flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <span>
            km <sup className="text-orange-400">s</sup>
          </span>
        </h1>
        <input
          type="search"
          className="text-dark border rounded px-1 outline-none w-1/2"
          placeholder="Search..."
          onChange={(e) => filterProduct(e.target.value.toLocaleUpperCase())}
        />
        <Link to="cart" className="relative">
          <LucideShoppingCart className="text-white" />
          <span className="text-center text-xs text-white absolute bottom-4 left-5 bg-orange-400 p-0 w-6 rounded-lg">
            {counter === 0 ? "" : counter}
          </span>
        </Link>
        <Link
          to="login"
          className="underline text-white hover:text-gray-200 cursor-pointer hidden md:block"
        >
          Login
        </Link>
        <Link
          to="about"
          className="underline text-white hover:text-gray-200 cursor-pointer hidden md:block"
        >
          About
        </Link>
        <Link
          to="contact"
          className="underline text-white hover:text-gray-200 cursor-pointer hidden md:block"
        >
          Contact
        </Link>
        <div
          className={
            opened
              ? `tham tham-e-squeeze tham-w-6 md:hidden`
              : `tham tham-e-squeeze tham-w-6 tham-active md:hidden`
          }
        >
          <div className="tham-box" onClick={handleOpened}>
            <div className="tham-inner bg-white" />
          </div>
        </div>
        {!opened && (
          <div style={styles.container} className="md:hidden">
            <div
              className="rounded-sm text-white flex flex-col gap-2 px-2 items-start justify-center bg-gray-700"
              style={styles.box}
            >
              <Link
                to="login"
                className="underline hover:text-gray-200 cursor-pointer flex items-center justify-center gap-x-2"
              >
                <LogIn className="inline" /> Login
              </Link>
              <Link
                to="about"
                className="underline hover:text-gray-200 cursor-pointer flex items-center justify-center gap-x-2"
              >
                <User className="inline" /> About
              </Link>

              <Link
                to="contact"
                className="underline hover:text-gray-200 cursor-pointer flex items-center justify-center gap-x-2"
              >
                <ContactRound className="inline" /> Contact
              </Link>
            </div>
            <div onClick={handleOpened} style={styles.closed}></div>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
  box: {
    width: "100%",
    height: "150px",
  },
  closed: {
    position: "absolute",
    top: "150px",
    bottom: "0px",
    left: "0px",
    right: "0px",
  },
};

export default Header;
